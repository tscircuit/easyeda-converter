import { z } from "zod"
import type { EasyEdaJson } from "./schemas/easy-eda-json-schema"
import { PadSchema } from "./schemas/package-detail-shape-schema"
import { computeCenterOffset } from "./compute-center-offset"

export const generateFootprintTsx = (easyEdaJson: EasyEdaJson): string => {
  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD",
  )

  const centerOffset = computeCenterOffset(easyEdaJson)
  const centerX = centerOffset.x
  const centerY = centerOffset.y

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
          portHints={["${number}"]}
        />`.replace(/\n/, "")
    } else {
      return `
        <smtpad
          pcbX="${normalizedX.toFixed(2)}mm"
          pcbY="${normalizedY.toFixed(2)}mm"
          width="${width}mm"
          height="${height}mm"
          shape="rect"
          portHints={["${number}"]}
        />`.replace(/\n/, "")
    }
  })

  return `
      <footprint>
        ${footprintElements.join("\n")}
      </footprint>
  `.trim()
}
