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

it("preserves fabrication and user notes in generated footprints", async () => {
  const footprint = generateFootprintTsx([
    {
      type: "pcb_fabrication_note_text",
      text: "+",
      anchor_position: { x: -1, y: 2 },
      anchor_alignment: "center",
      font: "tscircuit2024",
      font_size: 0.8,
      ccw_rotation: 90,
      layer: "bottom",
      color: "red",
    } as never,
    {
      type: "pcb_fabrication_note_path",
      route: [
        { x: -2, y: -2 },
        { x: 2, y: -2 },
      ],
      stroke_width: 0.2,
      layer: "bottom",
      color: "blue",
    } as never,
    {
      type: "pcb_fabrication_note_rect",
      center: { x: 0, y: 0 },
      width: 4,
      height: 3,
      stroke_width: 0.15,
      corner_radius: 0.2,
      is_filled: false,
      has_stroke: true,
      is_stroke_dashed: true,
      layer: "bottom",
      color: "green",
    } as never,
    {
      type: "pcb_fabrication_note_dimension",
      from: { x: -2, y: 2 },
      to: { x: 2, y: 2 },
      text: "POLARITY",
      font: "tscircuit2024",
      font_size: 0.5,
      arrow_size: 0.4,
      offset_distance: 0.75,
      layer: "bottom",
      color: "purple",
    } as never,
    {
      type: "pcb_note_text",
      text: "assembly note",
      anchor_position: { x: 0, y: 3 },
      anchor_alignment: "top_left",
      font: "tscircuit2024",
      font_size: 0.6,
      layer: "bottom",
      color: "orange",
    } as never,
    {
      type: "pcb_note_rect",
      center: { x: 0, y: 0 },
      width: 5,
      height: 4,
      stroke_width: 0.1,
      corner_radius: 0.3,
      is_filled: false,
      has_stroke: true,
      is_stroke_dashed: false,
      layer: "bottom",
      color: "gray",
    } as never,
    {
      type: "pcb_note_path",
      route: [
        { x: -1, y: 1 },
        { x: 1, y: 1 },
      ],
      stroke_width: 0.12,
      layer: "bottom",
      color: "black",
    } as never,
    {
      type: "pcb_note_line",
      x1: -1,
      y1: -1,
      x2: 1,
      y2: -1,
      stroke_width: 0.11,
      is_dashed: true,
      layer: "bottom",
      color: "brown",
    } as never,
    {
      type: "pcb_note_dimension",
      from: { x: -2, y: -3 },
      to: { x: 2, y: -3 },
      text: "4mm",
      font: "tscircuit2024",
      font_size: 0.5,
      arrow_size: 0.4,
      offset_distance: 0.5,
      layer: "bottom",
      color: "teal",
    } as never,
  ])

  expect(footprint).toContain('<fabricationnotetext text="+"')
  expect(footprint).toContain('pcbRotation="90deg"')
  expect(footprint).toContain('<pcbnotetext text="assembly note"')
  expect(footprint.match(/ layer="bottom"/g)).toHaveLength(9)
  expect(footprint).toContain('offset="0.75mm"')
  expect(footprint).toContain('cornerRadius="0.3mm"')

  const circuitJson = await runTscircuitCode(`
    export default () => ${footprint}
  `)

  expect(
    circuitJson.filter((element) =>
      [
        "pcb_fabrication_note_text",
        "pcb_fabrication_note_path",
        "pcb_fabrication_note_rect",
        "pcb_fabrication_note_dimension",
        "pcb_note_text",
        "pcb_note_rect",
        "pcb_note_path",
        "pcb_note_line",
        "pcb_note_dimension",
      ].includes(element.type),
    ),
  ).toHaveLength(9)

  expect(
    circuitJson.find((element) => element.type === "pcb_fabrication_note_text"),
  ).toMatchObject({ text: "+" })
})
