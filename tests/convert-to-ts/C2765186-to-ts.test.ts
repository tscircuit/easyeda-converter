import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2765186-repro.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"

it("prefers schematic pin names over footprint pad identifiers", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Real-world reference using this imported component:
  // https://tscircuit.com/hrithik18k/air-mouse#schematic
  expect(result).toContain('pin13: ["EH1"]')
  expect(result).toContain('pin15: ["GND1","A1B12"]')
  expect(result).toContain('pin25: ["VBUS2","B4A9"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2765186-incorrect-usb-c-symbol",
  )
}, 50000)
