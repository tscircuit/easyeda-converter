import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const capacitancePattern = /^\d+(?:\.\d+)?\s*(?:pF|nF|uF|µF|mF|F)$/i

export const isCapacitorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const prefix = componentParameters.pre
  const value = componentParameters.Value

  return (
    prefix?.toUpperCase() === "C?" &&
    typeof value === "string" &&
    capacitancePattern.test(value.trim())
  )
}
