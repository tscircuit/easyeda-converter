import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "./assets/C37616412.raweasy.json"

test("explicit paste does not change copper, drilling or CAD placement", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const withoutPaste = structuredClone(betterEasy)
  withoutPaste.packageDetail.dataStr.shape =
    withoutPaste.packageDetail.dataStr.shape.filter(
      (shape) =>
        !(
          shape.type === "SOLIDREGION" &&
          (shape.layermask === 5 || shape.layermask === 6)
        ),
    )
  const withPaste = convertEasyEdaJsonToCircuitJson(betterEasy, {
    useModelCdn: true,
  })
  const baseline = convertEasyEdaJsonToCircuitJson(withoutPaste, {
    useModelCdn: true,
  })
  expect(
    withPaste.filter((element) =>
      ["pcb_smtpad", "pcb_plated_hole", "cad_component"].includes(element.type),
    ),
  ).toEqual(
    baseline.filter((element) =>
      ["pcb_smtpad", "pcb_plated_hole", "cad_component"].includes(element.type),
    ),
  )
})

test("keeps raw canvas paste coordinates in mm when recentering is disabled", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const sourceRegions = betterEasy.packageDetail.dataStr.shape
    .filter((shape) => shape.type === "SOLIDREGION")
    .filter((shape) => shape.layermask === 5 && shape.fillStyle === "solid")
  const apertures = convertEasyEdaJsonToCircuitJson(betterEasy, {
    shouldRecenter: false,
    useModelCdn: true,
  }).filter((element) => element.type === "pcb_solder_paste")
  expect(apertures).toHaveLength(sourceRegions.length)
  for (const [regionIndex, region] of sourceRegions.entries()) {
    const aperture = apertures[regionIndex]!
    if (aperture.shape !== "polygon") throw new Error("Expected source polygon")
    expect(aperture.points).toEqual(
      region.points.map((point) => ({
        x: mil10ToMm(point.x),
        y: mil10ToMm(point.y),
      })),
    )
    expect(aperture.pcb_component_id).toBe("pcb_component_1")
    expect("x" in aperture).toBe(false)
    expect("y" in aperture).toBe(false)
  }
})

test("imports bottom-layer paste and preserves its side through native TSX rendering", async () => {
  // Derived layer variant; the captured supplier fixture remains unchanged.
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  for (const shape of betterEasy.packageDetail.dataStr.shape) {
    if (shape.type === "SOLIDREGION" && shape.layermask === 5)
      shape.layermask = 6
  }
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
    useModelCdn: true,
  })
  const footprint = generateFootprintTsx(circuitJson)
  const native = await runTscircuitCode(
    `export default () => <board width="14mm" height="12mm"><chip name="J1" footprint={${footprint}} /></board>`,
  )
  const expectedPaste = circuitJson.filter(
    (element) => element.type === "pcb_solder_paste",
  )
  const nativePaste = native.filter(
    (element) => element.type === "pcb_solder_paste",
  )
  expect(nativePaste).toHaveLength(16)
  expect(
    native.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(12)
  expect(
    native.filter((element) => element.type === "pcb_plated_hole"),
  ).toHaveLength(4)
  for (const [apertureIndex, aperture] of nativePaste.entries()) {
    const expected = expectedPaste[apertureIndex]!
    if (aperture.shape !== "polygon" || expected.shape !== "polygon")
      throw new Error("Expected paste polygons")
    expect(aperture.layer).toBe("bottom")
    expect(aperture.points).toHaveLength(expected.points.length)
    for (const [pointIndex, point] of aperture.points.entries()) {
      expect(point.x - aperture.points[0]!.x).toBeCloseTo(
        expected.points[pointIndex]!.x - expected.points[0]!.x,
        7,
      )
      expect(point.y - aperture.points[0]!.y).toBeCloseTo(
        expected.points[pointIndex]!.y - expected.points[0]!.y,
        7,
      )
    }
  }
})

test("unsupported paste paths fail explicitly instead of silently discarding geometry", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const region = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SOLIDREGION" && shape.layermask === 5,
  )
  if (!region || region.type !== "SOLIDREGION")
    throw new Error("Expected source paste")
  region.pathData += "M1,1L2,1L2,2Z"
  expect(() => convertEasyEdaJsonToCircuitJson(betterEasy)).toThrow(
    "Unsupported compound",
  )
})
