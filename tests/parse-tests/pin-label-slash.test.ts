import { expect, it } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

const multiplexedPin =
  "P~show~0~20~100~100~180~gge1~0^^100~100^^M 100 100 h 10~#880000^^1~113.7~104~0~RST/NMI/SBWTDIO~start~~~#0000FF^^1~109.5~99~0~20~end~~~#0000FF^^0~107~100^^0~M 110 103 L 113 100 L 110 97"

it("preserves a slash-separated EasyEDA pin label", () => {
  const pin = PinShapeSchema.parse(multiplexedPin)
  expect(pin.label).toBe("RST/NMI/SBWTDIO")
  expect(pin.pinNumber).toBe(20)
})
