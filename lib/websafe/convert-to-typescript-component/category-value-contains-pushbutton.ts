export const categoryValueContainsPushbutton = (value: unknown): boolean => {
  if (typeof value === "string") {
    const normalized = value.toLowerCase()

    if (
      /analog\s+switch/.test(normalized) ||
      /multiplex/.test(normalized) ||
      /switching\s+diodes?/.test(normalized) ||
      /\bics?\b/.test(normalized)
    ) {
      return false
    }

    return (
      /push\s*buttons?/.test(normalized) ||
      /pushbuttons?/.test(normalized) ||
      /tact(?:ile)?\s+switch(?:es)?/.test(normalized) ||
      /keyboard\s+(?:switch(?:es)?|shaft)/.test(normalized) ||
      /mechanical\s+keyboard\s+shaft/.test(normalized)
    )
  }

  if (Array.isArray(value)) {
    return value.some(categoryValueContainsPushbutton)
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsPushbutton)
  }

  return false
}
