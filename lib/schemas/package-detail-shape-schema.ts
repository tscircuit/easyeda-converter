import { z } from "zod"

const tenthmil = z
  .union([z.number(), z.string()])
  .optional()
  .transform((n) =>
    typeof n === "string" && n.endsWith("mil")
      ? n
      : `${Number.parseFloat(n as string) * 10}mil`,
  )
  .pipe(z.string())

export const PointSchema = z
  .any()
  .transform((p) => {
    if (Array.isArray(p)) {
      const [x, y] = p
      return { x, y }
    }
    if (typeof p === "object") {
      return p
    }
    throw new Error(`Invalid point: ${p}`)
  })
  .pipe(
    z.object({
      x: z.number(),
      y: z.number(),
    }),
  )

export const BaseShapeSchema = z.object({
  type: z.string(),
  id: z.string().optional(),
  layer: z.coerce.number().optional(),
})

export const TrackSchema = BaseShapeSchema.extend({
  type: z.literal("TRACK"),
  width: z.coerce.number(),
  points: z.array(PointSchema),
})

export const PadSchema = BaseShapeSchema.extend({
  type: z.literal("PAD"),
  shape: z.enum(["RECT", "ELLIPSE", "OVAL"]),
  center: z.object({
    x: tenthmil,
    y: tenthmil,
  }),
  width: tenthmil,
  height: tenthmil,
  layermask: z.number(),
  net: z.union([z.string(), z.number()]).optional(),
  number: z.union([z.string(), z.number()]),
  holeRadius: tenthmil,
  points: z.array(PointSchema).optional(),
  rotation: z.number().optional(),
  plated: z.boolean(),
})

// TODO this should be in "arc sweep" format with the following fields:
// start, end, radius, largeArc, sweepDirection
export const ArcSchema = BaseShapeSchema.extend({
  type: z.literal("ARC"),
  width: z.number(),
  start: PointSchema,
  end: PointSchema,
  radiusX: z.number(),
  radiusY: z.number(),
  largeArc: z.boolean(),
  sweepDirection: z.enum(["CW", "CCW"]),
})

export const CircleSchema = BaseShapeSchema.extend({
  type: z.literal("CIRCLE"),
  center: PointSchema,
  radius: z.number(),
  width: z.number(),
})

export const SolidRegionSchema = BaseShapeSchema.extend({
  type: z.literal("SOLIDREGION"),
  layermask: z.number(),
  points: z.array(PointSchema),
  fillStyle: z.string(),
})

export const SVGNodeSchema = BaseShapeSchema.extend({
  type: z.literal("SVGNODE"),
  svgData: z.object({
    gId: z.string(),
    nodeName: z.string(),
    nodeType: z.number(),
    layerid: z.string(),
    attrs: z.record(z.string(), z.string()),
    childNodes: z.array(z.unknown()),
  }),
})

// e.g. "HOLE~3999.449~3004.213~1.378~gge152~0"
export const HoleSchema = BaseShapeSchema.extend({
  type: z.literal("HOLE"),
  center: PointSchema,
  radius: z.number(),
})

export const ViaSchema = BaseShapeSchema.extend({
  type: z.literal("VIA"),
  center: PointSchema,
  outerDiameter: z.number(),
  holeDiameter: z.number(),
})

export const RectSchema = BaseShapeSchema.extend({
  type: z.literal("RECT"),
  x: tenthmil,
  y: tenthmil,
  width: tenthmil,
  height: tenthmil,
  lineWidth: z.number(),
  fillStyle: z.string(),
  rotation: z.number().optional(),
})

export const TextSchema = BaseShapeSchema.extend({
  type: z.literal("TEXT"),
  text: z.string(),
  x: tenthmil,
  y: tenthmil,
  size_mm: z.number(),
  rotation: z.number().optional(),
  layer: z.number().optional(),
  textAnchor: z
    .enum(["L", "C", "R", ""])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  font: z.string().optional(),
})

export const PackageDetailShapeSchema = z.discriminatedUnion("type", [
  TrackSchema,
  PadSchema,
  ArcSchema,
  CircleSchema,
  SolidRegionSchema,
  SVGNodeSchema,
  HoleSchema,
  ViaSchema,
  RectSchema,
  TextSchema,
])

const pairs = <T>(arr: T[]): [T, T][] => {
  const pairs: [T, T][] = []
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1]])
  }
  return pairs
}

const parsePoints = (pointsStr: string): number[][] =>
  pairs(
    pointsStr
      .trim()
      .split(" ")
      .map((n) => Number(n)),
  )

