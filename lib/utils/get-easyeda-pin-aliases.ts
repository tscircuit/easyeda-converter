import { normalizeEasyEdaPinLabel } from "./normalize-easyeda-pin-label"

export const getEasyEdaPinAliases = (label: string): string[] => {
  // Polarity-only drawing text such as "+/-" does not name alternate functions.
  if (label.includes("/") && !/[a-zA-Z0-9]/.test(label)) return []
  return label
    .split("/")
    .map((alias) =>
      normalizeEasyEdaPinLabel(alias.trim())
        .replace(/^[()]+|[()]+$/g, "")
        .replace(/[^a-zA-Z0-9_]/g, "_"),
    )
    .filter((alias) => /[a-zA-Z0-9]/.test(alias))
}
