import c17336360 from "tests/assets/C17336360.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C17336360 should convert to Circuit Json correctly", async () => {
  const easyeda = EasyEdaJsonSchema.parse(c17336360)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyeda)

  expect(circuitJson.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
