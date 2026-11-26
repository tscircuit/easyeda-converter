import { expect, test } from "bun:test"
import { mil2mm } from "@tscircuit/mm"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import raw from "./assets/C39731285-center-pad.raweasy.json"

const footprint = EasyEdaJsonSchema.parse(raw)
const converted = convertEasyEdaJsonToCircuitJson(footprint, {
  useModelCdn: true,
})

test("C39731285 pin 33 has a smaller supplier paste opening than its copper pad", () => {
  const region = footprint.packageDetail.dataStr.shape.find(
    (s) => s.type === "SOLIDREGION",
  )
  if (region?.type !== "SOLIDREGION")
    throw new Error("Missing supplier stencil")
  expect(region.layermask).toBe(5)
  for (const axis of ["x", "y"] as const) {
    const coordinates = region.points.map((p) => p[axis])
    expect(
      (Math.max(...coordinates) - Math.min(...coordinates)) * 0.254,
    ).toBeCloseTo(2.96, 4)
  }
  expect(converted.find((e) => e.type === "pcb_smtpad")).toMatchObject({
    port_hints: ["pin33"],
    width: expect.closeTo(3.7, 4),
    height: expect.closeTo(3.7, 4),
  })
  const sourcePad = footprint.packageDetail.dataStr.shape.find(
    (s) => s.type === "PAD",
  )
  if (sourcePad?.type !== "PAD") throw new Error("Missing supplier pad")
  const supplierPaste = {
    type: "pcb_solder_paste" as const,
    pcb_solder_paste_id: "pin33-paste",
    shape: "polygon" as const,
    layer: "top" as const,
    points: region.points.map((p) => ({
      x: p.x * 0.254 - mil2mm(sourcePad.center.x),
      y: mil2mm(sourcePad.center.y) - p.y * 0.254,
    })),
  }
  const board = {
    type: "pcb_board",
    pcb_board_id: "board",
    center: { x: 0, y: 0 },
    width: 5,
    height: 5,
    num_layers: 2,
    thickness: 1.6,
    material: "fr4",
  } as const
  const outputPaste = converted.filter((e) => e.type === "pcb_solder_paste")
  const options = { width: 240, height: 200, showSolderPaste: true }
  const sourceSvg = convertCircuitJsonToPcbSvg([board, supplierPaste], options)
  const outputSvg = convertCircuitJsonToPcbSvg([board, ...outputPaste], options)
  const comparison = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="236">
    <rect width="500" height="236" fill="white"/>
    <g font-family="sans-serif" font-size="16" fill="#202830" text-anchor="middle">
      <text x="120" y="23">Supplier paste · 2.96 mm</text>
      <text x="380" y="23">Converted paste · ${outputPaste.length} opening</text>
    </g>
    <g transform="translate(0 36)">${sourceSvg}</g>
    <g transform="translate(260 36)">${outputSvg}</g>
  </svg>`
  expect(comparison).toMatchSvgSnapshot(import.meta.path)
})

test("C39731285 conversion preserves the 2.96 mm top paste aperture", () => {
  const apertures = converted.filter((e) => e.type === "pcb_solder_paste")
  expect(apertures).toHaveLength(1)
  const aperture = apertures[0]
  expect(aperture.layer).toBe("top")
  for (const axis of ["x", "y"] as const) {
    let size: number
    if (aperture.shape === "polygon") {
      const coordinates = aperture.points.map((p) => p[axis])
      size = Math.max(...coordinates) - Math.min(...coordinates)
    } else if ("width" in aperture) {
      size = axis === "x" ? aperture.width : aperture.height
    } else {
      throw new Error("Expected a square paste opening")
    }
    expect(size).toBeCloseTo(2.96, 4)
  }
})

test("native footprint renders the supplier opening once over pin 33", async () => {
  const footprintTsx = generateFootprintTsx(
    convertEasyEdaJsonToCircuitJson(footprint),
  )
  const rendered = await runTscircuitCode(
    `export default () => <board width="8mm" height="8mm"><chip name="U30" footprint={${footprintTsx}} /></board>`,
  )
  const paste = rendered.filter((e) => e.type === "pcb_solder_paste")
  expect(paste).toHaveLength(1)
  expect(paste[0]).toMatchObject({
    shape: "rect",
    layer: "top",
    width: expect.closeTo(2.96, 4),
    height: expect.closeTo(2.96, 4),
  })
})
