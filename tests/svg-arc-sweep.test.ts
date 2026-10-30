import { expect, test } from "bun:test"
import { generateArcFromSweep } from "lib/math/arc-utils"

test.each([
  {
    largeArcFlag: false,
    sweepFlag: false,
    centerY: -Math.sqrt(3),
    expectedSpanRadians: -Math.PI / 3,
  },
  {
    largeArcFlag: false,
    sweepFlag: true,
    centerY: Math.sqrt(3),
    expectedSpanRadians: Math.PI / 3,
  },
  {
    largeArcFlag: true,
    sweepFlag: false,
    centerY: Math.sqrt(3),
    expectedSpanRadians: (-5 * Math.PI) / 3,
  },
  {
    largeArcFlag: true,
    sweepFlag: true,
    centerY: -Math.sqrt(3),
    expectedSpanRadians: (5 * Math.PI) / 3,
  },
])(
  "selects the expected non-semicircular angular span for %j",
  ({ largeArcFlag, sweepFlag, centerY, expectedSpanRadians }) => {
    // A chord of length 2 in a radius-2 circle subtends 60 degrees;
    // its major arc must travel 300 degrees. The possible centers are
    // (0, sqrt(3)) and (0, -sqrt(3)). Accumulate signed angles between
    // consecutive radial vectors so endpoint wrapping cannot hide a minor arc.
    const route = generateArcFromSweep({
      start: { x: -1, y: 0 },
      end: { x: 1, y: 0 },
      radius: 2,
      largeArcFlag,
      sweepFlag,
    })
    const signedSpanRadians = route
      .slice(1)
      .reduce((spanRadians, point, index) => {
        const previous = route[index]!
        const previousY = previous.y - centerY
        const currentY = point.y - centerY
        return (
          spanRadians +
          Math.atan2(
            previous.x * currentY - previousY * point.x,
            previous.x * point.x + previousY * currentY,
          )
        )
      }, 0)

    expect(signedSpanRadians).toBeCloseTo(expectedSpanRadians, 12)
    if (largeArcFlag) {
      expect(Math.abs(signedSpanRadians)).toBeGreaterThan(Math.PI)
    } else {
      expect(Math.abs(signedSpanRadians)).toBeLessThan(Math.PI)
    }
  },
)

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
    const route = generateArcFromSweep({
      start: { x: -1, y: 0 },
      end: { x: 1, y: 0 },
      radius,
      largeArcFlag,
      sweepFlag,
    })
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
