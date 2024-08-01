export function normalizeManufacturerPartNumber(partNumber: string): string {
  // Step 1: Replace dashes and invalid symbols with underscores
  let normalized = partNumber.replace(/[-]/g, "_").replace(/[^a-zA-Z0-9_$]/g, "_")

  // Step 2: If the string starts with a number, prepend 'A'
  if (/^\d/.test(normalized)) {
    normalized = "A" + normalized
  }

  return normalized
}
