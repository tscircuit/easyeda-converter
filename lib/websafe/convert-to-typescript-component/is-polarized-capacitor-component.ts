import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { isCapacitorComponent } from "./is-capacitor-component"

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
