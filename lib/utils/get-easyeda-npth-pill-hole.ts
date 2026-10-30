import { mil2mm } from "@tscircuit/mm"
import type { PcbHolePillInput } from "circuit-json"
import { parseEasyEdaPathCommands } from "./parse-easyeda-path-commands"

// Allow floating-point cancellation, not dimensional rounding: a near-semicircle
// can bulge substantially more than its radius/chord discrepancy suggests.
const PATH_GEOMETRY_TOLERANCE = 1e-9
const isClose = (a: number, b: number) =>
  Math.abs(a - b) < PATH_GEOMETRY_TOLERANCE

/** Recognize axis-aligned capsules; leave all other NPTH outlines as polygons. */
export const getEasyEdaNpthPillHole = (
  pathData: string,
): Omit<PcbHolePillInput, "type" | "pcb_hole_id"> | null => {
  const commands = parseEasyEdaPathCommands(pathData)
  if (
    !commands ||
    commands.map((command) => command.command).join("") !== "MLALAZ"
  ) {
    return null
  }

  const coordinates = commands.slice(0, -1).map((command) => command.arguments)
  if (coordinates.map((command) => command.length).join(",") !== "2,2,7,2,7") {
    return null
  }

  const [start, firstLineEnd, firstArc, secondLineEnd, secondArc] = coordinates
  const firstArcEnd = firstArc.slice(5)
  const secondArcEnd = secondArc.slice(5)
  const radius = firstArc[0]

  // Circular semicircles are rotation-invariant, and either large-arc flag
  // selects the same 180-degree arc. Validate flag ranges rather than force 0.
  if (
    radius <= 0 ||
    !isClose(firstArc[1], radius) ||
    !isClose(secondArc[0], radius) ||
    !isClose(secondArc[1], radius) ||
    ![0, 1].includes(firstArc[3]) ||
    ![0, 1].includes(secondArc[3]) ||
    ![0, 1].includes(firstArc[4]) ||
    firstArc[4] !== secondArc[4] ||
    !isClose(start[0], secondArcEnd[0]) ||
    !isClose(start[1], secondArcEnd[1])
  ) {
    return null
  }

  const horizontal =
    isClose(start[1], firstLineEnd[1]) &&
    isClose(firstLineEnd[0], firstArcEnd[0]) &&
    isClose(firstArcEnd[1], secondLineEnd[1]) &&
    isClose(secondLineEnd[0], start[0]) &&
    isClose(Math.abs(firstArcEnd[1] - firstLineEnd[1]), radius * 2)
  const vertical =
    isClose(start[0], firstLineEnd[0]) &&
    isClose(firstLineEnd[1], firstArcEnd[1]) &&
    isClose(firstArcEnd[0], secondLineEnd[0]) &&
    isClose(secondLineEnd[1], start[1]) &&
    isClose(Math.abs(firstArcEnd[0] - firstLineEnd[0]), radius * 2)
  if (!horizontal && !vertical) return null

  const straightLength = horizontal
    ? Math.abs(start[0] - firstLineEnd[0])
    : Math.abs(start[1] - firstLineEnd[1])
  if (straightLength < PATH_GEOMETRY_TOLERANCE) return null

  // The semicircles must bend outward. The opposite sweep pinches the slot.
  const crossProduct =
    (firstLineEnd[0] - firstArcEnd[0]) * (firstLineEnd[1] - start[1]) -
    (firstLineEnd[1] - firstArcEnd[1]) * (firstLineEnd[0] - start[0])
  if (firstArc[4] !== Number(crossProduct > 0)) return null

  return {
    hole_shape: "pill",
    x: mil2mm((start[0] + firstArcEnd[0]) / 2) * 10,
    y: mil2mm((start[1] + firstArcEnd[1]) / 2) * 10,
    hole_width:
      mil2mm(horizontal ? straightLength + radius * 2 : radius * 2) * 10,
    hole_height:
      mil2mm(vertical ? straightLength + radius * 2 : radius * 2) * 10,
  }
}
