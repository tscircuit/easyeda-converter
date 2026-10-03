import type { PinAttributeMap } from "@tscircuit/props"
import type { SourcePinAttributes } from "circuit-json"

/** Translate props attributes to the canonical source-port schema fields. */
export const toSourcePinAttributes = (
  attributes: PinAttributeMap | undefined,
): SourcePinAttributes => {
  const sourceAttributes: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(attributes ?? {})) {
    if (value === undefined) continue
    if (
      key === "capabilities" ||
      key === "activeCapabilities" ||
      key === "activeCapability"
    ) {
      const prefix = key === "capabilities" ? "supports_" : "is_configured_for_"
      for (const capability of Array.isArray(value) ? value : [value]) {
        sourceAttributes[`${prefix}${capability}`] = true
      }
    } else {
      sourceAttributes[
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      ] = value
    }
  }
  return sourceAttributes as SourcePinAttributes
}
