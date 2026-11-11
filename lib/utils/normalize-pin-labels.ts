export const normalizeActiveLowPinLabel = (label: string): string => {
  const hasActiveLowMarker = label.startsWith("#") || label.endsWith("#")
  if (!hasActiveLowMarker) return label

  const activeLowLabel = label.replace(/^#/, "").replace(/#$/, "")
  if (activeLowLabel.length === 0) return label
  if (activeLowLabel.startsWith("N_")) return activeLowLabel

  return `N_${activeLowLabel}`
}

type PinAliases = {
  physicalPinNumber?: number
  aliases: readonly string[]
}

export const normalizePins = (pins: readonly PinAliases[]) => {
  const uniqueInputPinLabels = pins.map(({ aliases }) => [
    ...new Set(aliases.map(normalizeActiveLowPinLabel)),
  ])
  const result: Array<{ pinNumber?: number; aliases: string[] }> = pins.map(
    () => ({ aliases: [] }),
  )
  const physicalPinNumbers = new Set(pins.map((pin) => pin.physicalPinNumber))
  const duplicatePins: typeof result = []
  let highestPinNumber = 0
  const assignedPinNumbers = new Set<number>()

  for (const [index, { physicalPinNumber }] of pins.entries()) {
    let desiredPinNumber = physicalPinNumber
    if (desiredPinNumber === undefined) {
      const numericAlias = uniqueInputPinLabels[index].find((label) =>
        /^\d+$/.test(label),
      )
      if (numericAlias !== undefined) desiredPinNumber = Number(numericAlias)
    }
    if (desiredPinNumber === undefined || desiredPinNumber < 1) continue

    const normalizedPin = result[index]
    if (
      assignedPinNumbers.has(desiredPinNumber) ||
      (physicalPinNumber === undefined &&
        physicalPinNumbers.has(desiredPinNumber))
    ) {
      normalizedPin.aliases.push(`pin${desiredPinNumber}_alt1`)
      duplicatePins.push(normalizedPin)
      continue
    }
    normalizedPin.pinNumber = desiredPinNumber
    assignedPinNumbers.add(desiredPinNumber)
    highestPinNumber = Math.max(highestPinNumber, desiredPinNumber)
  }

  for (const pin of duplicatePins) {
    pin.pinNumber = ++highestPinNumber
  }

  const totalLabelCounts: Record<string, number> = {}
  for (const inputLabels of uniqueInputPinLabels) {
    for (const label of inputLabels) {
      if (/^\d+$/.test(label)) continue
      totalLabelCounts[label] = (totalLabelCounts[label] ?? 0) + 1
    }
  }

  const incrementalLabelCounts: Record<string, number> = {}
  for (let i = 0; i < uniqueInputPinLabels.length; i++) {
    for (const label of uniqueInputPinLabels[i]) {
      if (/^\d+$/.test(label)) continue

      if (totalLabelCounts[label] === 1) {
        result[i].aliases.push(label)
      } else {
        incrementalLabelCounts[label] = (incrementalLabelCounts[label] ?? 0) + 1
        result[i].aliases.push(`${label}${incrementalLabelCounts[label]}`)
      }
    }
  }

  return result.map(({ pinNumber, aliases }) => ({
    pinNumber: pinNumber ?? ++highestPinNumber,
    aliases,
  }))
}

export const normalizePinLabels = (inputPinLabels: string[][]): string[][] =>
  normalizePins(inputPinLabels.map((aliases) => ({ aliases }))).map(
    ({ pinNumber, aliases }) => [`pin${pinNumber}`, ...aliases],
  )
