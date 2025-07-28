import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C165948.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"

it("should convert C165948 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain('shape="pill"')
})

it("C165948 should generate Circuit Json without errors", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
    useModelCdn: true,
  })

  const tsxResult = await convertBetterEasyToTsx({
    betterEasy,
  })
  const circuitJson2 = await runTscircuitCode(tsxResult)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
  await expect(circuitJson2).toMatch3dSnapshot(import.meta.path)
})
