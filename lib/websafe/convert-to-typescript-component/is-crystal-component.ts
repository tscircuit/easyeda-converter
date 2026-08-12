import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const frequencyPattern = /^\d+(?:\.\d+)?\s*(?:Hz|kHz|MHz|GHz)$/i

export const isCrystalComponent = (betterEasy: BetterEasyEdaJson): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package
  const value = componentParameters.Value

  return (
    componentParameters.pre === "X?" &&
    packageName?.toUpperCase().startsWith("CRYSTAL-") === true &&
    typeof value === "string" &&
    frequencyPattern.test(value.trim())
  )
}
