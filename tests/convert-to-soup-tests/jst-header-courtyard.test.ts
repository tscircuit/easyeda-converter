import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

// Test JST header components to ensure they all have courtyard outlines
// This covers the fix for https://github.com/tscircuit/easyeda-converter/issues/353

const jstAssets = [
  { name: "C131337", desc: "JST B2B-PH-K-S" },
  { name: "C157929", desc: "JST B4B-PH-K-S(LF)(SN)" },
  { name: "C158012", desc: "JST B3B-PH-K-S(LF)(SN)" },
  { name: "C160354", desc: "JST B5B-PH-K-S(LF)(SN)" },
  { name: "C265111", desc: "JST SM08B-GHS-TB" },
]

for (const { name, desc } of jstAssets) {
  test(`${name} (${desc}) should have courtyard outlines`, async () => {
    const rawJson = (await import(`tests/assets/${name}.raweasy.json`)).default
    const parsed = EasyEdaJsonSchema.parse(rawJson)
    const circuitJson = convertEasyEdaJsonToCircuitJson(parsed)

    const courtyardOutlines = circuitJson.filter(
      (el) => el.type === "pcb_courtyard_outline",
    )

    // Every JST header should have at least one courtyard outline
    expect(courtyardOutlines.length).toBeGreaterThan(0)

    // Courtyard outline should have non-degenerate dimensions
    const allPoints = courtyardOutlines.flatMap((o) => o.outline)
    const xs = allPoints.map((p) => p.x)
    const ys = allPoints.map((p) => p.y)
    const width = Math.max(...xs) - Math.min(...xs)
    const height = Math.max(...ys) - Math.min(...ys)

    expect(width).toBeGreaterThan(0.5) // at least 0.5mm wide
    expect(height).toBeGreaterThan(0.5) // at least 0.5mm tall

    // SVG should render the courtyard
    const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson, {
      showCourtyards: true,
    })
    expect(pcbSvg).toContain("pcb_courtyard_outline")
  })
}
