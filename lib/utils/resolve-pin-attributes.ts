import type { CommonComponentProps, PinAttributeMap } from "@tscircuit/props"

export type SuppliedPinAttributes = NonNullable<
  CommonComponentProps["pinAttributes"]
>

const physicalPinKey = (pin: string | number) =>
  String(pin).trim().replace(/^pin/, "")

const attributeValuesEqual = (first: unknown, second: unknown) => {
  if (Array.isArray(first) && Array.isArray(second)) {
    const firstValues = new Set(first)
    const secondValues = new Set(second)
    return (
      firstValues.size === secondValues.size &&
      [...firstValues].every((value) => secondValues.has(value))
    )
  }
  return first === second
}

/** Resolve supplied attributes against the actual footprint pad identifier. */
export const resolvePinAttributes = (
  pinAttributes: SuppliedPinAttributes | undefined,
  {
    physicalPinNumber,
    aliases = [],
    physicalPinNumbers = [],
  }: {
    physicalPinNumber?: string | number
    aliases?: readonly string[]
    physicalPinNumbers?: readonly (string | number)[]
  },
): PinAttributeMap | undefined => {
  if (!pinAttributes) return undefined
  const physicalPin =
    physicalPinNumber === undefined ? "" : physicalPinKey(physicalPinNumber)
  const physicalKeys = physicalPin ? [physicalPin, `pin${physicalPin}`] : []
  const hasPhysicalRow = physicalKeys.some(
    (key) =>
      Object.hasOwn(pinAttributes, key) && pinAttributes[key] !== undefined,
  )
  const knownPhysicalPins = new Set(physicalPinNumbers.map(physicalPinKey))
  const candidateKeys = hasPhysicalRow
    ? physicalKeys
    : [...new Set(aliases)].filter((alias) => {
        const aliasPin = physicalPinKey(alias)
        const isPhysicalAlias =
          /^(?:pin)?\d+$/.test(alias) || knownPhysicalPins.has(aliasPin)
        return !isPhysicalAlias || aliasPin === physicalPin
      })

  let hasCandidate = false
  const attributes: PinAttributeMap = {}
  for (const key of candidateKeys) {
    if (!Object.hasOwn(pinAttributes, key)) continue
    const candidate = pinAttributes[key]
    if (candidate === undefined) continue
    hasCandidate = true
    for (const [name, value] of Object.entries(candidate)) {
      if (value === undefined) continue
      if (
        !hasPhysicalRow &&
        name in attributes &&
        !attributeValuesEqual(attributes[name as keyof PinAttributeMap], value)
      )
        return undefined
      Object.assign(attributes, { [name]: value })
    }
  }
  // An explicitly empty physical row remains authoritative over inference.
  return hasCandidate ? attributes : undefined
}
