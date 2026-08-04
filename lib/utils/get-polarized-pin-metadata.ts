export type PinLabels = Record<string, string | readonly string[]>

export interface PolarizedPinMetadata {
  portHintsMap: Record<string, string[]>
  pinLabels: Record<string, string[]>
}

const getPinLabelValues = (labels: string | readonly string[]): string[] => {
  if (typeof labels === "string") return [labels]
  return [...labels]
}

const stripEasyEdaPolarityHintDecoration = (label: string): string =>
  label.toLowerCase().replace(/[^a-z0-9+-]/g, "")

const getPinKeySortValue = (pinKey: string): number => {
  const match = /^pin(\d+)$/i.exec(pinKey)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

export const getPolarizedPinMetadata = (
  pinLabels: PinLabels,
): PolarizedPinMetadata | undefined => {
  const labelsByPin = Object.entries(pinLabels).map(([pin, labels]) => ({
    pin,
    labels: getPinLabelValues(labels).map(stripEasyEdaPolarityHintDecoration),
  }))

  const anodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["a", "anode", "pos", "+"].includes(label)),
  )?.pin
  const cathodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["c", "k", "cathode", "neg", "-"].includes(label)),
  )?.pin

  if (!anodePin || !cathodePin || anodePin === cathodePin) return undefined

  const polarizedPinEntries = (
    [
      [anodePin, ["anode", "pos"]],
      [cathodePin, ["cathode", "neg"]],
    ] satisfies Array<[string, string[]]>
  ).sort(
    ([pinA], [pinB]) => getPinKeySortValue(pinA) - getPinKeySortValue(pinB),
  )

  return {
    portHintsMap: Object.fromEntries(
      polarizedPinEntries.map(([pin, labels]) => [pin, [pin, ...labels]]),
    ),
    pinLabels: Object.fromEntries(polarizedPinEntries),
  }
}
