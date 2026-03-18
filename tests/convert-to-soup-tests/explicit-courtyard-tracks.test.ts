import c2055640Raw from "tests/assets/C2055640.raweasy.json"
import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

test("C2055640 should import courtyard outlines from explicit TRACK shapes on courtyard layers", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c2055640Raw)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  const courtyardOutlines = circuitJson.filter(
    (el) => el.type === "pcb_courtyard_outline",
  )

  // C2055640 has 4 TRACK shapes on layer 15 (courtyard), so we should get
  // 4 courtyard outlines from those tracks, not a single one from BBox fallback
  expect(courtyardOutlines.length).toBe(4)

  // Two of them are rectangles (5 points each, closed path) and two are
  // crosshairs (2 points each)
  const pointCounts = courtyardOutlines.map((o) => o.outline.length).sort()
  expect(pointCounts).toEqual([2, 2, 5, 5])
})
