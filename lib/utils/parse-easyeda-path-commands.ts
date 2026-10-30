export interface EasyEdaPathCommand {
  command: string
  arguments: number[]
}

const argumentCounts: Record<string, number> = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0,
}

/** Keep every command and consume the complete path, including text after Z. */
export const parseEasyEdaPathCommands = (
  pathData: string,
): EasyEdaPathCommand[] | null => {
  const commands: EasyEdaPathCommand[] = []
  let currentCommand: EasyEdaPathCommand | undefined
  let lastTokenEnd = 0

  for (const token of pathData.matchAll(
    /([a-df-z])|([-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?)/gi,
  )) {
    if (!/^[\s,]*$/.test(pathData.slice(lastTokenEnd, token.index))) return null
    lastTokenEnd = token.index + token[0].length

    if (token[1]) {
      if (!Object.hasOwn(argumentCounts, token[1].toUpperCase())) return null
      currentCommand = { command: token[1], arguments: [] }
      commands.push(currentCommand)
    } else {
      const commandArgument = Number(token[2])
      if (!currentCommand || !Number.isFinite(commandArgument)) return null
      currentCommand.arguments.push(commandArgument)
    }
  }

  if (!/^[\s,]*$/.test(pathData.slice(lastTokenEnd))) return null
  if (commands[0]?.command.toUpperCase() !== "M") return null
  for (const pathCommand of commands) {
    const argumentCount = argumentCounts[pathCommand.command.toUpperCase()]
    const count = pathCommand.arguments.length
    if (
      argumentCount === 0
        ? count !== 0
        : count === 0 || count % argumentCount !== 0
    ) {
      return null
    }
  }
  return commands
}
