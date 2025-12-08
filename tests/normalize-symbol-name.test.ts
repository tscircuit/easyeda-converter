import { describe, expect, test } from "bun:test"
import { normalizeSymbolName } from "lib/utils/normalize-symbol-name"

describe("normalizeSymbolName", () => {
  test("converts + to _POS", () => {
    expect(normalizeSymbolName("+")).toBe("_POS")
  })

  test("converts - to _NEG", () => {
    expect(normalizeSymbolName("-")).toBe("_NEG")
  })

  test("handles whitespace around + and -", () => {
    expect(normalizeSymbolName(" + ")).toBe("_POS")
    expect(normalizeSymbolName(" - ")).toBe("_NEG")
  })

  test("preserves other names", () => {
    expect(normalizeSymbolName("VCC")).toBe("VCC")
    expect(normalizeSymbolName("GND")).toBe("GND")
    expect(normalizeSymbolName("DATA")).toBe("DATA")
  })

  test("handles names containing + or - but not exactly equal", () => {
    expect(normalizeSymbolName("V+")).toBe("V+")
    expect(normalizeSymbolName("V-")).toBe("V-")
    expect(normalizeSymbolName("+5V")).toBe("+5V")
    expect(normalizeSymbolName("-5V")).toBe("-5V")
  })

  test("handles empty strings", () => {
    expect(normalizeSymbolName("")).toBe("")
    expect(normalizeSymbolName("   ")).toBe("")
  })
})
