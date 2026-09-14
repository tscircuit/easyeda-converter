import { expect, test } from "bun:test"
import chipRawEasy from "../assets/C2879827.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"

const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
const shapes = betterEasy.packageDetail.dataStr.shape
const outlineTracks = shapes.filter(
  (shape) => shape.type === "TRACK" && shape.layer === 10,
)

// The real part uses three BoardOutline tracks for an open board-edge notch.
// Its layer-100 SOLIDREGION cutouts are lead artwork, not this notch.
test("C2879827 preserves the source notch geometry during parsing", () => {
  expect(outlineTracks.map((shape) => shape.id)).toEqual([
    "gge961",
    "gge958",
    "gge182",
  ])
  const leadCutouts = shapes.filter(
    (shape) => shape.type === "SOLIDREGION" && shape.fillStyle === "cutout",
  )
  expect(leadCutouts).toHaveLength(2)
  expect(leadCutouts.every((shape) => shape.layermask === 100)).toBe(true)
})

test("C2879827 reproduces BoardOutline tracks being omitted", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(circuitJson.filter((e) => e.type === "pcb_cutout")).toHaveLength(0)
  for (const track of outlineTracks) {
    const index = shapes.indexOf(track)
    const path = circuitJson.find(
      (e) =>
        e.type === "pcb_silkscreen_path" &&
        e.pcb_silkscreen_path_id === `pcb_silkscreen_path_${index + 1}`,
    )
    expect(path).toBeUndefined()
  }
})

test("C2879827 reproduces missing cutout in generated component TSX", async () => {
  // Cached OBJ bounds in the fixture make conversion independent of the network.
  expect(chipRawEasy._objMetadata.bounds).toBeDefined()
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain("<silkscreenpath")
  expect(tsx).not.toContain("<cutout")
  expect(tsx).not.toContain("NaN")
})

// Expected failures: remove `.failing` when implementing the respective fixes.
test.failing("C2879827 must retain its board notch as cutout geometry", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(
    circuitJson.filter((e) => e.type === "pcb_cutout").length,
  ).toBeGreaterThan(0)
})

test.failing("TSX generator must preserve an existing pcb_cutout", () => {
  // Isolate the second bug from interpreting this part's open outline.
  const tsx = generateFootprintTsx([
    {
      type: "pcb_cutout",
      pcb_cutout_id: "pcb_cutout_repro",
      shape: "polygon",
      points: [
        { x: 0, y: 0 },
        { x: 8.4, y: 0 },
        { x: 8.4, y: 11.63 },
        { x: 0, y: 11.63 },
      ],
    },
  ])
  expect(tsx).toContain("<cutout")
})
