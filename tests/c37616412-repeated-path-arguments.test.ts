import { expect, test } from "bun:test"
import { expandEasyEdaPathData } from "../lib/utils/expand-easyeda-path-data"
import { EasyEdaJsonSchema } from "../lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import { generateFootprintTsx } from "../lib/websafe/generate-footprint-tsx"
import raw from "./assets/C37616412.raweasy.json"

const sourceRegion = raw.packageDetail.dataStr.shape.find((s) =>
  s.startsWith("SOLIDREGION~12~"),
)!
const sourcePath = sourceRegion.split("~")[3]!

test("preserves every repeated L pair and implicit line pair after M", () => {
  expect(expandEasyEdaPathData("M0 0 10 0 L10 10 0 10 0 0")).toEqual([
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
    { x: 0, y: 0 },
  ])
})

test("repeated A groups agree with explicitly repeated command letters", () => {
  const compact = "M0 0 A1 1 0 0 1 1 1 1 1 0 0 1 2 0 L3 0"
  const explicit = "M0 0 A1 1 0 0 1 1 1 A1 1 0 0 1 2 0 L3 0"
  expect(expandEasyEdaPathData(compact)).toEqual(
    expandEasyEdaPathData(explicit),
  )
})

test("C37616412's captured U marking has no body-spanning diagonal", () => {
  const route = expandEasyEdaPathData(sourcePath)
  expect(route).toHaveLength(19)
  expect(route).toContainEqual({ x: 4013.9213, y: 3011.5906 })
  expect(route).toContainEqual({ x: 4013.9213, y: 2992.7993 })
  for (let i = 1; i < route.length; i++) {
    const dx = Math.abs(route[i]!.x - route[i - 1]!.x)
    const dy = Math.abs(route[i]!.y - route[i - 1]!.y)
    expect(dx > 1 && dy > 1).toBe(false)
  }
  expect(route.at(-1)).toEqual(route[0])
})

test("real component conversion carries the U marking into generated TSX", () => {
  const circuit = convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(raw))
  const fab = circuit.find((e) => e.type === "pcb_fabrication_note_path")!
  expect(fab.type).toBe("pcb_fabrication_note_path")
  if (fab.type !== "pcb_fabrication_note_path")
    throw new Error("Missing marking")
  expect(fab.route).toHaveLength(19)
  expect(fab.is_filled).toBe(true)
  expect(fab.has_stroke).toBe(false)
  expect(circuit.filter((e) => e.type === "pcb_smtpad")).toHaveLength(12)
  expect(circuit.filter((e) => e.type === "pcb_plated_hole")).toHaveLength(4)
  const footprint = generateFootprintTsx(circuit)
  expect(footprint).toContain(`route={${JSON.stringify(fab.route)}}`)
})
