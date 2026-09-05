export const normalizeActiveLowPinLabel = (label: string): string => {
  const hasActiveLowMarker = label.startsWith("#") || label.endsWith("#")
  if (!hasActiveLowMarker) return label

  const activeLowLabel = label.replace(/^#/, "").replace(/#$/, "")
  if (activeLowLabel.length === 0) return label
  if (activeLowLabel.startsWith("N_")) return activeLowLabel

  return `N_${activeLowLabel}`
}

export const normalizePinLabels = (inputPinLabels: string[][]): string[][] => {
  const normalizedInputPinLabels = inputPinLabels.map((labels) =>
    labels.map(normalizeActiveLowPinLabel),
  )
  const uniqueInputPinLabels = normalizedInputPinLabels.map((labels) => [
    ...new Set(labels),
  ])
  const result = uniqueInputPinLabels.map(() => [] as string[])
  const desiredNumbers = uniqueInputPinLabels.map(() => null as number | null)

  for (let i = 0; i < uniqueInputPinLabels.length; i++) {
    for (const label of uniqueInputPinLabels[i]) {
      if (/^\d+$/.test(label)) {
        desiredNumbers[i] = Number.parseInt(label)
        break
      }
    }
  }

  let highestPinNumber = 0
  const acceptedDesiredNumbers = new Set<number>()

  for (let i = 0; i < desiredNumbers.length; i++) {
    const desiredNumber = desiredNumbers[i]
    if (desiredNumber === null || desiredNumber < 1) continue

    if (!acceptedDesiredNumbers.has(desiredNumber)) {
      acceptedDesiredNumbers.add(desiredNumber)
      result[i].push(`pin${desiredNumber}`)
      highestPinNumber = Math.max(highestPinNumber, desiredNumber)
      continue
    }

    result[i].push(`pin${desiredNumber}_alt`)
  }

  for (let i = 0; i < result.length; i++) {
    const firstLabel = result[i][0]
    if (firstLabel?.includes("_alt")) {
      highestPinNumber += 1
      result[i].unshift(`pin${highestPinNumber}`)
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (result[i].length === 0) {
      highestPinNumber += 1
      result[i].push(`pin${highestPinNumber}`)
    }
  }

  // Reserve original aliases and canonical names, including later input labels.
  // Numeric input labels become canonical pin names, not literal aliases.
  const reservedLabels = new Set([
    ...uniqueInputPinLabels.flat().filter((label) => !/^\d+$/.test(label)),
    ...result.map((labels) => labels[0]),
  ])
  type PinLabel = string
  const incrementalLabelCounts = new Map<PinLabel, number>()
  for (const labels of result) {
    if (labels.length < 2) continue
    const alternatePrefix = labels[1]
    let suffix = incrementalLabelCounts.get(alternatePrefix) ?? 0
    do {
      suffix += 1
    } while (reservedLabels.has(`${alternatePrefix}${suffix}`))
    labels[1] = `${alternatePrefix}${suffix}`
    incrementalLabelCounts.set(alternatePrefix, suffix)
    reservedLabels.add(labels[1])
  }

  const assignedLabels = new Set(result.flat())
  const totalLabelCounts = new Map<PinLabel, number>()
  for (const inputLabels of uniqueInputPinLabels) {
    for (const label of inputLabels) {
      if (/^\d+$/.test(label)) continue
      totalLabelCounts.set(label, (totalLabelCounts.get(label) ?? 0) + 1)
    }
  }

  for (let i = 0; i < uniqueInputPinLabels.length; i++) {
    for (const label of uniqueInputPinLabels[i]) {
      if (/^\d+$/.test(label)) continue

      if (totalLabelCounts.get(label) === 1 && result[i].includes(label)) {
        continue
      }
      if (totalLabelCounts.get(label) === 1 && !assignedLabels.has(label)) {
        result[i].push(label)
        assignedLabels.add(label)
      } else {
        let suffix = incrementalLabelCounts.get(label) ?? 0
        do {
          suffix += 1
        } while (reservedLabels.has(`${label}${suffix}`))
        const disambiguatedLabel = `${label}${suffix}`
        incrementalLabelCounts.set(label, suffix)
        reservedLabels.add(disambiguatedLabel)
        assignedLabels.add(disambiguatedLabel)
        result[i].push(disambiguatedLabel)
      }
    }
  }

  return result
}
