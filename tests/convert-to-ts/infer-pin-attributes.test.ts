import { expect, it } from "bun:test"
import { inferPinAttributes } from "lib/websafe/convert-to-typescript-component/infer-pin-attributes"

it("infers only unambiguous IC power, ground, and no-connect attributes", () => {
  expect(
    inferPinAttributes({
      pin1: ["GND"],
      pin2: ["VCC"],
      pin3: ["NC"],
      pin4: ["VOUT"],
      pin5: ["FAULT_N"],
      pin6: ["VCC", "GND"],
      pin7: ["GND1"],
      pin8: ["VDD2"],
      pin9: ["NC", "GPIO"],
      pin10: ["VCC", "IO"],
      pin11: ["VBUS"],
      pin12: ["VBUS2"],
      pin13: ["VBUS", "IO"],
      pin14: ["VDDA"],
      pin15: ["VDDA33"],
    }),
  ).toEqual({
    pin1: { requiresGround: true },
    pin2: { requiresPower: true },
    pin3: { doNotConnect: true },
    pin7: { requiresGround: true },
    // VDD2 names a supply rail, and the label alone does not say whether the
    // pin sources or sinks it, so no power attribute is inferred.
    pin11: { requiresPower: true },
    pin12: { requiresPower: true },
    // Analog rails are supply inputs and keep inferring.
    pin14: { requiresPower: true },
    pin15: { requiresPower: true },
  })
})
