import type { SourcePort } from "circuit-json"
import type { BetterEasyEdaJson } from "../../schemas/easy-eda-json-schema"
import type { PinElectricalType } from "../../schemas/single-letter-shape-schema"

export const getPinElectricalTypes = ({
  betterEasy,
  sourcePorts,
}: {
  betterEasy: BetterEasyEdaJson
  sourcePorts: SourcePort[]
}): Record<string, PinElectricalType | undefined> => {
  const schematicPins = betterEasy.dataStr.shape.filter(
    (shape) => shape.type === "PIN",
  )
  const pinElectricalTypes: Record<string, PinElectricalType | undefined> = {}

  for (const sourcePort of sourcePorts) {
    const matchingPins = schematicPins.filter(
      (pin) => String(pin.pinNumber) === String(sourcePort.pin_number),
    )
    const electricalType = matchingPins[0]?.electricalType
    // Repeated symbol pins must agree before assigning electrical direction.
    if (
      electricalType !== undefined &&
      matchingPins.every((pin) => pin.electricalType === electricalType)
    ) {
      pinElectricalTypes[sourcePort.name] = electricalType
    }
  }

  return pinElectricalTypes
}
