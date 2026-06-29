export const wrapTsxWithBoardFor3dSnapshot = (tsx: string): string => {
  const lines = tsx.split("\n")
  const componentLineIndex = lines.findIndex(
    (line) =>
      line.includes("<chip") ||
      line.includes("<diode") ||
      line.includes("<led"),
  )

  if (componentLineIndex === -1) {
    throw new Error(
      "Expected generated TSX to contain a root <chip>, <diode>, or <led> element",
    )
  }

  const componentIndent = lines[componentLineIndex].match(/^\s*/)![0]
  lines.splice(componentLineIndex, 0, `${componentIndent}<board >`)

  let componentCloseLineIndex = -1
  for (let i = lines.length - 1; i > componentLineIndex; i--) {
    if (lines[i].trim() === "/>") {
      componentCloseLineIndex = i
      break
    }
  }

  if (componentCloseLineIndex === -1) {
    throw new Error("Expected generated TSX to contain a closing root /> line")
  }

  lines.splice(componentCloseLineIndex + 1, 0, `${componentIndent}</board>`)

  return lines.join("\n")
}
