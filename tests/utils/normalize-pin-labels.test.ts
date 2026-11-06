import { test, expect } from "bun:test"

test("normalizePinLabels exports function", async () => {
  const module = await import("lib/utils/normalize-pin-labels")
  expect(typeof module.normalizePinLabels).toBe("function")
})
