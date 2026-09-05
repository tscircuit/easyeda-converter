import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson, normalizePinLabels } from "lib"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import ddrRawEasy from "../assets/C2920140.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("records the DDR alias suffix collision", () => {
  const normalized = normalizePinLabels([
    ["A1", "VDDQ"],
    ["T2", "A11"],
    ["P3", "A1"],
  ])
  expect(normalized).toMatchSnapshot()
  expect(normalized.filter((aliases) => aliases.includes("A11"))).toHaveLength(
    1,
  )
  expect(new Set(normalized.flat()).size).toBe(normalized.flat().length)
})

test("records C2920140 aliases, pad associations and unintended internal connection", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(ddrRawEasy)
  // Omit only optional 3D nodes so this electrical regression stays offline.
  // The captured source fixture, pads, courtyard and symbol remain unchanged.
  betterEasy.packageDetail.dataStr.shape =
    betterEasy.packageDetail.dataStr.shape.filter(
      (shape) => shape.type !== "SVGNODE",
    )
  const converted = convertEasyEdaJsonToCircuitJson(betterEasy)
  const sourcePorts = converted.filter(
    (element) => element.type === "source_port",
  )
  expect(sourcePorts).toHaveLength(96)
  expect(
    sourcePorts.map(({ name, pin_number, port_hints }) => ({
      name,
      pin_number,
      port_hints,
    })),
  ).toMatchSnapshot("physical terminal aliases")
  expect(generateFootprintTsx(converted)).toMatchSnapshot(
    "unchanged supplier footprint",
  )

  const tsx = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))
  const internalConnections = circuitJson.filter(
    (element) => element.type === "source_component_internal_connection",
  )
  expect(internalConnections).toHaveLength(0)
  expect(internalConnections).toMatchSnapshot("unwired internal connections")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(96)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2920140-alias-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2920140-alias-pcb",
  )
}, 30_000)
