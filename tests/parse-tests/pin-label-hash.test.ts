import { it, expect } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

const resetHashPinStr =
  "P~show~0~19~455~325~0~gge23~0^^455~325^^M455,325h-10~#880000^^1~441.3~329~0~RESET#~end~~~#0000FF^^1~445.5~324~0~19~start~~~#0000FF^^0~448~325^^0~M 445 322 L 442 325 L 445 328"
const rtsHashPinStr =
  "P~show~0~3~345~255~180~gge6~0^^345~255^^M 345 255 h 10~#880000^^1~358.7~259~0~RTS#~start~~~#0000FF^^1~354.5~254~0~3~end~~~#0000FF^^0~352~255^^0~M 355 258 L 358 255 L 355 252"
const eHashPinStr =
  "P~show~0~6~330~280~180~gge325~0^^330~280^^M 330 280 h 10~#880000^^1~343.7~284~0~E#~start~~~#0000FF^^1~339.5~279~0~6~end~~~#0000FF^^0~337~280^^0~M 340 283 L 343 280 L 340 277"

it("strips trailing # from pin labels (active-low signals)", () => {
  const resetPin = PinShapeSchema.parse(resetHashPinStr)
  const rtsPin = PinShapeSchema.parse(rtsHashPinStr)
  const ePin = PinShapeSchema.parse(eHashPinStr)
  expect(resetPin.label).toBe("RESET")
  expect(rtsPin.label).toBe("RTS")
  expect(ePin.label).toBe("E")
})
