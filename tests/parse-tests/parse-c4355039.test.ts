import { it, expect } from "bun:test"
import C4355039EasyEdaJson from "../assets/C4355039.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a c4355039", async () => {
  const result = EasyEdaJsonSchema.parse(C4355039EasyEdaJson)
  console.log("🚀 ~ result:", result)

  expect(result.uuid).toBe("6cbdfe3b239e4e5cb99069e0042dab7d")
})
