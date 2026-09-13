import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const inductancePattern = /^\d+(?:\.\d+)?\s*(?:pH|nH|uH|µH|mH|H)$/i

export const isInductorComponent = (betterEasy: BetterEasyEdaJson): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package
  const referenceDesignator = componentParameters.pre
  const value = componentParameters.Value
  const hasInductorIdentity =
    packageName?.toUpperCase().startsWith("IND-") === true ||
    referenceDesignator?.trim().toUpperCase() === "L?"

  return (
    hasInductorIdentity &&
    typeof value === "string" &&
    inductancePattern.test(value.trim())
  )
}
