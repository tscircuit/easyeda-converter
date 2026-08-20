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
