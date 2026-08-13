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
