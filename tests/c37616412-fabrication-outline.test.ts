import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import looksSame from "looks-same"
import { runTscircuitCode } from "tscircuit"
import raw from "./assets/C37616412.raweasy.json"

test("renders the imported C37616412 footprint on a one-connector PCB", async () => {
  const imported = convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(raw))
  const footprint = generateFootprintTsx(imported)
  const circuit = await runTscircuitCode(`
    export default () => (
      <board width="14mm" height="12mm">
        <chip name="U1" footprint={${footprint}} />
      </board>
    )
  `)
  expect(circuit.filter((e) => e.type === "source_component")).toHaveLength(1)
  expect(circuit.filter((e) => e.type === "pcb_smtpad")).toHaveLength(12)
  expect(circuit.filter((e) => e.type === "pcb_plated_hole")).toHaveLength(4)
  expect(circuit.filter((e) => e.type === "pcb_trace")).toHaveLength(0)

  const svg = convertCircuitJsonToPcbSvg(circuit)
  const snapshot = new URL("./repros/c37616412/pcb.svg", import.meta.url)
  if (process.env.BUN_UPDATE_SNAPSHOTS) await Bun.write(snapshot, svg)
  const result = await looksSame(
    Buffer.from(svg),
    Buffer.from(await Bun.file(snapshot).arrayBuffer()),
    { strict: false, tolerance: 2 },
  )
  expect(result.equal).toBe(true)
})
