/**
 * Normalizes symbol names that could break the converter
 * Converts "+" to "_POS" and "-" to "_NEG"
 */
export const normalizeSymbolName = (name: string): string => {
  const trimmedName = name.trim()
  if (trimmedName === "+") return "_POS"
  if (trimmedName === "-") return "_NEG"
  return trimmedName
}
