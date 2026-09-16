import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import vcnl4040Raw from "tests/assets/C142526.raweasy.json"
import fs3000Raw from "tests/assets/C3662643.raweasy.json"

const getCourtyardBounds = (rawEasyEdaJson: unknown) => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawEasyEdaJson),
  )
  const courtyard = circuitJson.find(
    (element) => element.type === "pcb_courtyard_outline",
  )

  expect(courtyard).toBeDefined()
  if (!courtyard || courtyard.type !== "pcb_courtyard_outline") {
    throw new Error("Expected a courtyard outline")
  }

  return {
    minX: Math.min(...courtyard.outline.map((point) => point.x)),
    minY: Math.min(...courtyard.outline.map((point) => point.y)),
    maxX: Math.max(...courtyard.outline.map((point) => point.x)),
    maxY: Math.max(...courtyard.outline.map((point) => point.y)),
  }
}

test("uses the FS3000 physical body for its fallback courtyard", () => {
  const bounds = getCourtyardBounds(fs3000Raw)

  expect(bounds.minX).toBeCloseTo(-4.75, 3)
  expect(bounds.maxX).toBeCloseTo(4.75, 3)
  expect(bounds.minY).toBeCloseTo(-4.25, 3)
  expect(bounds.maxY).toBeCloseTo(4.25, 3)
})

test("excludes the VCNL4040 silkscreen marker from its fallback courtyard", () => {
  const bounds = getCourtyardBounds(vcnl4040Raw)

  expect(bounds.minX).toBeCloseTo(-2.25, 3)
  expect(bounds.maxX).toBeCloseTo(2.25, 3)
  expect(bounds.minY).toBeCloseTo(-1.851, 3)
  expect(bounds.maxY).toBeCloseTo(1.851, 3)
})
