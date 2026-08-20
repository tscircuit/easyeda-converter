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
    }),
  ).toEqual({
    pin1: { requiresGround: true },
    pin2: { requiresPower: true },
    pin3: { doNotConnect: true },
    pin7: { requiresGround: true },
    pin8: { requiresPower: true },
  })
})
