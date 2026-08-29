import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2969838.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces slash-separated pin labels being lost", async () => {
  const slashSeparatedPinLabel = "ALERT/INT"

  expect(
    chipRawEasy.dataStr.shape.some((shape) =>
      shape.includes(`~${slashSeparatedPinLabel}~`),
    ),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain(slashSeparatedPinLabel)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2969838-alert-int-pin-label-missing",
  )
})
