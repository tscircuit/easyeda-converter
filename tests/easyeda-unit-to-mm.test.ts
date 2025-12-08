import { expect, test } from "bun:test"
import { easyedaUnitToMm } from "../lib/utils/easyeda-unit-to-mm"

test("easyedaUnitToMm", () => {
  expect(easyedaUnitToMm(10)).toBe(10)
  expect(easyedaUnitToMm("10")).toBe(10)
  expect(easyedaUnitToMm("10mm")).toBe(10)
  expect(easyedaUnitToMm("10mil")).toBeCloseTo(0.254)
  expect(easyedaUnitToMm("100mil")).toBeCloseTo(2.54)
  expect(easyedaUnitToMm("garbage")).toBe(0)
})
