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

  // Derive schPinArrangement from easyeda json
  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")

  const hasStringPinNumbers = pins.some(
    (pin) => typeof pin.pinNumber === "string",
  )
  let modifiedPins = pins
  if (hasStringPinNumbers) {
    modifiedPins = pins.map((pin, idx) => {
      const originalPinNumber = pin.pinNumber.toString()

      const newPinNumber = idx + 1

      // If label is different from original pin number, create array with both pin number and label
      // const newLabel =
      //   originalPinNumber === pin.label
      //     ? [pin.label]
      //     : [originalPinNumber, pin.label]

      return {
        ...pin,
        pinNumber: newPinNumber,
        label: pin.label,
      }
    })
  }

  const leftPins = modifiedPins.filter((pin) => pin.rotation === 180)
  const rightPins = modifiedPins.filter((pin) => pin.rotation === 0)

  const schPinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: leftPins.map((pin) => Number(pin.pinNumber)),
    },
    rightSide: {
      direction: "bottom-to-top" as const,
      pins: rightPins.map((pin) => Number(pin.pinNumber)).reverse(),
    },
  }

  // Derive pinLabels from easyeda json
  // Convert pins to format needed by normalizePinLabels
  const pinLabelSets = modifiedPins.map((pin) => {
    const labels = []
    // Always include pin number as first label if it exists
    if (pin.pinNumber) {
      labels.push(pin.pinNumber.toString())
    }
    // Add pin label if different from pin number
    if (pin.label && pin.label !== pin.pinNumber.toString()) {
      labels.push(pin.label)
    }
    return labels
  })

  const normalizedPinLabels = normalizePinLabels(pinLabelSets)

  // Convert back to Record format expected by chip component
  const pinLabels: Record<string, string[]> = {}
  modifiedPins.forEach((pin, index) => {
    // Use first normalized label for each pin
    pinLabels[pin.pinNumber] = normalizedPinLabels[index]
  })

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
