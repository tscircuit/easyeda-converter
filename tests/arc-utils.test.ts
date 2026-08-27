import { describe, expect, test } from "bun:test"
import { generateArcFromSweep } from "../lib/math/arc-utils"

describe("generateArcFromSweep", () => {
  test("uses the near circle center for a small arc", () => {
    const route = generateArcFromSweep(-1, 0, 1, 0, 2, false, false)

    expect(Math.max(...route.map(({ y }) => y))).toBeLessThan(0.25)
    expect(Math.min(...route.map(({ x }) => x))).toBeGreaterThan(-1.01)
    expect(Math.max(...route.map(({ x }) => x))).toBeLessThan(1.01)
  })

  test("uses the opposite circle center for a large arc", () => {
    const route = generateArcFromSweep(-1, 0, 1, 0, 2, true, false)
    const reversedSweepRoute = generateArcFromSweep(
      -1,
      0,
      1,
      0,
      2,
      true,
      true,
    )

    expect(Math.max(...route.map(({ y }) => y))).toBeGreaterThan(3.5)
    expect(Math.min(...route.map(({ x }) => x))).toBeLessThan(-1.9)
    expect(Math.max(...route.map(({ x }) => x))).toBeGreaterThan(1.9)
    expect(Math.min(...reversedSweepRoute.map(({ y }) => y))).toBeLessThan(-3.5)
  })
})
