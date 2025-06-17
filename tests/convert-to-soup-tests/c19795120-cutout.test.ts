import c19795120 from "tests/assets/C19795120.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C19795120 should generate a pcb_cutout", () => {
  const better = EasyEdaJsonSchema.parse(c19795120)
  const circuitJson = convertEasyEdaJsonToCircuitJson(better)
  const cutouts = circuitJson.filter((e) => e.type === "pcb_cutout")
  expect(cutouts.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
