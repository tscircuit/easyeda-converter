import { mil2mm } from "@tscircuit/mm"
import type { z } from "zod"
import type { SolidRegionSchema } from "../schemas/package-detail-shape-schema"
import { expandEasyEdaPathData } from "./expand-easyeda-path-data"

/**
 * EasyEDA stores non-plated through-hole slots as SOLIDREGION paths on the
 * multi-layer layer rather than as HOLE records, so they are easy to miss.
 * Returns polygon points for a pcb_cutout, or null when the path has no usable
 * outline. Callers wrap this in pcb_cutout.parse.
 *
 * A pcb_cutout polygon keeps a rounded outline exact; pcb_hole can only
 * approximate such a slot as an oval.
 */
export const getEasyEdaNpthSlotGeometry = (
  solidRegion: z.infer<typeof SolidRegionSchema>,
): { points: Array<{ x: number; y: number }> } | null => {
  const rawRoute = expandEasyEdaPathData(solidRegion.pathData)
  if (rawRoute.length < 2) return null

  // Multiply after scaling rather than scaling after multiplying:
  // mil2mm(x) * 10 and x * 10 * 0.0254 disagree in the last bits for some
  // coordinates, which would perturb converted geometry.
  const points = rawRoute.map((point) => ({
    x: mil2mm(point.x) * 10,
    y: mil2mm(point.y) * 10,
  }))

  const firstPoint = points[0]!
  const lastPoint = points.at(-1)!
  if (firstPoint.x !== lastPoint.x || firstPoint.y !== lastPoint.y) {
    points.push({ ...firstPoint })
  }

  return { points }
}
