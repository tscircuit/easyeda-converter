import { expect, test } from "bun:test"
import type { PcbTrace } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "./assets/C5815189.raweasy.json"

const circuitJson = convertEasyEdaJsonToCircuitJson(
  EasyEdaJsonSchema.parse(rawEasy),
)

test("renders C5815189's imported NPTH locators with copper crossing the slot", () => {
  const crossingTrace: PcbTrace = {
    type: "pcb_trace",
    pcb_trace_id: "locator_crossing",
    route: [
      { route_type: "wire", x: 4.1, y: -1.2, width: 0.56, layer: "top" },
      { route_type: "wire", x: 4.1, y: 1.2, width: 0.56, layer: "top" },
    ],
  }

  expect(
    convertCircuitJsonToPcbSvg([
      {
        type: "pcb_board",
        pcb_board_id: "board",
        center: { x: 0, y: 0 },
        width: 12,
        height: 4,
        num_layers: 2,
        thickness: 1.6,
        material: "fr4",
      },
      crossingTrace,
      ...circuitJson.filter(
        (element) =>
          element.type === "pcb_hole" || element.type === "pcb_cutout",
      ),
    ]),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-npth-locator-trace")
})

test.failing(
  "imports C5815189's NPTH capsule as a pill hole through TSX",
  async () => {
    const holes = circuitJson.filter((element) => element.type === "pcb_hole")
    expect(holes).toHaveLength(2)
    expect(circuitJson.some((element) => element.type === "pcb_cutout")).toBe(
      false,
    )

    const pillHole = holes.find((hole) => hole.hole_shape === "pill")
    if (!pillHole || pillHole.hole_shape !== "pill") {
      throw new Error("Expected the EasyEDA NPTH capsule to remain a hole")
    }
    expect(pillHole.hole_width).toBeCloseTo(1.5099792, 7)
    expect(pillHole.hole_height).toBeCloseTo(0.7099808, 7)

    const footprint = generateFootprintTsx(circuitJson)
    expect(footprint).toContain('shape="pill"')
    expect(footprint).not.toContain("<cutout")

    const rendered = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="10mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)
    const renderedPillHole = rendered.find(
      (element) => element.type === "pcb_hole" && element.hole_shape === "pill",
    )
    expect(renderedPillHole).toMatchObject({
      type: "pcb_hole",
      hole_shape: "pill",
      x: pillHole.x,
      y: pillHole.y,
      hole_width: pillHole.hole_width,
      hole_height: pillHole.hole_height,
    })
  },
)
