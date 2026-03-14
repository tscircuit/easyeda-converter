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
