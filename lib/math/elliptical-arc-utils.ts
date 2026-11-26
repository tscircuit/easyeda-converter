import { type Point, generateArcFromSweep } from "./arc-utils"

/** Map an SVG ellipse into a circle, sample it, then restore its axes. */
export function generateEllipticalArcFromSweep({
  start,
  end,
  radiusX,
  radiusY,
  xAxisRotation,
  largeArcFlag,
  sweepFlag,
  maxSegments,
}: {
  start: Point
  end: Point
  radiusX: number
  radiusY: number
  xAxisRotation: number
  largeArcFlag: boolean
  sweepFlag: boolean
  maxSegments?: number
}): Point[] {
  const rx = Math.abs(radiusX)
  const ry = Math.abs(radiusY)
  if (rx === 0 || ry === 0) return [start, end]

  // Rotation does not change a circle. Preserve its existing sample grid.
  if (rx === ry) {
    return generateArcFromSweep({
      start,
      end,
      radius: rx,
      largeArcFlag,
      sweepFlag,
      maxSegments,
    })
  }

  const rotation = ((xAxisRotation % 360) * Math.PI) / 180
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  const radius = Math.max(rx, ry)
  const dx = end.x - start.x
  const dy = end.y - start.y
  const normalizedEnd = {
    x: (cos * dx + sin * dy) / (rx / radius),
    y: (-sin * dx + cos * dy) / (ry / radius),
  }

  // SVG scales both radii equally when the requested ellipse is too small.
  const correctedRadius = Math.max(
    radius,
    Math.hypot(normalizedEnd.x, normalizedEnd.y) / 2,
  )
  const route = generateArcFromSweep({
    start: { x: 0, y: 0 },
    end: normalizedEnd,
    radius: correctedRadius,
    largeArcFlag,
    sweepFlag,
    maxSegments,
  })

  return route.map((point, index) => {
    if (index === 0) return start
    if (index === route.length - 1) return end
    const x = point.x * (rx / radius)
    const y = point.y * (ry / radius)
    return {
      x: start.x + cos * x - sin * y,
      y: start.y + sin * x + cos * y,
    }
  })
}
