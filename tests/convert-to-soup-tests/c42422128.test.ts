import c42422128 from "tests/assets/C42422128.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C42422128 should convert to Circuit Json correctly", async () => {
  const easyeda = EasyEdaJsonSchema.parse(c42422128)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyeda)

  expect(circuitJson.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
