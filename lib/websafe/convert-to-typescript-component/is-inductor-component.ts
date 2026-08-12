import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const inductancePattern = /^\d+(?:\.\d+)?\s*(?:pH|nH|uH|µH|mH|H)$/i

export const isInductorComponent = (betterEasy: BetterEasyEdaJson): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package
  const value = componentParameters.Value

  return (
    packageName?.toUpperCase().startsWith("IND-") === true &&
    typeof value === "string" &&
    inductancePattern.test(value.trim())
  )
}
