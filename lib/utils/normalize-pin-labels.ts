export const normalizePinLabels = (pinLabelSets: string[][]): string[][] => {
  const normalizedLabels = pinLabelSets.map((labels) =>
    labels.filter(
      (label) => typeof label === "string" && label.trim().length > 0,
    ),
  )

  const requestedPinNumbers = normalizedLabels.map((labels) => {
    const numericLabel = labels.find((label) => /^\d+$/.test(label))
    return numericLabel ? Number.parseInt(numericLabel, 10) : null
  })

  const firstOccurrenceByPinNumber = new Map<number, number>()
  const reservedPinNumbers = new Set<number>()
  for (const [index, requestedPinNumber] of requestedPinNumbers.entries()) {
    if (requestedPinNumber == null) continue
    reservedPinNumbers.add(requestedPinNumber)
    if (!firstOccurrenceByPinNumber.has(requestedPinNumber)) {
      firstOccurrenceByPinNumber.set(requestedPinNumber, index)
    }
  }

  const nonNumericTotals = new Map<string, number>()
  for (const labels of normalizedLabels) {
    for (const label of labels) {
      if (/^\d+$/.test(label)) continue
      nonNumericTotals.set(label, (nonNumericTotals.get(label) ?? 0) + 1)
    }
  }

  const generatedPinNumbers = new Set<number>()
  const duplicateNumericCounts = new Map<number, number>()
  const nonNumericSeenCounts = new Map<string, number>()
  let nextGeneratedPinNumber = 1

  const getNextAvailablePinNumber = () => {
    while (
      reservedPinNumbers.has(nextGeneratedPinNumber) ||
      generatedPinNumbers.has(nextGeneratedPinNumber)
    ) {
      nextGeneratedPinNumber += 1
    }

    const pinNumber = nextGeneratedPinNumber
    generatedPinNumbers.add(pinNumber)
    nextGeneratedPinNumber += 1
    return pinNumber
  }

  return normalizedLabels.map((labels, index) => {
    const requestedPinNumber = requestedPinNumbers[index]
    const primaryPinNumber =
      requestedPinNumber != null &&
      firstOccurrenceByPinNumber.get(requestedPinNumber) === index
        ? requestedPinNumber
        : getNextAvailablePinNumber()

    const outputLabels = [`pin${primaryPinNumber}`]

    if (requestedPinNumber != null && primaryPinNumber !== requestedPinNumber) {
      const duplicateIndex =
        (duplicateNumericCounts.get(requestedPinNumber) ?? 0) + 1
      duplicateNumericCounts.set(requestedPinNumber, duplicateIndex)
      outputLabels.push(`pin${requestedPinNumber}_alt${duplicateIndex}`)
    }

    for (const label of labels) {
      if (/^\d+$/.test(label)) continue

      const totalOccurrences = nonNumericTotals.get(label) ?? 0
      if (totalOccurrences <= 1) {
        outputLabels.push(label)
        continue
      }

      const occurrenceIndex = (nonNumericSeenCounts.get(label) ?? 0) + 1
      nonNumericSeenCounts.set(label, occurrenceIndex)
      outputLabels.push(`${label}${occurrenceIndex}`)
    }

    return outputLabels
  })
}
