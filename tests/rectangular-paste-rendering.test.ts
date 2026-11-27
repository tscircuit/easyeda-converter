import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import splitEdges from "./assets/C165948.raweasy.json"
import oversized from "./assets/C2765186.raweasy.json"

for (const [part, raw, pins, width, height] of [
  ["C165948", splitEdges, ["pin14", "pin15"], 0.6, 1.3],
  ["C2765186", oversized, ["pin1", "pin2", "pin11", "pin12"], 0.6, 1.1],
] as const) {
  test(`${part} renders the supplier rectangles once on the affected pads`, async () => {
    const converted = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(raw),
    )
    const jsx = generateFootprintTsx(converted)
    const rendered = await runTscircuitCode(
      `export default () => <board width="25mm" height="25mm"><chip name="U" footprint={${jsx}} /></board>`,
    )
    for (const pin of pins) {
      const pad = converted.find(
        (e) => e.type === "pcb_smtpad" && e.port_hints?.includes(pin),
      )
      if (pad?.type !== "pcb_smtpad") throw new Error("Missing pad " + pin)
      const aperture = converted.find(
        (e) =>
          e.type === "pcb_solder_paste" &&
          e.pcb_smtpad_id === pad.pcb_smtpad_id,
      )
      if (aperture?.type !== "pcb_solder_paste" || aperture.shape !== "rect")
        throw new Error("Missing supplier opening on " + pin)
      const openings = rendered.filter(
        (e) =>
          e.type === "pcb_solder_paste" &&
          "x" in e &&
          e.layer === aperture.layer &&
          Math.hypot(e.x - aperture.x, e.y - aperture.y) < 0.001,
      )
      expect(openings).toHaveLength(1)
      expect(openings[0]).toMatchObject({
        shape: "rect",
        width: expect.closeTo(width, 3),
        height: expect.closeTo(height, 3),
      })
      const nativePad = rendered.find(
        (e) => e.type === "pcb_smtpad" && e.port_hints?.includes(pin),
      )
      expect(nativePad?.type).toBe("pcb_smtpad")
      if (nativePad?.type === "pcb_smtpad")
        expect(
          rendered.some(
            (e) =>
              e.type === "pcb_solder_paste" &&
              e.pcb_smtpad_id === nativePad.pcb_smtpad_id,
          ),
        ).toBe(false)
    }
  })
}
