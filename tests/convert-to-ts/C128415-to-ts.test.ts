import { it, expect } from "bun:test"
import timerRawEasy from "../assets/C128415.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib"

it("should convert 555timer into typescript file", async () => {
  const easyeda = EasyEdaJsonSchema.parse(timerRawEasy)
  const soup = convertEasyEdaJsonToCircuitJson(easyeda, {
    useModelCdn: true,
  })
  const result = await convertBetterEasyToTsx({
    easyeda,
    soup,
  })
  console.log(result)
})
