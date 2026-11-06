import { expect, it } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import rawEasyEdaJson from "./assets/C124375.raweasy.json"

it("emits package RECT shapes as silkscreen rectangles", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawEasyEdaJson),
  )

  expect(
    circuitJson.filter((element) => element.type === "pcb_silkscreen_rect"),
  ).toMatchObject([
    {
      type: "pcb_silkscreen_rect",
      pcb_component_id: "pcb_component_1",
      center: { x: 0, y: 0 },
      width: 5.08,
      height: 2.54,
      layer: "top",
    },
  ])
})

it("emits courtyard RECT shapes as pcb_courtyard_rect and serializes <courtyardrect> in TSX", () => {
  const courtyardJson = structuredClone(rawEasyEdaJson)
  courtyardJson.packageDetail.dataStr.shape =
    courtyardJson.packageDetail.dataStr.shape.map((s) =>
      s.startsWith("RECT~") ? s.replace("~3~", "~15~") : s,
    )

  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(courtyardJson),
  )

  expect(
    circuitJson.filter((element) => element.type === "pcb_courtyard_rect"),
  ).toMatchObject([
    {
      type: "pcb_courtyard_rect",
      pcb_component_id: "pcb_component_1",
      center: { x: 0, y: 0 },
      width: 5.08,
      height: 2.54,
      layer: "top",
    },
  ])
  expect(
    circuitJson.filter((element) => element.type === "pcb_courtyard_outline"),
  ).toHaveLength(0)

  const footprintTsx = generateFootprintTsx(circuitJson)
  expect(footprintTsx).toContain(
    '<courtyardrect pcbX="0mm" pcbY="0mm" width="5.08mm" height="2.54mm" />',
  )
})

it("renders package RECT shapes in the PCB snapshot", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawEasyEdaJson),
  )

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
