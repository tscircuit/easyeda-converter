import c5184526 from "tests/assets/C5184526.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C5184526 should have two holes", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c5184526)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  expect(circuitJson.filter((e) => e.type === "pcb_hole").length).toBe(2)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
