import c19795120 from "tests/assets/C19795120.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C19795120 should generate a mounting hole without a duplicate cutout", async () => {
  const better = EasyEdaJsonSchema.parse(c19795120)
  const circuitJson = convertEasyEdaJsonToCircuitJson(better)

  // C19795120 has no board cutout, only a mounting hole. The prior assertion
  // encoded the duplicate emission as expected behavior.
  const cutouts = circuitJson.filter((e) => e.type === "pcb_cutout")
  expect(cutouts.length).toBe(0)

  const holes = circuitJson.filter((e) => e.type === "pcb_hole")
  expect(holes.length).toBe(1)

  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
