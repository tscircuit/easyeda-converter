import { z } from "zod"
import type { EasyEdaJson } from "./schemas/easy-eda-json-schema"
import { PadSchema } from "./schemas/package-detail-shape-schema"

export const generateFootprintTsx = (easyEdaJson: EasyEdaJson): string => {
  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD"
  )

  // Calculate the center point of all pads
  const minX = Math.min(...pads.map((pad) => pad.center.x))
  const maxX = Math.max(...pads.map((pad) => pad.center.x))
  const minY = Math.min(...pads.map((pad) => pad.center.y))
  const maxY = Math.max(...pads.map((pad) => pad.center.y))

  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  const footprintElements = pads.map((pad) => {
    const { center, width, height, holeRadius, number } = pad
    const isPlatedHole = holeRadius !== undefined && holeRadius > 0

    // Normalize the position by subtracting the center point
    const normalizedX = center.x - centerX
    const normalizedY = center.y - centerY

    if (isPlatedHole) {
      return `
        <platedhole
          pcbX="${normalizedX.toFixed(2)}mm"
          pcbY="${normalizedY.toFixed(2)}mm"
          hole_diameter="${holeRadius * 2}mm"
          outer_diameter="${width}mm"
          port_hints={["${number}"]}
        />`.trim()
    } else {
      return `
        <smtpad
          pcbX="${normalizedX.toFixed(2)}mm"
          pcbY="${normalizedY.toFixed(2)}mm"
          width="${width}mm"
          height="${height}mm"
          shape="rect"
          port_hints={["${number}"]}
        />`.trim()
    }
  })

  return `
      <footprint>
        ${footprintElements.join("\n")}
      </footprint>
  `.trim()
}
