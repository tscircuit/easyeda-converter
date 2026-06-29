export const normalizePinLabels = (inputPinLabels: string[][]): string[][] => {
  const uniqueInputPinLabels = inputPinLabels.map((labels) => [
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

    let existingAltCount = 0
    for (const label of result[i]) {
      if (label.startsWith(`pin${desiredNumber}_alt`)) {
        existingAltCount += 1
      }
    }
    result[i].push(`pin${desiredNumber}_alt${existingAltCount + 1}`)
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
        result[i].push(label)
      } else {
        incrementalLabelCounts[label] = (incrementalLabelCounts[label] ?? 0) + 1
        result[i].push(`${label}${incrementalLabelCounts[label]}`)
      }
    }
  }

  return result
}
