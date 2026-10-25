import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import raw from "./assets/C37616412.raweasy.json"

const circuitJson = convertEasyEdaJsonToCircuitJson(
  EasyEdaJsonSchema.parse(raw),
)
const board = {
  type: "pcb_board",
  pcb_board_id: "board",
  center: { x: 0, y: 0 },
  width: 14,
  height: 12,
  num_layers: 2,
  thickness: 1.6,
  material: "fr4",
} as const
const getFabricationNote = (circuit: AnyCircuitElement[]) => {
  const note = circuit.find((e) => e.type === "pcb_fabrication_note_path")
  if (!note || note.type !== "pcb_fabrication_note_path") {
    throw new Error("Expected the supplier's fabrication region")
  }
  return note
}

test("renders C37616412's PCB and document-layer region", () => {
  expect(circuitJson.filter((e) => e.type === "pcb_smtpad")).toHaveLength(12)
  expect(circuitJson.filter((e) => e.type === "pcb_plated_hole")).toHaveLength(
    4,
  )
  const note = getFabricationNote(circuitJson)
  expect(note.is_filled).toBe(true)
  expect(note.has_stroke).toBe(false)
  expect(
    convertCircuitJsonToPcbSvg([board, ...circuitJson]),
  ).toMatchSvgSnapshot(import.meta.path, "c37616412-pcb")
  expect(convertCircuitJsonToPcbSvg([board, note])).toMatchSvgSnapshot(
    import.meta.path,
    "c37616412-fabrication",
  )
})

test("preserves the imported region through generated TSX and native PCB rendering", async () => {
  const footprint = generateFootprintTsx(circuitJson)
  const nativeCircuit = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="12mm">
        <chip name="U1" footprint={${footprint}} />
      </board>
    )
  `)
  expect(getFabricationNote(nativeCircuit).route).toEqual(
    getFabricationNote(circuitJson).route,
  )
  expect(
    nativeCircuit.filter((e) => e.type === "source_component"),
  ).toHaveLength(1)
  expect(nativeCircuit.filter((e) => e.type === "pcb_trace")).toHaveLength(0)
  expect(convertCircuitJsonToPcbSvg(nativeCircuit)).toMatchSvgSnapshot(
    import.meta.path,
    "c37616412-native",
  )
})

test("the source U marking must not gain a body-spanning diagonal", () => {
  const route = getFabricationNote(circuitJson).route
  for (let i = 1; i < route.length; i++) {
    const dx = Math.abs(route[i]!.x - route[i - 1]!.x)
    const dy = Math.abs(route[i]!.y - route[i - 1]!.y)
    expect(dx > 1 && dy > 1).toBe(false)
  }
})
