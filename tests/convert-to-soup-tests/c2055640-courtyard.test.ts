import c2055640Raw from "tests/assets/C2055640.raweasy.json"
import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJsonWithCadPlacement } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

test("C2055640 should import courtyard outlines with non-zero height and render them", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(c2055640Raw)
  const circuitJson =
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(bettereasy)

  const courtyardOutlines = circuitJson.filter(
    (el) => el.type === "pcb_courtyard_outline",
  )

  expect(courtyardOutlines.length).toBeGreaterThan(0)

  const allCourtyardPoints = courtyardOutlines.flatMap((o) => o.outline)
  const uniqueYValues = new Set(allCourtyardPoints.map((p) => p.y.toFixed(6)))

  // Guard against the prior issue where courtyard collapsed to near-zero height.
  expect(uniqueYValues.size).toBeGreaterThan(1)

  const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson, {
    showCourtyards: true,
  })

  expect(pcbSvg).toContain("pcb-courtyard-outline")
  expect(pcbSvg).toContain('data-type="pcb_courtyard_outline"')
  expect(pcbSvg).toMatchSvgSnapshot(import.meta.path)
})
