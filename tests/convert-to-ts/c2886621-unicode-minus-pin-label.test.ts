import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2886621.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves and normalizes the C2886621 Unicode-minus pin label", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) => shape.includes("~SINEIN–~")),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin3: ["SINEIN_NEG"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2886621-unicode-minus-pin-label",
  )
})
