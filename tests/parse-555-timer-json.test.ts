import { it } from "bun:test"
import a555TimerEasyEdaJson from "./a555-timer.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a 555 timer", async () => {
  const result = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)

  console.log(result.packageDetail.dataStr.shape)
})
