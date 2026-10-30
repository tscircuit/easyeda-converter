import type { Point } from "@tscircuit/math-utils"
import { mil10ToMm } from "./easyeda-unit-to-mm"
import { EASYEDA_PATH_LIMIT_MESSAGE } from "./easyeda-path-limits"
import { flattenBezierCurve } from "./flatten-bezier-curve"
import type { EasyEdaPathCommand } from "./parse-easyeda-path-commands"

interface BezierContext {
  currentPoint: Point
  cubicControl?: Point
  quadraticControl?: Point
  remainingPoints: number
}

// EasyEDA path units are ten mils. Bound curve deviation to one micrometre.
const BEZIER_TOLERANCE = 0.001 / mil10ToMm(1)

export const expandEasyEdaBezierCommand = (
  pathCommand: EasyEdaPathCommand,
  ctx: BezierContext,
) => {
  const command = pathCommand.command.toUpperCase()
  const relative = command !== pathCommand.command
  const groupSize = command === "C" ? 6 : command === "T" ? 2 : 4
  const route: Point[] = []
  let { currentPoint, cubicControl, quadraticControl } = ctx

  for (
    let offset = 0;
    offset < pathCommand.arguments.length;
    offset += groupSize
  ) {
    if (route.length >= ctx.remainingPoints) {
      throw new Error(EASYEDA_PATH_LIMIT_MESSAGE)
    }
    const coordinates: Point[] = []
    for (let index = offset; index < offset + groupSize; index += 2) {
      coordinates.push({
        x: pathCommand.arguments[index]! + (relative ? currentPoint.x : 0),
        y: pathCommand.arguments[index + 1]! + (relative ? currentPoint.y : 0),
      })
    }
    const end = coordinates.at(-1)!
    let controlPoints: Point[]
    if (command === "C" || command === "S") {
      const firstControl =
        command === "C"
          ? coordinates[0]!
          : cubicControl
            ? {
                x: 2 * currentPoint.x - cubicControl.x,
                y: 2 * currentPoint.y - cubicControl.y,
              }
            : currentPoint
      cubicControl = coordinates.at(-2)!
      quadraticControl = undefined
      controlPoints = [currentPoint, firstControl, cubicControl, end]
    } else {
      quadraticControl =
        command === "Q"
          ? coordinates[0]!
          : quadraticControl
            ? {
                x: 2 * currentPoint.x - quadraticControl.x,
                y: 2 * currentPoint.y - quadraticControl.y,
              }
            : currentPoint
      cubicControl = undefined
      controlPoints = [currentPoint, quadraticControl, end]
    }
    const points = flattenBezierCurve({
      controlPoints,
      tolerance: BEZIER_TOLERANCE,
      maxPoints: ctx.remainingPoints - route.length + 1,
    })
    for (let index = 1; index < points.length; index++) {
      route.push(points[index]!)
    }
    currentPoint = end
  }
  return { route, currentPoint, cubicControl, quadraticControl }
}
