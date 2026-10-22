import { expect, test } from "bun:test"
import { generateArcFromSweep } from "lib/math/arc-utils"

test.each([
  { radius: 1, largeArcFlag: false, sweepFlag: false },
  { radius: 1, largeArcFlag: false, sweepFlag: true },
  { radius: 1, largeArcFlag: true, sweepFlag: false },
  { radius: 1, largeArcFlag: true, sweepFlag: true },
  { radius: 2, largeArcFlag: false, sweepFlag: false },
  { radius: 2, largeArcFlag: false, sweepFlag: true },
  { radius: 2, largeArcFlag: true, sweepFlag: false },
  { radius: 2, largeArcFlag: true, sweepFlag: true },
])(
  "preserves SVG arc direction for %j",
  ({ radius, largeArcFlag, sweepFlag }) => {
    const route = generateArcFromSweep(
      -1,
      0,
      1,
      0,
      radius,
      largeArcFlag,
      sweepFlag,
    )
    const ys = route.map((point) => point.y)
    if (sweepFlag) {
      expect(Math.min(...ys)).toBeLessThan(-0.1)
      expect(Math.max(...ys)).toBeCloseTo(0, 12)
    } else {
      expect(Math.max(...ys)).toBeGreaterThan(0.1)
      expect(Math.min(...ys)).toBeCloseTo(0, 12)
    }
    expect(route[0]!.x).toBeCloseTo(-1, 12)
    expect(route[0]!.y).toBeCloseTo(0, 12)
    expect(route.at(-1)!.x).toBeCloseTo(1, 12)
    expect(route.at(-1)!.y).toBeCloseTo(0, 12)
  },
)
