import { it, expect } from "bun:test"
import C3178291EasyEdaJson from "../assets/C3178291.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should parse easyeda json for c3178291 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(C3178291EasyEdaJson)
  const circuitJson = convertEasyEdaJsonToCircuitJson(parsedJson)

  // Test that polygon pads are handled correctly
  const smtPads = circuitJson.filter((element) => element.type === "pcb_smtpad")
  expect(smtPads.length).toBeGreaterThan(0)

  // Check that polygon pads have proper coordinates
  for (const pad of smtPads) {
    if (pad.shape === "polygon") {
      expect(pad.points).toBeDefined()
      expect(pad.points.length).toBeGreaterThan(0)
      // Points should have valid numbers, not NaN
      for (const point of pad.points) {
        expect(Number.isFinite(point.x)).toBe(true)
        expect(Number.isFinite(point.y)).toBe(true)
      }
    }
  }

  // Verify pcb_component has proper bounds (not zero)
  const pcbComponent = circuitJson.find((e) => e.type === "pcb_component")
  expect(pcbComponent?.width).toBeGreaterThan(0)
  expect(pcbComponent?.height).toBeGreaterThan(0)

  // Test that no unknown pad shapes cause errors
  expect(() => convertEasyEdaJsonToCircuitJson(parsedJson)).not.toThrow()

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
