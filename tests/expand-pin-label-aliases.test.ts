import { expect, test } from "bun:test"
import { expandPinLabelAliases } from "lib/utils/expand-pin-label-aliases"

test("expands alternate pin functions into independent aliases", () => {
  expect(expandPinLabelAliases("#RST/NMI/SBWTDIO")).toEqual([
    "N_RST",
    "NMI",
    "SBWTDIO",
  ])
  expect(expandPinLabelAliases("(PCINT19/OC2B/INT1)PD3")).toEqual([
    "PD3",
    "PCINT19",
    "OC2B",
    "INT1",
  ])
  expect(expandPinLabelAliases("PC0(ADC0)")).toEqual(["PC0", "ADC0"])
  expect(expandPinLabelAliases("PC0(ADC0/PCINT8)")).toEqual([
    "PC0",
    "ADC0",
    "PCINT8",
  ])
})

test("preserves valid punctuation and normalizes polarity markers", () => {
  expect(expandPinLabelAliases("P1.3/_RESET")).toEqual(["P1_3", "_RESET"])
  expect(expandPinLabelAliases("SINEIN-")).toEqual(["SINEIN_NEG"])
  expect(expandPinLabelAliases("SINEIN–")).toEqual(["SINEIN_NEG"])
  expect(expandPinLabelAliases("SINEIN−")).toEqual(["SINEIN_NEG"])
  expect(expandPinLabelAliases("+5V")).toEqual(["V5"])
  expect(expandPinLabelAliases("+VIN")).toEqual(["VIN_POS"])
  expect(expandPinLabelAliases("-VO")).toEqual(["VO_NEG"])
})

test("keeps electrical polarity aliases but ignores combined decoration", () => {
  expect(expandPinLabelAliases("+")).toEqual(["_POS"])
  expect(expandPinLabelAliases("-")).toEqual(["_NEG"])
  expect(expandPinLabelAliases("+/-")).toEqual([])
  expect(expandPinLabelAliases("+/–")).toEqual([])
})

test("keeps Unicode display labels out of selector aliases", () => {
  expect(expandPinLabelAliases("µCTRL")).toEqual(["_CTRL"])
  expect(expandPinLabelAliases("ΩSENSE")).toEqual(["_SENSE"])
  expect(expandPinLabelAliases("電源")).toEqual([])
})
