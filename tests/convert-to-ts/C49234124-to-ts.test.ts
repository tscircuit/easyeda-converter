import { it, expect } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C49234124.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"

it("converts C49234124 into a compact pushbutton schematic", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("import type { PushButtonProps }")
  expect(result).toContain("<pushbutton")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C49234124-compact-pushbutton-schematic",
  )
})
