const getCategoryStrings = (category: unknown): string[] => {
  if (typeof category === "string") return [category.toLowerCase()]
  if (Array.isArray(category)) return category.flatMap(getCategoryStrings)
  if (category && typeof category === "object") {
    return Object.values(category).flatMap(getCategoryStrings)
  }
  return []
}

export const categoryValueContainsSwitch = (category: unknown): boolean => {
  const categoryStrings = getCategoryStrings(category)

  // Semiconductor categories take precedence over generic parent categories
  // such as "Switches", even when they appear in different metadata fields.
  if (
    categoryStrings.some(
      (category) =>
        /analog[\s-]+switch/.test(category) ||
        /multiplex/.test(category) ||
        /switching\s+diodes?/.test(category) ||
        /\bics?\b/.test(category) ||
        /\b(?:power[\s-]+distribution|load)[\s-]+switch(?:es)?\b/.test(
          category,
        ),
    )
  ) {
    return false
  }

  return categoryStrings.some(
    (category) =>
      /(?:slide|toggle|dip|key|micro|limit)\s+switch(?:es)?/.test(category) ||
      /(^|[^a-z])switch(?:es)?([^a-z]|$)/.test(category),
  )
}
