import { expect, test } from "bun:test"
import { categoryValueContainsCrystal } from "lib/websafe/convert-to-typescript-component/category-value-contains-crystal"

test("distinguishes passive crystal categories from active oscillators", () => {
  expect(categoryValueContainsCrystal("Crystals")).toBe(true)
  expect(categoryValueContainsCrystal(["Crystals"])).toBe(true)
  expect(categoryValueContainsCrystal("Crystal Oscillators")).toBe(false)
  expect(categoryValueContainsCrystal("Timers / Clock Oscillators")).toBe(false)
  expect(categoryValueContainsCrystal("Resonators")).toBe(false)
})
