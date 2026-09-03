import { isCombinedPolarityPinLabel } from "./is-polarity-only-pin-label"
import { normalizeActiveLowPinLabel } from "./normalize-pin-labels"
import { normalizeSymbolName } from "./normalize-symbol-name"

const TRAILING_NEGATIVE_MARKER = /[-–−]$/u

const normalizePinAlias = (rawAlias: string): string => {
  let alias = rawAlias.trim()
  if (!alias) return ""

  // Keep +5V readable in the schematic but preserve the established V5
  // selector alias used by generated components.
  if (/^\+\d+(?:\.\d+)?V$/i.test(alias)) {
    return `V${alias.slice(1, -1)}`
  }
  if (alias.startsWith("+")) alias = `${alias.slice(1)}_POS`
  if (/^[\-–−]/u.test(alias)) alias = `${alias.slice(1)}_NEG`
  if (alias.endsWith("+")) alias = `${alias.slice(0, -1)}_POS`
  if (TRAILING_NEGATIVE_MARKER.test(alias)) {
    alias = `${alias.slice(0, -1)}_NEG`
  }

  alias = normalizeActiveLowPinLabel(alias)
  const selectorSafeAlias = normalizeSymbolName(alias)
    .replace(/[^A-Za-z0-9_]/g, "_")
    .replace(/_+/g, "_")

  return /[A-Za-z0-9]/.test(selectorSafeAlias) ? selectorSafeAlias : ""
}

/**
 * Converts an EasyEDA display label into the independent aliases accepted by
 * tscircuit's pinLabels API.
 */
export const expandPinLabelAliases = (rawLabel: string): string[] => {
  const label = rawLabel.trim()
  // A combined marker such as "+/-" is schematic decoration, not a pair of
  // aliases. A lone "+" or "-" remains a real polarity alias.
  if (!label || isCombinedPolarityPinLabel(label)) return []

  // EasyEDA commonly writes a GPIO name outside a parenthesized list of its
  // alternate functions, e.g. `(INT1/OC2B)PD3` or `PC0(ADC0/PCINT8)`.
  const leadingAliases = label.match(/^\(([^)]*)\)(.+)$/)
  const trailingAliases = label.match(/^([^()]+)\(([^)]*)\)$/)
  const aliases = leadingAliases
    ? [leadingAliases[2], ...leadingAliases[1].split("/")]
    : trailingAliases
      ? [trailingAliases[1], ...trailingAliases[2].split("/")]
      : label.split("/")

  return [...new Set(aliases.map(normalizePinAlias).filter(Boolean))]
}
