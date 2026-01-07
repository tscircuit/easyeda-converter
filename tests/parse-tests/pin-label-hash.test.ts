import { it, expect } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

// Examples from C490691.raweasy.json - pins with # suffix (active-low signals)
const resetHashPin =
  "P~show~0~19~455~325~0~gge23~0^^455~325^^M455,325h-10~#880000^^1~441.3~329~0~RESET#~end~~~#0000FF^^1~445.5~324~0~19~start~~~#0000FF^^0~448~325^^0~M 445 322 L 442 325 L 445 328"
const rtsHashPin =
  "P~show~0~3~345~255~180~gge6~0^^345~255^^M 345 255 h 10~#880000^^1~358.7~259~0~RTS#~start~~~#0000FF^^1~354.5~254~0~3~end~~~#0000FF^^0~352~255^^0~M 355 258 L 358 255 L 355 252"
const dtrHashPin =
  "P~show~0~2~345~245~180~gge8~0^^345~245^^M 345 245 h 10~#880000^^1~358.7~249~0~DTR#~start~~~#0000FF^^1~354.5~244~0~2~end~~~#0000FF^^0~352~245^^0~M 355 248 L 358 245 L 355 242"
const ctsHashPin =
  "P~show~0~11~345~335~180~gge15~0^^345~335^^M345,335h10~#880000^^1~358.7~339~0~CTS#~start~~~#0000FF^^1~354.5~334~0~11~end~~~#0000FF^^0~352~335^^0~M 355 338 L 358 335 L 355 332"

// Example from C22446580.raweasy.json - single character with #
const eHashPin =
  "P~show~0~6~330~280~180~gge325~0^^330~280^^M 330 280 h 10~#880000^^1~343.7~284~0~E#~start~~~#0000FF^^1~339.5~279~0~6~end~~~#0000FF^^0~337~280^^0~M 340 283 L 343 280 L 340 277"

it("parses pin labels with trailing # (active-low signals)", () => {
  const resetPin = PinShapeSchema.parse(resetHashPin)
  expect(resetPin.label).toBe("RESET#")

  const rtsPin = PinShapeSchema.parse(rtsHashPin)
  expect(rtsPin.label).toBe("RTS#")

  const dtrPin = PinShapeSchema.parse(dtrHashPin)
  expect(dtrPin.label).toBe("DTR#")

  const ctsPin = PinShapeSchema.parse(ctsHashPin)
  expect(ctsPin.label).toBe("CTS#")
})

it("parses single character pin labels with #", () => {
  const ePin = PinShapeSchema.parse(eHashPin)
  expect(ePin.label).toBe("E#")
})
