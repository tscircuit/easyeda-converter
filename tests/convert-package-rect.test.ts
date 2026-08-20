import { expect, it } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
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

it("preserves courtyard-layer RECT shapes as courtyard rectangles", async () => {
  const payload: any = structuredClone(rawEasyEdaJson)
  payload.packageDetail.dataStr.shape = payload.packageDetail.dataStr.shape.map(
    (shape: string) => {
      if (!shape.startsWith("RECT~")) return shape
      const fields = shape.split("~")
      fields[8] = "13"
      return fields.join("~")
    },
  )

  const betterEasy = EasyEdaJsonSchema.parse(payload)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(
    circuitJson.filter((element) => element.type === "pcb_courtyard_rect"),
  ).toHaveLength(1)
  expect(
    circuitJson.filter((element) => element.type === "pcb_courtyard_outline"),
  ).toHaveLength(0)

  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain("<courtyardrect ")
  expect(tsx).not.toContain("<courtyardoutline ")
})
