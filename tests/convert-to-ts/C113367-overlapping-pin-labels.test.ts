import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C113367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves the original pin labels for the C113367 custom symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(result).toContain('aliases={["IN-","IN_NEG"]}')
  expect(result).toContain('aliases={["VO+","VO_POS"]}')
  expect(result).not.toContain("schPinLabelFontSize")
  expect(schematicSvg).toContain("IN-")
  expect(schematicSvg).toContain("VO+")
  expect(schematicSvg).not.toContain("IN_NEG")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C113367-overlapping-pin-labels",
  )
}, 50000)
