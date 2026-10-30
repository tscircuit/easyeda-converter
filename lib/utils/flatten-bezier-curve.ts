import {
  midpoint,
  type Point,
  pointToSegmentDistance,
} from "@tscircuit/math-utils"

const MAX_SUBDIVISION_DEPTH = 20
const MAX_CURVE_POINTS = 8192
export const BEZIER_SUBDIVISION_LIMIT_MESSAGE =
  "Bezier curve exceeds the subdivision limit"

/** Subdivide the control polygon until its entire hull is within tolerance. */
export const flattenBezierCurve = (
  controlPoints: Point[],
  tolerance: number,
) => {
  if (
    ![3, 4].includes(controlPoints.length) ||
    !Number.isFinite(tolerance) ||
    tolerance <= 0 ||
    controlPoints.some(
      (point) => !Number.isFinite(point.x) || !Number.isFinite(point.y),
    )
  ) {
    throw new Error("Invalid Bezier curve geometry")
  }

  const route = [controlPoints[0]!]
  const pending = [{ points: controlPoints, depth: 0 }]
  while (pending.length) {
    const { points, depth } = pending.pop()!
    const start = points[0]!
    const end = points.at(-1)!
    // Segment distance also handles collinear overshoots and closed loops.
    if (
      points
        .slice(1, -1)
        .every(
          (point) => pointToSegmentDistance(point, start, end) <= tolerance,
        )
    ) {
      route.push(end)
      continue
    }
    if (
      depth >= MAX_SUBDIVISION_DEPTH ||
      route.length + pending.length + 2 > MAX_CURVE_POINTS
    ) {
      throw new Error(BEZIER_SUBDIVISION_LIMIT_MESSAGE)
    }

    let level = points
    const left = [start]
    const right = [end]
    while (level.length > 1) {
      level = level
        .slice(1)
        .map((point, index) => midpoint(level[index]!, point))
      left.push(level[0]!)
      right.unshift(level.at(-1)!)
    }
    pending.push(
      { points: right, depth: depth + 1 },
      { points: left, depth: depth + 1 },
    )
  }
  return route
}
