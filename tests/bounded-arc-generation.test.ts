import { expect, test } from "bun:test"
import { generateArcFromSweep } from "lib/math/arc-utils"
import { expandEasyEdaPathData } from "lib/utils/expand-easyeda-path-data"
import { MAX_EASYEDA_PATH_POINTS } from "lib/utils/easyeda-path-limits"

test("bounds a large arc before allocating its natural sampling grid", () => {
  const route = generateArcFromSweep({
    start: { x: 0, y: 0 },
    end: { x: 200000, y: 0 },
    radius: 100000,
    largeArcFlag: false,
    sweepFlag: true,
  })
  expect(route).toHaveLength(MAX_EASYEDA_PATH_POINTS)
  expect(route[0]!.x).toBeCloseTo(0, 7)
  expect(route.at(-1)!.x).toBeCloseTo(200000, 7)
})

test("directly selects the same vertices as full generation followed by downsampling", () => {
  const options = {
    start: { x: -10, y: 0 },
    end: { x: 10, y: 0 },
    radius: 10,
    largeArcFlag: false,
    sweepFlag: true,
  }
  const original = generateArcFromSweep(options)
  const sampled = generateArcFromSweep({ ...options, maxSegments: 16 })
  const expected = Array.from(
    { length: 17 },
    (_, index) => original[Math.round((index * (original.length - 1)) / 16)]!,
  )
  expect(sampled).toEqual(expected)
})

test("expands a huge SOLIDREGION arc without creating an enormous temporary array", () => {
  const route = expandEasyEdaPathData(
    "M 0 0 A 100000000 100000000 0 0 1 200000000 0",
  )
  expect(route).toHaveLength(17)
  expect(
    route.every(
      (point) => Number.isFinite(point.x) && Number.isFinite(point.y),
    ),
  ).toBeTrue()
})

test("validates non-finite computed arc geometry before generation", () => {
  expect(() => expandEasyEdaPathData("M 0 0 A 1e308 1e308 0 0 1 2 0")).toThrow(
    "Invalid EasyEDA SOLIDREGION path geometry",
  )
})
