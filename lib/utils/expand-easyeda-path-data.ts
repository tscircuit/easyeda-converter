import { generateArcFromSweep } from "../math/arc-utils"
import { expandEasyEdaBezierCommand } from "./expand-easyeda-bezier-command"
import { parseEasyEdaPathCommands } from "./parse-easyeda-path-commands"

/**
 * Expand a single EasyEDA SOLIDREGION outline, including relative commands,
 * axis-aligned lines, circular arcs, and Bezier curves. Reject unsupported
 * geometry rather than returning a partial outline.
 */
export const expandEasyEdaPathData = (pathData: string) => {
  const commands = parseEasyEdaPathCommands(pathData)
  if (!commands) throw new Error("Invalid EasyEDA SOLIDREGION path")
  for (const { command } of commands) {
    if (!/^[MLHVAZCSQT]$/i.test(command)) {
      throw new Error(
        `Unsupported EasyEDA SOLIDREGION path command: ${command}`,
      )
    }
  }
  if (commands.slice(1).some(({ command }) => command.toUpperCase() === "M")) {
    throw new Error("Multiple EasyEDA SOLIDREGION subpaths are not supported")
  }

  const rawRoute: Array<{ x: number; y: number }> = []
  let currentPoint: { x: number; y: number } | undefined
  let subpathStart: { x: number; y: number } | undefined
  let afterClose = false
  let cubicControl: { x: number; y: number } | undefined
  let quadraticControl: { x: number; y: number } | undefined

  for (const pathCommand of commands) {
    const command = pathCommand.command.toUpperCase()
    const relative = pathCommand.command !== command
    const commandArguments = pathCommand.arguments
    if (command !== "C" && command !== "S") cubicControl = undefined
    if (command !== "Q" && command !== "T") quadraticControl = undefined

    // Callers close the final outline. Add an intermediate close only when
    // another segment follows Z, preserving existing exported vertices.
    if (afterClose && command !== "Z" && currentPoint) {
      const lastPoint = rawRoute.at(-1)
      if (lastPoint?.x !== currentPoint.x || lastPoint?.y !== currentPoint.y) {
        rawRoute.push(currentPoint)
      }
    }
    afterClose = command === "Z"

    if ((command === "M" || command === "L") && commandArguments.length >= 2) {
      // SVG commands may omit repeated command letters between argument groups.
      // Extra M coordinate pairs are implicit L commands.
      for (let offset = 0; offset + 1 < commandArguments.length; offset += 2) {
        currentPoint = {
          x:
            commandArguments[offset]! + (relative ? (currentPoint?.x ?? 0) : 0),
          y:
            commandArguments[offset + 1]! +
            (relative ? (currentPoint?.y ?? 0) : 0),
        }
        rawRoute.push(currentPoint)
        if (command === "M" && offset === 0) subpathStart = currentPoint
      }
    } else if ((command === "H" || command === "V") && currentPoint) {
      for (const coordinate of commandArguments) {
        currentPoint = {
          x:
            command === "H"
              ? coordinate + (relative ? currentPoint.x : 0)
              : currentPoint.x,
          y:
            command === "V"
              ? coordinate + (relative ? currentPoint.y : 0)
              : currentPoint.y,
        }
        rawRoute.push(currentPoint)
      }
    } else if (/^[CSQT]$/.test(command) && currentPoint) {
      const curve = expandEasyEdaBezierCommand(pathCommand, {
        currentPoint,
        cubicControl,
        quadraticControl,
      })
      rawRoute.push(...curve.route)
      currentPoint = curve.currentPoint
      cubicControl = curve.cubicControl
      quadraticControl = curve.quadraticControl
    } else if (
      command === "A" &&
      currentPoint &&
      commandArguments.length >= 7
    ) {
      for (let offset = 0; offset + 6 < commandArguments.length; offset += 7) {
        const [radiusX, , , largeArcFlag, sweepFlag, endpointX, endpointY] =
          commandArguments.slice(offset, offset + 7)
        const endX: number = endpointX! + (relative ? currentPoint.x : 0)
        const endY: number = endpointY! + (relative ? currentPoint.y : 0)
        const generatedArcRoute = generateArcFromSweep(
          currentPoint.x,
          currentPoint.y,
          endX,
          endY,
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
        currentPoint = { x: endX, y: endY }
      }
    } else if (command === "Z" && subpathStart) {
      currentPoint = subpathStart
    }
  }

  return rawRoute
}
