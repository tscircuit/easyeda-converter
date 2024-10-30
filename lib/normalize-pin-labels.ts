/**
 * Normalizes pin labels such that they are unique while preserving numbering
 * where not confusing.
 *
 * Example input:
 * [
 *   ["1", "GND"],
 *   ["2", "GND"],
 *   ["3", "VCC"],
 *   ["3"],
 *   ["4"]
 * ]
 *
 * Example output:
 * [
 *   ["pin1", "GND1"],
 *   ["pin2", "GND2"],
 *   ["pin3", "VCC"],
 *   ["pin5", "pin3_alt1"],
 *   ["pin4", ""]
 * ]
 */
export const normalizePinLabels = (pinLabels: string[][]): string[][] => {
  if (pinLabels.length === 0) return []

  const result: string[][] = Array(pinLabels.length).fill([])
  const labelCounts: Record<string, number> = {}
  const usedLabels = new Set<string>()

  // Initialize result array with pin numbers
  for (let i = 0; i < pinLabels.length; i++) {
    result[i] = [`pin${i + 1}`]
  }

  // First pass: Count occurrences of each label
  for (const labels of pinLabels) {
    for (const label of labels) {
      if (label !== "") {
        labelCounts[label] = (labelCounts[label] || 0) + 1
      }
    }
  }

  // Second pass: Process non-numeric labels first
  for (let pinIndex = 0; pinIndex < pinLabels.length; pinIndex++) {
    const labels = pinLabels[pinIndex]
    const normalizedLabels: string[] = []

    for (const label of labels) {
      if (!label || /^\d+$/.test(label)) continue // Skip empty and numeric labels for now

      if (labelCounts[label] > 1) {
        // If label appears multiple times, append number
        const count = usedLabels.has(label) ? 2 : 1
        const numberedLabel = `${label}${count}`
        normalizedLabels.push(numberedLabel)
        usedLabels.add(label)
      } else {
        // Unique label, use as-is
        normalizedLabels.push(label)
        usedLabels.add(label)
      }
    }

    if (normalizedLabels.length > 0) {
      result[pinIndex] = [result[pinIndex][0], ...normalizedLabels]
    }
  }

  // Third pass: Handle numeric labels
  const seenNumbers = new Set<string>()

  for (let pinIndex = 0; pinIndex < pinLabels.length; pinIndex++) {
    const labels = pinLabels[pinIndex]

    for (const label of labels) {
      if (!label || !/^\d+$/.test(label)) continue // Only process numeric labels

      // If the number matches the pin position, we don't need to do anything
      if (label === (pinIndex + 1).toString()) continue

      // If we've seen this number before, this is an alternate reference
      if (seenNumbers.has(label)) {
        if (result[pinIndex].length === 1) {
          result[pinIndex].push(`pin${label}_alt1`)
        }
      }

      seenNumbers.add(label)
    }
  }

  return result
}
