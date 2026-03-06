import { expect, test } from "bun:test"
import c14877 from "tests/assets/C14877.raweasy.json"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C14877 imports courtyard geometry", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(c14877),
  )

  const courtyardOutlines = circuitJson.filter(
    (element) => element.type === "pcb_courtyard_outline",
  )

  expect(courtyardOutlines.length).toBeGreaterThan(0)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
