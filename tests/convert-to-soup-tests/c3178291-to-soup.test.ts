import { it, expect } from "bun:test"
import C3178291EasyEdaJson from "../assets/C3178291.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert c3178291 with polygon pads", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(C3178291EasyEdaJson)
  const circuitJson = convertEasyEdaJsonToCircuitJson(parsedJson)

  // Test polygon pad coordinates are valid (not NaN)
  const polygonPads = circuitJson.filter(
    (e) => e.type === "pcb_smtpad" && e.shape === "polygon",
  )
  expect(polygonPads.length).toBeGreaterThan(0)

  for (const pad of polygonPads) {
    expect(pad.points).toBeDefined()
    expect(pad.points.length).toBeGreaterThan(0)
    for (const point of pad.points) {
      expect(Number.isFinite(point.x)).toBe(true)
      expect(Number.isFinite(point.y)).toBe(true)
    }
  }

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
