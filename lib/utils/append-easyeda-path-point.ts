import type { Point } from "@tscircuit/math-utils"
import {
  EASYEDA_PATH_LIMIT_MESSAGE,
  INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE,
  MAX_EASYEDA_PATH_POINTS,
} from "./easyeda-path-limits"

export const appendEasyEdaPathPoint = (route: Point[], point: Point) => {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    throw new Error(INVALID_EASYEDA_PATH_GEOMETRY_MESSAGE)
  }
  const firstPoint = route[0] ?? point
  const needsClosingPoint = firstPoint.x !== point.x || firstPoint.y !== point.y
  if (route.length + 1 + Number(needsClosingPoint) > MAX_EASYEDA_PATH_POINTS) {
    throw new Error(EASYEDA_PATH_LIMIT_MESSAGE)
  }
  route.push(point)
}
