import { expect, test } from "bun:test"
import { mil2mm } from "@tscircuit/mm"
import type { AnyCircuitElement } from "circuit-json"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSolderPasteMask,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "./assets/C37616412.raweasy.json"

const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
const supplierPaste = betterEasy.packageDetail.dataStr.shape
  .filter((shape) => shape.type === "SOLIDREGION")
  .filter((shape) => shape.layermask === 5 && shape.fillStyle === "solid")
const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
  useModelCdn: true,
})
const board = {
  type: "pcb_board",
  pcb_board_id: "board",
  center: { x: 0, y: 0 },
  width: 14,
  height: 12,
  num_layers: 2,
  thickness: 1.6,
  material: "fr4",
} as const

const renderNativeFootprint = () =>
  runTscircuitCode(`
    export default () => (
      <board width="14mm" height="12mm">
        <chip name="J1" footprint={${generateFootprintTsx(circuitJson)}} />
      </board>
    )
  `)

const expectSupplierPasteGeometry = (elements: AnyCircuitElement[]) => {
  const paste = elements.filter(
    (element) => element.type === "pcb_solder_paste",
  )
  expect(paste).toHaveLength(16)
  const firstPad = elements.find(
    (element) =>
      element.type === "pcb_smtpad" && element.port_hints?.includes("pin17"),
  )
  if (!firstPad || !("x" in firstPad)) {
    throw new Error("Expected the captured A1B12 copper pad (pin17)")
  }
  const sourcePad = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "PAD" && shape.number === "A1B12",
  )
  if (!sourcePad || sourcePad.type !== "PAD") {
    throw new Error("Expected the source A1B12 copper pad")
  }
  for (const [index, region] of supplierPaste.entries()) {
    if (region.type !== "SOLIDREGION") throw new Error("Expected paste region")
    const aperture = paste[index]!
    expect(aperture.layer).toBe("top")
    expect(aperture.shape).toBe("polygon")
    if (aperture.shape !== "polygon") throw new Error("Expected paste polygon")
    expect(aperture.points).toHaveLength(region.points.length)
    for (const [pointIndex, point] of region.points.entries()) {
      expect(aperture.points[pointIndex]!.x - firstPad.x).toBeCloseTo(
        point.x * 0.254 - mil2mm(sourcePad.center.x),
        7,
      )
      expect(aperture.points[pointIndex]!.y - firstPad.y).toBeCloseTo(
        mil2mm(sourcePad.center.y) - point.y * 0.254,
        7,
      )
    }
  }
}

test("captures 16 explicit top-paste regions without losing copper or slots", () => {
  expect(rawEasy.lcsc.number).toBe("C37616412")
  expect(rawEasy.packageDetail.uuid).toBe("3104977db58742e399663286e4a66eac")
  expect(supplierPaste).toHaveLength(16)
  expect(supplierPaste.map((region) => region.points.length)).toEqual([
    ...Array(12).fill(4),
    ...Array(4).fill(128),
  ])
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(12)
  expect(
    circuitJson.filter((element) => element.type === "pcb_plated_hole"),
  ).toHaveLength(4)
})

test.failing(
  "preserves all supplier paste vertices in intermediate Circuit JSON",
  () => {
    expectSupplierPasteGeometry(circuitJson)
  },
)

test.failing(
  "preserves the exact stencil through generated TSX and native rendering",
  async () => {
    expectSupplierPasteGeometry(await renderNativeFootprint())
  },
)

test("snapshots intermediate and native PCB/paste with the existing renderers", async () => {
  const intermediate = [board, ...circuitJson]
  const native = await renderNativeFootprint()
  for (const [stage, elements] of [
    ["intermediate", intermediate],
    ["native", native],
  ] as const) {
    expect(
      convertCircuitJsonToPcbSvg(elements, { showSolderPaste: true }),
    ).toMatchSvgSnapshot(import.meta.path, `c37616412-${stage}-pcb`)
    expect(
      convertCircuitJsonToSolderPasteMask(elements, { layer: "top" }),
    ).toMatchSvgSnapshot(import.meta.path, `c37616412-${stage}-paste`)
  }
})
