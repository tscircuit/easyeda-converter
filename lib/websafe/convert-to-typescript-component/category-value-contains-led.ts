export const categoryValueContainsLed = (value: unknown): boolean => {
  if (typeof value === "string") {
    if (/(^|[^a-z])leds?\s+drivers?([^a-z]|$)/i.test(value)) return false

    return (
      /(^|[^a-z])leds?([^a-z]|$)/i.test(value) ||
      /light[-\s]?emitting\s+diodes?/i.test(value)
    )
  }

  if (Array.isArray(value)) {
    return value.some(categoryValueContainsLed)
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsLed)
  }

  return false
}
