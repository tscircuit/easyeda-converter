import { z } from "zod"
import type { EasyEdaJson } from "./schemas/easy-eda-json-schema"
import { PadSchema } from "./schemas/package-detail-shape-schema"

export const generateFootprintTsx = (easyEdaJson: EasyEdaJson): string => {
  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD"
  )

  const footprintElements = pads.map((pad) => {
    const { center, width, height, holeRadius, number } = pad
    const isPlatedHole = holeRadius !== undefined && holeRadius > 0

    if (isPlatedHole) {
      return `
        <platedhole
          x="${center.x}mm"
          y="${center.y}mm"
          hole_diameter="${holeRadius * 2}mm"
          outer_diameter="${width}mm"
          port_hints={["${number}"]}
        />`
    } else {
      return `
        <smtpad
          x="${center.x}mm"
          y="${center.y}mm"
          width="${width}mm"
          height="${height}mm"
          shape="rect"
          port_hints={["${number}"]}
        />`
    }
  })

  return `
      <footprint>
        ${footprintElements.join("\n")}
      </footprint>
  `.trim()
}
