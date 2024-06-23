import { z } from "zod"

export const PointSchema = z
  .tuple([z.number(), z.number()])
  .transform(([x, y]) => ({ x, y }))

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
  shape: z.enum(["RECT", "ELLIPSE"]),
  center: z.object({
    x: z.number(),
    y: z.number(),
  }),
  width: z.number(),
  height: z.number(),
  layermask: z.number(),
  net: z.union([z.string(), z.number()]).optional(),
  number: z.number(),
  holeRadius: z.number(),
  points: z.array(PointSchema).optional(),
  rotation: z.number().optional(),
  plated: z.boolean(),
})

export const ArcSchema = BaseShapeSchema.extend({
  type: z.literal("ARC"),
  width: z.number(),
  start: PointSchema,
  end: PointSchema,
  radius: z.number(),
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

export const PackageDetailShapeSchema = z.discriminatedUnion("type", [
  TrackSchema,
  PadSchema,
  ArcSchema,
  CircleSchema,
  SolidRegionSchema,
  SVGNodeSchema,
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
      .map((n) => Number(n))
  )

export const ShapeItemSchema = z
  .object({
    type: z.string(),
    data: z.string(),
  })
  .transform((shape) => {
    const [firstParam, ...restParams] = shape.data.split("~")
    const lastParam = restParams.pop()

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
        ] = params.map((p) => (isNaN(Number(p)) ? p : Number(p)))
        const center = { x: centerX, y: centerY }
        let points, rotation
        if (padShape === "RECT") {
          points = parsePoints(rest[0] as any)
          rotation = Number(rest[1])
        }
        return PadSchema.parse({
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
        })
      }
      case "ARC": {
        const [width, layer, , arcData] = shape.data.split("~")
        const [, startX, startY, , , endX, endY] = arcData
          .match(
            /M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) \d+ \d+ \d+ ([\d.]+) ([\d.]+)/
          )!
          .map(Number)
        const start: [number, number] = [startX, startY]
        const end: [number, number] = [endX, endY]
        const radius = Number(arcData.match(/A ([\d.]+)/)?.[1])
        return ArcSchema.parse({
          type: "ARC",
          width: Number(width),
          layer: Number(layer),
          start,
          end,
          radius,
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
      case "SOLIDREGION": {
        const [layermask, , pathData, fillStyle, id] = shape.data.split("~")
        const points = pathData
          .match(/[ML] ([\d.]+ [\d.]+)/g)!
          .map((point) => point.slice(2).split(" ").map(Number))
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
      default:
        return BaseShapeSchema.parse({ type: shape.type })
    }
  })
  .pipe(PackageDetailShapeSchema)

export const ShapesArraySchema = z.array(ShapeItemSchema)
