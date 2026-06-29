export const categoryValueContainsDiode = (value: unknown): boolean => {
  if (typeof value === "string") {
    return /(^|[^a-z])diodes?([^a-z]|$)/i.test(value)
  }

  if (Array.isArray(value)) {
    return value.some(categoryValueContainsDiode)
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsDiode)
  }

  return false
}
