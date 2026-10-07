import { describe, expect, test } from "bun:test"
import { generateArcFromSweep } from "../lib/math/arc-utils"
import { expandEasyEdaPathData } from "../lib/utils/expand-easyeda-path-data"

// C609652's layer-3 pin-1 dot is a circle drawn as two exact semicircular
// arcs. Its chord (4.606) is exactly 2r, so the arc guard used to reject it
// and collapse each arc to a flat chord. Values are the literal 10 mil units
// from that fixture; named constants keep them out of the expressions below.
// biome-ignore lint/suspicious/noApproximativeNumericConstant: 2.303 is the literal EasyEDA arc radius from C609652, not an approximation of ln(10)
const ARC_RADIUS = 2.303
const ARC_CHORD = 4.606

const SEMICIRCLE_PATH = `M 3982.4568 3012.0237 A ${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 3987.0628 3012.0237 A ${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 3982.4568 3012.0237 Z`

const arc = (largeArcFlag: boolean, sweepFlag: boolean) =>
  generateArcFromSweep(
    3982.4568,
    3012.0237,
    3987.0628,
    3012.0237,
    ARC_RADIUS,
    largeArcFlag,
    sweepFlag,
  )

describe("generateArcFromSweep semicircle tolerance", () => {
  test("arcs an exact semicircle instead of returning a flat chord", () => {
    const route = arc(true, true)

    expect(route.length).toBeGreaterThan(2)

    const xs = route.map(({ x }) => x)
    const ys = route.map(({ y }) => y)
    // Chord spans 2r in x; a true semicircle bulges one radius in y.
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(ARC_CHORD, 6)
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(ARC_RADIUS, 6)
  })

  test("produces no NaN coordinates for a semicircle", () => {
    const route = arc(true, true)

    for (const { x, y } of route) {
      expect(Number.isFinite(x)).toBe(true)
      expect(Number.isFinite(y)).toBe(true)
    }
  })

  test("still returns a flat chord when the radius is genuinely too small", () => {
    const route = generateArcFromSweep(0, 0, 10, 0, 2, false, false)

    expect(route).toHaveLength(2)
    expect(route[0]).toEqual({ x: 0, y: 0 })
    expect(route[1]).toEqual({ x: 10, y: 0 })
  })

  test("still returns a flat chord for a zero-length path", () => {
    const route = generateArcFromSweep(5, 5, 5, 5, 10, false, false)

    expect(route).toHaveLength(2)
    expect(route[0]).toEqual({ x: 5, y: 5 })
    expect(route[1]).toEqual({ x: 5, y: 5 })
  })
})

describe("expandEasyEdaPathData on a semicircle circle", () => {
  test("expands the two semicircles into a closed route", () => {
    const route = expandEasyEdaPathData(SEMICIRCLE_PATH)

    expect(route.length).toBeGreaterThan(4)

    const xs = route.map(({ x }) => x)
    const ys = route.map(({ y }) => y)
    // The two arcs bulge in opposite directions, so together they trace a full
    // circle: both extents are the 4.606 diameter (2r).
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(ARC_CHORD, 6)
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(ARC_CHORD, 6)
  })

  test("closes back onto the start point", () => {
    const route = expandEasyEdaPathData(SEMICIRCLE_PATH)
    const first = route[0]!
    const last = route.at(-1)!

    expect(last.x).toBeCloseTo(first.x, 6)
    expect(last.y).toBeCloseTo(first.y, 6)
  })

  test("the expanded circle is 1.17mm wide with a 0.5846mm radius", () => {
    const route = expandEasyEdaPathData(SEMICIRCLE_PATH)
    const xs = route.map(({ x }) => x)
    const ys = route.map(({ y }) => y)

    const MIL10_TO_MM = 10 * 0.0254
    const widthMm = (Math.max(...xs) - Math.min(...xs)) * MIL10_TO_MM
    const heightMm = (Math.max(...ys) - Math.min(...ys)) * MIL10_TO_MM

    expect(widthMm).toBeCloseTo(1.17, 3)
    expect(heightMm / 2).toBeCloseTo(0.5846, 3)
  })
})
