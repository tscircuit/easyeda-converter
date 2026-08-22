import type { AnyCircuitElement } from "circuit-json"
import {
  distance,
  getUnitVectorFromDirection,
  type Point,
} from "@tscircuit/math-utils"
import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import type { SingleLetterShape } from "lib/schemas/single-letter-shape-schema"
import { normalizeSymbolName } from "lib/utils/normalize-symbol-name"

const round = (value: number): number => Number(value.toFixed(6))

/**
 * EasyEDA schematic coordinates use a 10 mil grid unit. A normal 100 mil pin
 * grid is therefore 10 EasyEDA units, which corresponds to tscircuit's 0.2
 * schematic pin spacing. Schematic coordinates are intentionally not physical
 * millimeters; PCB and CAD conversion must continue to use mil10ToMm instead.
 */
const EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT = 0.02
const toSchematicUnits = (value: number, symbolScale = 1): number =>
  round(value * EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT * symbolScale)

const getPointTransformer =
  (origin: { x: number; y: number }, symbolScale = 1) =>
  (point: { x: number; y: number }) => ({
    x: toSchematicUnits(point.x - origin.x, symbolScale),
    y: toSchematicUnits(origin.y - point.y, symbolScale),
  })

const formatNumber = (value: number): string => String(round(value))

const SVG_PATH_COMMAND_PARAMETER_COUNTS: Record<string, number> = {
  A: 7,
  C: 6,
  H: 1,
  L: 2,
  M: 2,
  Q: 4,
  S: 4,
  T: 2,
  V: 1,
  Z: 0,
}

/**
 * Convert an EasyEDA SVG path from its global, Y-down 10 mil coordinate space
 * into the local, Y-up schematic coordinate space used by <symbol />.
 */
const transformSvgPath = (
  pathData: string,
  origin: { x: number; y: number },
  symbolScale = 1,
): string => {
  const tokens =
    pathData.match(
      /[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,
    ) ?? []
  const output: string[] = []
  let command = ""
  let tokenIndex = 0
  let currentX = 0
  let currentY = 0
  let subpathStartX = 0
  let subpathStartY = 0

  const transformPoint = getPointTransformer(origin, symbolScale)
  const getOriginalPoint = (x: number, y: number, isRelative: boolean) => ({
    x: isRelative ? currentX + x : x,
    y: isRelative ? currentY + y : y,
  })

  while (tokenIndex < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[tokenIndex])) {
      command = tokens[tokenIndex]
      tokenIndex += 1
    }

    if (!command) break

    const upperCommand = command.toUpperCase()
    const parameterCount = SVG_PATH_COMMAND_PARAMETER_COUNTS[upperCommand]
    if (parameterCount === undefined) break

    if (upperCommand === "Z") {
      output.push("Z")
      currentX = subpathStartX
      currentY = subpathStartY
      command = ""
      continue
    }

    if (tokenIndex + parameterCount > tokens.length) break
    if (/^[A-Za-z]$/.test(tokens[tokenIndex])) continue

    const values = tokens
      .slice(tokenIndex, tokenIndex + parameterCount)
      .map(Number)
    tokenIndex += parameterCount
    const isRelative = command === command.toLowerCase()

    if (upperCommand === "H" || upperCommand === "V") {
      const point = getOriginalPoint(
        upperCommand === "H" ? values[0] : isRelative ? 0 : currentX,
        upperCommand === "V" ? values[0] : isRelative ? 0 : currentY,
        isRelative,
      )
      const transformed = transformPoint(point)
      output.push(
        `L ${formatNumber(transformed.x)} ${formatNumber(transformed.y)}`,
      )
      currentX = point.x
      currentY = point.y
      continue
    }

    if (["M", "L", "T"].includes(upperCommand)) {
      const point = getOriginalPoint(values[0], values[1], isRelative)
      const transformed = transformPoint(point)
      output.push(
        `${upperCommand} ${formatNumber(transformed.x)} ${formatNumber(transformed.y)}`,
      )
      currentX = point.x
      currentY = point.y
      if (upperCommand === "M") {
        subpathStartX = point.x
        subpathStartY = point.y
        command = isRelative ? "l" : "L"
      }
      continue
    }

    if (["C", "S", "Q"].includes(upperCommand)) {
      const transformedValues: number[] = []
      for (let valueIndex = 0; valueIndex < values.length; valueIndex += 2) {
        const point = getOriginalPoint(
          values[valueIndex],
          values[valueIndex + 1],
          isRelative,
        )
        const transformed = transformPoint(point)
        transformedValues.push(transformed.x, transformed.y)
      }
      output.push(
        `${upperCommand} ${transformedValues.map(formatNumber).join(" ")}`,
      )
      currentX = isRelative
        ? currentX + values[values.length - 2]
        : values[values.length - 2]
      currentY = isRelative
        ? currentY + values[values.length - 1]
        : values[values.length - 1]
      continue
    }

    if (upperCommand === "A") {
      const endpoint = getOriginalPoint(values[5], values[6], isRelative)
      const transformedEndpoint = transformPoint(endpoint)
      output.push(
        [
          "A",
          formatNumber(toSchematicUnits(Math.abs(values[0]), symbolScale)),
          formatNumber(toSchematicUnits(Math.abs(values[1]), symbolScale)),
          formatNumber(-values[2]),
          String(values[3]),
          String(values[4] === 0 ? 1 : 0),
          formatNumber(transformedEndpoint.x),
          formatNumber(transformedEndpoint.y),
        ].join(" "),
      )
      currentX = endpoint.x
      currentY = endpoint.y
    }
  }

  return output.join(" ")
}