export const ShapeItemSchema = z
  .object({
    type: z.string(),
    data: z.string(),
  })
  .transform((shape) => {
    switch (shape.type) {
      case "TRACK": {
        const [width, layer, _, pointsStr, id, _n] = shape.data.split("~")
        const points = parsePoints(pointsStr)
        return TrackSchema.parse({ type: "TRACK", width, layer, points, id })
      }
      case "PAD": {
        const [padShape, ...params] = shape.data.split("~")
        const [
          centerX,
          centerY,
          width,
          height,
          layermask,
          net,
          number,
          holeRadius,
          ...rest
        ] = params.map((p) => (Number.isNaN(Number(p)) ? p : Number(p)))
        const center = { x: centerX, y: centerY }
        let points: number[][] | undefined

        if (padShape === "RECT") {
          points = parsePoints(rest[0] as any)
        }

        // Extract rotation for all pad types from position 11 (rest[1])
        const r = Number(rest[1])
        const rotation = Number.isNaN(r) ? undefined : r

        const padInputParams = {
          type: "PAD",
          shape: padShape,
          center,
          width,
          height,
          layermask,
          net,
          number,
          holeRadius,
          points,
          rotation,
          plated: rest.includes("Y"),
        }
        const pad = PadSchema.parse(padInputParams)
        return pad
      }
      case "ARC": {
        const [width, layer, , arcData] = shape.data.split("~")
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x  y
        // A rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
        const match = arcData.match(
          /M\s*([\d.-]+)(?:\s*,\s*|\s+)([\d.-]+)\s*A\s*([\d.-]+)(?:\s*,\s*|\s+)([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)(?:\s*,\s*|\s+)([\d.-]+)/,
        )

        if (!match) {
          throw new Error(`Invalid arc data: ${arcData}`)
        }

        const [
          ,
          startX,
          startY,
          radiusX,
          radiusY,
          xAxisRotation,
          largeArcFlag,
          sweepFlag,
          endX,
          endY,
        ] = match
        const start: [number, number] = [Number(startX), Number(startY)]
        const end: [number, number] = [Number(endX), Number(endY)]
        return ArcSchema.parse({
          type: "ARC",
          width: Number(width),
          layer: Number(layer),
          start,
          end,
          radiusX: Number(radiusX),
          radiusY: Number(radiusY),
          largeArc: largeArcFlag === "1",
          // sweepFlag=1 means clockwise (CW), sweepFlag=0 means counter-clockwise (CCW)
          sweepDirection: sweepFlag === "1" ? "CW" : "CCW",
        })
      }
      case "CIRCLE": {
        const [centerX, centerY, radius, width, layer, id] =
          shape.data.split("~")
        const center: [number, number] = [Number(centerX), Number(centerY)]
        return CircleSchema.parse({
          type: "CIRCLE",
          center,
          radius: Number(radius),
          width: Number(width),
          layer: Number(layer),
          id,
        })
      }
      case "HOLE": {
        const [centerX, centerY, radius, id] = shape.data.split("~")
        const center: [number, number] = [Number(centerX), Number(centerY)]
        return HoleSchema.parse({
          type: "HOLE",
          center,
          radius: Number(radius),
          id,
        })
      }
      case "VIA": {
        const [x, y, outerDiameter, , holeDiameter, id] = shape.data.split("~")
        const center: [number, number] = [Number(x), Number(y)]
        return ViaSchema.parse({
          type: "VIA",
          center,
          outerDiameter: Number(outerDiameter),
          holeDiameter: Number(holeDiameter),
          id,
        })
      }
      case "SOLIDREGION": {
        const [layermask, , pathData, fillStyle, id] = shape.data.split("~")
        const points =
          pathData.match(/[ML] ?(-?[\d.]+)[ ,](-?[\d.]+)/g)?.map((point) => {
            const [, x, y] =
              point.match(/[ML]? ?(-?[\d.]+)[ ,](-?[\d.]+)/) || []
            return [Number(x), Number(y)]
          }) || []
        return SolidRegionSchema.parse({
          type: "SOLIDREGION",
          layermask: Number(layermask),
          points,
          fillStyle,
          id,
        })
      }
      case "SVGNODE": {
        const svgData = JSON.parse(shape.data)
        return SVGNodeSchema.parse({ type: "SVGNODE", svgData })
      }
      case "RECT": {
        const [x, y, width, height, lineWidth, id, rotation, layer, fillStyle] =
          shape.data.split("~")
        const r = rotation ? Number(rotation) : undefined
        return RectSchema.parse({
          type: "RECT",
          x,
          y,
          width,
          height,
          lineWidth: Number(lineWidth),
          id,
          rotation: Number.isNaN(r as number) ? undefined : r,
          layer: layer ? Number(layer) : undefined,
          fillStyle: fillStyle || undefined,
        })
      }
      case "TEXT": {
        const [textAnchor, x, y, size, layer, id, rotation, , font, text] =
          shape.data.split("~")
        const r = rotation ? Number(rotation) : undefined
        return TextSchema.parse({
          type: "TEXT",
          text,
          x,
          y,
          size_mm: Number(size) * 2.54, // empirically this seems to match, C5248081 is a good test case
          layer: layer ? Number(layer) : undefined,
          id,
          rotation: Number.isNaN(r as number) ? undefined : r,
          textAnchor: textAnchor as "L" | "C" | "R" | undefined,
          font: font || undefined,
        })
      }

      default:
        throw new Error(`Unknown shape type: ${shape.type}`)
    }
  })
  .pipe(PackageDetailShapeSchema)

export const ShapesArraySchema = z.array(ShapeItemSchema)
