import type {
  PadSchema,
  TrackSchema,
  ArcSchema,
  SVGNodeSchema,
  HoleSchema,
} from "./schemas/package-detail-shape-schema"
import type { z } from "zod"
import type { BetterEasyEdaJson } from "./schemas/easy-eda-json-schema"
import type {
  AnySoupElement,
  PCBSMTPad,
  PcbSilkscreenPath,
  PCBPlatedHole,
  PCBPlatedHoleInput,
  PcbComponentInput,
} from "circuit-json"
import {
  any_source_component,
  pcb_smtpad,
  pcb_silkscreen_path,
  pcb_plated_hole,
  pcb_hole,
} from "circuit-json"
import * as Soup from "circuit-json"
import { generateArcFromSweep, generateArcPathWithMid } from "./math/arc-utils"
import { findBoundsAndCenter, transformPCBElements } from "@tscircuit/soup-util"
import { compose, scale, translate } from "transformation-matrix"
import { computeCenterOffset } from "./compute-center-offset"
import { mm } from "@tscircuit/mm"
import { mil10ToMm } from "./utils/easyeda-unit-to-mm"

const mil2mm = (mil: number | string) => {
  if (typeof mil === "number") return mm(`${mil}mil`)
  if (mil.match(/^\d+$/)) return mm(`${mil}mil`)
  return mm(mil)
}
/**
 * Some components, like paths and "HOLE", seem to use mil*10 as
 * their unlabeled unit
 */
const milx10 = (mil10: number | string) => {
  if (typeof mil10 === "number") return mil2mm(mil10) * 10
  if (mil10.match(/^\d+$/)) return mil2mm(mil10) * 10
  // If it has a unit, return the specified unit ignoring the multiplier
  return mil2mm(mil10)
}