const getPinDirection = (
  rotation: number,
): "up" | "down" | "left" | "right" => {
  const normalizedRotation = ((rotation % 360) + 360) % 360
  if (normalizedRotation === 90) return "up"
  if (normalizedRotation === 180) return "left"
  if (normalizedRotation === 270) return "down"
  return "right"
}

const getRawPinStemLength = (path: string): number | undefined => {
  const segment = path.match(/[hHvV]\s*(-?(?:\d*\.\d+|\d+\.?))/)
  if (!segment) return undefined
  return Math.abs(Number(segment[1]))
}

const getPinStemLength = (
  path: string,
  symbolScale = 1,
): number | undefined => {
  const stemLength = getRawPinStemLength(path)
  return stemLength === undefined
    ? undefined
    : toSchematicUnits(stemLength, symbolScale)
}

// circuit-to-svg renders custom-symbol pin labels at a fixed 0.15 schematic
// unit font size (0.12 for negated labels). Reserve enough room between
// opposing pin rows so imported symbols do not place those labels on top of
// each other. Scaling is derived from the symbol's own pins and labels and is
// uniform, so pin rotations and drawing proportions are preserved.
const PIN_LABEL_FONT_SIZE = 0.15
const NEGATED_PIN_LABEL_FONT_SIZE = PIN_LABEL_FONT_SIZE * 0.8
const AVERAGE_GLYPH_WIDTH_IN_EM = 0.7
const PIN_LABEL_INSET = 0.1
const LABEL_CLEARANCE = 0.02

const getPinLabelMetrics = (
  label: string,
): { width: number; height: number } => {
  const isNegated = label.startsWith("N_")
  const displayLabel = isNegated ? label.slice(2) : label
  const height = isNegated ? NEGATED_PIN_LABEL_FONT_SIZE : PIN_LABEL_FONT_SIZE
  return {
    width: displayLabel.length * height * AVERAGE_GLYPH_WIDTH_IN_EM,
    height,
  }
}

