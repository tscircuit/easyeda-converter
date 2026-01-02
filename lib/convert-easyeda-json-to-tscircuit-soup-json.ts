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
 * Convert EasyEDA "pixel" units (1 pixel = 10mil = 0.254mm) to mm.
 * Used for paths, holes, vias, and other unlabeled coordinates.
 * If string has unit suffix (e.g., "5mm"), parse as-is.
 */
const milx10 = (mil10: number | string) => {
  if (typeof mil10 === "number") return mil10ToMm(mil10)
  if (mil10.match(/^\d+$/)) return mil10ToMm(Number(mil10))
  return mil2mm(mil10) // Has unit suffix, use as-is
}

/**
 * Calculate bbox center from polyline points.
 * Polyline points are space-separated "x y" pairs.
 */
const getPolylineBboxCenter = (
  svgNode?: z.infer<typeof SVGNodeSchema>,
): { x: number; y: number } | null => {
  const childNodes = svgNode?.svgData?.childNodes
  if (!childNodes) return null

  for (const child of childNodes) {
    if (child.nodeName === "polyline" && child.attrs?.points) {
      const coords = String(child.attrs.points).trim().split(/\s+/).map(Number)
      const xs: number[] = []
      const ys: number[] = []

      for (let i = 0; i < coords.length; i += 2) {
        if (!Number.isNaN(coords[i])) xs.push(coords[i])
        if (!Number.isNaN(coords[i + 1])) ys.push(coords[i + 1])
      }

      if (xs.length > 0 && ys.length > 0) {
        return {
          x: (Math.min(...xs) + Math.max(...xs)) / 2,
          y: (Math.min(...ys) + Math.max(...ys)) / 2,
        }
      }
    }
  }
  return null
}

const parseCadOffsetsFromSvgNode = (
  svgNode?: z.infer<typeof SVGNodeSchema>,
) => {
  const attrs = svgNode?.svgData?.attrs ?? {}

  // Prefer polyline bbox center over c_origin - c_origin can be wildly wrong
  // (off by hundreds of mm in some components like C46497, C88224)
  const bboxCenter = getPolylineBboxCenter(svgNode)
  const [cOriginX, cOriginY] = String(attrs.c_origin ?? "0,0")
    .split(",")
    .map((s) => Number(s.trim()))

  const cx = bboxCenter?.x ?? (Number.isNaN(cOriginX) ? 0 : cOriginX)
  const cy = bboxCenter?.y ?? (Number.isNaN(cOriginY) ? 0 : cOriginY)

  // z offset: bare numbers are in pixel units (1px = 10mil = 0.254mm)
  // EasyEDA convention: negative z = above board, positive z = into board
  // Our convention (Z-up): positive z = above board
  // So we flip the sign: z_world = -z_easyeda
  //
  // VALIDATED: All 16 test components with non-zero z have negative values.
  // Visual inspection confirms sign flip is correct (bodies render above board).
  const zStr = attrs.z ?? 0
  const z_easyeda_mm =
    typeof zStr === "string" && /[a-z]/i.test(zStr)
      ? mm(zStr) // already has units
      : mil10ToMm(Number(zStr) || 0) // bare number => pixel units (mil*10)

  return {
    position: {
      x: mil10ToMm(cx),
      y: mil10ToMm(cy),
      z: -z_easyeda_mm, // Flip sign: EasyEDA negative=up → our positive=up
    },
    rotation: (() => {
      const [rx, ry, rz] = (attrs.c_rotation ?? "0,0,0").split(",").map(Number)
      return { x: rx || 0, y: ry || 0, z: rz || 0 }
    })(),
  }
}

/** Parse height from title like "R0805_L2.0-W1.3-H0.6" → 0.6mm */
const parseHeightFromTitle = (title: string | undefined): number | null => {
  if (!title) return null
  const match = title.match(/H([\d.]+)/i)
  if (match) {
    const val = parseFloat(match[1])
    if (val > 0 && val < 50) return val // Valid height in mm
  }
  return null
}

// ============ 3D Rotation Matrix Utilities ============
type Mat3 = [[number, number, number], [number, number, number], [number, number, number]]

const toRad = (deg: number) => (deg * Math.PI) / 180
const toDeg = (rad: number) => (rad * 180) / Math.PI

/** Convert Euler angles (degrees, XYZ order) to 3x3 rotation matrix */
const eulerToMatrix = (rx: number, ry: number, rz: number): Mat3 => {
  const cx = Math.cos(toRad(rx)), sx = Math.sin(toRad(rx))
  const cy = Math.cos(toRad(ry)), sy = Math.sin(toRad(ry))
  const cz = Math.cos(toRad(rz)), sz = Math.sin(toRad(rz))
  // Combined: Rz * Ry * Rx
  return [
    [cy * cz, sx * sy * cz - cx * sz, cx * sy * cz + sx * sz],
    [cy * sz, sx * sy * sz + cx * cz, cx * sy * sz - sx * cz],
    [-sy, sx * cy, cx * cy],
  ]
}

/** Extract Euler angles (degrees, XYZ order) from rotation matrix */
const matrixToEuler = (m: Mat3): { x: number; y: number; z: number } => {
  let rx: number, ry: number, rz: number
  if (Math.abs(m[2][0]) < 0.9999) {
    ry = Math.asin(-m[2][0])
    rx = Math.atan2(m[2][1], m[2][2])
    rz = Math.atan2(m[1][0], m[0][0])
  } else {
    // Gimbal lock
    ry = m[2][0] < 0 ? Math.PI / 2 : -Math.PI / 2
    rx = Math.atan2(m[0][1], m[1][1])
    rz = 0
  }
  return { x: toDeg(rx), y: toDeg(ry), z: toDeg(rz) }
}

