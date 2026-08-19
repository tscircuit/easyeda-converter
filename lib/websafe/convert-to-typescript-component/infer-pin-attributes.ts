import type { PinAttributeMap } from "@tscircuit/props"

type GeneratedPinLabels = Record<string, string | readonly string[]>

const POWER_PIN_LABEL = /^(?:VCC|VDD|VIN|VDDA)\d*$/
const GROUND_PIN_LABEL = /^(?:GND|VSS|PGND|AGND)\d*$/
const NO_CONNECT_PIN_LABEL = /^NC\d*$/

const getAttributeKind = (
  label: string,
): "power" | "ground" | "no-connect" | undefined => {
  const normalizedLabel = label.trim().toUpperCase()

  if (POWER_PIN_LABEL.test(normalizedLabel)) return "power"
  if (GROUND_PIN_LABEL.test(normalizedLabel)) return "ground"
  if (NO_CONNECT_PIN_LABEL.test(normalizedLabel)) return "no-connect"

  return undefined
}

export const inferPinAttributes = (
  pinLabels: GeneratedPinLabels,
): Record<string, PinAttributeMap> => {
  const pinAttributes: Record<string, PinAttributeMap> = {}

  for (const [pinName, labels] of Object.entries(pinLabels)) {
    const labelList = typeof labels === "string" ? [labels] : labels
    const inferredKinds = labelList.map(getAttributeKind)

    // A functional alias alongside a reserved label makes the pin ambiguous.
    if (inferredKinds.some((kind) => kind === undefined)) continue

    const attributeKinds = new Set(inferredKinds)

    // Conflicting aliases are not reliable enough for automatic semantics.
    if (attributeKinds.size !== 1) continue

    const [attributeKind] = attributeKinds
    if (attributeKind === "power") {
      pinAttributes[pinName] = { requiresPower: true }
    } else if (attributeKind === "ground") {
      pinAttributes[pinName] = { requiresGround: true }
    } else if (attributeKind === "no-connect") {
      pinAttributes[pinName] = { doNotConnect: true }
    }
  }

  return pinAttributes
}
