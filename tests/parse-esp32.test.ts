import { it, expect } from "bun:test"
import esp32Json from "./esp32.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a 555 timer", async () => {
  const result = EasyEdaJsonSchema.parse(esp32Json)

  expect(result.uuid).toBe("f3fe56761e5d4bb49b034efdb56ea9e7")
})
