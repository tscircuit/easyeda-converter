import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2765186.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"

it("reproduces incorrect schematic pin grouping for USB-C C2765186", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Real-world reference using this imported component:
  // https://tscircuit.com/hrithik18k/air-mouse#schematic
  // The live EasyEDA data is converted with footprint-oriented aliases before
  // the logical USB-C labels, which makes consumers display the wrong names.
  expect(result).toContain('pin13: ["EH1"]')
  expect(result).toContain('pin15: ["A1B12","GND1"]')
  expect(result).toContain('pin25: ["B4A9","VBUS2"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2765186-incorrect-usb-c-symbol",
  )
}, 50000)
