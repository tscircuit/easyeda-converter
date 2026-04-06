import c2879853 from "tests/assets/C2879853.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"

test("C2879853 should parse successfully with POLYGON pad shapes", async () => {
  // This test validates that POLYGON pad shapes are handled correctly
  // Previously failed with: Invalid enum value. Expected 'RECT' | 'ELLIPSE' | 'OVAL', received 'POLYGON'
  // See: https://github.com/tscircuit/easyeda-converter/issues/240
  const bettereasy = EasyEdaJsonSchema.parse(c2879853)
  expect(bettereasy).toBeDefined()

  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)
  expect(circuitJson).toBeDefined()
  expect(circuitJson.length).toBeGreaterThan(0)

  // Confirm polygon pads are present in the output
  const polygonPads = circuitJson.filter(
    (el: any) => el.type === "pcb_smtpad" && el.shape === "polygon",
  )
  expect(polygonPads.length).toBeGreaterThan(0)
})
