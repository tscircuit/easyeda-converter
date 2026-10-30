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

test("imports C5815189's NPTH capsule as a pill hole through TSX", async () => {
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
  })
  if (
    !renderedPillHole ||
    renderedPillHole.type !== "pcb_hole" ||
    renderedPillHole.hole_shape !== "pill"
  ) {
    throw new Error("Expected the native footprint to retain the pill hole")
  }
  expect(renderedPillHole.x).toBeCloseTo(pillHole.x, 7)
  expect(renderedPillHole.y).toBeCloseTo(pillHole.y, 7)
  expect(renderedPillHole.hole_width).toBeCloseTo(pillHole.hole_width, 7)
  expect(renderedPillHole.hole_height).toBeCloseTo(pillHole.hole_height, 7)
})

test("native DRC reports copper crossing C5815189's imported NPTH hole", async () => {
  const locators = generateFootprintTsx(
    circuitJson.filter(
      (element) => element.type === "pcb_hole" || element.type === "pcb_cutout",
    ),
  )
  const rendered = await runTscircuitCode(`
    export default () => (
      <board width="12mm" height="4mm">
        <chip name="J1" footprint={${locators}} />
        <chip name="TP1" pcbX={4.1} pcbY={-1.2} footprint={<footprint>
          <smtpad portHints={["pin1"]} pcbX={0} pcbY={0} width={0.6} height={0.6} shape="rect" />
        </footprint>} />
        <chip name="TP2" pcbX={4.1} pcbY={1.2} footprint={<footprint>
          <smtpad portHints={["pin1"]} pcbX={0} pcbY={0} width={0.6} height={0.6} shape="rect" />
        </footprint>} />
        <trace from=".TP1 > .pin1" to=".TP2 > .pin1" thickness="0.56mm"
          pcbPath={[{ x: 0, y: 0 }, { x: 0, y: 2.4 }]} />
      </board>
    )
  `)
  const traceErrors = rendered.filter(
    (element) => element.type === "pcb_trace_error",
  )
  expect(traceErrors).toHaveLength(1)
  expect(traceErrors[0]?.message).toContain("overlaps with pcb_hole")
  expect(
    convertCircuitJsonToPcbSvg(rendered, { showErrorsInTextOverlay: true }),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-npth-hole-drc")
})
