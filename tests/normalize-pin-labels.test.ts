import { describe, expect, test } from "bun:test"
import { normalizePinLabels } from "lib"

describe("normalizePinLabels", () => {
  test("handles the documentation example correctly", () => {
    const input = [["1", "GND"], ["2", "GND"], ["3", "VCC"], ["3"], ["4"]]

    expect(normalizePinLabels(input)).toEqual([
      ["pin1", "GND1"],
      ["pin2", "GND2"],
      ["pin3", "VCC"],
      ["pin5", "pin3_alt1"],
      ["pin4"],
    ])
  })

  test("handles empty input array", () => {
    expect(normalizePinLabels([])).toEqual([])
  })

  test("handles pins with no labels", () => {
    const input = [[], [], []]
    expect(normalizePinLabels(input)).toEqual([["pin1"], ["pin2"], ["pin3"]])
  })

  test("preserves unique non-numeric labels", () => {
    const input = [["VCC"], ["GND"], ["INPUT"]]
    expect(normalizePinLabels(input)).toEqual([
      ["pin1", "VCC"],
      ["pin2", "GND"],
      ["pin3", "INPUT"],
    ])
  })

  test("normalizes leading hash active-low labels", () => {
    const input = [
      ["4", "#CE"],
      ["7", "#PGOOD"],
      ["9", "#CHG"],
    ]

    expect(normalizePinLabels(input)).toEqual([
      ["pin4", "N_CE"],
      ["pin7", "N_PGOOD"],
      ["pin9", "N_CHG"],
    ])
  })

  test("normalizes trailing hash active-low labels without double-prefixing", () => {
    const input = [
      ["1", "RESET#"],
      ["2", "N_ENABLE#"],
      ["3", "#"],
    ]

    expect(normalizePinLabels(input)).toEqual([
      ["pin1", "N_RESET"],
      ["pin2", "N_ENABLE"],
      ["pin3", "#"],
    ])
  })

  test("deduplicates normalized active-low labels", () => {
    const input = [
      ["1", "#RESET"],
      ["2", "#RESET"],
    ]

    expect(normalizePinLabels(input)).toEqual([
      ["pin1", "N_RESET1"],
      ["pin2", "N_RESET2"],
    ])
  })

  test("handles multiple labels per pin", () => {
    const input = [
      ["1", "VCC", "PWR"],
      ["2", "GND", "VSS"],
    ]
    expect(normalizePinLabels(input)).toEqual([
      ["pin1", "VCC", "PWR"],
      ["pin2", "GND", "VSS"],
    ])
  })

  test("handles duplicate numeric labels", () => {
    const input = [["1"], ["2"], ["2"], ["3"]]
    expect(normalizePinLabels(input)).toEqual([
      ["pin1"],
      ["pin2"],
      ["pin4", "pin2_alt1"],
      ["pin3"],
    ])
  })
})
