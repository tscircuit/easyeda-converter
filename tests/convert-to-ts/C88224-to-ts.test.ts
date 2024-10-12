import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C88224.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib"

it("should convert c88224 into typescript file", async () => {
  const easyeda = EasyEdaJsonSchema.parse(chipRawEasy)
  const soup = convertEasyEdaJsonToCircuitJson(easyeda, {
    useModelCdn: true,
  })
  const result = await convertBetterEasyToTsx({
    easyeda,
    soup,
  })

  console.log(result)

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain('"13": "pin13"')
  expect(result).toContain('"14": "pin14"')
})
