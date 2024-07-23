import { it, expect } from "bun:test"
import timerRawEasy from "../assets/C128415.raweasy.json"
import { convertToTypescriptComponent } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib"

it("should convert 555timer into typescript file", async () => {
  const easyeda = EasyEdaJsonSchema.parse(timerRawEasy)
  const soup = convertEasyEdaJsonToTscircuitSoupJson(easyeda, {
    useModelCdn: true,
  })
  const result = await convertToTypescriptComponent({
    easyeda,
    soup,
  })
  console.log(result)
})
