import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const standardSmdResistorPackagePattern =
  /^R(?:01005|0201|0402|0504|0603|0805|1206|1210|1812|2010|2512)(?:$|[_-])/i

const normalizeExplicitScale = (scale: string): string => {
  if (scale === "k" || scale === "K") return "k"
  if (scale === "m") return "m"
  if (scale === "M") return "M"
  if (scale === "g" || scale === "G") return "G"
  return ""
}

export const normalizeResistorValue = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined

  const compactValue = value.trim().replace(/\s+/g, "")
  const explicitUnitMatch = compactValue.match(
    /^(\d+(?:\.\d+)?)([mMkKgG]?)(?:Ω|ohms?)$/i,
  )

  if (explicitUnitMatch) {
    const [, magnitude, scale] = explicitUnitMatch
    if (Number(magnitude) === 0) return "0ohm"
    return `${magnitude}${normalizeExplicitScale(scale)}ohm`
  }

  const resistorCodeMatch = compactValue.match(/^(\d+)([RrKkMm])(\d*)$/)
  if (resistorCodeMatch) {
    const [, whole, multiplier, fraction] = resistorCodeMatch
    const magnitude = fraction ? `${whole}.${fraction}` : whole
    if (Number(magnitude) === 0) return "0ohm"

    const scale =
      multiplier === "R" || multiplier === "r"
        ? ""
        : multiplier === "K" || multiplier === "k"
          ? "k"
          : "M"
    return `${magnitude}${scale}ohm`
  }

  if (/^0+(?:\.0+)?$/.test(compactValue)) return "0ohm"

  return undefined
}

export const isResistorComponent = (betterEasy: BetterEasyEdaJson): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const packageName = componentParameters.package

  return (
    componentParameters.pre?.toUpperCase() === "R?" &&
    typeof packageName === "string" &&
    standardSmdResistorPackagePattern.test(packageName.trim()) &&
    normalizeResistorValue(componentParameters.Value) !== undefined
  )
}