const getCustomSymbolClearanceScale = (shapes: SingleLetterShape[]): number => {
  const pins = shapes.filter(
    (shape): shape is Extract<SingleLetterShape, { type: "PIN" }> =>
      shape.type === "PIN",
  )
  const entries = pins.flatMap((pin) => {
    const stemLength = getRawPinStemLength(pin.path)
    if (stemLength === undefined || !pin.label) return []
    const direction = getPinDirection(pin.rotation)
    return [
      {
        direction,
        pinX: pin.x * EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT,
        pinY: -pin.y * EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT,
        stemLength: stemLength * EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT,
        metrics: getPinLabelMetrics(normalizeSymbolName(pin.label)),
      },
    ]
  })

  // Short identifiers fit within one line-height and do not need the custom
  // symbol expanded even when their conservative bounding boxes touch.
  if (entries.every((entry) => entry.metrics.width <= entry.metrics.height)) {
    return 1
  }

  const labelsOverlapAtScale = (scale: number): boolean => {
    const boxes = entries.map((entry) => {
      const outward = getUnitVectorFromDirection(entry.direction)
      const bodyX = (entry.pinX - outward.x * entry.stemLength) * scale
      const bodyY = (entry.pinY - outward.y * entry.stemLength) * scale
      const anchorX = bodyX - outward.x * PIN_LABEL_INSET
      const anchorY = bodyY - outward.y * PIN_LABEL_INSET
      const { width, height } = entry.metrics

      if (entry.direction === "left") {
        return {
          left: anchorX,
          right: anchorX + width,
          bottom: anchorY - height / 2,
          top: anchorY + height / 2,
        }
      }
      if (entry.direction === "right") {
        return {
          left: anchorX - width,
          right: anchorX,
          bottom: anchorY - height / 2,
          top: anchorY + height / 2,
        }
      }
      if (entry.direction === "up") {
        return {
          left: anchorX - height / 2,
          right: anchorX + height / 2,
          bottom: anchorY - width,
          top: anchorY,
        }
      }
      return {
        left: anchorX - height / 2,
        right: anchorX + height / 2,
        bottom: anchorY,
        top: anchorY + width,
      }
    })

    return boxes.some((box, index) =>
      boxes
        .slice(index + 1)
        .some(
          (other) =>
            box.left < other.right + LABEL_CLEARANCE &&
            box.right + LABEL_CLEARANCE > other.left &&
            box.bottom < other.top + LABEL_CLEARANCE &&
            box.top + LABEL_CLEARANCE > other.bottom,
        ),
    )
  }

  let scale = 1
  while (scale < 10 && labelsOverlapAtScale(scale)) scale += 0.05
  return round(scale)
}

const getOpenPolylineEndpoints = (
  shapes: SingleLetterShape[],
  transformPoint: (point: Point) => Point,
): Point[] =>
  shapes.flatMap((shape) => {
    if (shape.type !== "POLYLINE" || shape.points.length < 2) return []
    const first = shape.points[0]!
    const last = shape.points[shape.points.length - 1]!
    if (first.x === last.x && first.y === last.y) return []
    return [transformPoint(first), transformPoint(last)]
  })

const alignPortToDrawing = ({
  position,
  direction,
  stemLength,
  drawingEndpoints,
}: {
  position: Point
  direction: "up" | "down" | "left" | "right"
  stemLength: number | undefined
  drawingEndpoints: Point[]
}): Point => {
  if (stemLength === undefined) return position

  const outwardDirection = getUnitVectorFromDirection(direction)
  const expectedBodyConnection = {
    x: position.x - outwardDirection.x * stemLength,
    y: position.y - outwardDirection.y * stemLength,
  }
  const alignmentTolerance = Math.max(0.02, stemLength * 0.25)
  const nearestEndpoint = drawingEndpoints
    .map((endpoint) => ({
      endpoint,
      distance: distance(endpoint, expectedBodyConnection),
    }))
    .filter((candidate) => candidate.distance <= alignmentTolerance)
    .sort((a, b) => a.distance - b.distance)[0]?.endpoint

  if (!nearestEndpoint) return position
  return {
    x: round(nearestEndpoint.x + outwardDirection.x * stemLength),
    y: round(nearestEndpoint.y + outwardDirection.y * stemLength),
  }
}

const getTextFontSize = (fontSize: string): number => {
  const numericFontSize = Number.parseFloat(fontSize)
  if (!Number.isFinite(numericFontSize)) return 0.2
  return toSchematicUnits(numericFontSize)
}

const getTextAnchor = (
  alignment: "L" | "C" | "R",
): "left" | "center" | "right" => {
  if (alignment === "L") return "left"
  if (alignment === "R") return "right"
  return "center"
}

interface PortMetadata {
  name: string
  pinNumber?: number
  aliases: string[]
}

