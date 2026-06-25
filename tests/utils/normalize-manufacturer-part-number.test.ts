import { test, expect } from "bun:test"

test("normalizeManufacturerPartNumber exports function", async () => {
  const module = await import("lib/utils/normalize-manufacturer-part-number")
  expect(typeof module.normalizeManufacturerPartNumber).toBe("function")
})
