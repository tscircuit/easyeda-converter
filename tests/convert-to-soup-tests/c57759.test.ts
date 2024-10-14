import c57759 from "tests/assets/C57759.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C57759 should generate Circuit Json without errors", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c57759)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
