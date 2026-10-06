import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import rawJson from "tests/assets/C41413180.raweasy.json"

test("C41413180 solid fabrication symbols keep thin, closed outlines", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawJson)
  const regions = betterEasy.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "SOLIDREGION" && shape.layermask === 12,
  )
  expect(regions).toHaveLength(4)

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const notes = circuitJson.filter(
    (element) => element.type === "pcb_fabrication_note_path",
  )
  expect(notes).toHaveLength(4)
  for (const note of notes) {
    expect(note.stroke_width).toBe(0.01)
    expect(note.route.at(-1)).toEqual(note.route[0])
  }

  // The supplier's plus sign has 0.127 mm arms. The old 0.254 mm
  // stroke overwhelmed that detail even though its coordinates were correct.
  const plus = notes.find((note) => note.route.length === 13)!
  expect(Math.abs(plus.route[0]!.y - plus.route[1]!.y)).toBeCloseTo(0.127, 5)
  expect(plus.stroke_width).toBeLessThan(0.127 / 10)

  const footprint = generateFootprintTsx(circuitJson)
  expect(footprint.match(/strokeWidth="0.01mm"/g)).toHaveLength(4)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})

test("document TRACK notes retain the supplier's explicit stroke width", () => {
  const withTrack = structuredClone(rawJson)
  withTrack.packageDetail.dataStr.shape.push(
    "TRACK~0.5~12~~3992 3000 3994 3000~document-track~0",
  )
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(withTrack),
  )
  const track = circuitJson.find(
    (element) =>
      element.type === "pcb_fabrication_note_path" &&
      element.pcb_fabrication_note_path_id.startsWith(
        "pcb_fabrication_note_path_",
      ),
  )
  expect(track).toMatchObject({ stroke_width: 0.127 })
  expect(generateFootprintTsx(circuitJson)).toContain('strokeWidth="0.127mm"')
})
