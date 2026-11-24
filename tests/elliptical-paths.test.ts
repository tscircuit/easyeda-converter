import { describe, expect, test } from "bun:test"
import { expandEasyEdaPathData } from "../lib/utils/expand-easyeda-path-data"

describe("EasyEDA elliptical path arcs", () => {
  test.each([0, 1])("uses both radii with sweep %s", (sweep) => {
    const route = expandEasyEdaPathData(`M 0 0 A 3 1 0 0 ${sweep} 6 0`)

    expect(route.length).toBeGreaterThan(2)
    expect(Math.max(...route.map(({ x }) => x))).toBeCloseTo(6, 6)
    expect(Math.max(...route.map(({ y }) => Math.abs(y)))).toBeCloseTo(1, 6)
    expect(route[0]).toEqual({ x: 0, y: 0 })
    expect(route.at(-1)).toEqual({ x: 6, y: 0 })
  })

  test("rotates the ellipse axes by 90 degrees", () => {
    const route = expandEasyEdaPathData("M 0 0 A 3 1 90 0 1 0 6")

    expect(Math.max(...route.map(({ x }) => Math.abs(x)))).toBeCloseTo(1, 6)
    expect(Math.max(...route.map(({ y }) => y))).toBeCloseTo(6, 6)
    expect(route.at(-1)).toEqual({ x: 0, y: 6 })
  })

  test("places obliquely rotated vertices on the requested ellipse", () => {
    const halfChord = 3 / Math.SQRT2
    const route = expandEasyEdaPathData(
      `M ${10 - halfChord} ${-7 - halfChord} A 3 1 45 0 1 ${10 + halfChord} ${-7 + halfChord}`,
    )

    for (const { x, y } of route) {
      const localX = (x - 10 + y + 7) / Math.SQRT2
      const localY = (-(x - 10) + y + 7) / Math.SQRT2
      expect((localX / 3) ** 2 + localY ** 2).toBeCloseTo(1, 6)
    }
  })

  test("expands repeated relative arcs into an ellipse", () => {
    const route = expandEasyEdaPathData(
      "M 10 20 a 3 1 0 0 1 6 0 3 1 0 0 1 -6 0",
    )
    const ys = route.map(({ y }) => y)

    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(2, 6)
    expect(route.at(-1)).toEqual({ x: 10, y: 20 })
  })

  test.each([
    [0, 1],
    [1, 0],
  ])("honors large-arc %s and sweep %s", (largeArc, sweep) => {
    const route = expandEasyEdaPathData(
      `M 3 0 A 3 1 0 ${largeArc} ${sweep} 0 1`,
    )

    for (const { x, y } of route) {
      expect((x / 3) ** 2 + y ** 2).toBeCloseTo(1, 6)
    }
    if (largeArc) {
      expect(Math.min(...route.map(({ x }) => x))).toBeLessThan(-2.8)
      expect(Math.min(...route.map(({ y }) => y))).toBeLessThan(-0.9)
    }
  })

  test.each(["3 0", "0 1"])("treats zero radii %s as a line", (radii) => {
    expect(expandEasyEdaPathData(`M 0 0 A ${radii} 0 0 1 6 0`)).toEqual([
      { x: 0, y: 0 },
      { x: 6, y: 0 },
    ])
  })

  test("normalizes negative ellipse radii", () => {
    expect(expandEasyEdaPathData("M 0 0 A -3 -1 0 0 1 6 0")).toEqual(
      expandEasyEdaPathData("M 0 0 A 3 1 0 0 1 6 0"),
    )
  })

  test("scales insufficient ellipse radii to reach the endpoints", () => {
    const route = expandEasyEdaPathData("M 0 0 A 1 0.5 0 0 1 4 0")

    expect(Math.max(...route.map(({ y }) => Math.abs(y)))).toBeCloseTo(1, 6)
    expect(route.at(-1)).toEqual({ x: 4, y: 0 })
  })

  test("preserves existing circular sampling when axes are rotated", () => {
    expect(expandEasyEdaPathData("M 0 0 A 3 3 45 0 1 4 0")).toEqual(
      expandEasyEdaPathData("M 0 0 A 3 3 0 0 1 4 0"),
    )
  })
})
