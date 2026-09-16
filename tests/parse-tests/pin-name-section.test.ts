import { expect, test } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

test.each([
  ["PA0/RESET#/UPDI", "PA0/RESET#/UPDI"],
  ["#RST/NMI/SBWTDIO", "#RST/NMI/SBWTDIO"],
  ["P1.3/TA1.2/A3/C3", "P1.3/TA1.2/A3/C3"],
  ["(PCINT19/OC2B/INT1)PD3", "(PCINT19/OC2B/INT1)PD3"],
  ["", ""],
])("reads pin name %s without consuming the number text", (rawLabel, label) => {
  const pin = PinShapeSchema.parse(
    `P~show~0~16~500~295~0~gge416~0^^500~295^^M500,295h-10~#880000^^1~486.3~299~0~${rawLabel}~end~~~#0000FF^^1~490.5~294~0~16~start~~~#0000FF^^0~493~295^^0~M 490 292 L 487 295 L 490 298`,
  )
  expect(pin.label).toBe(label)
  expect(pin.pinNumber).toBe(16)
})
