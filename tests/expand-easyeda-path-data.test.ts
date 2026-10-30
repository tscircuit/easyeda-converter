import { describe, expect, test } from "bun:test"
import { expandEasyEdaPathData } from "../lib/utils/expand-easyeda-path-data"

describe("expandEasyEdaPathData repeated arguments", () => {
  test("treats extra M coordinate pairs as implicit lines", () => {
    expect(expandEasyEdaPathData("M 1 2 3 4 5 6 L 7 8")).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
      { x: 7, y: 8 },
    ])
  })

  test("preserves every coordinate pair after L", () => {
    expect(expandEasyEdaPathData("M 1 2 L 3 4 5 6 7 8")).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
      { x: 7, y: 8 },
    ])
  })

  test("expands all A groups and continues from their final endpoint", () => {
    const compact =
      "M 0 0 A 1 1 0 0 1 1 1 1 1 0 0 1 2 0 1 1 0 0 0 3 1 A 1 1 0 0 1 4 0"
    const explicit =
      "M 0 0 A 1 1 0 0 1 1 1 A 1 1 0 0 1 2 0 A 1 1 0 0 0 3 1 A 1 1 0 0 1 4 0"
    const route = expandEasyEdaPathData(compact)

    expect(route).toEqual(expandEasyEdaPathData(explicit))
    expect(route.at(-1)!.x).toBeCloseTo(4, 8)
    expect(route.at(-1)!.y).toBeCloseTo(0, 8)
  })

  test("starts the next arc at the last repeated M or L pair", () => {
    const paths = [
      ["M 0 0 1 0", "M 0 0 L 1 0"],
      ["M -1 0 L 0 0 1 0", "M -1 0 L 0 0 L 1 0"],
    ]
    for (const [compact, explicit] of paths) {
      const arc = " A 1 1 0 0 1 2 1"
      expect(expandEasyEdaPathData(compact + arc)).toEqual(
        expandEasyEdaPathData(explicit + arc),
      )
    }
  })
})

describe("expandEasyEdaPathData horizontal and vertical segments", () => {
  test("preserves all four corners of an H/V rectangle", () => {
    expect(expandEasyEdaPathData("M 0 0 H 10 V 10 L 0 10 Z")).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
    ])
  })

  test("preserves repeated H and V arguments", () => {
    expect(expandEasyEdaPathData("M 1 2 H 3 5 V 7 9")).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 5, y: 2 },
      { x: 5, y: 7 },
      { x: 5, y: 9 },
    ])
  })

  test("starts an arc at the endpoint of preceding H/V segments", () => {
    expect(expandEasyEdaPathData("M 0 0 H 1 V 1 A 1 1 0 0 1 2 2")).toEqual(
      expandEasyEdaPathData("M 0 0 L 1 0 L 1 1 A 1 1 0 0 1 2 2"),
    )
  })
})

describe("expandEasyEdaPathData relative commands", () => {
  test("resolves relative lines around a rectangle", () => {
    expect(expandEasyEdaPathData("m 2 3 h 10 v 10 l -10 0 z")).toEqual([
      { x: 2, y: 3 },
      { x: 12, y: 3 },
      { x: 12, y: 13 },
      { x: 2, y: 13 },
    ])
  })

  test("accumulates repeated relative move, line, H, and V arguments", () => {
    expect(expandEasyEdaPathData("m 1 2 3 4 l 2 1 -1 2 h 5 -2 v 4 -1")).toEqual(
      [
        { x: 1, y: 2 },
        { x: 4, y: 6 },
        { x: 6, y: 7 },
        { x: 5, y: 9 },
        { x: 10, y: 9 },
        { x: 8, y: 9 },
        { x: 8, y: 13 },
        { x: 8, y: 12 },
      ],
    )
  })

  test("resolves each relative arc endpoint from the preceding endpoint", () => {
    expect(
      expandEasyEdaPathData("M 1 1 a 1 1 0 0 1 1 1 1 1 0 0 1 1 -1"),
    ).toEqual(expandEasyEdaPathData("M 1 1 A 1 1 0 0 1 2 2 A 1 1 0 0 1 3 1"))
  })

  test("resets the current point after closepath before a relative line", () => {
    expect(expandEasyEdaPathData("M 1 1 L 3 1 L 3 3 Z l 0 2")).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
      { x: 1, y: 1 },
      { x: 1, y: 3 },
    ])
  })
})

describe("expandEasyEdaPathData unsupported geometry", () => {
  test("rejects multiple subpaths instead of connecting separate outlines", () => {
    expect(() =>
      expandEasyEdaPathData("M 0 0 L 1 0 L 1 1 Z M 2 2 L 3 2 L 3 3 Z"),
    ).toThrow("Multiple EasyEDA SOLIDREGION subpaths are not supported")
  })

  test.each(["M 0 0 H", "M 0 0 L 1", "M 0 0 L 1 1 @"])(
    "rejects malformed paths instead of silently omitting geometry: %s",
    (pathData) => {
      expect(() => expandEasyEdaPathData(pathData)).toThrow(
        "Invalid EasyEDA SOLIDREGION path",
      )
    },
  )
})
