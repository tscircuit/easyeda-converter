import type { AnyCircuitElement } from "circuit-json"
import {
  EasyEdaJsonSchema,
  type BetterEasyEdaJson,
} from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/soup-util"
import { soupTypescriptComponentTemplate } from "./soup-typescript-component-template"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { normalizeManufacturerPartNumber } from "lib/utils/normalize-manufacturer-part-number"

export const convertRawEasyEdaToTs = async (rawEasy: any) => {
  const easyeda = EasyEdaJsonSchema.parse(rawEasy)
  const soup = convertEasyEdaJsonToTscircuitSoupJson(easyeda, {
    useModelCdn: true,
  })
  const result = await convertToTypescriptComponent({
    easyeda,
    soup,
  })
  return result
}

export const convertToTypescriptComponent = async ({
  soup,
  easyeda: easyEdaJson,
}: {
  soup: AnyCircuitElement[]
  easyeda: BetterEasyEdaJson
}): Promise<string> => {
  const rawPn = easyEdaJson.dataStr.head.c_para["Manufacturer Part"]
  const pn = normalizeManufacturerPartNumber(rawPn)
  const [cad_component] = su(soup as any).cad_component.list()

  // Derive pinLabels from easyeda json
  const pinLabels: Record<string, string> = {}
  easyEdaJson.dataStr.shape
    .filter((shape) => shape.type === "PIN")
    .forEach((pin) => {
      const isPinLabelNumeric = /^\d+$/.test(pin.label)
      const label = isPinLabelNumeric ? `pin${pin.label}` : pin.label

      pinLabels[pin.pinNumber.toString()] = label
    })

  // Derive schPinArrangement from easyeda json
  const pins = easyEdaJson.dataStr.shape.filter((shape) => shape.type === "PIN")
  const leftPins = pins.filter((pin) => pin.rotation === 180)
  const rightPins = pins.filter((pin) => pin.rotation === 0)

  const schPinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: leftPins.map((pin) => pin.pinNumber) as number[],
    },
    rightSide: {
      direction: "bottom-to-top" as const,
      pins: rightPins.map((pin) => pin.pinNumber).reverse() as number[],
    },
  }

  let modelObjUrl: string | undefined
  if (cad_component.model_obj_url) {
    const isValidUrl = await checkModelObjUrlValidity(
      cad_component.model_obj_url,
    )
    if (isValidUrl) {
      modelObjUrl = cad_component.model_obj_url
    }
  }

  return soupTypescriptComponentTemplate({
    componentName: pn,
    pinLabels,
    schPinArrangement,
    objUrl: modelObjUrl,
    easyEdaJson,
  })
}

const checkModelObjUrlValidity = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.status === 200
  } catch (error) {
    console.error(`Error checking model object URL ${url}:`, error)
    return false
  }
}
