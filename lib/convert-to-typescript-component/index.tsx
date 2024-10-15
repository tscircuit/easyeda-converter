import type { AnyCircuitElement } from "circuit-json"
import {
  EasyEdaJsonSchema,
  type BetterEasyEdaJson,
} from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/soup-util"
import { soupTypescriptComponentTemplate } from "./soup-typescript-component-template"
import {
  convertEasyEdaJsonToCircuitJson,
  convertEasyEdaJsonToTscircuitSoupJson,
} from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { normalizeManufacturerPartNumber } from "lib/utils/normalize-manufacturer-part-number"

export const convertRawEasyToTsx = async (rawEasy: any) => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })
  return result
}

export const convertBetterEasyToTsx = async ({
  betterEasy,
}: {
  betterEasy: BetterEasyEdaJson
}): Promise<string> => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
    useModelCdn: true,
    shouldRecenter: true,
  })
  const rawPn = betterEasy.dataStr.head.c_para["Manufacturer Part"]
  const pn = normalizeManufacturerPartNumber(rawPn)
  const [cad_component] = su(circuitJson).cad_component.list()

  // Derive pinLabels from easyeda json
  const pinLabels: Record<string, string> = {}
  for (const shape of betterEasy.dataStr.shape) {
    if (shape.type === "PIN") {
      const isPinLabelNumeric = /^\d+$/.test(shape.label)
      const label = isPinLabelNumeric ? `pin${shape.label}` : shape.label

      pinLabels[shape.pinNumber.toString()] = label
    }
  }

  // Derive schPinArrangement from easyeda json
  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")
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

  const supplierPartNumbers: Record<string, string[]> = {
    lcsc: [betterEasy.lcsc.number],
  }

  return soupTypescriptComponentTemplate({
    componentName: pn,
    pinLabels,
    schPinArrangement,
    objUrl: modelObjUrl,
    circuitJson,
    supplierPartNumbers,
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
