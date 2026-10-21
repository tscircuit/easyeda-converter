import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import { convertEasyEdaJsonToCircuitJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "../lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../lib/websafe/generate-footprint-tsx"
import rawPart from "./assets/C41413180.raweasy.json"

const documentShapes = [
  "CIRCLE~3993~2995~2~0.3~12~doc-circle",
  "RECT~3998~2993~4~3~12~doc-rect~90~0.4~none",
  "RECT~4004~2993~4~3~12~doc-filled-rect~0~0~solid",
  "ARC~0.3~12~~M 4010 2993 A 2 2 0 0 1 4014 2993~doc-arc",
  "TEXT~C~4000~2998~0.4~90~0~12~~tscircuit~+",
]

test("EasyEDA document circles, rectangles, arcs and polarity text stay on fabrication layers through TSX", async () => {
  const raw = structuredClone(rawPart)
  raw.packageDetail.dataStr.shape = raw.packageDetail.dataStr.shape
    .filter((shape) => shape.startsWith("PAD~"))
    .concat(documentShapes)
  // Matching silkscreen controls distinguish layer preservation from dropping
  // or indiscriminately reclassifying the supplier's artwork.
  raw.packageDetail.dataStr.shape.push(
    "CIRCLE~3993~3005~2~0.3~3~silk-circle",
    "RECT~3998~3003~4~3~3~silk-rect~0~0.4~none",
    "ARC~0.3~3~~M 4010 3003 A 2 2 0 0 1 4014 3003~silk-arc",
    "TEXT~C~4000~3008~0.4~0~0~3~~tscircuit~SILK",
    "TEXT~C~4000~3011~0.4~0~0~4~~tscircuit~BOTTOM",
  )
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(raw),
  )
  const fabPaths = circuitJson.filter(
    (e) => e.type === "pcb_fabrication_note_path",
  )
  const fabTexts = circuitJson.filter(
    (e) => e.type === "pcb_fabrication_note_text",
  )
  expect(fabPaths).toHaveLength(4)
  expect(fabTexts).toHaveLength(1)
  expect(fabTexts[0]).toMatchObject({
    text: "+",
    ccw_rotation: 90,
    layer: "top",
  })
  expect(fabPaths.filter((e) => e.is_filled)).toHaveLength(1)
  expect(fabPaths.find((e) => e.is_filled)).toMatchObject({
    has_stroke: false,
    stroke_width: 0,
  })
  const circle = fabPaths.find((e) =>
    e.pcb_fabrication_note_path_id.includes("circle"),
  )!
  expect(circle.route.at(-1)).toEqual(circle.route[0])
  const circleXs = circle.route.map((p) => p.x)
  expect(Math.max(...circleXs) - Math.min(...circleXs)).toBeCloseTo(1.016, 5)
  const rect = fabPaths.find(
    (e) => e.pcb_fabrication_note_path_id.includes("rect") && !e.is_filled,
  )!
  const xs = rect.route.map((p) => p.x)
  const ys = rect.route.map((p) => p.y)
  expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(0.762, 5)
  expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(1.016, 5)
  expect(
    circuitJson
      .filter((e) => e.type === "pcb_silkscreen_text")
      .map((e) => [e.text, e.layer]),
  ).toEqual([
    ["SILK", "top"],
    ["BOTTOM", "bottom"],
  ])
  const footprint = generateFootprintTsx(circuitJson)
  const rendered = await runTscircuitCode(`export default () => ${footprint}`)
  expect(
    rendered.filter((e) => e.type === "pcb_fabrication_note_path"),
  ).toHaveLength(4)
  expect(
    rendered.filter((e) => e.type === "pcb_fabrication_note_text"),
  ).toHaveLength(1)
  await expect(
    convertCircuitJsonToPcbSvg(rendered, { showFabricationNotes: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
