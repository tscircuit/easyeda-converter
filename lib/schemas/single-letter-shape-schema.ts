import { z } from "zod"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"

/**
 I'll break down the elements in the `dataStr.head.shape` array and explain what they represent. This array contains instructions for drawing the schematic symbol of the component.
1. `"R~365~275~2~2~70~50~#880000~1~0~none~gge1~0~"`
   This represents a rectangle:
   - Starting position: (365, 275)
   - Width: 70
   - Height: 50
   - Color: #880000 (dark red)
   - Line width: 1
   - Other parameters are for internal use
2. `"E~370~280~1.5~1.5~#880000~1~0~#880000~gge2~0"`
   This draws an ellipse:
   - Center: (370, 280)
   - Radius X: 1.5
   - Radius Y: 1.5
   - Color: #880000 (dark red)
   - Line width: 1
3-10. `"P~show~0~1~355~285~180~gge5~0^^355~285^^M355,285h10~#000000^^1~368.7~289~0~GND~start~~~#000000^^1~364.5~284~0~1~end~~~#000000^^0~362~285^^0~M 365 288 L 368 285 L 365 282"`
   These represent pins of the component. Each pin has:
   - Pin number
   - Position
   - Orientation
   - Label (e.g., GND, TRIG, OUT)
   - Color
   - Drawing instructions for the pin shape
4. `"A~M x1 y1 A radius radius 0 1 0 x2 y2"`
   This represents an arc:
   - Start point: (x1, y1)
   - End point: (x2, y2)
   - Radius
   - Direction (CW or CCW)
   - Color
   - Line width
   - ID
To parse this data:
1. Split the string by `~` to get individual parameters.
2. For rectangles (R), use parameters 2-7 for position, size, and color.
3. For ellipses (E), use parameters 2-5 for position and size, and 6 for color.
4. For pins (P), split further by `^^` to get different sections:
   - First section: general pin properties
   - Second section: pin position
   - Third section: line drawing instruction
   - Fourth and Fifth sections: label position and text
   - Sixth section: additional drawing instruction for pin shape
5. For arcs (A), split by `~M ` to get the path data.
   - Format: A~M x1 y1 A radius radius 0 1 0 x2 y2
   - Parse the start and end points, radius, direction, color, line width, and ID.
This data structure allows for a compact representation of the schematic symbol, which can be rendered by CAD software to display the component in circuit diagrams.
 */
// Examples
// "R~365~275~2~2~70~50~#880000~1~0~none~gge1~0~",
// "E~370~280~1.5~1.5~#880000~1~0~#880000~gge2~0",
// "P~show~0~1~355~285~180~gge5~0^^355~285^^M355,285h10~#000000^^1~368.7~289~0~GND~start~~~#000000^^1~364.5~284~0~1~end~~~#000000^^0~362~285^^0~M 365 288 L 368 285 L 365 282",
// "P~show~0~2~355~295~180~gge6~0^^355~295^^M355,295h10~#880000^^1~368.7~299~0~TRIG~start~~~#0000FF^^1~364.5~294~0~2~end~~~#0000FF^^0~362~295^^0~M 365 298 L 368 295 L 365 292",
// "P~show~0~3~355~305~180~gge7~0^^355~305^^M355,305h10~#880000^^1~368.7~309~0~OUT~start~~~#0000FF^^1~364.5~304~0~3~end~~~#0000FF^^0~362~305^^0~M 365 308 L 368 305 L 365 302",
// "P~show~0~4~355~315~180~gge8~0^^355~315^^M355,315h10~#880000^^1~368.7~319~0~RESET~start~~~#0000FF^^1~364.5~314~0~4~end~~~#0000FF^^0~362~315^^0~M 365 318 L 368 315 L 365 312",
// "P~show~0~5~445~315~0~gge9~0^^445~315^^M445,315h-10~#880000^^1~431.3~319~0~CONT~end~~~#0000FF^^1~435.5~314~0~5~start~~~#0000FF^^0~438~315^^0~M 435 312 L 432 315 L 435 318",
// "P~show~0~6~445~305~0~gge10~0^^445~305^^M445,305h-10~#880000^^1~431.3~309~0~THRES~end~~~#0000FF^^1~435.5~304~0~6~start~~~#0000FF^^0~438~305^^0~M 435 302 L 432 305 L 435 308",
// "P~show~0~7~445~295~0~gge11~0^^445~295^^M445,295h-10~#880000^^1~431.3~299~0~DISCH~end~~~#0000FF^^1~435.5~294~0~7~start~~~#0000FF^^0~438~295^^0~M 435 292 L 432 295 L 435 298",
// "P~show~0~8~445~285~0~gge12~0^^445~285^^M445,285h-10~#FF0000^^1~431.3~289~0~VCC~end~~~#FF0000^^1~435.5~284~0~8~start~~~#FF0000^^0~438~285^^0~M 435 282 L 432 285 L 435 288",
// "A~M x1 y1 A radius radius 0 1 0 x2 y2"

