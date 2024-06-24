import { it, expect } from "bun:test"
import a555TimerEasyEdaJson from "../assets/a555-timer-dip.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a 555 timer", async () => {
  const result = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)

  expect(result.uuid).toBe("10ef6812c442bf476dd26c0c12f96e15")
})
