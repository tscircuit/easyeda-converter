import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const fpcCategoryPattern = /\b(?:ffc\s*\/\s*fpc|fpc|ffc)\s+connectors?\b/i

const valueContainsFpcConnector = (value: unknown): boolean => {
  if (typeof value === "string") {
    return fpcCategoryPattern.test(value)
  }
  if (Array.isArray(value)) {
    return value.some(valueContainsFpcConnector)
  }
  return false
}

export const isFpcConnectorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package?.trim().toUpperCase() ?? ""
  const hasFpcPackagePrefix =
    packageName.startsWith("FPC-") ||
    packageName.startsWith("FFC-") ||
    packageName.startsWith("CONN-FPC") ||
    packageName.startsWith("CONN-FFC")

  const hasFpcCategory = [
    betterEasy.tags,
    componentParameters.category,
    componentParameters.Category,
    componentParameters["LCSC Category"],
    componentParameters["JLCPCB Category"],
    betterEasy.category,
  ].some(valueContainsFpcConnector)

  return hasFpcPackagePrefix || hasFpcCategory
}