const getPortMetadataByShapeId = (
  easyEdaJson: BetterEasyEdaJson,
  circuitJson: AnyCircuitElement[],
): Map<string, PortMetadata> => {
  const pins = easyEdaJson.dataStr.shape.filter(
    (shape): shape is Extract<SingleLetterShape, { type: "PIN" }> =>
      shape.type === "PIN",
  )
  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "PAD",
  )
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const sourcePortNamesByPadNumber = new Map<string, string[]>()

  pads.forEach((pad, padIndex) => {
    const sourcePort = sourcePorts.find(
      (port) => port.source_port_id === `source_port_${padIndex + 1}`,
    )
    if (!sourcePort) return
    const padNumber = String(pad.number)
    sourcePortNamesByPadNumber.set(padNumber, [
      ...(sourcePortNamesByPadNumber.get(padNumber) ?? []),
      sourcePort.name,
    ])
  })

  const usedPortNamesByPadNumber = new Map<string, number>()
  const usedPortNames = new Set<string>()
  const metadataByShapeId = new Map<string, PortMetadata>()

  pins.forEach((pin, pinIndex) => {
    const pinNumberKey = String(pin.pinNumber)
    const matchingPortNames = sourcePortNamesByPadNumber.get(pinNumberKey) ?? []
    const matchingPortIndex = usedPortNamesByPadNumber.get(pinNumberKey) ?? 0
    let portName: string | undefined = matchingPortNames[matchingPortIndex]
    usedPortNamesByPadNumber.set(pinNumberKey, matchingPortIndex + 1)

    if (!portName && pin.label) {
      const normalizedLabel = normalizeSymbolName(pin.label)
      portName = sourcePorts.find(
        (port) =>
          !usedPortNames.has(port.name) &&
          port.port_hints?.includes(normalizedLabel),
      )?.name
    }

    const numericPinNumber = Number(pin.pinNumber)
    if (!portName && Number.isInteger(numericPinNumber)) {
      const numericPortName = `pin${numericPinNumber}`
      if (
        !usedPortNames.has(numericPortName) &&
        sourcePorts.some((port) => port.name === numericPortName)
      ) {
        portName = numericPortName
      }
    }

    portName ??= sourcePorts.find((port) => !usedPortNames.has(port.name))?.name
    portName ??= `pin${pinIndex + 1}`
    usedPortNames.add(portName)
    const sourcePort = sourcePorts.find((port) => port.name === portName)

    metadataByShapeId.set(pin.id, {
      name: portName,
      pinNumber: sourcePort?.pin_number,
      aliases: [
        ...(sourcePort?.port_hints ?? []),
        ...(pin.label ? [normalizeSymbolName(pin.label)] : []),
      ].filter(
        (alias, index, aliases) =>
          alias !== portName && aliases.indexOf(alias) === index,
      ),
    })
  })

  return metadataByShapeId
}

