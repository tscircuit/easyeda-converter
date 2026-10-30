import {
  INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE,
  MAX_EASYEDA_PATH_POINTS,
} from "../utils/easyeda-path-limits"

export interface Point {
  x: number
  y: number
}

export function calculateCenter(start: Point, mid: Point, end: Point): Point {
  const mid1 = { x: (start.x + mid.x) / 2, y: (start.y + mid.y) / 2 }
  const mid2 = { x: (mid.x + end.x) / 2, y: (mid.y + end.y) / 2 }

  const slope1 = -(start.x - mid.x) / (start.y - mid.y)
  const slope2 = -(mid.x - end.x) / (mid.y - end.y)

  const centerX =
    (mid1.y - mid2.y + slope2 * mid2.x - slope1 * mid1.x) / (slope2 - slope1)
  const centerY = mid1.y + slope1 * (centerX - mid1.x)

  return { x: centerX, y: centerY }
}

function calculateRadius(center: Point, point: Point): number {
  return Math.sqrt((center.x - point.x) ** 2 + (center.y - point.y) ** 2)
}

function calculateAngle(center: Point, point: Point): number {
  return Math.atan2(point.y - center.y, point.x - center.x)
}

export const getArcLength = (start: Point, mid: Point, end: Point) => {
  const center = calculateCenter(start, mid, end)
  const radius = calculateRadius(center, start)

  const angleStart = calculateAngle(center, start)
  const angleEnd = calculateAngle(center, end)

  let angleDelta = angleEnd - angleStart
  if (angleDelta < 0) {
    angleDelta += 2 * Math.PI
  }

  return radius * angleDelta
}

export function generateArcPathWithMid(
  start: Point,
  mid: Point,
  end: Point,
  numPoints: number,
): Point[] {
  const center = calculateCenter(start, mid, end)
  const radius = calculateRadius(center, start)

  const angleStart = calculateAngle(center, start)
  const angleEnd = calculateAngle(center, end)

  let angleDelta = angleEnd - angleStart
  if (angleDelta < 0) {
    angleDelta += 2 * Math.PI
  }

  const path: Point[] = []

  for (let i = 0; i <= numPoints; i++) {
    const angle = angleStart + (i / numPoints) * angleDelta
    const x = center.x + radius * Math.cos(angle)
    const y = center.y + radius * Math.sin(angle)
    // Check for NaN or Infinity values
    if (!isNaN(x) && isFinite(x) && !isNaN(y) && isFinite(y)) {
      path.push({ x, y })
    }
  }

  // If the path is empty, add the start and end points
  if (path.length === 0) {
    path.push(start, end)
  }

  return path
}

/**
This syntax describes an SVG path command for drawing an arc. Let's break down each part:

1. "M 3923.0512 2968.5197": 
   - M: Move to
   - 3923.0512: X-coordinate
   - 2968.5197: Y-coordinate

2. "A 2.5 2.5 0 0 0 3923.0512 2963.5197":
   - A: Arc command
   - 2.5: X-radius of the ellipse
   - 2.5: Y-radius of the ellipse
   - 0: X-axis rotation (in degrees)
   - 0: Large arc flag (0 for small arc, 1 for large arc)
   - 0: Sweep flag (0 for counterclockwise, 1 for clockwise)
   - 3923.0512: End X-coordinate
   - 2963.5197: End Y-coordinate

This command draws an arc starting at (3923.0512, 2968.5197) and ending at (3923.0512, 2963.5197), using a circular path with a radius of 2.5 units.
 */
export function generateArcFromSweep({
  start,
  end,
  radius,
  largeArcFlag,
  sweepFlag,
  maxSegments = MAX_EASYEDA_PATH_POINTS - 1,
}: {
  start: Point
  end: Point
  radius: number
  largeArcFlag: boolean
  sweepFlag: boolean
  maxSegments?: number
}): Point[] {
  const { x: startX, y: startY } = start
  const { x: endX, y: endY } = end
  if (
    ![startX, startY, endX, endY, radius].every(Number.isFinite) ||
    !Number.isInteger(maxSegments) ||
    maxSegments < 1
  ) {
    throw new Error(INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE)
  }

  // Calculate the midpoint between start and end
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2

  // Calculate the distance between start and end
  const dx = endX - startX
  const dy = endY - startY
  const distance = Math.sqrt(dx * dx + dy * dy)

  // If the distance is zero or the radius is too small, return a straight line.
  // A relative tolerance is required because an exact semicircle (chord == 2r)
  // can compute as radius < distance / 2 purely from floating-point error.
  const maxRadius = distance / 2
  if (distance === 0 || radius < maxRadius * (1 - 1e-9)) {
    return [start, end]
  }

  // Calculate the center of the arc. Clamp the radicand: for a semicircle it
  // can evaluate to a tiny negative number and sqrt would yield NaN.
  const h = Math.sqrt(Math.max(0, radius * radius - (distance * distance) / 4))
  const angle = Math.atan2(dy, dx)
  // The large-arc and sweep flags together select one of the two possible
  // circle centers. Ignoring the large-arc flag puts large arcs on the
  // opposite side of their chord.
  const centerDirection = (sweepFlag ? -1 : 1) * (largeArcFlag ? -1 : 1)
  const centerX = midX + h * Math.sin(angle) * centerDirection
  const centerY = midY - h * Math.cos(angle) * centerDirection

  // Calculate start and end angles
  const startAngle = Math.atan2(startY - centerY, startX - centerX)
  let endAngle = Math.atan2(endY - centerY, endX - centerX)

  // SVG sweep=1 follows increasing angles in the source coordinate system.
  // The selected circle center already accounts for the large-arc flag.
  // Reversing the sweep and correcting by arc size only worked away from
  // exact semicircles, where both choices have the same absolute angle.
  if (sweepFlag && endAngle < startAngle) {
    endAngle += 2 * Math.PI
  } else if (!sweepFlag && endAngle > startAngle) {
    endAngle -= 2 * Math.PI
  }

  // Generate points along the arc
  const arcAngle = Math.abs(endAngle - startAngle)
  const minNumPoints = Math.max(2, Math.ceil(arcAngle * radius))
  // Include the midpoint of a semicircle so an axis-aligned slot retains
  // its full radius instead of losing its extremum to an odd segment count.
  const isSemicircle = Math.abs(arcAngle - Math.PI) < 1e-6
  const numPoints = isSemicircle
    ? minNumPoints + (minNumPoints % 2)
    : minNumPoints
  if (
    ![centerX, centerY, startAngle, endAngle, numPoints].every(Number.isFinite)
  ) {
    throw new Error(INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE)
  }
  const sampledSegments = Math.min(
    numPoints,
    maxSegments,
    MAX_EASYEDA_PATH_POINTS - 1,
  )
  const path: Point[] = []

  for (let i = 0; i <= sampledSegments; i++) {
    // Select the same vertices as the old full-array/downsample pipeline,
    // without allocating the discarded points.
    const pointIndex =
      sampledSegments === numPoints
        ? i
        : Math.round(
            numPoints <= Number.MAX_SAFE_INTEGER / sampledSegments
              ? (i * numPoints) / sampledSegments
              : (i / sampledSegments) * numPoints,
          )
    const t = pointIndex / numPoints
    const angle = startAngle + t * (endAngle - startAngle)
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE)
    }
    path.push({ x, y })
  }

  return path
}
