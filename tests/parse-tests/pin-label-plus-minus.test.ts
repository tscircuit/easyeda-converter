import { it, expect } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

const plusPinStr =
  "P~show~0~1~355~285~180~gge5~0^^355~285^^M355,285h10~#000000^^1~368.7~289~0~C1+~start~~~#000000^^1~364.5~284~0~1~end~~~#000000^^0~362~285^^0~M 365 288 L 368 285 L 365 282"
const minusPinStr =
  "P~show~0~2~355~295~180~gge6~0^^355~295^^M355,295h10~#880000^^1~368.7~299~0~C2-~start~~~#0000FF^^1~364.5~294~0~2~end~~~#0000FF^^0~362~295^^0~M 365 298 L 368 295 L 365 292"

it("converts trailing plus and minus in pin labels", () => {
  const plusPin = PinShapeSchema.parse(plusPinStr)
  const minusPin = PinShapeSchema.parse(minusPinStr)
  expect(plusPin.label).toBe("C1_POS")
  expect(minusPin.label).toBe("C2_NEG")
})
