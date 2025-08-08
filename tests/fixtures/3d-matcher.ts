import { expect, type MatcherResult } from "bun:test"
import { convertCircuitJsonToSimple3dSvg } from "circuit-json-to-simple-3d"
import sharp from "sharp"

async function toMatch3dSnapshot(
  // biome-ignore lint/suspicious/noExplicitAny: bun doesn't expose
  this: any,
  circuitJsonMaybePromise: any,
  testPath: string,
): Promise<MatcherResult> {
  const circuitJson = await circuitJsonMaybePromise
  const svg = await convertCircuitJsonToSimple3dSvg(
    circuitJson.concat({
      type: "pcb_board",
      width: 50,
      height: 50,
      center: { x: 0, y: 0 },
      pcb_board_id: "board1",
      thickness: 1.6,
      num_layers: 2,
      material: "fr4",
    }),
  )
  const png = await sharp(Buffer.from(svg)).toFormat("png").toBuffer()
  return await expect(png).toMatchPngSnapshot(testPath)
}

expect.extend({
  // biome-ignore lint/suspicious/noExplicitAny:
  toMatch3dSnapshot: toMatch3dSnapshot as any,
})

declare module "bun:test" {
  interface Matchers<T = unknown> {
    toMatch3dSnapshot(testPath: string): Promise<MatcherResult>
  }
}