const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
})

const RectangleShapeOutputSchema = z.object({
  type: z.literal("RECTANGLE"),
  position: PointSchema,
  width: z.number(),
  height: z.number(),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

const parseRectangle = (
  str: string,
): z.infer<typeof RectangleShapeOutputSchema> => {
  const [, x, y, , , width, height, color, lineWidth, , , id] = str.split("~")
  return {
    type: "RECTANGLE",
    position: { x: Number(x), y: Number(y) },
    width: Number(width),
    height: Number(height),
    color,
    lineWidth: Number(lineWidth),
    id,
  }
}

export const RectangleShapeSchema = z
  .string()
  .startsWith("R~")
  .transform(parseRectangle)
  .pipe(RectangleShapeOutputSchema)

const EllipseShapeOutputSchema = z.object({
  type: z.literal("ELLIPSE"),
  center: PointSchema,
  radiusX: z.number(),
  radiusY: z.number(),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

const parseEllipse = (
  str: string,
): z.infer<typeof EllipseShapeOutputSchema> => {
  const [, x, y, radiusX, radiusY, color, lineWidth, , , id] = str.split("~")
  return {
    type: "ELLIPSE",
    center: { x: Number(x), y: Number(y) },
    radiusX: Number(radiusX),
    radiusY: Number(radiusY),
    color,
    lineWidth: Number(lineWidth),
    id,
  }
}

export const EllipseShapeSchema = z
  .string()
  .startsWith("E~")
  .transform(parseEllipse)
  .pipe(EllipseShapeOutputSchema)

const ArcShapeOutputSchema = z.object({
  type: z.literal("ARC"),
  start: PointSchema,
  end: PointSchema,
  radius: z.number(),
  sweepFlag: z.boolean(),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

const parseArc = (str: string): z.infer<typeof ArcShapeOutputSchema> => {
  // Format: A~M x1 y1 A radius radius 0 1 0 x2 y2~#880000~1~0~none~gge49~0
  const [, pathData, color, lineWidth, , , id] = str.split("~")
  const parts = pathData.split(" ")

  // Handle potential NaN values by defaulting to 0
  const x1 = Number(parts[1]) || 0
  const y1 = Number(parts[2]) || 0
  const radius = Number(parts[4]) || 0
  const sweepFlag = parts[7] === "1" // The sweep flag is the 8th parameter
  const x2 = Number(parts[8]) || 0
  const y2 = Number(parts[9]) || 0

  // Handle empty or invalid line width
  const parsedLineWidth = Number(lineWidth)
  const finalLineWidth = Number.isNaN(parsedLineWidth) ? 1 : parsedLineWidth

  return {
    type: "ARC",
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    radius,
    sweepFlag,
    color: color || "#880000", // Default color
    lineWidth: finalLineWidth,
    id: id || "gge1",
  }
}

export const ArcShapeSchema = z
  .string()
  .startsWith("A~")
  .transform(parseArc)
  .pipe(ArcShapeOutputSchema)

const PinShapeOutputSchema = z.object({
  type: z.literal("PIN"),
  visibility: z.enum(["show", "hide", "none"]),
  pinNumber: z.union([z.string(), z.number()]),
  x: z.number(),
  y: z.number(),
  rotation: z.number(),
  id: z.string(),
  label: z.string(),
  labelColor: z.string(),
  path: z.string(),
  arrow: z.string(),
})

const parsePin = (pinString: string): z.infer<typeof PinShapeOutputSchema> => {
  const parts = pinString.split("~")
  const [, visibility, , pinNumber, x, y, rotation, id] = parts

  const nameMatch = pinString.match(/~([\w+#-]+)~(start|end)~/)
  let label = nameMatch ? nameMatch[1] : ""
  if (label.endsWith("+")) label = label.slice(0, -1) + "_POS"
  if (label.endsWith("-")) label = label.slice(0, -1) + "_NEG"
  if (label.endsWith("#")) label = label.slice(0, -1)
  if (/^\+\d+(?:\.\d+)?V$/i.test(label)) label = `V${label.slice(1, -1)}`

  const colorMatch = pinString.match(/#[0-9A-F]{6}/)
  const labelColor = colorMatch ? colorMatch[0] : ""

  const pathMatch = pinString.match(/\^\^([^~]+)/)
  const path = pathMatch ? pathMatch[1] : ""

  const arrowMatch = pinString.match(/\^\^0~(.+)$/)
  const arrow = arrowMatch ? arrowMatch[1] : ""

  const r = Number.parseFloat(rotation)
  return {
    type: "PIN",
    visibility: visibility as "show" | "hide" | "none",
    id,
    pinNumber: Number.isNaN(Number(pinNumber)) ? pinNumber : Number(pinNumber),
    x: Number.parseFloat(x),
    y: Number.parseFloat(y),
    rotation: Number.isNaN(r) ? 0 : r,
    label,
    labelColor,
    path,
    arrow,
  }
}

export const PinShapeSchema = z
  .string()
  .startsWith("P~")
  .transform(parsePin)
  .pipe(PinShapeOutputSchema)

const PolylineShapeOutputSchema = z.object({
  type: z.literal("POLYLINE"),
  points: z.array(PointSchema),
  color: z.string(),
  lineWidth: z.number(),
  id: z.string(),
})

const parsePoints = (pointsStr: string): Array<{ x: number; y: number }> => {
  return pointsStr
    .split(" ")
    .reduce<Array<{ x: number; y: number }>>((acc, value, index) => {
      if (index % 2 === 0) {
        acc.push({ x: Number(value), y: 0 })
      } else {
        acc[acc.length - 1].y = Number(value)
      }
      return acc
    }, [])
}

const parsePolyline = (
  str: string,
): z.infer<typeof PolylineShapeOutputSchema> => {
  const [, ...rest] = str.split("~")
  const [pointsStr, color, lineWidth, , , id] = rest

  return {
    type: "POLYLINE",
    points: parsePoints(pointsStr),
    color,
    lineWidth: Number(lineWidth),
    id,
  }
}

export const PolylineShapeSchema = z
  .string()
  .startsWith("PL~")
  .transform(parsePolyline)
  .pipe(PolylineShapeOutputSchema)

const PolygonShapeOutputSchema = z.object({
  type: z.literal("POLYGON"),
  points: z.array(PointSchema),
  fillColor: z.string(),
  lineWidth: z.number(),
  lineColor: z.string(),
  id: z.string(),
})

const parsePolygon = (
  str: string,
): z.infer<typeof PolygonShapeOutputSchema> => {
  const [, ...rest] = str.split("~")
  const [pointsStr, fillColor, lineWidth, lineColor, , id] = rest

  return {
    type: "POLYGON",
    points: parsePoints(pointsStr),
    fillColor,
    lineWidth: Number(lineWidth),
    lineColor,
    id,
  }
}

export const PolygonShapeSchema = z
  .string()
  .startsWith("PG~")
  .transform(parsePolygon)
  .pipe(PolygonShapeOutputSchema)

const PathShapeOutputSchema = z.object({
  type: z.literal("PATH"),
  pathData: z.string(),
  fillColor: z.string(),
  strokeWidth: z.number(),
  strokeColor: z.string(),
  id: z.string(),
})

const parsePath = (str: string): z.infer<typeof PathShapeOutputSchema> => {
  const [, pathData, fillColor, strokeWidth, strokeColor, , id] = str.split("~")
  return {
    type: "PATH",
    pathData,
    fillColor,
    strokeWidth: mil10ToMm(Number(strokeWidth)),
    strokeColor,
    id,
  }
}

export const PathShapeSchema = z
  .string()
  .startsWith("PT~")
  .transform(parsePath)
  .pipe(PathShapeOutputSchema)

const TextShapeOutputSchema = z.object({
  type: z.literal("TEXT"),
  alignment: z.enum(["L", "C", "R"]),
  x: z.number(),
  y: z.number(),
  rotation: z.number(),
  fontColor: z.string(),
  backgroundColor: z.string().optional(),
  fontSize: z.string(),
  fontWeight: z.string().optional().default("normal"),
  fontStyle: z.enum(["normal", "italic"]).optional().default("normal"),
  fontDecoration: z.string().optional().default(""),
  content: z.string(),
  textType: z.string(),
  visibility: z.enum(["0", "1"]),
  mirror: z.string(),
  id: z.string(),
})

const parseText = (str: string): z.infer<typeof TextShapeOutputSchema> => {
  const [
    ,
    alignment,
    x,
    y,
    rotation,
    fontColor,
    backgroundColor,
    fontSize,
    fontWeight,
    fontStyle,
    fontDecoration,
    content,
    textType,
    visibility,
    mirror,
    id,
  ] = str.split("~")
  return {
    type: "TEXT",
    alignment: alignment as "L" | "C" | "R",
    x: Number(x),
    y: Number(y),
    rotation: Number(rotation),
    fontColor,
    backgroundColor: backgroundColor || undefined,
    fontSize,
    fontWeight: fontWeight || "normal",
    fontStyle: (fontStyle || "normal") as "normal" | "italic",
    fontDecoration: fontDecoration || "",
    content,
    textType,
    visibility: visibility as "0" | "1",
    mirror,
    id,
  }
}

export const TextShapeSchema = z
  .string()
  .startsWith("T~")
  .transform(parseText)
  .pipe(TextShapeOutputSchema)

export const SingleLetterShapeSchema = z
  .string()
  .transform((x) => {
    // We do some discrimination here for better errors
    if (x.startsWith("R~")) return RectangleShapeSchema.parse(x)
    if (x.startsWith("E~")) return EllipseShapeSchema.parse(x)
    if (x.startsWith("P~")) return PinShapeSchema.parse(x)
    if (x.startsWith("PL~")) return PolylineShapeSchema.parse(x)
    if (x.startsWith("PG~")) return PolygonShapeSchema.parse(x)
    if (x.startsWith("PT~")) return PathShapeSchema.parse(x)
    if (x.startsWith("T~")) return TextShapeSchema.parse(x)
    if (x.startsWith("A~")) return ArcShapeSchema.parse(x)
    throw new Error(`Invalid shape type: ${x}`)
  })
  .pipe(
    z.union([
      RectangleShapeOutputSchema,
      EllipseShapeOutputSchema,
      PinShapeOutputSchema,
      PolylineShapeOutputSchema,
      PolygonShapeOutputSchema,
      PathShapeOutputSchema,
      TextShapeOutputSchema,
      ArcShapeOutputSchema,
    ]),
  )

export type SingleLetterShape = z.infer<typeof SingleLetterShapeSchema>
