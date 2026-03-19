export type ModelBounds = {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

const getStepLengthUnitToMm = (stepText: string): number => {
  const unitMatch = stepText.match(
    /SI_UNIT\s*\(\s*(?:(\.[A-Z]+\.)|\$)\s*,\s*\.METRE\.\s*\)/i,
  )

  const prefix = unitMatch?.[1]?.toUpperCase()

  switch (prefix) {
    case ".MILLI.":
      return 1
    case ".CENTI.":
      return 10
    case ".DECI.":
      return 100
    case ".MICRO.":
      return 0.001
    case ".NANO.":
      return 0.000001
    case ".KILO.":
      return 1_000_000
    default:
      // STEP default for METRE without a prefix is meters.
      return 1000
  }
}

export const parseStepBounds = (stepText: string): ModelBounds | null => {
  const unitToMm = getStepLengthUnitToMm(stepText)
  const pointRegex =
    /CARTESIAN_POINT\s*\(\s*'[^']*'\s*,\s*\(\s*([+-]?(?:\d+\.?\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?)\s*,\s*([+-]?(?:\d+\.?\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?)\s*,\s*([+-]?(?:\d+\.?\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?)\s*\)\s*\)/g

  let minX = Number.POSITIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let minZ = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  let maxZ = Number.NEGATIVE_INFINITY
  let vertexCount = 0

  for (const match of stepText.matchAll(pointRegex)) {
    const x = Number(match[1]) * unitToMm
    const y = Number(match[2]) * unitToMm
    const z = Number(match[3]) * unitToMm

    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      continue
    }

    vertexCount += 1
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    minZ = Math.min(minZ, z)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    maxZ = Math.max(maxZ, z)
  }

  if (vertexCount === 0) return null

  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  }
}
