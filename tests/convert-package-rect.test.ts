import { expect, it } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import rawEasyEdaJson from "./assets/C124375.raweasy.json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

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

it("renders package RECT shapes in the PCB snapshot", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawEasyEdaJson),
  )

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
