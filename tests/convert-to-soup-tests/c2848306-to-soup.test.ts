import c2848306 from "tests/assets/C2848306.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"

test("C2848306 should parse successfully with 'none' visibility enum", async () => {
  // This test validates that the fix for handling 'none' visibility value works
  // See: https://github.com/tscircuit/easyeda-converter/pull/338
  const bettereasy = EasyEdaJsonSchema.parse(c2848306)
  expect(bettereasy).toBeDefined()

  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)
  expect(circuitJson).toBeDefined()
  expect(circuitJson.length).toBeGreaterThan(0)
})
