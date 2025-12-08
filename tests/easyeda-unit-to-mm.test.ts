import { expect, test } from "bun:test"
import { mil10ToMm } from "../lib/utils/easyeda-unit-to-mm"

test("mil10ToMm", () => {
  expect(mil10ToMm(10)).toBe(10)
  expect(mil10ToMm("10")).toBe(10)
  expect(mil10ToMm("10mm")).toBe(10)
  expect(mil10ToMm("10mil")).toBeCloseTo(0.254)
  expect(mil10ToMm("100mil")).toBeCloseTo(2.54)
  expect(mil10ToMm("garbage")).toBe(0)
})
