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
  
  // Test that no unknown pad shapes cause errors
  expect(() => convertEasyEdaJsonToCircuitJson(parsedJson)).not.toThrow()

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})