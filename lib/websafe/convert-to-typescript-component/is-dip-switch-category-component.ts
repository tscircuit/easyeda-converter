import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const categoryValueContainsDipSwitch = (value: unknown): boolean => {
  if (typeof value === "string") {
    return /\bdip\s+switch(?:es)?\b/i.test(value)
  }
  if (Array.isArray(value)) return value.some(categoryValueContainsDipSwitch)
  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsDipSwitch)
  }
  return false
}

export const isDipSwitchCategoryComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const cPara = betterEasy.dataStr.head.c_para
  return [
    betterEasy.tags,
    cPara.category,
    cPara.Category,
    cPara["LCSC Category"],
    cPara["JLCPCB Category"],
    betterEasy.category,
  ].some(categoryValueContainsDipSwitch)
}
