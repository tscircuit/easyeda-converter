import {
  EasyEdaJsonSchema,
  type BetterEasyEdaJson,
} from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/soup-util"
import { generateTypescriptComponent } from "./generate-typescript-component"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
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
  const sourcePorts = su(circuitJson).source_port.list()

  const pinLabels: Record<string, string[]> = {}
  const sortedPorts = sourcePorts.sort((a, b) => {
    const aNum = parseInt(a.name.replace("pin", ""))
    const bNum = parseInt(b.name.replace("pin", ""))
    return aNum - bNum
  })
  for (const sourcePort of sortedPorts) {
    pinLabels[sourcePort.name] = [
      sourcePort.name,
      ...(sourcePort.port_hints ?? []),
    ]
  }

  const [cadComponent] = su(circuitJson).cad_component.list()
  let modelObjUrl: string | undefined
  if (cadComponent?.model_obj_url) {
    const isValidUrl = await checkModelObjUrlValidity(
      cadComponent.model_obj_url,
    )
    if (isValidUrl) {
      modelObjUrl = cadComponent.model_obj_url
    }
  }

  const supplierPartNumbers: Record<string, string[]> = {
    jlcpcb: [betterEasy.lcsc.number],
  }

  return generateTypescriptComponent({
    componentName: pn,
    manufacturerPartNumber: pn,
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
