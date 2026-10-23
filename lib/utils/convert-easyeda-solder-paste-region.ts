import { pcb_solder_paste } from "circuit-json"
import type { z } from "zod"
import type { SolidRegionSchema } from "../schemas/package-detail-shape-schema"
import { mil10ToMm } from "./easyeda-unit-to-mm"
import { expandEasyEdaPathData } from "./expand-easyeda-path-data"

/** Convert a filled EasyEDA paste outline from canvas coordinates (10 mil,
 * +X right, +Y down) to mm in the same frame. The caller applies the common
 * footprint-to-board transform once, including its Y reflection.
 */
export const convertEasyEdaSolderPasteRegion = (
  solidRegion: z.infer<typeof SolidRegionSchema>,
  regionIndex: number,
) => {
  const commands = solidRegion.pathData.match(/[a-df-z]/gi) ?? []
  if (
    commands.filter((command) => command === "M").length !== 1 ||
    commands.some((command) => !["M", "L", "A", "Z"].includes(command))
  ) {
    throw new Error("Unsupported compound or curved EasyEDA solder-paste path")
  }
  return pcb_solder_paste.parse({
    type: "pcb_solder_paste",
    pcb_solder_paste_id: `pcb_solder_paste_${regionIndex + 1}`,
    pcb_component_id: "pcb_component_1",
    shape: "polygon",
    layer: solidRegion.layermask === 5 ? "top" : "bottom",
    points: expandEasyEdaPathData(solidRegion.pathData).map((point) => ({
      x: mil10ToMm(point.x),
      y: mil10ToMm(point.y),
    })),
  })
}
