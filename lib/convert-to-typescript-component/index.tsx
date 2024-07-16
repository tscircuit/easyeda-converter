import type { AnySoupElement } from "@tscircuit/soup"
import {
  EasyEdaJsonSchema,
  type EasyEdaJson,
} from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/soup-util"
import { soupTypescriptComponentTemplate } from "./soup-typescript-component-template"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

export const convertRawEasyEdaToTs = (rawEasy: any) => {
  const easyeda = EasyEdaJsonSchema.parse(rawEasy)
  const soup = convertEasyEdaJsonToTscircuitSoupJson(easyeda, {
    useModelCdn: true,
  })
  const result = convertToTypescriptComponent({
    easyeda,
    soup,
  })
  return result
}

export const convertToTypescriptComponent = ({
  soup,
  easyeda: easyEdaJson,
}: {
  soup: AnySoupElement[]
  easyeda: EasyEdaJson
}): string => {
  const rawPn = easyEdaJson.dataStr.head.c_para["Manufacturer Part"]
  const pn = normalizeManufacturerPartNumber(rawPn)
  const [cad_component] = su(soup).cad_component.list()

  const smtpads = su(soup).pcb_smtpad.list()
  const plated_holes = su(soup).pcb_plated_hole.list()
  const hole = su(soup).pcb_hole.list()

  // Derive pinLabels from easyeda json
  const pinLabels: Record<string, string> = {}
  easyEdaJson.dataStr.shape
    .filter((shape) => shape.type === "PIN")
    .forEach((pin) => {
      pinLabels[pin.pinNumber.toString()] = pin.label
    })

  // Derive schPinArrangement from easyeda json
  const pins = easyEdaJson.dataStr.shape.filter((shape) => shape.type === "PIN")
  const leftPins = pins.filter((pin) => pin.rotation === 180)
  const rightPins = pins.filter((pin) => pin.rotation === 0)

  const schPinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: leftPins.map((pin) => pin.pinNumber),
    },
    rightSide: {
      direction: "bottom-to-top" as const,
      pins: rightPins.map((pin) => pin.pinNumber).reverse(),
    },
  }

  return soupTypescriptComponentTemplate({
    componentName: pn,
    pinLabels,
    schPinArrangement,
    objUrl: cad_component.model_obj_url,
    easyEdaJson,
  })
}

function normalizeManufacturerPartNumber(partNumber: string): string {
  let transformed = partNumber.replace(/-/g, "_")

  if (/^\d/.test(transformed)) {
    transformed = "A" + transformed
  }

  return transformed
}
