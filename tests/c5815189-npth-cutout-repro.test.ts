import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { expandEasyEdaPathData } from "lib/utils/expand-easyeda-path-data"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "./assets/C5815189.raweasy.json"

const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
const board = {
  type: "pcb_board",
  pcb_board_id: "board",
  center: { x: 0, y: 0 },
  width: 14,
  height: 10,
  num_layers: 2,
  thickness: 1.6,
  material: "fr4",
} as const

const getNpthCutout = (circuitJson: AnyCircuitElement[]) => {
  const cutout = circuitJson.find((element) => element.type === "pcb_cutout")
  if (!cutout || cutout.shape !== "polygon") {
    throw new Error("Expected the captured NPTH polygon")
  }
  return cutout
}

test("preserves C5815189's source capsule dimensions and convexity", () => {
  const cutout = getNpthCutout(circuitJson)
  const xs = cutout.points.map((point) => point.x)
  const ys = cutout.points.map((point) => point.y)
  const roundHole = circuitJson.find((element) => element.type === "pcb_hole")
  if (!roundHole || roundHole.hole_shape !== "circle") {
    throw new Error("Expected the captured round locator")
  }

  // Preserve the actual supplier path, whose width differs from drawing A2.
  expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(1.5099792, 7)
  expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(0.7099808, 7)
  const vertices = cutout.points.slice(0, -1)
  const turns = vertices.map((point, index) => {
    const next = vertices[(index + 1) % vertices.length]!
    const afterNext = vertices[(index + 2) % vertices.length]!
    return (
      (next.x - point.x) * (afterNext.y - next.y) -
      (next.y - point.y) * (afterNext.x - next.x)
    )
  })
  expect(
    turns.every((turn) => turn >= -1e-10) ||
      turns.every((turn) => turn <= 1e-10),
  ).toBe(true)
  expect(roundHole.hole_diameter).toBeCloseTo(0.7099808, 7)
  expect((Math.max(...xs) + Math.min(...xs)) / 2 - roundHole.x).toBeCloseTo(
    7.999984,
    7,
  )

  expect(
    convertCircuitJsonToPcbSvg([board, ...circuitJson]),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-intermediate")
  expect(
    convertCircuitJsonToPcbSvg([
      { ...board, width: 12, height: 4 },
      cutout,
      roundHole,
    ]),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-locators")
})

test("preserves the captured polygon through footprint TSX and native PCB rendering", async () => {
  const footprint = generateFootprintTsx(circuitJson)
  const nativeCircuitJson = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="10mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)

  expect(footprint).toContain('<cutout shape="polygon"')
  expect(getNpthCutout(nativeCircuitJson).points).toEqual(
    getNpthCutout(circuitJson).points,
  )
  expect(convertCircuitJsonToPcbSvg(nativeCircuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c5815189-native",
  )
})

test("expands the actual SVG end caps outside their vertical endpoint chords", () => {
  const region = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SOLIDREGION" && shape.fillStyle === "npth",
  )
  if (!region || region.type !== "SOLIDREGION") {
    throw new Error("Expected the captured NPTH SOLIDREGION")
  }
  const route = expandEasyEdaPathData(region.pathData)
  expect(Math.min(...route.map((point) => point.x))).toBeLessThan(4004.8422)
  expect(Math.max(...route.map((point) => point.x))).toBeGreaterThan(4007.9918)
})
