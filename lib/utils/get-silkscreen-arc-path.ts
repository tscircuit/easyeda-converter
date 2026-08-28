import type { z } from "zod"
import { generateArcFromSweep, type Point } from "../math/arc-utils"
import type {
  ArcSchema,
  TrackSchema,
} from "../schemas/package-detail-shape-schema"

export type PackageArc = z.infer<typeof ArcSchema>
export type PackageTrack = z.infer<typeof TrackSchema>

type SemicircleRole = "end_cap" | "notch"

const classifySemicircle = (
  arc: PackageArc,
  silkscreenTracks: PackageTrack[],
): SemicircleRole | null => {
  const chord = {
    x: arc.end.x - arc.start.x,
    y: arc.end.y - arc.start.y,
  }
  const chordLength = Math.hypot(chord.x, chord.y)
  const isSemicircle =
    !arc.largeArc &&
    Math.abs(chordLength - 2 * arc.radiusX) <=
      Math.max(1e-6, arc.radiusX * 1e-4)

  if (!isSemicircle) return null

  const endpointTolerance = Math.max(0.05, arc.radiusX * 0.02)
  const isNearEndpoint = (point: Point) =>
    Math.hypot(point.x - arc.start.x, point.y - arc.start.y) <=
      endpointTolerance ||
    Math.hypot(point.x - arc.end.x, point.y - arc.end.y) <= endpointTolerance

  let hasConnectedSegment = false

  for (const track of silkscreenTracks) {
    if (track.layer !== arc.layer) continue

    for (const [pointIndex, point] of track.points.entries()) {
      if (!isNearEndpoint(point)) continue

      const neighbors = [
        track.points[pointIndex - 1],
        track.points[pointIndex + 1],
      ]

      for (const neighbor of neighbors) {
        if (!neighbor) continue
        hasConnectedSegment = true

        const segment = {
          x: neighbor.x - point.x,
          y: neighbor.y - point.y,
        }
        const segmentLength = Math.hypot(segment.x, segment.y)
        if (segmentLength === 0) continue

        const normalizedDot =
          Math.abs(segment.x * chord.x + segment.y * chord.y) /
          (segmentLength * chordLength)
        // Perpendicular outline segments continue smoothly into an end cap.
        if (normalizedDot < 0.25) return "end_cap"
      }
    }
  }

  return hasConnectedSegment ? "notch" : null
}

const distanceFromRouteMidpoint = (route: Point[], point: Point) => {
  const midpoint = route[Math.floor(route.length / 2)]!
  return Math.hypot(midpoint.x - point.x, midpoint.y - point.y)
}

export const getSilkscreenArcPath = (
  arc: PackageArc,
  footprintCenter: Point,
  silkscreenTracks: PackageTrack[],
): Point[] => {
  const generateArcPath = (sweepFlag: boolean) =>
    generateArcFromSweep(
      arc.start.x,
      arc.start.y,
      arc.end.x,
      arc.end.y,
      arc.radiusX,
      arc.largeArc,
      sweepFlag,
    )

  const sweepFlag = arc.sweepDirection === "CW"
  const arcPath = generateArcPath(sweepFlag)
  const semicircleRole = classifySemicircle(arc, silkscreenTracks)

  if (!semicircleRole) return arcPath

  const oppositeArcPath = generateArcPath(!sweepFlag)
  const arcDistance = distanceFromRouteMidpoint(arcPath, footprintCenter)
  const oppositeDistance = distanceFromRouteMidpoint(
    oppositeArcPath,
    footprintCenter,
  )
  const originalArcIsInward = arcDistance <= oppositeDistance
  const shouldBowInward = semicircleRole === "notch"

  return originalArcIsInward === shouldBowInward ? arcPath : oppositeArcPath
}
