import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { categoryValueContainsCrystal } from "./category-value-contains-crystal"

const frequencyPattern = /^\d+(?:\.\d+)?\s*(?:Hz|kHz|MHz|GHz)$/i

export const isCrystalComponent = (betterEasy: BetterEasyEdaJson): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package
  const value = componentParameters.Value
  const hasCrystalCategory = [
    betterEasy.tags,
    componentParameters.category,
    componentParameters.Category,
    componentParameters["LCSC Category"],
    componentParameters["JLCPCB Category"],
    betterEasy.category,
  ].some(categoryValueContainsCrystal)
  const hasCrystalPackageAndPrefix =
    componentParameters.pre === "X?" &&
    packageName?.toUpperCase().startsWith("CRYSTAL-") === true

  return (
    (hasCrystalCategory || hasCrystalPackageAndPrefix) &&
    typeof value === "string" &&
    frequencyPattern.test(value.trim())
  )
}
