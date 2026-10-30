import {
  midpoint,
  type Point,
  pointToSegmentDistance,
} from "@tscircuit/math-utils"
import { EasyEdaPathError } from "./easyeda-path-error"

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
    throw new EasyEdaPathError("Invalid Bezier curve geometry")
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
    if (depth >= 20 || route.length + pending.length >= 8192) {
      throw new EasyEdaPathError("Bezier curve exceeds the subdivision limit")
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