const handleSilkscreenPath = (
  track: z.infer<typeof TrackSchema>,
  index: number,
) => {
  return pcb_silkscreen_path.parse({
    type: "pcb_silkscreen_path",
    pcb_silkscreen_path_id: `pcb_silkscreen_path_${index + 1}`,
    pcb_component_id: "pcb_component_1",
    layer: "top", // Assuming all silkscreen is on top layer
    route: track.points.map((point) => ({
      x: milx10(point.x),
      y: milx10(point.y),
    })),
    stroke_width: mil10ToMm(track.width),
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
    arc.sweepDirection === "CW",
  )

  return pcb_silkscreen_path.parse({
    type: "pcb_silkscreen_path",
    pcb_silkscreen_path_id: `pcb_silkscreen_arc_${index + 1}`,
    pcb_component_id: "pcb_component_1",
    layer: "top", // Assuming all silkscreen is on top layer
    route: arcPath.map((p) => ({
      x: milx10(p.x),
      y: milx10(p.y),
    })),
    stroke_width: mil10ToMm(arc.width),
  } as Soup.PcbSilkscreenPathInput)
}

const handleHole = (hole: z.infer<typeof HoleSchema>, index: number) => {
  return pcb_hole.parse({
    type: "pcb_hole",
    x: milx10(hole.center.x),
    y: milx10(hole.center.y),
    hole_diameter: milx10(hole.radius) * 2,
    hole_shape: "circle",
    pcb_hole_id: `pcb_hole_${index + 1}`,
  } as Soup.PcbHole)
}

interface Options {
  useModelCdn?: boolean
  shouldRecenter?: boolean
}

export const convertEasyEdaJsonToCircuitJson = (
  easyEdaJson: BetterEasyEdaJson,
  { useModelCdn, shouldRecenter = true }: Options = {},
): AnySoupElement[] => {
  const soupElements: AnySoupElement[] = []
  const centerOffset = computeCenterOffset(easyEdaJson)

  // Add source component
  const source_component = any_source_component.parse({
    type: "source_component",
    source_component_id: "source_component_1",
    name: "U1",
    ftype: "simple_bug",
  })

  const pcb_component = Soup.pcb_component.parse({
    type: "pcb_component",
    pcb_component_id: "pcb_component_1",
    source_component_id: "source_component_1",
    name: "U1",
    ftype: "simple_bug",
    width: 0, // we update this at the end
    height: 0, // we update this at the end
    rotation: 0,
    center: { x: 0, y: 0 },
    layer: "top",
  } as PcbComponentInput)

  soupElements.push(source_component, pcb_component)

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

      if (pad.holeRadius !== undefined && mil2mm(pad.holeRadius) !== 0) {
        // Add pcb_plated_hole
        soupElements.push(
          pcb_plated_hole.parse({
            type: "pcb_plated_hole",
            pcb_plated_hole_id: `pcb_plated_hole_${index + 1}`,
            shape: "circle",
            x: mil2mm(pad.center.x),
            y: mil2mm(pad.center.y),
            hole_diameter: mil2mm(pad.holeRadius) * 2,
            outer_diameter: mil2mm(pad.width),
            radius: mil2mm(pad.holeRadius),
            port_hints: [portNumber],
            pcb_component_id: "pcb_component_1",
            pcb_port_id: `pcb_port_${index + 1}`,
            layers: ["top"],
          } as PCBPlatedHoleInput),
        )
      } else {
        // Add pcb_smtpad
        let soupShape: PCBSMTPad["shape"] | undefined
        if (pad.shape === "RECT") {
          soupShape = "rect"
        } else if (pad.shape === "ELLIPSE") {
          // This is just a bug
          soupShape = "rect"
        } else if (pad.shape === "OVAL") {
          // OVAL is often a rect, especially when holeRadius is 0
          soupShape = "rect"
        }
        if (!soupShape) {
          throw new Error(`unknown pad.shape: "${pad.shape}"`)
        }

        const parsedPcbSmtpad = pcb_smtpad.parse({
          type: "pcb_smtpad",
          pcb_smtpad_id: `pcb_smtpad_${index + 1}`,
          shape: soupShape,
          x: mil2mm(pad.center.x),
          y: mil2mm(pad.center.y),
          ...(soupShape === "rect"
            ? { width: mil2mm(pad.width), height: mil2mm(pad.height) }
            : { radius: Math.min(mil2mm(pad.width), mil2mm(pad.height)) / 2 }),
          layer: "top",
          port_hints: [portNumber],
          pcb_component_id: "pcb_component_1",
          pcb_port_id: `pcb_port_${index + 1}`,
        } as PCBSMTPad)
        soupElements.push(parsedPcbSmtpad)
      }
    })

  // Add holes
  easyEdaJson.packageDetail.dataStr.shape
    .filter(
      (shape): shape is z.infer<typeof HoleSchema> => shape.type === "HOLE",
    )
    .forEach((h, index) => {
      soupElements.push(handleHole(h, index))
    })

  // Add silkscreen paths and arcs
  easyEdaJson.packageDetail.dataStr.shape.forEach((shape, index) => {
    if (shape.type === "TRACK") {
      soupElements.push(handleSilkscreenPath(shape, index))
    } else if (shape.type === "ARC") {
      soupElements.push(handleSilkscreenArc(shape, index))
    }
  })

  // TODO Change pcb_component width & height

  // TODO compute pcb center based on all elements and transform elements such
  // that the center is (0,0)

  // Add 3d component
  const svgNode = easyEdaJson.packageDetail.dataStr.shape.find(
    (a): a is z.infer<typeof SVGNodeSchema> =>
      Boolean(a.type === "SVGNODE" && a.svgData.attrs?.uuid),
  )
  const objFileUuid = svgNode?.svgData?.attrs?.uuid

  const objFileUrl = objFileUuid
    ? useModelCdn
      ? `https://modelcdn.tscircuit.com/easyeda_models/download?uuid=${objFileUuid}&pn=${easyEdaJson.lcsc.number}`
      : `https://modules.easyeda.com/3dmodel/${objFileUuid}`
    : undefined

  if (objFileUrl !== undefined) {
    const [rx, ry, rz] = (svgNode?.svgData.attrs?.c_rotation ?? "0,0,0")
      .split(",")
      .map(Number)
    soupElements.push(
      Soup.cad_component.parse({
        type: "cad_component",
        cad_component_id: "cad_component_1",
        source_component_id: "source_component_1",
        pcb_component_id: "pcb_component_1",
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: rx, y: ry, z: rz },
        model_obj_url: objFileUrl,
      } as Soup.CadComponentInput),
    )
  }

  if (shouldRecenter) {
    const bounds = findBoundsAndCenter(
      // exclude the pcb_component because it's center is currently incorrect,
      // we set it to (0,0)
      soupElements.filter((e) => e.type !== "pcb_component"),
    )
    transformPCBElements(
      soupElements,
      compose(translate(-bounds.center.x, bounds.center.y), scale(1, -1)),
    )
    pcb_component.center = { x: 0, y: 0 }
  }

  return soupElements
}

/** @deprecated Use `convertEasyEdaJsonToCircuitJson` instead. */
export const convertEasyEdaJsonToTscircuitSoupJson =
  convertEasyEdaJsonToCircuitJson
