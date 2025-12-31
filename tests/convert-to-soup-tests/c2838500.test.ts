import c2838500 from "tests/assets/C2838500.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C2838500 should convert to Circuit Json correctly", async () => {
  const easyeda = EasyEdaJsonSchema.parse(c2838500)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyeda)

  expect(circuitJson.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
