import type { Point } from "@tscircuit/math-utils"
import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import type { SingleLetterShape } from "lib/schemas/single-letter-shape-schema"

const REFERENCE_TEXT_MARGIN_SCHEMATIC_UNITS = 0.2

export const generateSymbolReferenceText = ({
  shapes,
  bounds,
  transformPoint,
}: {
  shapes: SingleLetterShape[]
  bounds: BetterEasyEdaJson["dataStr"]["BBox"]
  transformPoint: (point: Point) => Point
}): string | undefined => {
  const hasVisibleReferenceText = shapes.some(
    (shape) =>
      shape.type === "TEXT" &&
      shape.visibility === "1" &&
      (shape.isReferenceDesignator ||
        /\{(?:NAME|REF|REFERENCE)\}/.test(shape.content)),
  )
  if (hasVisibleReferenceText) return undefined

  // The source bounds include the pin stems and existing annotations, so a
  // label above them stays clear of the imported symbol artwork.
  const position = transformPoint({
    x: bounds.x + bounds.width / 2,
    y: bounds.y,
  })
  const schY = Number(
    (position.y + REFERENCE_TEXT_MARGIN_SCHEMATIC_UNITS).toFixed(6),
  )
  return `<schematictext schX={${position.x}} schY={${schY}} text="{NAME}" fontSize={0.2} anchor="bottom_center" />`
}
