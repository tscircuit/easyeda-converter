import { mil2mm } from "@tscircuit/mm"
import { applyToPoint, rotateDEG } from "transformation-matrix"
import type { z } from "zod"
import type { PadSchema } from "../schemas/package-detail-shape-schema"

/**
 * Copper and drill dimensions in pad-local mm. EasyEDA hole endpoints are
 * world points in 10 mil units, with +Y down; its pad rotation is CCW.
 * Undo that rotation in the Y-down frame before selecting the slot axis.
 * Returned rotation is CCW in the converter's eventual Y-up PCB frame.
 */
export const getEasyEdaPlatedHoleGeometry = (
  pad: z.infer<typeof PadSchema>,
) => {
  const holeDiameterMm = mil2mm(pad.holeRadius) * 2
  const holeLengthMm = pad.holeLength ? mil2mm(pad.holeLength) : 0
  let holeWidthMm = holeDiameterMm
  let holeHeightMm = holeDiameterMm

  if (holeLengthMm > holeDiameterMm) {
    if (!pad.holePoints) {
      throw new Error(`Slot on pad ${pad.number} is missing hole endpoints`)
    }
    const [start, end] = pad.holePoints
    const localHoleDirection = applyToPoint(rotateDEG(pad.rotation), {
      x: end.x - start.x,
      y: end.y - start.y,
    })
    const absX = Math.abs(localHoleDirection.x)
    const absY = Math.abs(localHoleDirection.y)
    // Source endpoints are rounded independently of the rotation/dimensions.
    if (Math.min(absX, absY) > Math.max(absX, absY) * 0.001) {
      throw new Error(`Slot on pad ${pad.number} is not aligned with its pad`)
    }
    if (absX > absY) holeWidthMm = holeLengthMm
    else holeHeightMm = holeLengthMm
  }

  if (pad.shape === "RECT") {
    return {
      shape: "rotated_pill_hole_with_rect_pad" as const,
      hole_shape: "rotated_pill" as const,
      pad_shape: "rect" as const,
      hole_width: holeWidthMm,
      hole_height: holeHeightMm,
      hole_ccw_rotation: pad.rotation,
      rect_ccw_rotation: pad.rotation,
      rect_pad_width: mil2mm(pad.width),
      rect_pad_height: mil2mm(pad.height),
    }
  }
  if (pad.shape === "OVAL" || holeLengthMm > holeDiameterMm) {
    return {
      shape: "pill" as const,
      hole_width: holeWidthMm,
      hole_height: holeHeightMm,
      outer_width: mil2mm(pad.width),
      outer_height: mil2mm(pad.height),
      ccw_rotation: pad.rotation,
    }
  }
  return {
    shape: "circle" as const,
    hole_diameter: holeDiameterMm,
    outer_diameter: mil2mm(pad.width),
    radius: mil2mm(pad.holeRadius),
  }
}
