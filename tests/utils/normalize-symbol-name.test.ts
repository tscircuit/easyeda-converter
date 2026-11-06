import { test, expect } from "bun:test"
import { normalizeSymbolName } from "lib/utils/normalize-symbol-name"

test("normalizeSymbolName converts + to _POS", () => {
  expect(normalizeSymbolName("+")).toBe("_POS")
})

test("normalizeSymbolName converts - to _NEG", () => {
  expect(normalizeSymbolName("-")).toBe("_NEG")
})

test("normalizeSymbolName returns trimmed name", () => {
  expect(normalizeSymbolName(" capacitor ")).toBe("capacitor")
})
