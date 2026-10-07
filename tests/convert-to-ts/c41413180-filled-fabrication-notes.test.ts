import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import rawJson from "tests/assets/C41413180.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "tests/fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("C41413180 filled fabrication symbols survive generated TSX rendering", async () => {
  const source = await convertBetterEasyToTsx({
    betterEasy: EasyEdaJsonSchema.parse(rawJson),
  })
  expect(source.match(/isFilled hasStroke=\{false\}/g)).toHaveLength(4)
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(source),
  )
  const paths = circuitJson.filter(
    (e) => e.type === "pcb_fabrication_note_path",
  )
  expect(paths).toHaveLength(4)
  for (const path of paths)
    expect(path).toMatchObject({
      is_filled: true,
      has_stroke: false,
      stroke_width: 0,
    })
  const plus = paths.find((path) => path.route.length === 13)!
  expect(Math.abs(plus.route[0]!.y - plus.route[1]!.y)).toBeCloseTo(0.127, 5)
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
