import { expect, test } from "bun:test"
import { expandPinLabelAliases } from "lib/utils/expand-pin-label-aliases"
import { normalizePinLabels } from "lib/utils/normalize-pin-labels"

test("expands EasyEDA pin aliases before normalization", () => {
  expect(expandPinLabelAliases("A/B")).toEqual(["A", "B"])
  expect(expandPinLabelAliases("(INT1/OC2)PD3")).toEqual(["PD3", "INT1", "OC2"])
  expect(expandPinLabelAliases("PC0(ADC0/PCINT8)")).toEqual([
    "PC0",
    "ADC0",
    "PCINT8",
  ])
  expect(expandPinLabelAliases("3V3(OUT)")).toEqual(["3V3"])
})

test("does not create textual aliases for polarized pin labels", () => {
  expect(expandPinLabelAliases("+")).toEqual([])
  expect(expandPinLabelAliases("-")).toEqual([])
  expect(expandPinLabelAliases("+/-")).toEqual([])
})

test("normalizes repeated expanded aliases", () => {
  const pinLabelSets = [
    ["1", ...expandPinLabelAliases("COUT/A")],
    ["2", ...expandPinLabelAliases("COUT/B")],
  ]

  expect(normalizePinLabels(pinLabelSets)).toEqual([
    ["pin1", "COUT1", "A"],
    ["pin2", "COUT2", "B"],
  ])
})
