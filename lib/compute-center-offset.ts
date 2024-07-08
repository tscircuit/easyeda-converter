import type { z } from "zod"
import type { EasyEdaJson } from "./schemas/easy-eda-json-schema"
import type { PadSchema } from "./schemas/package-detail-shape-schema"
import { mm } from "@tscircuit/mm"

export const computeCenterOffset = (easyeda: EasyEdaJson) => {
  const pads = easyeda.packageDetail.dataStr.shape.filter(
    (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD"
  )

  const minX = Math.min(...pads.map((pad) => mm(pad.center.x)))
  const maxX = Math.max(...pads.map((pad) => mm(pad.center.x)))
  const minY = Math.min(...pads.map((pad) => mm(pad.center.y)))
  const maxY = Math.max(...pads.map((pad) => mm(pad.center.y)))

  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  return {
    x: centerX,
    y: centerY,
  }
}
