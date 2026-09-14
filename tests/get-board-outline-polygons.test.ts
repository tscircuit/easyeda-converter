import { expect, test } from "bun:test"
import { getBoardOutlinePolygons } from "lib/utils/get-board-outline-polygons"

const track = (points: number[][]) => ({
  type: "TRACK" as const,
  layer: 10,
  width: 1,
  points: points.map(([x, y]) => ({ x, y })),
})

test("joins unordered reversed tracks and removes notch edge tabs", () => {
  const polygons = getBoardOutlinePolygons([
    track([
      [8, 10],
      [8, 0],
      [9, 0],
    ]),
    track([
      [0, 10],
      [8, 10],
    ]),
    track([
      [-1, 0],
      [0, 0],
      [0, 10],
    ]),
  ])
  expect(polygons).toHaveLength(1)
  expect(polygons[0]).toHaveLength(4)
  expect(polygons[0]).toEqual(
    expect.arrayContaining([
      { x: 0, y: 0 },
      { x: 0, y: 10 },
      { x: 8, y: 10 },
      { x: 8, y: 0 },
    ]),
  )
})

test("keeps disconnected closed outlines separate", () => {
  const polygons = getBoardOutlinePolygons([
    track([
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
      [0, 0],
    ]),
    track([
      [10, 0],
      [12, 0],
      [12, 2],
      [10, 2],
      [10, 0],
    ]),
  ])
  expect(polygons).toHaveLength(2)
  expect(polygons.map((p) => p.length)).toEqual([4, 4])
})

test("does not invent a cutout from a line or an ambiguous open path", () => {
  expect(
    getBoardOutlinePolygons([
      track([
        [0, 0],
        [1, 0],
        [2, 0],
      ]),
    ]),
  ).toEqual([])
  expect(
    getBoardOutlinePolygons([
      track([
        [0, 0],
        [0, 2],
        [3, 4],
      ]),
    ]),
  ).toEqual([])
})

test("ignores branched outlines without losing a separate closed loop", () => {
  const polygons = getBoardOutlinePolygons([
    track([
      [0, 0],
      [0, 2],
      [2, 2],
      [2, 0],
    ]),
    track([
      [0, 2],
      [-1, 2],
    ]),
    track([
      [10, 0],
      [12, 0],
      [12, 2],
      [10, 2],
      [10, 0],
    ]),
  ])
  expect(polygons).toHaveLength(1)
  expect(polygons[0].every((p) => p.x >= 10)).toBe(true)
})
