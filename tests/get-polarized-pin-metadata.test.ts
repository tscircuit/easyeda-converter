import { describe, expect, test } from "bun:test"
import { getPolarizedPinMetadata } from "lib/utils/get-polarized-pin-metadata"

describe("getPolarizedPinMetadata", () => {
  test("normalizes anode pin 1", () => {
    expect(getPolarizedPinMetadata({ pin1: ["A"], pin2: ["K"] })).toEqual({
      pinLabels: {
        pin1: ["anode", "pos"],
        pin2: ["cathode", "neg"],
      },
      portHintsMap: {
        pin1: ["pin1", "anode", "pos"],
        pin2: ["pin2", "cathode", "neg"],
      },
    })
  })

  test("normalizes decorated cathode pin 1", () => {
    expect(getPolarizedPinMetadata({ pin1: ["_NEG"], pin2: ["_POS"] })).toEqual(
      {
        pinLabels: {
          pin1: ["cathode", "neg"],
          pin2: ["anode", "pos"],
        },
        portHintsMap: {
          pin1: ["pin1", "cathode", "neg"],
          pin2: ["pin2", "anode", "pos"],
        },
      },
    )
  })
})
