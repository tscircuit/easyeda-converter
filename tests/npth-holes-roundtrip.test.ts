import { expect, test } from "bun:test"
import type { AnyCircuitElement, PcbHole } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"

const holes = [
  {
    type: "pcb_hole",
    pcb_hole_id: "circle",
    hole_shape: "circle",
    x: -4.1234567,
    y: 2.2345678,
    hole_diameter: 0.7099808,
  },
  ...(["oval", "rect", "pill"] as const).map((hole_shape, index) => ({
    type: "pcb_hole" as const,
    pcb_hole_id: hole_shape,
    hole_shape,
    x: -1.2345678 + index * 3,
    y: 2.2345678,
    hole_width: index === 2 ? 0.6723456 : 1.1234567,
    hole_height: index === 2 ? 1.1234567 : 0.6723456,
  })),
  ...[0, 37, 90, -23, 180, 270].map((ccw_rotation, index) => ({
    type: "pcb_hole" as const,
    pcb_hole_id: `rotated_${ccw_rotation}`,
    hole_shape: "rotated_pill" as const,
    x: -5.1234567 + index * 2,
    y: -1.2345678,
    hole_width: 1.2345678,
    hole_height: 0.6543219,
    ccw_rotation,
  })),
] satisfies PcbHole[]

test("round-trips NPTH shapes, dimensions, positions, and rotations", async () => {
  const footprint = generateFootprintTsx(holes)
  const rendered = (await runTscircuitCode(`
    export default () => (
      <board width="16mm" height="8mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)) as AnyCircuitElement[]
  const actual = rendered.filter((element) => element.type === "pcb_hole")

  expect(actual).toHaveLength(holes.length)
  expect(
    rendered.filter((element) => element.type === "pcb_plated_hole"),
  ).toHaveLength(0)
  for (const [index, source] of holes.entries()) {
    const result = actual[index]!
    expect(result.x).toBeCloseTo(source.x, 7)
    expect(result.y).toBeCloseTo(source.y, 7)
    // The runtime represents a zero-degree rotated pill as an ordinary pill.
    const shape =
      source.hole_shape === "rotated_pill" && source.ccw_rotation === 0
        ? "pill"
        : source.hole_shape
    expect(result.hole_shape).toBe(shape)
    if (source.hole_shape === "circle") {
      if (result.hole_shape !== "circle") throw new Error("Expected circle")
      expect(result.hole_diameter).toBeCloseTo(source.hole_diameter, 7)
    } else {
      if (!("hole_width" in result))
        throw new Error("Expected dimensioned hole")
      expect(result.hole_width).toBeCloseTo(source.hole_width, 7)
      expect(result.hole_height).toBeCloseTo(source.hole_height, 7)
      if (source.hole_shape === "rotated_pill") {
        const rotation = "ccw_rotation" in result ? result.ccw_rotation : 0
        expect(rotation).toBe(source.ccw_rotation)
      }
    }
  }

  expect(convertCircuitJsonToPcbSvg(rendered)).toMatchSvgSnapshot(
    import.meta.path,
    "npth-holes-roundtrip",
  )
})
