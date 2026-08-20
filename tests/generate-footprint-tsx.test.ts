import { expect, it } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"

it("generates standalone oval holes", async () => {
  const footprint = generateFootprintTsx([
    {
      type: "pcb_hole",
      pcb_hole_id: "pcb_hole_1",
      hole_shape: "oval",
      x: 1.25,
      y: -2.5,
      hole_width: 2,
      hole_height: 1,
    } as never,
  ])

  const circuitJson = await runTscircuitCode(`
    export default () => ${footprint}
  `)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})

it("generates courtyard rectangles", async () => {
  const footprint = generateFootprintTsx([
    {
      type: "pcb_courtyard_rect",
      pcb_courtyard_rect_id: "pcb_courtyard_rect_1",
      pcb_component_id: "pcb_component_1",
      center: { x: 1, y: -2 },
      width: 4,
      height: 2,
      layer: "top",
      ccw_rotation: 90,
    } as never,
  ])

  const circuitJson = await runTscircuitCode(`
    export default () => ${footprint}
  `)

  expect(
    circuitJson.filter((element) => element.type === "pcb_courtyard_rect"),
  ).toHaveLength(1)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "courtyard-rect",
  )
})
