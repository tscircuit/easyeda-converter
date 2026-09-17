import { normalizeEasyEdaPinLabel } from "./normalize-easyeda-pin-label"

export const getEasyEdaPinAliases = (label: string): string[] => {
  label = label.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (entity, code: string) => {
    let codePoint = Number(code)
    if (/^x/i.test(code)) codePoint = Number.parseInt(code.slice(1), 16)
    const maximumUnicodeCodePoint = 0x10ffff
    if (codePoint > maximumUnicodeCodePoint) return entity
    return String.fromCodePoint(codePoint)
  })
  // Polarity-only drawing text such as "+/-" does not name alternate functions.
  if (label.includes("/") && !/[a-zA-Z0-9]/.test(label)) return []
  return label
    .split("/")
    .map((alias) =>
      normalizeEasyEdaPinLabel(alias.trim())
        .replace(/[`′]/g, "_PRIME")
        .replace(/^[()]+|[()]+$/g, "")
        .replace(/[^a-zA-Z0-9_]/g, "_"),
    )
    .filter((alias) => /[a-zA-Z0-9]/.test(alias))
}
