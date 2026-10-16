import { mil2mm } from "@tscircuit/mm"
import { pcb_fabrication_note_path } from "circuit-json"
import { applyToPoint, compose, rotate, translate } from "transformation-matrix"
import type { z } from "zod"
import { generateArcFromSweep } from "../math/arc-utils"
import type {
  ArcSchema,
  CircleSchema,
  RectSchema,
} from "../schemas/package-detail-shape-schema"
import { mil10ToMm } from "./easyeda-unit-to-mm"

/** Convert supplier document artwork into footprint-local points in mm.
 * EasyEDA's Y-down frame is retained here; the main importer performs the same
 * final Y reflection/recentering as it does for pads and other artwork.
 */
export const convertDocumentShapeToFabricationPath = (
  shape:
    | z.infer<typeof ArcSchema>
    | z.infer<typeof CircleSchema>
    | z.infer<typeof RectSchema>,
  shapeIndex: number,
) => {
  const common = {
    type: "pcb_fabrication_note_path" as const,
    pcb_fabrication_note_path_id: `pcb_fabrication_note_${shape.type.toLowerCase()}_${shapeIndex + 1}`,
    pcb_component_id: "pcb_component_1",
    layer: "top" as const,
  }
  if (shape.type === "CIRCLE") {
    const center = {
      x: mil10ToMm(shape.center.x),
      y: mil10ToMm(shape.center.y),
    }
    const radius = mil10ToMm(shape.radius)
    // Circuit JSON has no fabrication-circle primitive. Bound chord error to
    // 0.005 mm while retaining a minimum of 32 segments for small polarity dots.
    const segments = Math.max(
      32,
      Math.ceil(
        Math.PI / Math.acos(Math.max(-1, 1 - 0.005 / Math.max(radius, 0.005))),
      ),
    )
    const route = Array.from({ length: segments }, (_, i) => ({
      x: center.x + radius * Math.cos((i * 2 * Math.PI) / segments),
      y: center.y + radius * Math.sin((i * 2 * Math.PI) / segments),
    }))
    route.push({ ...route[0]! })
    return pcb_fabrication_note_path.parse({
      ...common,
      route,
      stroke_width: mil10ToMm(shape.width),
    })
  }
  if (shape.type === "ARC") {
    // Preserve the supplier sweep; silkscreen's notch/end-cap heuristic should
    // not change fabrication artwork.
    const route = generateArcFromSweep(
      shape.start.x,
      shape.start.y,
      shape.end.x,
      shape.end.y,
      shape.radiusX,
      shape.largeArc,
      shape.sweepDirection === "CW",
    ).map((p) => ({ x: mil10ToMm(p.x), y: mil10ToMm(p.y) }))
    return pcb_fabrication_note_path.parse({
      ...common,
      route,
      stroke_width: mil10ToMm(shape.width),
    })
  }
  const width = mil2mm(shape.width)
  const height = mil2mm(shape.height)
  const frame = compose(
    translate(mil2mm(shape.x) + width / 2, mil2mm(shape.y) + height / 2),
    rotate(((shape.rotation ?? 0) * Math.PI) / 180),
  )
  const corners = [
    { x: -width / 2, y: -height / 2 },
    { x: width / 2, y: -height / 2 },
    { x: width / 2, y: height / 2 },
    { x: -width / 2, y: height / 2 },
  ].map((p) => applyToPoint(frame, p))
  return pcb_fabrication_note_path.parse({
    ...common,
    route: [...corners, { ...corners[0]! }],
    stroke_width: mil10ToMm(shape.lineWidth),
    is_filled: shape.fillStyle !== "none",
    has_stroke: shape.lineWidth > 0,
  })
}
