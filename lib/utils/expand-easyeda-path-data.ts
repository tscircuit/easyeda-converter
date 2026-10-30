import { generateArcFromSweep } from "../math/arc-utils"
import { parseEasyEdaPathCommands } from "./parse-easyeda-path-commands"

/**
 * Walk an EasyEDA SOLIDREGION pathData string into concrete points. The schema
 * only recovers M/L commands, so A commands are expanded here to keep curved
 * outlines faithful to the source.
 */
export const expandEasyEdaPathData = (pathData: string) => {
  const rawRoute: Array<{ x: number; y: number }> = []
  let currentPoint: { x: number; y: number } | undefined

  for (const pathCommand of parseEasyEdaPathCommands(pathData) ?? []) {
    const command = pathCommand.command.toUpperCase()
    const commandArguments = pathCommand.arguments

    if ((command === "M" || command === "L") && commandArguments.length >= 2) {
      // SVG commands may omit repeated command letters between argument groups.
      // Extra M coordinate pairs are implicit L commands.
      for (let offset = 0; offset + 1 < commandArguments.length; offset += 2) {
        currentPoint = {
          x: commandArguments[offset]!,
          y: commandArguments[offset + 1]!,
        }
        rawRoute.push(currentPoint)
      }
    } else if (
      command === "A" &&
      currentPoint &&
      commandArguments.length >= 7
    ) {
      for (let offset = 0; offset + 6 < commandArguments.length; offset += 7) {
        const [radiusX, , , largeArcFlag, sweepFlag, endX, endY] =
          commandArguments.slice(offset, offset + 7)
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
  }

  return rawRoute
}
