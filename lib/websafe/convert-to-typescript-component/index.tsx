import { su } from "@tscircuit/circuit-json-util"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import {
  type BetterEasyEdaJson,
  EasyEdaJsonSchema,
} from "lib/schemas/easy-eda-json-schema"
import { normalizeManufacturerPartNumber } from "lib/utils/normalize-manufacturer-part-number"
import { getEasyEdaCadModelPlacement } from "../get-easyeda-cad-model-placement"
import { generateTypescriptComponent } from "./generate-typescript-component"
import type { GeneratedComponentType } from "./generate-typescript-component"
import { isCrystalComponent } from "./is-crystal-component"
import { isDiodeCategoryComponent } from "./is-diode-category-component"
import { isLedCategoryComponent } from "./is-led-category-component"
import { isPushbuttonCategoryComponent } from "./is-pushbutton-category-component"
import { isSwitchCategoryComponent } from "./is-switch-category-component"
import {
  generateSymbolTsx,
  hasNonBoxSchematicSymbol,
} from "./generate-symbol-tsx"

const getGeneratedComponentType = (
  betterEasy: BetterEasyEdaJson,
): GeneratedComponentType => {
  if (isLedCategoryComponent(betterEasy)) return "led"
  if (isDiodeCategoryComponent(betterEasy)) return "diode"
  if (isPushbuttonCategoryComponent(betterEasy)) return "pushbutton"
  if (isSwitchCategoryComponent(betterEasy)) return "switch"
  if (isCrystalComponent(betterEasy)) return "crystal"
  return "chip"
}

export const convertRawEasyToTsx = async ({ rawEasy }: { rawEasy: any }) => {
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
  const cadPlacement = await getEasyEdaCadModelPlacement(betterEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
    useModelCdn: true,
    shouldRecenter: true,
    cadPositionXMm: cadPlacement?.positionXMm,
    cadPositionYMm: cadPlacement?.positionYMm,
    cadPositionZMm: cadPlacement?.positionZMm,
    cadModelBounds: cadPlacement?.bounds,
    showDesignator: true,
  })
  const [cadComponent] = su(circuitJson).cad_component.list()
  if (cadComponent) {
    cadComponent.position.x = 0
    cadComponent.position.y = 0
  }
  const manufacturerPartNumber =
    betterEasy.dataStr.head.c_para["Manufacturer Part"]
  if (!manufacturerPartNumber) {
    throw new Error(
      `Missing manufacturer part number for ${betterEasy.lcsc.number}`,
    )
  }
  const componentName = normalizeManufacturerPartNumber(manufacturerPartNumber)
  const sourcePorts = su(circuitJson).source_port.list()

  const pinLabels: Record<string, string[]> = {}
  const sortedPorts = sourcePorts.sort((a, b) => {
    const aNum = Number.parseInt(a.name.replace("pin", ""))
    const bNum = Number.parseInt(b.name.replace("pin", ""))
    return aNum - bNum
  })
  for (const sourcePort of sortedPorts) {
    pinLabels[sourcePort.name] = [
      sourcePort.name,
      ...(sourcePort.port_hints ?? []),
    ]
  }

  let modelObjUrl: string | undefined
  let modelStepUrl: string | undefined
  if (cadPlacement?.modelObjUrl) {
    modelObjUrl = cadPlacement.modelObjUrl
    modelStepUrl = cadPlacement.modelStepUrl
  } else if (cadComponent?.model_obj_url) {
    const isValidUrl = await checkModelObjUrlValidity(
      cadComponent.model_obj_url,
    )
    if (isValidUrl) {
      modelObjUrl = cadComponent.model_obj_url
      modelStepUrl = cadComponent.model_step_url
    }
  }

  const supplierPartNumbers: Record<string, string[]> = {
    jlcpcb: [betterEasy.lcsc.number],
  }
  const componentType = getGeneratedComponentType(betterEasy)
  const crystalFrequency =
    componentType === "crystal"
      ? betterEasy.dataStr.head.c_para.Value?.trim()
      : undefined
  const crystalPinVariant =
    componentType !== "crystal"
      ? undefined
      : sourcePorts.length === 4
        ? "four_pin"
        : sourcePorts.length === 2
          ? "two_pin"
          : undefined
  const symbolTsx =
    componentType === "chip" && hasNonBoxSchematicSymbol(betterEasy)
      ? generateSymbolTsx(betterEasy, circuitJson)
      : undefined

  return generateTypescriptComponent({
    componentName,
    manufacturerPartNumber,
    pinLabels,

    objUrl: modelObjUrl,
    stepUrl: modelStepUrl,
    circuitJson,
    supplierPartNumbers,
    componentType,
    crystalFrequency,
    crystalPinVariant,
    symbolTsx,
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
