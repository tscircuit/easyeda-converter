import { expect, it } from "bun:test"
import { inferPinAttributes } from "lib/websafe/convert-to-typescript-component/infer-pin-attributes"

it("infers ground and no-connect attributes without guessing power direction", () => {
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
    pin3: { doNotConnect: true },
    pin7: { requiresGround: true },
  })
})

it("requires power only for supply names explicitly marked as inputs", () => {
  for (const label of ["VCC", "VDD2", "VIN", "VDDA", " vcc1 "]) {
    expect(inferPinAttributes({ pin1: [label] }, { pin1: "input" })).toEqual({
      pin1: { requiresPower: true },
    })
    for (const electricalType of [
      "unspecified",
      "output",
      "bidirectional",
      "power",
    ] as const) {
      expect(
        inferPinAttributes({ pin1: [label] }, { pin1: electricalType }),
      ).toEqual({})
    }
  }
})

it("does not turn signal inputs or conflicting aliases into power inputs", () => {
  expect(
    inferPinAttributes(
      { pin1: ["EN"], pin2: ["VCC", "IO"], pin3: ["VCC", "GND"] },
      { pin1: "input", pin2: "input", pin3: "input" },
    ),
  ).toEqual({})
})
