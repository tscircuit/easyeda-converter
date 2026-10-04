import { generateArcFromSweep } from "../math/arc-utils"

/**
 * Walk an EasyEDA SOLIDREGION pathData string into concrete points. The schema
 * only recovers M/L commands, so A commands are expanded here to keep curved
 * outlines faithful to the source.
 */
export const expandEasyEdaPathData = (pathData: string) => {
  const rawRoute: Array<{ x: number; y: number }> = []
  let currentPoint: { x: number; y: number } | undefined

  for (const commandMatch of pathData.matchAll(/([MLAZ])([^MLAZ]*)/gi)) {
    const command = commandMatch[1]?.toUpperCase()
    const values =
      commandMatch[2]
        ?.match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g)
        ?.map(Number) ?? []

    if ((command === "M" || command === "L") && values.length >= 2) {
      currentPoint = { x: values[0]!, y: values[1]! }
      rawRoute.push(currentPoint)
    } else if (command === "A" && currentPoint && values.length >= 7) {
      const [radiusX, , , largeArcFlag, sweepFlag, endX, endY] = values
      const generatedArcRoute = generateArcFromSweep(
        currentPoint.x,
        currentPoint.y,
        endX!,
        endY!,
        radiusX!,
        largeArcFlag === 1,
        sweepFlag === 1,
      )
      const maxArcSegments = 16
      const arcRoute =
        generatedArcRoute.length <= maxArcSegments + 1
          ? generatedArcRoute
          : Array.from({ length: maxArcSegments + 1 }, (_, pointIndex) =>
              generatedArcRoute.at(
                Math.round(
                  (pointIndex * (generatedArcRoute.length - 1)) /
                    maxArcSegments,
                ),
              ),
            ).filter((point): point is { x: number; y: number } => !!point)
      rawRoute.push(...arcRoute.slice(1))
      currentPoint = { x: endX!, y: endY! }
    }
  }

  return rawRoute
}
