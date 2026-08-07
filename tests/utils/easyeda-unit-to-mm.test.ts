import { test, expect } from "bun:test"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"

test("mil10ToMm converts 1 correctly", () => {
  expect(mil10ToMm(1)).toBeCloseTo(0.254, 3)
})

test("mil10ToMm converts 10 correctly", () => {
  expect(mil10ToMm(10)).toBeCloseTo(2.54, 3)
})

test("mil10ToMm returns 0 for 0", () => {
  expect(mil10ToMm(0)).toBe(0)
})
