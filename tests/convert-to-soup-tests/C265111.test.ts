import rawJson from "tests/assets/C265111.raweasy.json"
import { expect, test } from "bun:test"
import {
  convertEasyEdaJsonToCircuitJsonWithCadPlacement,
  EasyEdaJsonSchema,
} from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C265111 (JST SM08B-GHS-TB) should generate Circuit JSON without errors", async () => {
  const parsed = EasyEdaJsonSchema.parse(rawJson)
  const circuitJson =
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(parsed)

  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
