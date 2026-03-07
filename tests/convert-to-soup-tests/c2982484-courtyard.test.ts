import c2982484Raw from "tests/assets/C2982484.raweasy.json"
import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

test("C2982484 should import courtyard shapes and render them in PCB SVG", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c2982484Raw)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  const courtyardOutlines = circuitJson.filter(
    (el) => el.type === "pcb_courtyard_outline",
  )

  expect(courtyardOutlines.length).toBeGreaterThan(0)

  // circuit-to-svg does not natively render pcb_courtyard_outline yet.
  // For snapshot visibility, mirror courtyard outlines into silkscreen preview paths.
  const previewSilkscreenPaths = courtyardOutlines.map((outline, index) => ({
    type: "pcb_silkscreen_path" as const,
    pcb_silkscreen_path_id: `pcb_silkscreen_courtyard_preview_${index + 1}`,
    pcb_component_id: outline.pcb_component_id,
    layer: outline.layer,
    route: outline.outline,
    stroke_width: outline.stroke_width,
  }))

  expect(
    convertCircuitJsonToPcbSvg([...circuitJson, ...previewSilkscreenPaths]),
  ).toMatchSvgSnapshot(import.meta.path)
})