const generateShapeTsx = ({
  shape,
  origin,
  portMetadata,
  drawingEndpoints = [],
  symbolScale = 1,
}: {
  shape: SingleLetterShape
  origin: { x: number; y: number }
  portMetadata?: PortMetadata
  drawingEndpoints?: Point[]
  symbolScale?: number
}): string | undefined => {
  const transformPoint = getPointTransformer(origin, symbolScale)

  if (shape.type === "RECTANGLE") {
    const center = transformPoint({
      x: shape.position.x + shape.width / 2,
      y: shape.position.y + shape.height / 2,
    })
    return `<schematicrect schX={${center.x}} schY={${center.y}} width={${toSchematicUnits(shape.width, symbolScale)}} height={${toSchematicUnits(shape.height, symbolScale)}} color=${JSON.stringify(shape.color)}${shape.fillColor && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "ELLIPSE") {
    const center = transformPoint(shape.center)
    return `<schematiccircle center={{ x: ${center.x}, y: ${center.y} }} radius={${toSchematicUnits(Math.max(shape.radiusX, shape.radiusY), symbolScale)}} color=${JSON.stringify(shape.color)}${shape.fillColor && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "POLYLINE" || shape.type === "POLYGON") {
    const isPolygon = shape.type === "POLYGON"
    const points = shape.points.map(transformPoint)
    if (isPolygon && points.length > 0) points.push(points[0])
    return `<schematicpath points={${JSON.stringify(points)}} strokeColor=${JSON.stringify(isPolygon ? shape.lineColor : shape.color)}${isPolygon && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "PATH") {
    const transformedPath = transformSvgPath(
      shape.pathData,
      origin,
      symbolScale,
    )
    if (!transformedPath) return undefined
    return `<schematicpath svgPath=${JSON.stringify(transformedPath)} strokeColor=${JSON.stringify(shape.strokeColor)}${shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "ARC") {
    const transformedPath = transformSvgPath(
      shape.pathData,
      origin,
      symbolScale,
    )
    if (!transformedPath) return undefined
    return `<schematicpath svgPath=${JSON.stringify(transformedPath)} strokeColor=${JSON.stringify(shape.color)} />`
  }

  if (shape.type === "TEXT") {
    if (shape.visibility !== "1") return undefined
    const position = transformPoint({ x: shape.x, y: shape.y })
    return `<schematictext schX={${position.x}} schY={${position.y}} text=${JSON.stringify(shape.content)} fontSize={${getTextFontSize(shape.fontSize)}} anchor=${JSON.stringify(getTextAnchor(shape.alignment))} color=${JSON.stringify(shape.fontColor)} schRotation={${round(-shape.rotation)}} />`
  }

  if (shape.type === "PIN" && portMetadata) {
    const direction = getPinDirection(shape.rotation)
    const stemLength = getPinStemLength(shape.path, symbolScale)
    const position = alignPortToDrawing({
      position: transformPoint({ x: shape.x, y: shape.y }),
      direction,
      stemLength,
      drawingEndpoints,
    })
    const pinNumberProp =
      portMetadata.pinNumber === undefined
        ? ""
        : ` pinNumber={${portMetadata.pinNumber}}`
    const aliasesProp =
      portMetadata.aliases.length === 0
        ? ""
        : ` aliases={${JSON.stringify(portMetadata.aliases)}}`
    const stemLengthProp =
      stemLength === undefined ? "" : ` schStemLength={${stemLength}}`
    return `<port name=${JSON.stringify(portMetadata.name)}${pinNumberProp}${aliasesProp} direction=${JSON.stringify(direction)} schX={${position.x}} schY={${position.y}}${stemLengthProp} />`
  }

  // AR arrowheads and I image annotations are intentionally ignored by the
  // schema parser because tscircuit does not have an equivalent primitive.
  if (shape.type === "IGNORED") return undefined

  return undefined
}

export const generateSymbolTsx = (
  easyEdaJson: BetterEasyEdaJson,
  circuitJson: AnyCircuitElement[],
  {
    includePorts = true,
    alignPortsToDrawing = false,
  }: { includePorts?: boolean; alignPortsToDrawing?: boolean } = {},
): string | undefined => {
  const shapes = easyEdaJson.dataStr.shape
  if (shapes.length === 0) return undefined

  const headOrigin = {
    x: easyEdaJson.dataStr.head.x,
    y: easyEdaJson.dataStr.head.y,
  }
  const bounds = easyEdaJson.dataStr.BBox
  const isHeadOriginInsideBounds =
    headOrigin.x >= bounds.x &&
    headOrigin.x <= bounds.x + bounds.width &&
    headOrigin.y >= bounds.y &&
    headOrigin.y <= bounds.y + bounds.height
  const origin = isHeadOriginInsideBounds
    ? headOrigin
    : {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      }
  const portMetadataByShapeId = getPortMetadataByShapeId(
    easyEdaJson,
    circuitJson,
  )
  const symbolScale = getCustomSymbolClearanceScale(shapes)
  const transformPoint = getPointTransformer(origin, symbolScale)
  const drawingEndpoints = alignPortsToDrawing
    ? getOpenPolylineEndpoints(shapes, transformPoint)
    : []
  const shapeTsx = shapes
    .filter((shape) => includePorts || shape.type !== "PIN")
    .map((shape) =>
      generateShapeTsx({
        shape,
        origin,
        portMetadata:
          shape.type === "PIN"
            ? portMetadataByShapeId.get(shape.id)
            : undefined,
        drawingEndpoints,
        symbolScale,
      }),
    )
    .filter((tsx): tsx is string => Boolean(tsx))

  if (shapeTsx.length === 0) return undefined

  return `<symbol>
${shapeTsx.map((tsx) => `  ${tsx}`).join("\n")}
</symbol>`
}

/**
 * EasyEDA commonly represents chips as a rectangle with ports, plus optional
 * text and pin-one dots. tscircuit already generates that box representation
 * from a chip's pin labels, so it does not need a custom symbol prop.
 */
export const hasNonBoxSchematicSymbol = (
  easyEdaJson: BetterEasyEdaJson,
): boolean => {
  const drawableShapes = easyEdaJson.dataStr.shape.filter(
    (shape) =>
      shape.type !== "PIN" && shape.type !== "TEXT" && shape.type !== "IGNORED",
  )
  if (drawableShapes.length === 0) return false

  const rectangles = drawableShapes.filter(
    (shape) => shape.type === "RECTANGLE",
  )
  const onlyBoxPrimitives = drawableShapes.every(
    (shape) =>
      shape.type === "RECTANGLE" ||
      (shape.type === "ELLIPSE" && shape.radiusX <= 2 && shape.radiusY <= 2),
  )

  return rectangles.length !== 1 || !onlyBoxPrimitives
}
