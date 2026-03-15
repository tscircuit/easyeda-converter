export const wrapTsxWithBoardFor3dSnapshot = (tsx: string): string => {
  const lines = tsx.split("\n")
  const chipLineIndex = lines.findIndex((line) => line.includes("<chip"))

  if (chipLineIndex === -1) {
    throw new Error("Expected generated TSX to contain a root <chip> element")
  }

  const chipIndent = lines[chipLineIndex].match(/^\s*/)![0]
  lines.splice(chipLineIndex, 0, `${chipIndent}<board >`)

  let chipCloseLineIndex = -1
  for (let i = lines.length - 1; i > chipLineIndex; i--) {
    if (lines[i].trim() === "/>") {
      chipCloseLineIndex = i
      break
    }
  }

  if (chipCloseLineIndex === -1) {
    throw new Error("Expected generated TSX to contain a closing root /> line")
  }

  lines.splice(chipCloseLineIndex + 1, 0, `${chipIndent}</board>`)

  return lines.join("\n")
}
