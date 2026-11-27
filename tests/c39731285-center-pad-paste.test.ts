import { expect, test } from "bun:test"
import { mil2mm } from "@tscircuit/mm"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import padsAndPaste from "./assets/C39731285-pads-and-paste.json"
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

test("renders each of the 33 supplier openings at its specified position and size", async () => {
  const input = structuredClone(raw)
  input.packageDetail.dataStr.shape = padsAndPaste
  const parsed = EasyEdaJsonSchema.parse(input)
  const shapes = parsed.packageDetail.dataStr.shape
  const pin33 = shapes.find(
    (s) => s.type === "PAD" && String(s.number) === "33",
  )
  if (pin33?.type !== "PAD") throw new Error("Missing pin 33")
  const tsx = generateFootprintTsx(convertEasyEdaJsonToCircuitJson(parsed))
  const rendered = await runTscircuitCode(
    `export default () => <board width="12mm" height="12mm"><chip name="U30" footprint={${tsx}} /></board>`,
  )
  const centerPad = rendered.find(
    (e) => e.type === "pcb_smtpad" && e.port_hints?.includes("pin33"),
  )
  if (centerPad?.type !== "pcb_smtpad" || centerPad.shape !== "rect")
    throw new Error("Missing rendered pin 33")
  const openings = rendered.filter((e) => e.type === "pcb_solder_paste")
  const regions = shapes.filter((s) => s.type === "SOLIDREGION")
  expect(regions).toHaveLength(33)
  expect(openings).toHaveLength(33)
  for (const region of regions) {
    const xs = region.points.map((p) => p.x * 0.254)
    const ys = region.points.map((p) => p.y * 0.254)
    const x =
      (Math.min(...xs) + Math.max(...xs)) / 2 -
      mil2mm(pin33.center.x) +
      centerPad.x
    const y =
      mil2mm(pin33.center.y) -
      (Math.min(...ys) + Math.max(...ys)) / 2 +
      centerPad.y
    const matches = openings.filter(
      (e) =>
        e.shape === "rect" &&
        e.layer === "top" &&
        Math.abs(e.x - x) < 1e-6 &&
        Math.abs(e.y - y) < 1e-6,
    )
    expect(matches).toHaveLength(1)
    expect(matches[0]).toMatchObject({
      width: expect.closeTo(Math.max(...xs) - Math.min(...xs), 6),
      height: expect.closeTo(Math.max(...ys) - Math.min(...ys), 6),
    })
  }
})
