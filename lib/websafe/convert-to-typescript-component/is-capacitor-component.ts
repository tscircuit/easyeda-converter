import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const capacitancePattern = /^(\d+(?:\.\d+)?)\s*([pnuµμm]?)F$/i

const categoryValueContainsCapacitor = (value: unknown): boolean => {
  if (typeof value === "string") {
    return (
      !/\b(?:switched\s+capacitor|capacitive|touch|controllers?|sensors?|ics?)\b/i.test(
        value,
      ) && /\b(?:capacitors?|supercapacitors?|mlcc)\b/i.test(value)
    )
  }
  return Array.isArray(value) && value.some(categoryValueContainsCapacitor)
}

const hasCapacitorCategory = (betterEasy: BetterEasyEdaJson): boolean => {
  const cPara = betterEasy.dataStr.head.c_para as Record<string, unknown>
  return [
    betterEasy.tags,
    cPara.category,
    cPara.Category,
    cPara["LCSC Category"],
    cPara["JLCPCB Category"],
    (betterEasy as Record<string, unknown>).category,
  ].some(categoryValueContainsCapacitor)
}

export const normalizeCapacitanceValue = (
  value: unknown,
): string | undefined => {
  if (typeof value !== "string") return undefined

  const match = value.trim().match(capacitancePattern)
  if (!match) return undefined

  const [, magnitude, rawScale] = match
  const normalizedScale = rawScale.replace(/[µμ]/g, "u").toLowerCase()

  return `${magnitude}${normalizedScale}F`
}

export const isCapacitorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para
  const prefix = componentParameters.pre?.toUpperCase()
  const packageName = componentParameters.package?.toUpperCase()
  const value = componentParameters.Value
  const hasCapacitorIdentity =
    prefix === "C?" ||
    packageName?.startsWith("CAP-") === true ||
    hasCapacitorCategory(betterEasy)

  return hasCapacitorIdentity && normalizeCapacitanceValue(value) !== undefined
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
