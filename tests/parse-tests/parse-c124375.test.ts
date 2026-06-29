import { it, expect } from "bun:test"
import C124375EasyEdaJson from "../assets/C124375.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a c124375", async () => {
  const result = EasyEdaJsonSchema.parse(C124375EasyEdaJson)

  expect(result.uuid).toBe("03f7ffd9f0d84a7bbdd820eab3e7c747")
})
