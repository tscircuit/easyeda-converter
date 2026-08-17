import { expect, it } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import rawEasyEdaJson from "../assets/C75749.raweasy.json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("preserves rotated silkscreen text in the PCB snapshot", () => {
  const easyEdaJson = EasyEdaJsonSchema.parse(rawEasyEdaJson)
  const textShape = easyEdaJson.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "TEXT",
  )

  expect(textShape).toBeDefined()
  if (!textShape || textShape.type !== "TEXT") return
  textShape.rotation = 90

  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)
  const silkscreenText = circuitJson.find(
    (element) => element.type === "pcb_silkscreen_text",
  )

  expect(silkscreenText).toMatchObject({ ccw_rotation: 90 })
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
