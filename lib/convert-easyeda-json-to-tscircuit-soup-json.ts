import type {
  PadSchema,
  TrackSchema,
  ArcSchema,
  SVGNodeSchema,
  HoleSchema,
  ViaSchema,
  SolidRegionSchema,
} from "./schemas/package-detail-shape-schema"
import type { z } from "zod"
import type { BetterEasyEdaJson } from "./schemas/easy-eda-json-schema"
import type {
  AnyCircuitElement,
  PcbSmtPad,
  PcbViaInput,
  PcbComponentInput,
} from "circuit-json"
import {
  any_source_component,
  pcb_smtpad,
  pcb_silkscreen_path,
  pcb_plated_hole,
  pcb_hole,
  pcb_via,
} from "circuit-json"
import * as Soup from "circuit-json"
import { generateArcFromSweep, generateArcPathWithMid } from "./math/arc-utils"
import {
  findBoundsAndCenter,
  transformPCBElements,
} from "@tscircuit/circuit-json-util"
import { compose, scale, translate, applyToPoint } from "transformation-matrix"
import { mm } from "@tscircuit/mm"
import { mil10ToMm } from "./utils/easyeda-unit-to-mm"
import { normalizePinLabels } from "@tscircuit/core"
import { DEFAULT_PCB_THICKNESS_MM } from "./constants"
import { normalizeSymbolName } from "./utils/normalize-symbol-name"

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

const parseCadOffsetsFromSvgNode = (
  svgNode?: z.infer<typeof SVGNodeSchema>,
) => {
  const attrs = svgNode?.svgData?.attrs ?? {}
  const [cx, cy] = String(attrs.c_origin ?? "0,0")
    .split(",")
    .map((s) => Number(s.trim()))

  // z: bare numbers are mils; strings with units go through mm()
  const zStr = attrs.z ?? 0
  const z_mm =
    typeof zStr === "string" && /[a-z]/i.test(zStr)
      ? mm(zStr) // already has units
      : mm(`${Number(zStr) || 0}mil`) // bare number => mils

  return {
    position: {
      x: mil10ToMm(Number.isNaN(cx) ? 0 : cx),
      y: mil10ToMm(Number.isNaN(cy) ? 0 : cy),
      z: Math.max(0, -z_mm), // EasyEDA uses negative up; make it positive up
    },
    rotation: (() => {
      const [rx, ry, rz] = (attrs.c_rotation ?? "0,0,0").split(",").map(Number)
      return { x: rx || 0, y: ry || 0, z: rz || 0 }
    })(),
  }
}

