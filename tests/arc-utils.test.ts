import { describe, expect, test } from "bun:test"
import { computeCenterOffset } from "../lib/compute-center-offset"
import {
  calculateCenter,
  generateArcFromSweep,
  generateArcPathWithMid,
  getArcLength,
} from "../lib/math/arc-utils"

describe("generateArcFromSweep", () => {
  test("uses the near circle center for a small arc", () => {
    const route = generateArcFromSweep({
      start: { x: -1, y: 0 },
      end: { x: 1, y: 0 },
      radius: 2,
      largeArcFlag: false,
      sweepFlag: false,
    })

    expect(Math.max(...route.map(({ y }) => y))).toBeLessThan(0.25)
    expect(Math.min(...route.map(({ x }) => x))).toBeGreaterThan(-1.01)
    expect(Math.max(...route.map(({ x }) => x))).toBeLessThan(1.01)
  })

  test("uses the opposite circle center for a large arc", () => {
    const route = generateArcFromSweep({
      start: { x: -1, y: 0 },
      end: { x: 1, y: 0 },
      radius: 2,
      largeArcFlag: true,
      sweepFlag: false,
    })
    const reversedSweepRoute = generateArcFromSweep({
      start: { x: -1, y: 0 },
      end: { x: 1, y: 0 },
      radius: 2,
      largeArcFlag: true,
      sweepFlag: true,
    })

    expect(Math.max(...route.map(({ y }) => y))).toBeGreaterThan(3.5)
    expect(Math.min(...route.map(({ x }) => x))).toBeLessThan(-1.9)
    expect(Math.max(...route.map(({ x }) => x))).toBeGreaterThan(1.9)
    expect(Math.min(...reversedSweepRoute.map(({ y }) => y))).toBeLessThan(-3.5)
  })
})

describe("calculateCenter, getArcLength, and generateArcPathWithMid", () => {
  test("computes finite center and arc path when start-to-mid or mid-to-end chord is horizontal", () => {
    const start = { x: 0, y: 0 }
    const mid = { x: 2, y: 0 }
    const end = { x: 2, y: 2 }

    const center = calculateCenter(start, mid, end)
    expect(center.x).toBeCloseTo(1, 9)
    expect(center.y).toBeCloseTo(1, 9)

    const path = generateArcPathWithMid(start, mid, end, 4)
    expect(path).toHaveLength(5)
    expect(path[0]?.x).toBeCloseTo(0, 9)
    expect(path[0]?.y).toBeCloseTo(0, 9)
    expect(path[2]?.x).toBeCloseTo(2, 9)
    expect(path[2]?.y).toBeCloseTo(0, 9)
    expect(path[4]?.x).toBeCloseTo(2, 9)
    expect(path[4]?.y).toBeCloseTo(2, 9)
  })

  test("sweeps through the midpoint for negative-angle arcs instead of taking the opposite major arc", () => {
    const start = { x: 1, y: 0 }
    const mid = { x: Math.SQRT1_2, y: -Math.SQRT1_2 }
    const end = { x: 0, y: -1 }

    expect(getArcLength(start, mid, end)).toBeCloseTo(Math.PI / 2, 9)

    const path = generateArcPathWithMid(start, mid, end, 4)
    expect(path).toHaveLength(5)
    expect(path[2]?.x).toBeCloseTo(mid.x, 9)
    expect(path[2]?.y).toBeCloseTo(mid.y, 9)
  })

  test("computeCenterOffset returns zero offset when footprint has no PAD shapes", () => {
    const offset = computeCenterOffset({
      packageDetail: {
        dataStr: {
          shape: [],
        },
      },
    } as any)
    expect(offset).toEqual({ x: 0, y: 0 })
  })
})