/** Multiply two 3x3 matrices */
const matMul3x3 = (a: Mat3, b: Mat3): Mat3 => {
  const r: Mat3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        r[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  return r
}

/**
 * Apply Y-mirror transformation to rotation.
 *
 * When we apply scale(1, -1) to 2D PCB geometry, the 3D equivalent is
 * M = diag(1, -1, 1). For rotations under reflection: R' = M * R * M
 * (since M^(-1) = M for reflections).
 *
 * This changes rotation handedness - Z rotations invert direction.
 */
const applyYMirrorToRotation = (
  rx: number,
  ry: number,
  rz: number,
): { x: number; y: number; z: number } => {
  // Mirror matrix: M = diag(1, -1, 1)
  const M: Mat3 = [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ]

  // Convert Euler angles to rotation matrix
  const R = eulerToMatrix(rx, ry, rz)

  // Apply mirror transform: R' = M * R * M
  const MR = matMul3x3(M, R)
  const Rprime = matMul3x3(MR, M)

  // Convert back to Euler angles
  return matrixToEuler(Rprime)
}

/**
 * Determine vertical extent for a Y-up model after rotation.
 *
 * EasyEDA models are Y-up, so the "height" dimension is size.y in model space.
 * After applying rotation, we need to find which world axis the model's Y points to,
 * then return the corresponding size component.
 *
 * @param rotation - Euler angles in degrees (XYZ order) in EasyEDA Y-up space
 * @param size - Model dimensions {x, y, z} where y is height in model space
 */
const getThicknessForYUpModel = (
  rotation: { x: number; y: number; z: number },
  size: { x: number; y: number; z: number },
): number => {
  // For pure Z-rotation (in-plane rotation), the Y axis stays pointing up
  // This is the common case: (0,0,0), (0,0,90), (0,0,180), (0,0,270)
  const rx = rotation.x % 360
  const ry = rotation.y % 360

  // If there's no X or Y rotation, the model's Y axis still points up
  // Z-rotation only spins the model in-plane, doesn't affect which axis is vertical
  if (Math.abs(rx) < 1 && Math.abs(ry) < 1) {
    return size.y // Model Y is still vertical
  }

  // For non-trivial rotations, use matrix math to find which local axis is now vertical
  const R = eulerToMatrix(rotation.x, rotation.y, rotation.z)

  // In Y-up space, world "up" is [0, 1, 0].
  // R's second row tells us where the model's local axes project onto world Y (up).
  // R[1][0] = how much local X contributes to world Y
  // R[1][1] = how much local Y contributes to world Y
  // R[1][2] = how much local Z contributes to world Y

  const absContributions = [
    Math.abs(R[1][0]),
    Math.abs(R[1][1]),
    Math.abs(R[1][2]),
  ]

  const maxIdx = absContributions.indexOf(Math.max(...absContributions))
  return maxIdx === 0 ? size.x : maxIdx === 1 ? size.y : size.z
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
        const title = attrs.title as string | undefined

        // c_width/c_height are 2D outline dimensions (top-view), NOT thickness
        const outlineWidth = mil10ToMm(Number(attrs.c_width) || 0)
        const outlineHeight = mil10ToMm(Number(attrs.c_height) || 0)

        // Get thickness from title "H..." value (e.g., "SOT-23_L2.9-W1.3-H1.0")
        // Do NOT use c_height as thickness - that's the 2D outline height
        const heightFromTitle = parseHeightFromTitle(title)
        const DEFAULT_THICKNESS_MM = 1.0 // typical SMD component thickness
        const thickness = heightFromTitle ?? DEFAULT_THICKNESS_MM

        // Ensure we have a size; Z holds the model's thickness in local space
        if (!cad.size) {
          cad.size = {
            x: outlineWidth || pcb_component.width,
            y: outlineHeight || pcb_component.height,
            z: thickness,
          }
        }

        // z-offset from EasyEDA (already converted: negative EasyEDA = positive world)
        const zOff = cad.position.z ?? 0

        // --- Rotation handling ---
        // The 2D recentering applies scale(1, -1) which mirrors Y.
        // We must apply the equivalent basis change to 3D rotation: R' = M * R * M
        // where M = diag(1, -1, 1). This inverts Z-rotation direction.
        const mirroredRot = applyYMirrorToRotation(
          cad.rotation.x,
          cad.rotation.y,
          cad.rotation.z,
        )
        cad.rotation.x = mirroredRot.x
        cad.rotation.y = mirroredRot.y
        cad.rotation.z = mirroredRot.z

        // Determine vertical extent after mirror transform
        const thicknessAlongWorldZ = getThicknessForYUpModel(cad.rotation, cad.size)

        // Bottom-side parts: flip 180° around X
        if (side !== "top") {
          cad.rotation.x = ((cad.rotation.x ?? 0) + 180) % 360
        }

        // Position model center above board surface, including z-offset
        // Formula: board_top + z_offset + half_thickness
        const centerZ =
          side === "top"
            ? t + zOff + thicknessAlongWorldZ / 2
            : -t - zOff - thicknessAlongWorldZ / 2

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
