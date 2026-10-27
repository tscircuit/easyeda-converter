export const categoryValueContainsCrystal = (value: unknown): boolean => {
  if (typeof value === "string") {
    return /^crystals?$/i.test(value.trim())
  }

  if (Array.isArray(value)) {
    return value.some(categoryValueContainsCrystal)
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(categoryValueContainsCrystal)
  }

  return false
}
