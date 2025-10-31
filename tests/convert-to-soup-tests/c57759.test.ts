import c57759 from "tests/assets/C57759.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C57759 should generate Circuit Json without errors", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(c57759)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})

// Add a new test to specifically check the parsing of the PT shape
test("C57759 should parse PT shape correctly", () => {
  const bettereasy = EasyEdaJsonSchema.parse(c57759)
  const ptShape = bettereasy.dataStr.shape.find(
    (shape) => shape.type === "PATH",
  )
  expect(ptShape).toBeDefined()
  expect(ptShape?.type).toBe("PATH")
  expect(ptShape?.pathData).toBe("M 5 -6 L -5 0 L 5 6 Z")
})
