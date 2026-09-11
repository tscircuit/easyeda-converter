import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const capacitancePattern = /^\d+(?:\.\d+)?\s*(?:pF|nF|[uµμ]F|mF|F)$/i

export const normalizeCapacitanceValue = (
  value: unknown,
): string | undefined => {
  if (typeof value !== "string") return undefined

  const trimmedValue = value.trim()
  if (!capacitancePattern.test(trimmedValue)) return undefined

  return trimmedValue.replace(/\s+/g, "").replace(/[µμ]/g, "u")
}

export const isCapacitorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const prefix = componentParameters.pre
  const value = componentParameters.Value

  return (
    prefix?.toUpperCase() === "C?" &&
    normalizeCapacitanceValue(value) !== undefined
  )
}

const polarizedCapacitorMetadataPattern =
  /(?:aluminum|aluminium|tantalum|electrolytic|supercapacitor|polarized)/i

export const isPolarizedCapacitorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  if (!isCapacitorComponent(betterEasy)) return false

  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")
  if (pins.length !== 2) return false

  const metadata = [
    betterEasy.title,
    betterEasy.description,
    ...(betterEasy.tags ?? []),
    betterEasy.category,
    betterEasy.dataStr.head.c_para.name,
    betterEasy.dataStr.head.c_para.package,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")

  // EasyEDA's standard polarized-capacitor symbol uses an arc for its
  // negative plate. This preserves polarity even when the pin labels are
  // only numeric, while metadata covers alternate polarized symbol artwork.
  return (
    polarizedCapacitorMetadataPattern.test(metadata) ||
    betterEasy.dataStr.shape.some((shape) => shape.type === "ARC")
  )
}
