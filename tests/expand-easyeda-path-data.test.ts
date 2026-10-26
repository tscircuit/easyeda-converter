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
