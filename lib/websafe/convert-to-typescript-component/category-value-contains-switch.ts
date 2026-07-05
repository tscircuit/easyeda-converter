export const categoryValueContainsSwitch = (value: unknown): boolean => {
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
      /(?:slide|toggle|dip|key|micro|limit)\s+switch(?:es)?/.test(normalized) ||
      /(^|[^a-z])switch(?:es)?([^a-z]|$)/.test(normalized)
    )
  }

  if (Array.isArray(value)) {
    return value.some(categoryValueContainsSwitch)
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsSwitch)
  }

  return false
}
