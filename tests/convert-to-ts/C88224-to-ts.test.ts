import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C88224.raweasy.json"
import { convertToTypescriptComponent } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib"

it("should convert c88224 into typescript file", async () => {
  const easyeda = EasyEdaJsonSchema.parse(chipRawEasy)
  const soup = convertEasyEdaJsonToTscircuitSoupJson(easyeda, {
    useModelCdn: true,
  })
  const result = convertToTypescriptComponent({
    easyeda,
    soup,
  })
  console.log(result)
})
