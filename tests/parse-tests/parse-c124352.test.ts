import { it, expect } from "bun:test"
import C124352EasyEdaJson from "../assets/C124352.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a C124352", async () => {
  const result = EasyEdaJsonSchema.parse(C124352EasyEdaJson)

  expect(result.uuid).toBe("4eac1e6666f44f22918613b6a481af39")
})
