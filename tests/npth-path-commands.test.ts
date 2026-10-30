import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "./assets/C5815189.raweasy.json"

test.each([
  "M 4000 3000 H 4010 V 3010 L 4000 3010 Z",
  "m 4000 3000 h 10 v 10 l -10 0 z",
])(
  "retains an H/V NPTH rectangle through conversion and TSX: %s",
  async (pathData) => {
    // Replace the captured capsule with a synthetic rectangle to exercise the
    // polygon fallback; the supplier's real capsule remains covered separately.
    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const region = betterEasy.packageDetail.dataStr.shape.find(
      (shape) => shape.type === "SOLIDREGION" && shape.fillStyle === "npth",
    )
    if (!region || region.type !== "SOLIDREGION") {
      throw new Error("Expected the captured NPTH SOLIDREGION")
    }
    region.pathData = pathData

    const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
    const cutout = circuitJson.find((element) => element.type === "pcb_cutout")
    if (!cutout || cutout.shape !== "polygon") {
      throw new Error("Expected a polygon cutout")
    }
    expect(cutout.points).toHaveLength(5)
    const expectedOffsets = [
      { x: 0, y: 0 },
      { x: 2.54, y: 0 },
      { x: 2.54, y: -2.54 },
      { x: 0, y: -2.54 },
      { x: 0, y: 0 },
    ]
    const origin = cutout.points[0]!
    for (const [index, point] of cutout.points.entries()) {
      expect(point.x - origin.x).toBeCloseTo(expectedOffsets[index]!.x, 7)
      expect(point.y - origin.y).toBeCloseTo(expectedOffsets[index]!.y, 7)
    }

    const footprint = generateFootprintTsx([cutout])
    const rendered = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="10mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)
    const nativeCutout = rendered.find(
      (element) => element.type === "pcb_cutout",
    )
    if (!nativeCutout || nativeCutout.shape !== "polygon") {
      throw new Error("Expected the native polygon cutout")
    }
    expect(nativeCutout.points).toHaveLength(5)
    for (const [index, point] of nativeCutout.points.entries()) {
      expect(point.x).toBeCloseTo(cutout.points[index]!.x, 7)
      expect(point.y).toBeCloseTo(cutout.points[index]!.y, 7)
    }
  },
)
