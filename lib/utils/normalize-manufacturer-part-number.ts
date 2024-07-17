export function normalizeManufacturerPartNumber(partNumber: string): string {
  // Step 1: Replace dashes with underscores
  let normalized = partNumber.replace(/-/g, "_")

  // Step 2: Remove all invalid symbols
  normalized = normalized.replace(/[^a-zA-Z0-9_$]/g, "")

  // Step 3: If the string starts with a number, prepend 'A'
  if (/^\d/.test(normalized)) {
    normalized = "A" + normalized
  }

  return normalized
}
