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
 * {
 *   pin1: ["GND1"],
 *   pin2: ["GND2"],
 *   pin3: ["VCC"],
 *   pin4: [],
 *   pin5: ["pin3_alt1"]
 * }
 */
export const normalizePinLabels = (
  pinLabels: string[][],
): Record<string, string[]> => {
  if (pinLabels.length === 0) return {}

  const result: Record<string, string[]> = {}
  const labelCounts: Record<string, number> = {}
  const usedLabels = new Set<string>()

  // Initialize result object with empty arrays
  pinLabels.forEach((_, index) => {
    result[`pin${index + 1}`] = []
  })

  // Process each pin's labels
  pinLabels.forEach((labels, pinIndex) => {
    const pinKey = `pin${pinIndex + 1}`

    // Skip empty label arrays
    if (labels.length === 0) {
      return
    }

    // Check if pin number matches current position
    const hasMatchingNumber = labels.some(
      (label) => label === (pinIndex + 1).toString(),
    )
    if (hasMatchingNumber) {
      // Don't add the number to result if it matches the pin position
      return
    }

    const normalizedLabels: string[] = []

    for (const label of labels) {
      // Skip if label is a number that matches another pin position
      if (/^\d+$/.test(label) && Number.parseInt(label) <= pinLabels.length) {
        continue
      }

      // Handle duplicate labels
      if (/^\d+$/.test(label)) {
        // For numeric labels that don't match positions, create alt label
        const altLabel = `pin${label}_alt${labelCounts[label] || 1}`
        labelCounts[label] = (labelCounts[label] || 1) + 1
        if (!usedLabels.has(altLabel)) {
          normalizedLabels.push(altLabel)
          usedLabels.add(altLabel)
        }
      } else {
        // For non-numeric labels
        let finalLabel = label
        if (usedLabels.has(label)) {
          labelCounts[label] = (labelCounts[label] || 1) + 1
          finalLabel = `${label}${labelCounts[label] - 1}`
        }
        normalizedLabels.push(finalLabel)
        usedLabels.add(finalLabel)
      }
    }

    if (normalizedLabels.length > 0) {
      result[pinKey] = normalizedLabels
    }
  })

  return result
}
