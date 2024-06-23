import { z } from "zod"

const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
})

const RectangleShapeOutputSchema = z.object({
  type: z.literal("rectangle"),
  position: PointSchema,
  width: z.number(),
  height: z.number(),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

export const RectangleShapeSchema = z
  .string()
  .startsWith("R~")
  .transform((str): z.infer<typeof RectangleShapeOutputSchema> => {
    const [, x, y, , , width, height, color, lineWidth, , , id] = str.split("~")
    return {
      type: "rectangle",
      position: { x: Number(x), y: Number(y) },
      width: Number(width),
      height: Number(height),
      color,
      lineWidth: Number(lineWidth),
      id,
    }
  })
  .pipe(RectangleShapeOutputSchema)

const EllipseShapeOutputSchema = z.object({
  type: z.literal("ellipse"),
  center: PointSchema,
  radiusX: z.number(),
  radiusY: z.number(),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

export const EllipseShapeSchema = z
  .string()
  .startsWith("E~")
  .transform((str): z.infer<typeof EllipseShapeOutputSchema> => {
    const [, x, y, radiusX, radiusY, color, lineWidth, , , id] = str.split("~")
    return {
      type: "ellipse",
      center: { x: Number(x), y: Number(y) },
      radiusX: Number(radiusX),
      radiusY: Number(radiusY),
      color,
      lineWidth: Number(lineWidth),
      id,
    }
  })
  .pipe(EllipseShapeOutputSchema)

const PinShapeOutputSchema = z.object({
  type: z.literal("pin"),
  pinNumber: z.number(),
  position: PointSchema,
  orientation: z.number(),
  id: z.string(),
  label: z.string(),
  labelColor: z.string(),
  pinShape: z.string(),
})

export const PinShapeSchema = z
  .string()
  .startsWith("P~")
  .transform((str): z.infer<typeof PinShapeOutputSchema> => {
    const [, , , pinNumber, x, y, orientation, id, , , , , , , label, , , , labelColor, , , , , pinShape] = str.split(/~|\^\^/)
    return {
      type: "pin",
      pinNumber: Number(pinNumber),
      position: { x: Number(x), y: Number(y) },
      orientation: Number(orientation),
      id,
      label,
      labelColor,
      pinShape,
    }
  })
  .pipe(PinShapeOutputSchema)

export const SingleLetterShapeSchema = z.union([
  RectangleShapeSchema,
  EllipseShapeSchema,
  PinShapeSchema,
])
