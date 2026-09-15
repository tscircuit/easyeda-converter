import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import socket from "../assets/C19076967.raweasy.json"
import audioJack from "../assets/C309274.raweasy.json"

for (const [part, raw, expectedLengths, width] of [
  [
    "C19076967",
    socket,
    [
      4.5000164, 4.5000164, 4.5000164, 4.499991, 4.499991, 4.4999656, 4.5000164,
      4.499991, 4.499991, 4.499991, 3.999992,
    ],
    1.5000224,
  ],
  [
    "C309274",
    audioJack,
    [2.0999704, 2.3999952, 2.0999704, 2.0999704, 2.3999952, 2.3999952],
    0.7999984,
  ],
] as const) {
  test(`${part} preserves explicit EasyEDA slot lengths through Circuit JSON and TSX`, async () => {
    const circuitJson = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(raw),
    )
    const holes = circuitJson.filter(
      (element) => element.type === "pcb_plated_hole",
    )
    expect(holes).toHaveLength(expectedLengths.length)
    for (const [index, hole] of holes.entries()) {
      expect(hole).toHaveProperty("hole_height")
      if (
        !("hole_width" in hole && "hole_height" in hole) ||
        hole.hole_width === undefined ||
        hole.hole_height === undefined
      )
        throw new Error("Expected a slotted plated hole")
      expect(hole.hole_width).toBeCloseTo(width, 6)
      expect(hole.hole_height).toBeCloseTo(expectedLengths[index], 6)
    }

    const generated = await runTscircuitCode(`
      export default () => (
        <board width="40mm" height="40mm">
          <chip name="J1" footprint={${generateFootprintTsx(circuitJson)}} />
        </board>
      )
    `)
    const renderedHoles = generated.filter(
      (element) => element.type === "pcb_plated_hole",
    )
    expect(renderedHoles).toHaveLength(expectedLengths.length)
    for (const [index, hole] of renderedHoles.entries()) {
      expect(hole).toHaveProperty("hole_height")
      if (
        !("hole_width" in hole && "hole_height" in hole) ||
        hole.hole_width === undefined ||
        hole.hole_height === undefined
      )
        throw new Error("Expected a slotted plated hole")
      expect(Math.min(hole.hole_width, hole.hole_height)).toBeCloseTo(width, 6)
      expect(Math.max(hole.hole_width, hole.hole_height)).toBeCloseTo(
        expectedLengths[index],
        6,
      )
    }
    await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${part}-explicit-slot-length`,
    )
  })

  test(`${part} retains its legacy estimate when no slot length is supplied`, () => {
    const parsed = EasyEdaJsonSchema.parse(raw)
    for (const shape of parsed.packageDetail.dataStr.shape) {
      if (shape.type === "PAD") delete shape.holeLength
    }
    const holes = convertEasyEdaJsonToCircuitJson(parsed).filter(
      (element) => element.type === "pcb_plated_hole",
    )
    expect(holes).toHaveLength(expectedLengths.length)
    for (const hole of holes) {
      expect(hole).toHaveProperty("hole_height")
      if (!("hole_height" in hole)) throw new Error("Expected a slotted hole")
      expect(hole.hole_height).toBeCloseTo(
        part === "C19076967" ? 3.90005824 : 2.3999952,
        6,
      )
    }
  })
}
