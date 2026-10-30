import type { AnyCircuitElement } from "circuit-json"
import { pcb_hole } from "circuit-json"
import type { z } from "zod"
import type { SolidRegionSchema } from "../schemas/package-detail-shape-schema"
import { getEasyEdaNpthPillHole } from "./get-easyeda-npth-pill-hole"

/** Replace capsules after recentering so changing element type cannot move pads. */
export const convertEasyEdaNpthCutoutsToHoles = (
  circuitJson: AnyCircuitElement[],
  npthRegions: z.infer<typeof SolidRegionSchema>[],
): AnyCircuitElement[] => {
  const npthPillHoles = npthRegions.map((region, index) => ({
    pcb_cutout_id: `pcb_cutout_npth_${index + 1}`,
    hole: getEasyEdaNpthPillHole(region.pathData),
  }))

  return circuitJson.map((element) => {
    if (element.type !== "pcb_cutout" || element.shape !== "polygon") {
      return element
    }
    const npthPillHole = npthPillHoles.find(
      (candidate) => candidate.pcb_cutout_id === element.pcb_cutout_id,
    )
    if (!npthPillHole?.hole) return element

    const xs = element.points.map((point) => point.x)
    const ys = element.points.map((point) => point.y)
    return pcb_hole.parse({
      type: "pcb_hole",
      pcb_hole_id: element.pcb_cutout_id.replace("pcb_cutout_", "pcb_hole_"),
      pcb_component_id: element.pcb_component_id,
      ...npthPillHole.hole,
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      y: (Math.min(...ys) + Math.max(...ys)) / 2,
    })
  })
}
