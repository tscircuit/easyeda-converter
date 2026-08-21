import { expect, it } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

// Representative of pin 1 in the EasyEDA/JLCPCB symbol for RV1106G2
// (C5272606), whose label lists multiple slash-separated functions.
const multiplexedPinStr =
  "P~show~0~1~100~100~180~gge1~0^^100~100^^M 100 100 h 10~#880000^^1~113.7~104~0~MIPI_AVDD1V8/GPIO7_VCC1V8~start~~~#0000FF^^1~109.5~99~0~1~end~~~#0000FF^^0~107~100^^0~M 110 103 L 113 100 L 110 97"

it("preserves slash-separated multiplexed pin labels", () => {
  const pin = PinShapeSchema.parse(multiplexedPinStr)

  expect(pin.label).toBe("MIPI_AVDD1V8/GPIO7_VCC1V8")
  expect(pin.pinNumber).toBe(1)
})
