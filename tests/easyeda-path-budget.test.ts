import { expect, spyOn, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { expandEasyEdaPathData } from "lib/utils/expand-easyeda-path-data"
import {
  EASYEDA_PATH_LIMIT_MESSAGE,
  MAX_EASYEDA_PATH_POINTS,
} from "lib/utils/easyeda-path-limits"
import rawJson from "tests/assets/C41413180.raweasy.json"

const manyCurves = [
  "M 3992 3000 c " + "0 10 10 10 0 0 ".repeat(3000) + "Z",
  "M 3992 3000 " + "c 0 10 10 10 0 0 ".repeat(3000) + "Z",
]

test.each(manyCurves)(
  "bounds repeated curves in one or many commands: %#",
  (pathData) => {
    expect(() => expandEasyEdaPathData(pathData)).toThrow(
      EASYEDA_PATH_LIMIT_MESSAGE,
    )
  },
)

test.each(manyCurves)(
  "skips a many-curve decoration without losing the footprint: %#",
  (pathData) => {
    const withDecoration = structuredClone(rawJson)
    withDecoration.packageDetail.dataStr.shape.push(
      `SOLIDREGION~12~~${pathData}~solid~many-curves~~~~0`,
    )
    const expected = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawJson),
    )
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(
        convertEasyEdaJsonToCircuitJson(
          EasyEdaJsonSchema.parse(withDecoration),
        ),
      ).toEqual(expected)
      expect(warn).toHaveBeenCalledTimes(1)
      expect(warn).toHaveBeenCalledWith(
        `Skipping EasyEDA fabrication note many-curves: ${EASYEDA_PATH_LIMIT_MESSAGE}`,
      )
    } finally {
      warn.mockRestore()
    }
  },
)

test.each(manyCurves)(
  "rejects a many-curve physical NPTH instead of truncating it: %#",
  (pathData) => {
    const withHole = structuredClone(rawJson)
    withHole.packageDetail.dataStr.shape.push(
      `SOLIDREGION~11~~${pathData}~npth~many-curve-hole~~~~0`,
    )
    expect(() =>
      convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withHole)),
    ).toThrow(EASYEDA_PATH_LIMIT_MESSAGE)
  },
)

test("counts earlier lines against the remaining curve budget", () => {
  const pathData =
    "M 0 0 L " +
    "0 0 ".repeat(MAX_EASYEDA_PATH_POINTS - 30) +
    "c 0 10 10 10 0 0 Z"
  expect(() => expandEasyEdaPathData(pathData)).toThrow(
    EASYEDA_PATH_LIMIT_MESSAGE,
  )
})

test("includes closure in the exact total vertex limit", () => {
  const lines = Array.from(
    { length: MAX_EASYEDA_PATH_POINTS - 2 },
    (_, index) => `${1 + (index % 2)} ${index % 3}`,
  ).join(" ")
  const pathData = `M 0 0 L ${lines} 0 0 Z`
  const route = expandEasyEdaPathData(pathData)
  expect(route).toHaveLength(MAX_EASYEDA_PATH_POINTS)
  expect(route[0]).toEqual(route.at(-1)!)
  expect(() => expandEasyEdaPathData(`M 0 0 L ${lines} 1 1 0 0 Z`)).toThrow(
    EASYEDA_PATH_LIMIT_MESSAGE,
  )
})

test.each([
  ["M 1e308 0 c 1e308 0 1e308 1 1e308 0 Z", "Invalid Bezier curve geometry"],
  ["M 1e308 0 h 1e308 Z", "Invalid EasyEDA SOLIDREGION path geometry"],
])(
  "rejects invalid generated coordinates for physical NPTHs: %#",
  (pathData, reason) => {
    const withHole = structuredClone(rawJson)
    withHole.packageDetail.dataStr.shape.push(
      `SOLIDREGION~11~~${pathData}~npth~invalid-hole~~~~0`,
    )
    expect(() =>
      convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withHole)),
    ).toThrow(reason)
  },
)
