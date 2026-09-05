import { su } from "@tscircuit/circuit-json-util"
import type { ChipProps } from "@tscircuit/props"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import {
  type BetterEasyEdaJson,
  EasyEdaJsonSchema,
} from "lib/schemas/easy-eda-json-schema"
import { normalizeManufacturerPartNumber } from "lib/utils/normalize-manufacturer-part-number"
import { getEasyEdaCadModelPlacement } from "../get-easyeda-cad-model-placement"
import {
  generateSymbolTsx,
  hasNonBoxSchematicSymbol,
} from "./generate-symbol-tsx"
import { generateTypescriptComponent } from "./generate-typescript-component"
import type {
  GeneratedComponentType,
  GeneratedSwitchType,
} from "./generate-typescript-component"
import {
  isCapacitorComponent,
  normalizeCapacitanceValue,
} from "./is-capacitor-component"
import { isCrystalComponent } from "./is-crystal-component"
import { isDiodeCategoryComponent } from "./is-diode-category-component"
import { isDipSwitchCategoryComponent } from "./is-dip-switch-category-component"
import { isInductorComponent } from "./is-inductor-component"
import { isLedCategoryComponent } from "./is-led-category-component"
import { isMicroUsbConnectorComponent } from "./is-micro-usb-connector-component"
import { isPushbuttonCategoryComponent } from "./is-pushbutton-category-component"
import {
  isResistorComponent,
  normalizeResistorValue,
} from "./is-resistor-component"
import { isSwitchCategoryComponent } from "./is-switch-category-component"

const getGeneratedComponentType = (
  betterEasy: BetterEasyEdaJson,
  pinCount: number,
  switchType: GeneratedSwitchType | undefined,
): GeneratedComponentType => {
  if (isLedCategoryComponent(betterEasy) && pinCount === 2) return "led"
  if (isDiodeCategoryComponent(betterEasy) && pinCount === 2) return "diode"
  if (isPushbuttonCategoryComponent(betterEasy)) return "pushbutton"
  if (isDipSwitchCategoryComponent(betterEasy)) return "chip"
  if (isSwitchCategoryComponent(betterEasy) && switchType) return "switch"
  if (isCapacitorComponent(betterEasy)) return "capacitor"
  if (isResistorComponent(betterEasy) && pinCount === 2) return "resistor"
  if (isInductorComponent(betterEasy) && pinCount === 2) return "inductor"
  if (isCrystalComponent(betterEasy)) return "crystal"
  if (isMicroUsbConnectorComponent(betterEasy)) return "connector"
  return "chip"
}

const getSwitchTypeFromPinCount = (
  pinCount: number,
): GeneratedSwitchType | undefined => {
  if (pinCount === 2) return "spst"
  if (pinCount === 3) return "spdt"
  if (pinCount === 4) return "dpst"
  if (pinCount === 6) return "dpdt"
  return undefined
}

const getVisibleSchematicPinArrangement = (
  betterEasy: BetterEasyEdaJson,
): ChipProps["schPinArrangement"] | undefined => {
  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")
  if (!pins.some((pin) => pin.visibility !== "show")) return undefined

  const arrangement: Record<
    "leftSide" | "rightSide" | "topSide" | "bottomSide",
    Array<string | number>
  > = {
    leftSide: [],
    rightSide: [],
    topSide: [],
    bottomSide: [],
  }

  for (const pin of pins.filter((pin) => pin.visibility === "show")) {
    const rotation = ((pin.rotation % 360) + 360) % 360
    const side =
      rotation === 90
        ? "topSide"
        : rotation === 180
          ? "leftSide"
          : rotation === 270
            ? "bottomSide"
            : "rightSide"
    arrangement[side].push(pin.pinNumber)
  }

  return Object.fromEntries(
    Object.entries(arrangement).filter(([, pins]) => pins.length > 0),
  )
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
  const hiddenSchematicPinNumbers = new Set(
    betterEasy.dataStr.shape.flatMap((shape) =>
      shape.type === "PIN" && shape.visibility !== "show"
        ? [String(shape.pinNumber)]
        : [],
    ),
  )

  const pinLabels: Record<string, string[]> = {}
  const sortedPorts = sourcePorts.sort((a, b) => {
    const aNum = Number.parseInt(a.name.replace("pin", ""))
    const bNum = Number.parseInt(b.name.replace("pin", ""))
    return aNum - bNum
  })
  for (const sourcePort of sortedPorts) {
    if (hiddenSchematicPinNumbers.has(String(sourcePort.pin_number))) continue
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
  const switchType = getSwitchTypeFromPinCount(sourcePorts.length)
  const componentType = getGeneratedComponentType(
    betterEasy,
    sourcePorts.length,
    switchType,
  )
  const isDipSwitch = isDipSwitchCategoryComponent(betterEasy)
  const inductance =
    componentType === "inductor"
      ? betterEasy.dataStr.head.c_para.Value?.trim()
      : undefined
  const capacitance =
    componentType === "capacitor"
      ? normalizeCapacitanceValue(betterEasy.dataStr.head.c_para.Value)
      : undefined
  const resistance =
    componentType === "resistor"
      ? normalizeResistorValue(betterEasy.dataStr.head.c_para.Value)
      : undefined
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
  const isMultiPinDiode =
    isDiodeCategoryComponent(betterEasy) && sourcePorts.length !== 2
  const isMultiPinInductor =
    isInductorComponent(betterEasy) && sourcePorts.length !== 2
  const isPassiveWithCustomSymbol =
    componentType === "capacitor" && sourcePorts.length !== 2
  const symbolTsx =
    isPassiveWithCustomSymbol ||
    (componentType === "chip" &&
      !isMultiPinDiode &&
      !isMultiPinInductor &&
      hasNonBoxSchematicSymbol(betterEasy))
      ? generateSymbolTsx(betterEasy, circuitJson, {
          alignPortsToDrawing: isPassiveWithCustomSymbol,
        })
      : undefined
  const schPinArrangement = symbolTsx
    ? undefined
    : getVisibleSchematicPinArrangement(betterEasy)

  return generateTypescriptComponent({
    componentName,
    manufacturerPartNumber,
    pinLabels,

    objUrl: modelObjUrl,
    stepUrl: modelStepUrl,
    circuitJson,
    supplierPartNumbers,
    componentType,
    switchType: componentType === "switch" ? switchType : undefined,
    capacitance,
    resistance,
    inductance,
    crystalFrequency,
    crystalPinVariant,
    symbolTsx,
    schPinArrangement,
    useSymbolPortsOnly: isDipSwitch && Boolean(symbolTsx),
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
