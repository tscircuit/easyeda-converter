import { it, expect } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import chipRawEasy from "../assets/C90683.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("renders all NN2-24S05C3N schematic pin labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(schematicSvg).toContain("VIN_POS")
  expect(schematicSvg).toContain("GND")
  expect(schematicSvg).toContain("VO_NEG")
  expect(schematicSvg).toContain("VO_POS")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C90683-NN2-24S05C3N-schematic-repro",
  )
})
