import { it, expect } from "bun:test"
import c46497Json from "../assets/C46497.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for C46497 with VIA", () => {
  const result = EasyEdaJsonSchema.parse(c46497Json)
  expect(result.uuid).toBe("4ca737103b5d40fc88c3ce5a5e8b1bcc")
})
