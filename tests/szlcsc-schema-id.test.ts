import { describe, expect, test } from "bun:test"
import { SzlcscSchema, LcscSchema } from "lib/schemas/easy-eda-json-schema"

// EasyEDA returns the szlcsc/lcsc `id` as a number for some parts and a string
// for others (e.g. C356849), which used to crash `tsci import` on those parts.
describe("szlcsc/lcsc id accepts number or string", () => {
  for (const [name, schema] of [
    ["SzlcscSchema", SzlcscSchema],
    ["LcscSchema", LcscSchema],
  ] as const) {
    test(`${name} accepts a numeric id`, () => {
      expect(schema.safeParse({ id: 2384679, number: "C356849" }).success).toBe(
        true,
      )
    })
    test(`${name} accepts a string id`, () => {
      expect(
        schema.safeParse({ id: "2384679", number: "C356849" }).success,
      ).toBe(true)
    })
  }
})