/** Try mil and mil×10; clamp to a plausible component thickness */
const readModelHeightMm = (raw: unknown) => {
  const fallback = 3.5 // typical SMT component height (USB-C, QFN, etc.)
  if (raw == null) return fallback
  const n = Number(raw)
  if (!Number.isFinite(n)) return fallback

  const mmFromMil10 = mil10ToMm(n) // many EasyEDA unlabeled values
  const mmFromMil = mm(`${n}mil`) // sometimes plain mil

  // Use the larger of the two guesses, but clamp to a plausible thickness
  const upper = 12 // max reasonable package thickness (mm) - increased for connectors
  const lower = 0.1
  let chosen = Math.max(mmFromMil10, mmFromMil)
  if (chosen > upper || chosen < lower) chosen = fallback

  return chosen
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

const handleHoleCutout = (hole: z.infer<typeof HoleSchema>, index: number) => {
  return Soup.pcb_cutout.parse({
    type: "pcb_cutout",
    pcb_cutout_id: `pcb_cutout_from_hole_${index + 1}`,
    shape: "circle",
    center: { x: milx10(hole.center.x), y: milx10(hole.center.y) },
    radius: milx10(hole.radius),
  } as Soup.PcbCutoutCircleInput)
}

const handleVia = (via: z.infer<typeof ViaSchema>, index: number) => {
  return pcb_via.parse({
    type: "pcb_via",
    pcb_via_id: `pcb_via_${index + 1}`,
    x: milx10(via.center.x),
    y: milx10(via.center.y),
    outer_diameter: milx10(via.outerDiameter),
    hole_diameter: milx10(via.holeDiameter),
    layers: ["top", "bottom"],
  } as PcbViaInput)
}

const handleCutout = (
  solidRegion: z.infer<typeof SolidRegionSchema>,
  index: number,
) => {
  return Soup.pcb_cutout.parse({
    type: "pcb_cutout",
    pcb_cutout_id: `pcb_cutout_${index + 1}`,
    shape: "polygon",
    points: solidRegion.points.map((p) => ({
      x: milx10(p.x),
      y: milx10(p.y),
    })),
  } as Soup.PcbCutoutPolygonInput)
}

interface Options {
  useModelCdn?: boolean
  shouldRecenter?: boolean
}

export const convertEasyEdaJsonToCircuitJson = (
  easyEdaJson: BetterEasyEdaJson,
  { useModelCdn, shouldRecenter = true }: Options = {},
): AnyCircuitElement[] => {
  const circuitElements: AnyCircuitElement[] = []

  // Add source component
  const source_component = any_source_component.parse({
    type: "source_component",
    source_component_id: "source_component_1",
    name: "U1",
    ftype: "simple_chip",
  })

  const pcb_component = Soup.pcb_component.parse({
    type: "pcb_component",
    pcb_component_id: "pcb_component_1",
    source_component_id: "source_component_1",
    name: "U1",
    ftype: "simple_chip",
    width: 0, // we update this at the end
    height: 0, // we update this at the end
    rotation: 0,
    center: { x: 0, y: 0 },
    layer: "top",
  } as PcbComponentInput)

  circuitElements.push(source_component, pcb_component)

  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD",
  )
  const pins = easyEdaJson.dataStr.shape.filter((shape) => shape.type === "PIN")

  // Prepare pin labels for normalization
  const pinLabelSets = pads.map((pad) => {
    const labels = []
    if (pad.number) labels.push(pad.number.toString())

    const pin = pins.find((p) => p.pinNumber === pad.number)
    if (pin) labels.push(normalizeSymbolName(pin.label))

    return labels
  })

  const normalizedPinLabels = normalizePinLabels(pinLabelSets)

  // Add source ports and pcb_smtpads
  pads.forEach((pad, index) => {
    const portHints = normalizedPinLabels[index]
    const pinNumber = Number.parseInt(
      portHints.find((hint) => hint.match(/pin\d+/))!.replace("pin", ""),
    )

    // Add source port
    circuitElements.push({
      type: "source_port",
      source_port_id: `source_port_${index + 1}`,
      source_component_id: "source_component_1",
      name: `pin${pinNumber}`,
      pin_number: pinNumber,
      port_hints: portHints.filter((hint) => hint !== `pin${pinNumber}`),
    })

    if (pad.holeRadius !== undefined && mil2mm(pad.holeRadius) !== 0) {
      // Add pcb_plated_hole
      const platedHoleId =
        pad.shape === "RECT" && pad.rotation !== undefined
          ? `pcb_plated_hole_${index + 1}_rot${pad.rotation}`
          : `pcb_plated_hole_${index + 1}`

      const commonPlatedHoleProps = {
        type: "pcb_plated_hole",
        pcb_plated_hole_id: platedHoleId,
        x: mil2mm(pad.center.x),
        y: mil2mm(pad.center.y),
        layers: ["top"],
        port_hints: [`pin${pinNumber}`],
        pcb_component_id: "pcb_component_1",
        pcb_port_id: `pcb_port_${index + 1}`,
      }
      let additionalPlatedHoleProps: any

      if (pad.shape === "OVAL") {
        // A JLCPCB Oval is actually a Pill, and it's a bit tricky to compute
        // the correct dimensions, but we can use the following process:
        // 1. Find the smallest outer dimensions
        // 2. Use the holeRadius to determine the distanceFromOuterPlatingToHole
        // 3. Calculate the largest "inner dimension" (which is either the
        //    holeWidth or holeHeight) by subtracting the distanceFromOuterPlatingToHole * 2
        //    from the largest outer dimensions

        const largestOuterDimensionName: "width" | "height" =
          mil2mm(pad.width) > mil2mm(pad.height) ? "width" : "height"

        const smallestOuterDimension = Math.min(
          mil2mm(pad.width),
          mil2mm(pad.height),
        )
        const largestOuterDimension = Math.max(
          mil2mm(pad.width),
          mil2mm(pad.height),
        )

        const distanceFromOuterPlatingToHole =
          smallestOuterDimension / 2 - mil2mm(pad.holeRadius)

        const largestInnerDimension =
          largestOuterDimension - distanceFromOuterPlatingToHole * 2
        const smallestInnerDimension = mil2mm(pad.holeRadius) * 2

        const innerWidth =
          largestOuterDimensionName === "width"
            ? largestInnerDimension
            : smallestInnerDimension
        const innerHeight =
          largestOuterDimensionName === "height"
            ? largestInnerDimension
            : smallestInnerDimension

        additionalPlatedHoleProps = {
          shape: "pill_hole_with_rect_pad",
          hole_shape: "pill",
          pad_shape: "rect",
          hole_width: innerWidth,
          hole_height: innerHeight,
          rect_pad_width: mil2mm(pad.width),
          rect_pad_height: mil2mm(pad.height),
          hole_offset_x: 0,
          hole_offset_y: 0,
        }
      } else if (pad.shape === "RECT") {
        const padWidth = mil2mm(pad.width)
        const padHeight = mil2mm(pad.height)
        const holeRadius = mil2mm(pad.holeRadius)
        const holeDiameter = holeRadius * 2 // Use normal diameter

        // Check if the pad is significantly rectangular (not square)
        const aspectRatio =
          Math.max(padWidth, padHeight) / Math.min(padWidth, padHeight)
        const isSignificantlyRectangular = aspectRatio > 1.5 // Only use pill holes for aspect ratios > 1.5

        if (isSignificantlyRectangular) {
          // Simple approach: create slim pill holes with consistent proportions
          // Width = original hole diameter, Height = 2.6x width for good pill shape
          const baseWidth = holeDiameter
          const pillHeight = baseWidth * 2.6 // 2.6:1 aspect ratio for elegant pills

          const holeWidth = padWidth > padHeight ? pillHeight : baseWidth
          const holeHeight = padHeight > padWidth ? pillHeight : baseWidth

          additionalPlatedHoleProps = {
            shape: "rotated_pill_hole_with_rect_pad",
            hole_shape: "rotated_pill",
            pad_shape: "rect",
            hole_width: holeWidth,
            hole_height: holeHeight,
            hole_ccw_rotation: pad.rotation || 0,
            rect_ccw_rotation: pad.rotation || 0,
            rect_pad_width: padWidth,
            rect_pad_height: padHeight,
          }
        } else {
          // For square or nearly square pads, use circular holes
          additionalPlatedHoleProps = {
            shape: "circle",
            hole_diameter: holeDiameter,
            outer_diameter: Math.max(padWidth, padHeight),
            radius: holeDiameter / 2,
          }
        }
      } else {
        additionalPlatedHoleProps = {
          shape: "circle",
          hole_diameter: mil2mm(pad.holeRadius) * 2,
          outer_diameter: mil2mm(pad.width),
          radius: mil2mm(pad.holeRadius),
        }
      }

      circuitElements.push(
        pcb_plated_hole.parse({
          ...commonPlatedHoleProps,
          ...additionalPlatedHoleProps,
        }),
      )
    } else {
      // Add pcb_smtpad
      let soupShape: PcbSmtPad["shape"] | undefined
      if (pad.shape === "RECT") {
        soupShape = "rect"
      } else if (pad.shape === "ELLIPSE") {
        // This is just a bug
        soupShape = "rect"
      } else if (pad.shape === "OVAL") {
        // OVAL is often a rect, especially when holeRadius is 0
        soupShape = "rect"
      } else if (pad.shape === "POLYGON") {
        soupShape = "polygon"
      }
      if (!soupShape) {
        throw new Error(`unknown pad.shape: "${pad.shape}"`)
      }

      const rectSize = { width: mil2mm(pad.width), height: mil2mm(pad.height) }
      if (pad.rotation === 90 || pad.rotation === 270) {
        // Swap width and height
        rectSize.width = mil2mm(pad.height)
        rectSize.height = mil2mm(pad.width)
      }

      const parsedPcbSmtpad = pcb_smtpad.parse({
        type: "pcb_smtpad",
        pcb_smtpad_id: `pcb_smtpad_${index + 1}`,
        shape: soupShape,
        ...(soupShape !== "polygon" && {
          x: mil2mm(pad.center.x),
          y: mil2mm(pad.center.y),
        }),
        ...(soupShape === "rect"
          ? rectSize
          : soupShape === "polygon" && pad.points
            ? {
                points: pad.points.map((p) => ({
                  x: milx10(p.x),
                  y: milx10(p.y),
                })),
              }
            : { radius: Math.min(mil2mm(pad.width), mil2mm(pad.height)) / 2 }),
        layer: "top",
        port_hints: [`pin${pinNumber}`],
        pcb_component_id: "pcb_component_1",
        pcb_port_id: `pcb_port_${index + 1}`,
      } as PcbSmtPad)
      circuitElements.push(parsedPcbSmtpad)
    }
  })

  // Add holes
  easyEdaJson.packageDetail.dataStr.shape
    .filter(
      (shape): shape is z.infer<typeof HoleSchema> => shape.type === "HOLE",
    )
    .forEach((h, index) => {
      circuitElements.push(handleHole(h, index))
      circuitElements.push(handleHoleCutout(h, index))
    })

  // Add vias
  easyEdaJson.packageDetail.dataStr.shape
    .filter((shape): shape is z.infer<typeof ViaSchema> => shape.type === "VIA")
    .forEach((v, index) => {
      circuitElements.push(handleVia(v, index))
    })

  // Add pcb cutouts from solid regions marked as cutout
  easyEdaJson.packageDetail.dataStr.shape
    .filter(
      (shape): shape is z.infer<typeof SolidRegionSchema> =>
        shape.type === "SOLIDREGION" && shape.fillStyle === "cutout",
    )
    .forEach((sr, index) => {
      circuitElements.push(handleCutout(sr, index))
    })

  // Add silkscreen paths, arcs and text
  easyEdaJson.packageDetail.dataStr.shape.forEach((shape, index) => {
    if (shape.type === "TRACK") {
      circuitElements.push(handleSilkscreenPath(shape, index))
    } else if (shape.type === "ARC") {
      circuitElements.push(handleSilkscreenArc(shape, index))
    } else if (shape.type === "TEXT") {
      circuitElements.push(
        Soup.pcb_silkscreen_text.parse({
          type: "pcb_silkscreen_text",
          pcb_silkscreen_text_id: `pcb_silkscreen_text_${index + 1}`,
          pcb_component_id: "pcb_component_1",
          text: normalizeSymbolName(shape.text),
          anchor_position: {
            x: mil2mm(shape.x),
            y: mil2mm(shape.y),
          },
          anchor_alignment: {
            L: "bottom_left",
            C: "center",
            R: "bottom_right",
          }[shape.textAnchor ?? "L"],
          font_size: shape.size_mm ? shape.size_mm : undefined,
          layer: "top",
        } as Soup.PcbSilkscreenTextInput),
      )
    }
  })

  // Calculate pcb_component bounds from all PCB elements
  const pcbElements = circuitElements.filter(
    (e) =>
      e.type === "pcb_smtpad" ||
      e.type === "pcb_plated_hole" ||
      e.type === "pcb_hole" ||
      e.type === "pcb_via" ||
      e.type === "pcb_silkscreen_path" ||
      e.type === "pcb_silkscreen_text",
  )

  if (pcbElements.length > 0) {
    const bounds = findBoundsAndCenter(pcbElements)
    pcb_component.width = bounds.width
    pcb_component.height = bounds.height
  }

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
    const { position, rotation } = parseCadOffsetsFromSvgNode(svgNode)
    circuitElements.push(
      Soup.cad_component.parse({
        type: "cad_component",
        cad_component_id: "cad_component_1",
        source_component_id: "source_component_1",
        pcb_component_id: "pcb_component_1",
        position,
        rotation,
        model_obj_url: objFileUrl,
      } as Soup.CadComponentInput),
    )
  }

  if (shouldRecenter) {
    // exclude pcb_component (its center is wrong; we'll set it to 0,0)
    const elementsForBounds = circuitElements.filter(
      (e) => e.type !== "pcb_component" && e.type !== "cad_component",
    )

    const bounds = findBoundsAndCenter(elementsForBounds)

    if (Number.isFinite(bounds.center.x) && Number.isFinite(bounds.center.y)) {
      const matrix = compose(
        translate(-bounds.center.x, bounds.center.y),
        scale(1, -1),
      )

      // Transform all PCB elems except polygon SMT pads (no x,y) and the cad
      const elementsForTransform = circuitElements.filter(
        (e) =>
          !(e.type === "pcb_smtpad" && e.shape === "polygon") &&
          e.type !== "cad_component",
      )
      transformPCBElements(elementsForTransform, matrix)

      // Manually transform polygons/cutouts
      for (const e of circuitElements) {
        if (e.type === "pcb_cutout") {
          if (e.shape === "polygon") {
            e.points = e.points.map((p) => applyToPoint(matrix, p))
          } else if (e.shape === "circle" || e.shape === "rect") {
            e.center = applyToPoint(matrix, e.center)
          } else if ("route" in e) {
            const cutoutPath = e as unknown as {
              route: { x: number; y: number }[]
            }
            cutoutPath.route = cutoutPath.route.map((p) =>
              applyToPoint(matrix, p),
            )
          }
        } else if (e.type === "pcb_smtpad" && e.shape === "polygon") {
          e.points = e.points.map((p) => applyToPoint(matrix, p))
        }
      }

      const cad = circuitElements.find(
        (e): e is Soup.CadComponent => e.type === "cad_component",
      )

      if (cad) {
        if (!cad.rotation) cad.rotation = { x: 0, y: 0, z: 0 }

        // Recenter the CAD's in-plane coords
        const p = applyToPoint(matrix, { x: cad.position.x, y: cad.position.y })
        cad.position.x = p.x
        cad.position.y = p.y

        const side = (pcb_component.layer ?? "top") as "top" | "bottom"
        const t = DEFAULT_PCB_THICKNESS_MM / 2
        const attrs = svgNode?.svgData?.attrs ?? {}
        const modelHeight = readModelHeightMm(attrs.c_height)

        // Ensure we have a size; Z holds the model's thickness in local space
        if (!cad.size) {
          cad.size = {
            x: pcb_component.width,
            y: pcb_component.height,
            z: modelHeight,
          }
        }

        // --- Axis convention: EasyEDA models are typically Y-up ---
        // Rotate to Z-up so thickness becomes vertical in our scene.
        const ROTATE_X_FOR_YUP = 90
        const originalZRotation = (cad.rotation.z ?? 0) % 360

        // Improved rotation handling with tolerance for floating-point precision
        // Handle different component orientations based on EasyEDA Z rotation
        if (
          Math.abs(originalZRotation - 0) < 1 ||
          Math.abs(originalZRotation - 360) < 1
        ) {
          // For ~0° Z rotation, don't apply X rotation - keep model as-is (Y-up)
          cad.rotation.x = ((cad.rotation.x ?? 0) + 0 + 360) % 360 // no X rotation
        } else if (Math.abs(originalZRotation - 180) < 1) {
          // For ~180° Z rotation, don't apply standard X rotation - let it lie flat
          cad.rotation.x = ((cad.rotation.x ?? 0) + 0 + 360) % 360 // no X rotation
        } else if (Math.abs(originalZRotation - 90) < 1) {
          // For ~90° Z rotation, keep it flat (no X rotation)
          cad.rotation.x = ((cad.rotation.x ?? 0) + 0 + 360) % 360
        } else if (Math.abs(originalZRotation - 270) < 1) {
          // For ~270° Z rotation, apply Y-up to Z-up conversion + corrective Y-rotation
          cad.rotation.x =
            ((cad.rotation.x ?? 0) + ROTATE_X_FOR_YUP + 360) % 360
          cad.rotation.y = ((cad.rotation.y ?? 0) + 90 + 360) % 360
        } else {
          // Fallback for unusual angles: apply standard Y-up to Z-up conversion
          // and log for potential future refinement
          console.warn(
            `[3D] Unusual rotation angle: ${originalZRotation}° for component ${easyEdaJson.lcsc.number}`,
          )
          cad.rotation.x =
            ((cad.rotation.x ?? 0) + ROTATE_X_FOR_YUP + 360) % 360
        }

        // Bottom-side parts: flip across the board plane
        if (side !== "top") {
          cad.rotation.x = ((cad.rotation.x ?? 0) + 180) % 360
        }

        // For 180° rotated components (Y-up models), the z-offset indicates pin extension below body
        const USE_Z_OFFSET_FOR_180 = Math.abs(originalZRotation - 180) < 1
        const zOffRaw = cad.position.z ?? 0
        const zOff = USE_Z_OFFSET_FOR_180 ? -zOffRaw : 0

        // ---- Determine the vertical extent based on model orientation ----
        const rx = ((cad.rotation.x % 360) + 360) % 360

        // EasyEDA models are Y-up. Components with 0° or 180° Z-rotation don't get X-rotation applied,
        // so they remain Y-up. For Y-up models, the vertical extent is along the Y axis.
        let thicknessAlongWorldZ: number
        const is180RotatedYUp =
          (Math.abs(originalZRotation - 180) < 1 ||
            Math.abs(originalZRotation - 0) < 1 ||
            Math.abs(originalZRotation - 360) < 1) &&
          Math.abs(rx) < 1

        if (is180RotatedYUp) {
          // 180° Z-rotation, no X-rotation applied → model is still Y-up
          // For Y-up models, the vertical extent is along Y axis (size.y)
          thicknessAlongWorldZ = cad.size.y
        } else if (rx % 180 === 90) {
          // X-rotation of 90/270 → use local Y
          thicknessAlongWorldZ = cad.size.y
        } else {
          // Standard case → model rotated to Z-up, use Z
          thicknessAlongWorldZ = cad.size.z
        }

        let centerZ: number
        if (is180RotatedYUp) {
          // For Y-up models, subtract half the thickness to lower the component to the board
          centerZ =
            side === "top"
              ? t - thicknessAlongWorldZ / 2
              : -t + thicknessAlongWorldZ / 2
        } else {
          // For other orientations, use standard positioning with z-offset
          centerZ =
            side === "top"
              ? t + zOff + thicknessAlongWorldZ / 2
              : -t - zOff - thicknessAlongWorldZ / 2
        }

        cad.position.z = centerZ
      }
    }

    // finalize pcb center after recentering
    pcb_component.center = { x: 0, y: 0 }
  }

  return circuitElements
}

/** @deprecated Use `convertEasyEdaJsonToCircuitJson` instead. */
export const convertEasyEdaJsonToTscircuitSoupJson =
  convertEasyEdaJsonToCircuitJson
