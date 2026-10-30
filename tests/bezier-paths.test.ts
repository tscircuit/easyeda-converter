import { expect, test } from "bun:test"
import { pointToSegmentDistance } from "@tscircuit/math-utils"
import { expandEasyEdaPathData } from "lib/utils/expand-easyeda-path-data"
import { flattenBezierCurve } from "lib/utils/flatten-bezier-curve"

test.each([
  ["M 0 0 C 0 10 10 10 10 0", { x: 5, y: 7.5 }],
  ["M 0 0 Q 5 10 10 0", { x: 5, y: 5 }],
])(
  "retains known Bezier extrema and exact endpoints: %s",
  (pathData, midpoint) => {
    const route = expandEasyEdaPathData(pathData)
    expect(route[0]).toEqual({ x: 0, y: 0 })
    expect(route.at(-1)).toEqual({ x: 10, y: 0 })
    expect(route).toContainEqual(midpoint)
    expect(route.length).toBeGreaterThan(3)
  },
)

test.each([
  ["M 2 3 c 0 10 10 10 10 0", "M 2 3 C 2 13 12 13 12 3"],
  ["M 2 3 q 5 10 10 0", "M 2 3 Q 7 13 12 3"],
  ["M 0 0 C 0 1 1 1 1 0 1 -1 2 -1 2 0", "M 0 0 C 0 1 1 1 1 0 C 1 -1 2 -1 2 0"],
  ["M 0 0 c 0 1 1 1 1 0 0 -1 1 -1 1 0", "M 0 0 C 0 1 1 1 1 0 C 1 -1 2 -1 2 0"],
  ["M 0 0 Q 1 1 2 0 3 -1 4 0", "M 0 0 Q 1 1 2 0 Q 3 -1 4 0"],
  ["M 0 0 C 0 1 1 1 1 0 S 2 -1 2 0", "M 0 0 C 0 1 1 1 1 0 C 1 -1 2 -1 2 0"],
  ["M 0 0 C 0 1 1 1 1 0 s 1 -1 1 0", "M 0 0 C 0 1 1 1 1 0 C 1 -1 2 -1 2 0"],
  ["M 0 0 S 1 1 2 0 3 -1 4 0", "M 0 0 C 0 0 1 1 2 0 C 3 -1 3 -1 4 0"],
  ["M 0 0 q 1 1 2 0 1 -1 2 0", "M 0 0 Q 1 1 2 0 Q 3 -1 4 0"],
  ["M 0 0 Q 1 1 2 0 T 4 0 6 0", "M 0 0 Q 1 1 2 0 Q 3 -1 4 0 Q 5 1 6 0"],
  ["M 0 0 Q 1 1 2 0 t 2 0 2 0", "M 0 0 Q 1 1 2 0 Q 3 -1 4 0 Q 5 1 6 0"],
  [
    "M 0 0 C 0 1 1 1 1 0 L 2 0 S 3 1 4 0",
    "M 0 0 C 0 1 1 1 1 0 L 2 0 C 2 0 3 1 4 0",
  ],
  ["M 0 0 Q 1 1 2 0 L 3 0 T 5 0", "M 0 0 Q 1 1 2 0 L 3 0 Q 3 0 5 0"],
  ["M 0 0 C 0 1 1 1 1 0 T 2 0", "M 0 0 C 0 1 1 1 1 0 Q 1 0 2 0"],
  ["M 0 0 Q 1 1 2 0 S 3 1 4 0", "M 0 0 Q 1 1 2 0 C 2 0 3 1 4 0"],
  ["M 0 0 Q 1 1 2 0 Z T 4 0", "M 0 0 Q 1 1 2 0 Z Q 0 0 4 0"],
])("matches explicit absolute controls: %s", (compact, explicit) => {
  expect(expandEasyEdaPathData(compact)).toEqual(
    expandEasyEdaPathData(explicit),
  )
})

test.each([3, 4])(
  "bounds error against dense analytic samples for %s control points",
  (pointCount) => {
    const controlPoints =
      pointCount === 3
        ? [
            { x: 0, y: 0 },
            { x: 5, y: 10 },
            { x: 10, y: 0 },
          ]
        : [
            { x: 0, y: 0 },
            { x: 0, y: 10 },
            { x: 10, y: 10 },
            { x: 10, y: 0 },
          ]
    const tolerance = 0.001 / 0.254
    const route = flattenBezierCurve(controlPoints, tolerance)
    for (let index = 0; index <= 1000; index++) {
      const t = index / 1000
      const u = 1 - t
      const point =
        pointCount === 3
          ? { x: 10 * u * t + 10 * t * t, y: 20 * u * t }
          : {
              x: 30 * u * t * t + 10 * t ** 3,
              y: 30 * u * u * t + 30 * u * t * t,
            }
      const distance = Math.min(
        ...route
          .slice(1)
          .map((end, segment) =>
            pointToSegmentDistance(point, route[segment]!, end),
          ),
      )
      expect(distance).toBeLessThanOrEqual(tolerance + 1e-12)
    }
  },
)

test("does not collapse collinear overshoots or closed Bezier loops", () => {
  const overshoot = expandEasyEdaPathData("M 0 0 C 10 0 -10 0 1 0")
  expect(Math.max(...overshoot.map((point) => point.x))).toBeGreaterThan(1)
  expect(Math.min(...overshoot.map((point) => point.x))).toBeLessThan(0)
  const loop = expandEasyEdaPathData("M 0 0 C 10 10 -10 10 0 0")
  expect(loop.length).toBeGreaterThan(4)
  expect(Math.max(...loop.map((point) => point.y))).toBeCloseTo(7.5, 7)
})

test("fails rather than relaxing tolerance when the subdivision budget is exceeded", () => {
  expect(() =>
    flattenBezierCurve(
      [
        { x: 0, y: 0 },
        { x: 1e10, y: 1e10 },
        { x: 2e10, y: 0 },
      ],
      1e-12,
    ),
  ).toThrow("Bezier curve exceeds the subdivision limit")
})
