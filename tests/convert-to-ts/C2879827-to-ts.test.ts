import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
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
  expect(
    leadCutouts.every(
      (shape) => shape.type === "SOLIDREGION" && shape.layermask === 100,
    ),
  ).toBe(true)
})

test("C2879827 converts BoardOutline tracks into one cutout", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(circuitJson.filter((e) => e.type === "pcb_cutout")).toHaveLength(1)
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

test("C2879827 preserves the board cutout in generated component TSX", async () => {
  // Cached OBJ bounds in the fixture make conversion independent of the network.
  expect(chipRawEasy._objMetadata.bounds).toBeDefined()
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain("<silkscreenpath")
  expect(tsx).toContain("<cutout")
  const rendered = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))
  expect(
    convertCircuitJsonToPcbSvg(rendered, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  const cutouts = rendered.filter((e) => e.type === "pcb_cutout")
  expect(cutouts).toHaveLength(1)
  expect(cutouts[0]).toMatchObject({ shape: "polygon" })
  expect(tsx).not.toContain("NaN")
})

test("C2879827 must retain its board notch as cutout geometry", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const cutout = circuitJson.find((e) => e.type === "pcb_cutout")!
  expect(cutout.shape).toBe("polygon")
  if (cutout.shape !== "polygon") throw new Error("Expected polygon")
  expect(cutout.points).toHaveLength(4)
  const xs = cutout.points.map((p) => p.x)
  const ys = cutout.points.map((p) => p.y)
  expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(8.4, 3)
  expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(11.63, 3)
})

test("TSX generator must preserve an existing pcb_cutout", () => {
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
