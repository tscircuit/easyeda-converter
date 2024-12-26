import c388629 from "tests/assets/C388629.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C388629 should generate Circuit Json without errors", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c388629)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})

// Add a new test to specifically check the parsing of the PT shape
test("C388629 should parse PT shape correctly", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c388629)
  const ptShape = bettereasy.dataStr.shape.find(
    (shape) => shape.type === "ANGLE",
  )
  expect(ptShape).toBeDefined()
  expect(ptShape?.type).toBe("ANGLE")
  expect(ptShape?.angleData).toBe("M 380 304 A 4 4 0 1 1 380 296")
})