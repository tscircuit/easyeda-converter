import { expect, test } from "bun:test"
import { expandPinLabelAliases } from "lib/utils/expand-pin-label-aliases"

test("expands slash-separated pin labels", () => {
  expect(expandPinLabelAliases("RST/NMI/SBWTDIO")).toEqual([
    "RST",
    "NMI",
    "SBWTDIO",
  ])
})

test("normalizes ASCII and Unicode polarity suffixes", () => {
  expect(expandPinLabelAliases("VREF+/PWMIN-/V–/V−")).toEqual([
    "VREF_POS",
    "PWMIN_NEG",
    "V_NEG",
    "V_NEG",
  ])
})

test("expands parenthesized aliases without leaking punctuation", () => {
  expect(expandPinLabelAliases("(INT1/OC2B)PD3")).toEqual([
    "PD3",
    "INT1",
    "OC2B",
  ])
  expect(expandPinLabelAliases("PC0(ADC0/PCINT8)")).toEqual([
    "PC0",
    "ADC0",
    "PCINT8",
  ])
})

test("does not turn standalone polarity markers into aliases", () => {
  expect(expandPinLabelAliases("+")).toEqual([])
  expect(expandPinLabelAliases("-")).toEqual([])
  expect(expandPinLabelAliases("+/-")).toEqual([])
})
