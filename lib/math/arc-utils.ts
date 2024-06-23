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

export function generateArcPath(
  start: Point,
  mid: Point,
  end: Point,
  numPoints: number
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
    path.push({ x, y })
  }

  return path
}
