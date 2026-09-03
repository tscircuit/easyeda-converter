const POLARITY_CHARACTERS_ONLY = /^[+/\-–−]+$/u
const NEGATIVE_POLARITY_MARKER = /[\-–−]/u

export const isPolarityOnlyPinLabel = (label: string): boolean =>
  POLARITY_CHARACTERS_ONLY.test(label.trim())

export const isCombinedPolarityPinLabel = (label: string): boolean => {
  const trimmedLabel = label.trim()
  return (
    isPolarityOnlyPinLabel(trimmedLabel) &&
    trimmedLabel.includes("+") &&
    NEGATIVE_POLARITY_MARKER.test(trimmedLabel)
  )
}
