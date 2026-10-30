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

const getNpthPillHole = (circuitJson: AnyCircuitElement[]) => {
  const hole = circuitJson.find(
    (element) => element.type === "pcb_hole" && element.hole_shape === "pill",
  )
  if (!hole || hole.hole_shape !== "pill") {
    throw new Error("Expected the captured NPTH capsule")
  }
  return hole
}

test("preserves C5815189's source capsule dimensions and locator spacing", () => {
  const pillHole = getNpthPillHole(circuitJson)
  const roundHole = circuitJson.find(
    (element) => element.type === "pcb_hole" && element.hole_shape === "circle",
  )
  if (
    !roundHole ||
    roundHole.type !== "pcb_hole" ||
    roundHole.hole_shape !== "circle"
  ) {
    throw new Error("Expected the captured round locator")
  }

  // Preserve the actual supplier path, whose width differs from drawing A2.
  expect(pillHole.hole_width).toBeCloseTo(1.5099792, 7)
  expect(pillHole.hole_height).toBeCloseTo(0.7099808, 7)
  expect(roundHole.hole_diameter).toBeCloseTo(0.7099808, 7)
  expect(pillHole.x - roundHole.x).toBeCloseTo(7.999984, 7)
  // Changing the element type must not shift the existing footprint origin.
  expect(roundHole.x).toBeCloseTo(-4.1999916, 7)
  const firstPad = circuitJson.find((element) => element.type === "pcb_smtpad")
  if (!firstPad || firstPad.shape !== "rect")
    throw new Error("Expected pin 1 pad")
  expect(firstPad.x).toBeCloseTo(-2.9500576, 7)

  expect(
    convertCircuitJsonToPcbSvg([board, ...circuitJson]),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-intermediate")
  expect(
    convertCircuitJsonToPcbSvg([
      { ...board, width: 12, height: 4 },
      pillHole,
      roundHole,
    ]),
  ).toMatchSvgSnapshot(import.meta.path, "c5815189-locators")
})

test("preserves the captured pill hole through footprint TSX and native PCB rendering", async () => {
  const footprint = generateFootprintTsx(circuitJson)
  const nativeCircuitJson = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="10mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)

  expect(footprint).toContain('shape="pill"')
  const pillHole = getNpthPillHole(circuitJson)
  const renderedPillHole = getNpthPillHole(nativeCircuitJson)
  expect(renderedPillHole.x).toBeCloseTo(pillHole.x, 7)
  expect(renderedPillHole.y).toBeCloseTo(pillHole.y, 7)
  expect(renderedPillHole.hole_width).toBeCloseTo(pillHole.hole_width, 7)
  expect(renderedPillHole.hole_height).toBeCloseTo(pillHole.hole_height, 7)
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
  const vertices = route.slice(0, -1)
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
})
