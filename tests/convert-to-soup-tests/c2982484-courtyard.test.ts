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

  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
