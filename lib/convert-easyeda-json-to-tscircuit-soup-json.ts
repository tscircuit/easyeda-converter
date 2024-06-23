import {
  PadSchema,
  TrackSchema,
  ArcSchema,
} from "./schemas/package-detail-shape-schema"
import { z } from "zod"
import type { EasyEdaJson } from "./schemas/easy-eda-json-schema"
import type {
  AnySoupElement,
  PCBSMTPad,
  PcbSilkscreenPath,
} from "@tscircuit/soup"
import {
  any_source_component,
  pcb_smtpad,
  pcb_silkscreen_path,
} from "@tscircuit/soup"
import { generateArcFromSweep, generateArcPathWithMid } from "./math/arc-utils"

const handleSilkscreenPath = (
  track: z.infer<typeof TrackSchema>,
  index: number
) => {
  return pcb_silkscreen_path.parse({
    type: "pcb_silkscreen_path",
    pcb_silkscreen_path_id: `pcb_silkscreen_path_${index + 1}`,
    pcb_component_id: "pcb_component_1",
    layer: "top", // Assuming all silkscreen is on top layer
    route: track.points.map((point) => ({ x: point.x, y: point.y })),
    stroke_width: track.width,
  })
}

const handleSilkscreenArc = (arc: z.infer<typeof ArcSchema>, index: number) => {
  const arcPath = generateArcFromSweep(
    arc.start.x,
    arc.start.y,
    arc.end.x,
    arc.end.y,
    arc.radiusX,
    arc.largeArc,
    arc.sweepDirection === "CW"
  )

  return pcb_silkscreen_path.parse({
    type: "pcb_silkscreen_path",
    pcb_silkscreen_path_id: `pcb_silkscreen_arc_${index + 1}`,
    pcb_component_id: "pcb_component_1",
    layer: "top", // Assuming all silkscreen is on top layer
    route: arcPath,
    stroke_width: arc.width,
  })
}

export const convertEasyEdaJsonToTscircuitSoupJson = (
  easyEdaJson: EasyEdaJson
): AnySoupElement[] => {
  const soupElements: AnySoupElement[] = []

  // Add source component
  const source_component = any_source_component.parse({
    type: "source_component",
    source_component_id: "source_component_1",
    name: "U1",
    ftype: "simple_bug",
  })
  soupElements.push(source_component)

  // Add source ports and pcb_smtpads
  easyEdaJson.packageDetail.dataStr.shape
    .filter((shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD")
    .forEach((pad, index) => {
      const portNumber = pad.number.toString()

      // Add source port
      soupElements.push({
        type: "source_port",
        source_port_id: `source_port_${index + 1}`,
        source_component_id: "source_component_1",
        name: portNumber,
      })

      // Add pcb_smtpad
      soupElements.push(
        pcb_smtpad.parse({
          type: "pcb_smtpad",
          pcb_smtpad_id: `pcb_smtpad_${index + 1}`,
          shape: pad.shape === "RECT" ? "rect" : "circle",
          x: pad.center.x,
          y: pad.center.y,
          ...(pad.shape === "RECT"
            ? { width: pad.width, height: pad.height }
            : { radius: Math.min(pad.width, pad.height) / 2 }),
          layer: "top",
          port_hints: [portNumber],
          pcb_component_id: "pcb_component_1",
          pcb_port_id: `pcb_port_${index + 1}`,
        } as PCBSMTPad)
      )
    })

  // Add silkscreen paths and arcs
  easyEdaJson.packageDetail.dataStr.shape.forEach((shape, index) => {
    if (shape.type === "TRACK") {
      soupElements.push(handleSilkscreenPath(shape, index))
    } else if (shape.type === "ARC") {
      soupElements.push(handleSilkscreenArc(shape, index))
    }
  })

  return soupElements
}