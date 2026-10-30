import { expect, test } from "bun:test"
import { getEasyEdaNpthPillHole } from "lib/utils/get-easyeda-npth-pill-hole"
import {
  applyToPoint,
  compose,
  rotateDEG,
  scale,
  translate,
} from "transformation-matrix"

const capsulePath = ({
  ccwRotationDegrees,
  reverseSweep,
}: { ccwRotationDegrees: number; reverseSweep: boolean }) => {
  const sourceToRotatedMat = compose(
    translate(10, 20),
    rotateDEG(ccwRotationDegrees),
    scale(1, reverseSweep ? -1 : 1),
  )
  const points = [
    { x: 4, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 4, y: -1 },
    { x: 4, y: 1 },
  ].map((point) => {
    const rotatedPoint = applyToPoint(sourceToRotatedMat, point)
    return `${rotatedPoint.x.toFixed(6)} ${rotatedPoint.y.toFixed(6)}`
  })
  const sweepFlag = reverseSweep ? 0 : 1
  return `M ${points[0]} L ${points[1]} A 1 1 0 0 ${sweepFlag} ${points[2]} L ${points[3]} A 1 1 0 0 ${sweepFlag} ${points[4]} Z`
}

for (const ccwRotationDegrees of [0, 90, 180, 270]) {
  for (const reverseSweep of [false, true]) {
    test(`preserves a ${ccwRotationDegrees}-degree capsule with reverseSweep=${reverseSweep}`, () => {
      const hole = getEasyEdaNpthPillHole(
        capsulePath({ ccwRotationDegrees, reverseSweep }),
      )
      expect(hole?.hole_shape).toBe("pill")
      const horizontal = ccwRotationDegrees % 180 === 0
      expect(hole?.hole_width).toBeCloseTo(horizontal ? 1.524 : 0.508, 7)
      expect(hole?.hole_height).toBeCloseTo(horizontal ? 0.508 : 1.524, 7)
      const sourceToRotatedMat = compose(
        translate(10, 20),
        rotateDEG(ccwRotationDegrees),
      )
      const center = applyToPoint(sourceToRotatedMat, { x: 2, y: 0 })
      expect(hole?.x).toBeCloseTo(center.x * 0.254, 7)
      expect(hole?.y).toBeCloseTo(center.y * 0.254, 7)
    })
  }
}

test("leaves arbitrary and rotated NPTH regions as polygons", () => {
  expect(getEasyEdaNpthPillHole("M 0 0 L 4 0 L 4 2 L 0 2 Z")).toBeNull()
  expect(
    getEasyEdaNpthPillHole(
      capsulePath({ ccwRotationDegrees: 37, reverseSweep: false }),
    ),
  ).toBeNull()
})

test.each([
  "M 4 1 L 0 1 A 1 2 0 0 1 0 -1 L 4 -1 A 1 1 0 0 1 4 1 Z",
  "M 4 1 L 0 1 A 1 1 0 0 0 0 -1 L 4 -1 A 1 1 0 0 0 4 1 Z",
  "M 4 1 L 0 1 A 1 1 0 0 1 0 -1 L 4 -1 A 2 2 0 0 1 4 1 Z",
  "M 4 1 L 0 1 A 1 1 0 0 1 0 -1 L 3 -1 A 1 1 0 0 1 4 1 Z",
  "M 4 1 L 0 1 A 2 2 0 0 1 0 -1 L 4 -1 A 2 2 0 0 1 4 1 Z",
  "M 4 1 L 0 1 A 1 1 0 0 1 0 -1 L 4 -1 A 1 1 0 0 1 4 2 Z",
  "M 4 1 L 0 1 A 1 1 0 0 1 0 -1 L 4 -1 A 1 1 0 0 1 4 1",
])("does not replace a non-capsule or open path: %s", (pathData) => {
  expect(getEasyEdaNpthPillHole(pathData)).toBeNull()
})
