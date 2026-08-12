import { expect, test } from "bun:test"
import rawEasy from "../assets/C2055640.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"

test("C2055640 should preserve courtyard outlines when round-tripping through TSX", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const originalCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const originalCourtyardOutlines = originalCircuitJson.filter(
    (el) => el.type === "pcb_courtyard_outline",
  )

  expect(originalCourtyardOutlines.length).toBeGreaterThan(0)

  const tsxResult = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(tsxResult).toContain("<courtyardoutline outline={")
  expect(tsxResult).not.toContain("<courtyardoutline points={")

  const roundTrippedCircuitJson = await runTscircuitCode(tsxResult)
  const roundTrippedCourtyardOutlines = roundTrippedCircuitJson.filter(
    (el: any) => el.type === "pcb_courtyard_outline",
  )

  expect(roundTrippedCourtyardOutlines.length).toBe(
    originalCourtyardOutlines.length,
  )

  const allCourtyardPoints = roundTrippedCourtyardOutlines.flatMap(
    (outline: any) => outline.outline,
  )
  const uniqueYValues = new Set(allCourtyardPoints.map((p: any) => p.y))

  expect(uniqueYValues.size).toBeGreaterThan(1)

  const pcbSvg = convertCircuitJsonToPcbSvg(roundTrippedCircuitJson as any, {
    showCourtyards: true,
  })

  expect(pcbSvg).toContain("pcb-courtyard-outline")
  expect(pcbSvg).toContain('data-type="pcb_courtyard_outline"')
  expect(pcbSvg).toMatchSvgSnapshot(import.meta.path)
}, 20000)

test("repro: C2055640 should preserve circular EasyEDA BGA pads", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  type PackageShape = (typeof betterEasy.packageDetail.dataStr.shape)[number]
  type PadShape = Extract<PackageShape, { type: "PAD" }>
  const originalEllipsePads = betterEasy.packageDetail.dataStr.shape.filter(
    (shape): shape is PadShape =>
      shape.type === "PAD" &&
      shape.shape === "ELLIPSE" &&
      shape.holeRadius === "0mil",
  )

  expect(originalEllipsePads).toHaveLength(100)
  expect(originalEllipsePads.every((pad) => pad.width === pad.height)).toBe(
    true,
  )

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const convertedPads = convertedCircuitJson.filter(
    (element) => element.type === "pcb_smtpad",
  )

  expect(
    convertCircuitJsonToPcbSvg(convertedCircuitJson as any),
  ).toMatchSvgSnapshot(import.meta.path, "C2055640-circular-bga-pad-repro")

  expect(convertedPads).toHaveLength(100)
  expect(convertedPads.every((pad) => pad.shape === "circle")).toBe(true)
}, 20000)
