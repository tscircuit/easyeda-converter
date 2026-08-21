import { normalizeSymbolName } from "./normalize-symbol-name"

const cleanAlias = (alias: string): string => {
  const trimmedAlias = alias.trim()
  const withoutActiveLowSuffix = trimmedAlias.endsWith("#")
    ? trimmedAlias.slice(0, -1)
    : trimmedAlias
  const withoutPolaritySuffix = withoutActiveLowSuffix.endsWith("+")
    ? `${withoutActiveLowSuffix.slice(0, -1)}_POS`
    : withoutActiveLowSuffix.endsWith("-")
      ? `${withoutActiveLowSuffix.slice(0, -1)}_NEG`
      : withoutActiveLowSuffix

  return normalizeSymbolName(withoutPolaritySuffix)
}

export const expandPinLabelAliases = (rawLabel: string): string[] => {
  const label = rawLabel.trim()
  if (!label || label === "+" || label === "-" || label === "+/-") return []

  const leadingAliases = label.match(/^\(([^)]*\/[^)]*)\)(.+)$/)
  if (leadingAliases) {
    return [leadingAliases[2], ...leadingAliases[1].split("/")]
      .map(cleanAlias)
      .filter(Boolean)
  }

  const trailingAliases = label.match(/^([^()]+)\(([^)]*\/[^)]*)\)$/)
  if (trailingAliases) {
    return [trailingAliases[1], ...trailingAliases[2].split("/")]
      .map(cleanAlias)
      .filter(Boolean)
  }

  const nonAliasParentheses = label.match(/^([^()]+)\([^)]*\)$/)
  const aliases = nonAliasParentheses
    ? [nonAliasParentheses[1]]
    : label.split("/")

  return aliases.map(cleanAlias).filter(Boolean)
}
