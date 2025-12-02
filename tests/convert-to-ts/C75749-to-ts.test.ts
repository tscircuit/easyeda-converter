import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C75749.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { runTscircuitCode } from "tscircuit"

it("should convert C75749 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  // const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const circuitJson = await runTscircuitCode(result)

  expect(convertCircuitJsonToPcbSvg(circuitJson as any)).toMatchSvgSnapshot(
    import.meta.path,
  )
  expect(circuitJson).toMatch3dSnapshot(import.meta.path)
}, 20000)
