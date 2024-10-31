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
import { normalizePinLabels } from "lib/normalize-pin-labels"

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

  const sourcePorts = su(circuitJson).source_port.list()

  const pinLabels: Record<string, string[]> = {}
  for (const sourcePort of sourcePorts) {
    pinLabels[sourcePort.name] = [
      sourcePort.name,
      ...(sourcePort.port_hints ?? []),
    ]
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
