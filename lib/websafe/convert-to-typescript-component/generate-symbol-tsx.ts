import {
  type Point,
  distance,
  getUnitVectorFromDirection,
} from "@tscircuit/math-utils"
import type { AnyCircuitElement } from "circuit-json"
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
const toSchematicUnits = (value: number): number =>
  round(value * EASYEDA_SCHEMATIC_UNIT_TO_TSCIRCUIT_UNIT)

const getPointTransformer =
  (origin: { x: number; y: number }) => (point: { x: number; y: number }) => ({
    x: toSchematicUnits(point.x - origin.x),
    y: toSchematicUnits(origin.y - point.y),
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

  const transformPoint = getPointTransformer(origin)
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
          formatNumber(toSchematicUnits(Math.abs(values[0]))),
          formatNumber(toSchematicUnits(Math.abs(values[1]))),
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

const getPinStemLength = (path: string): number | undefined => {
  const segment = path.match(/[hHvV]\s*(-?(?:\d*\.\d+|\d+\.?))/)
  if (!segment) return undefined
  return toSchematicUnits(Math.abs(Number(segment[1])))
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
}: {
  shape: SingleLetterShape
  origin: { x: number; y: number }
  portMetadata?: PortMetadata
  drawingEndpoints?: Point[]
}): string | undefined => {
  const transformPoint = getPointTransformer(origin)

  if (shape.type === "RECTANGLE") {
    // SchematicRect currently drops fillColor, using the outline color as the
    // fill. A closed path preserves separate outline and fill colors.
    if (
      shape.fillColor &&
      shape.fillColor !== "none" &&
      shape.fillColor.toLowerCase() !== shape.color.toLowerCase()
    ) {
      const { x, y } = shape.position
      const points = [
        { x, y },
        { x: x + shape.width, y },
        { x: x + shape.width, y: y + shape.height },
        { x, y: y + shape.height },
        { x, y },
      ].map(transformPoint)
      return `<schematicpath points={${JSON.stringify(points)}} strokeWidth={${toSchematicUnits(shape.lineWidth)}} strokeColor=${JSON.stringify(shape.color)} isFilled fillColor=${JSON.stringify(shape.fillColor)} />`
    }
    const center = transformPoint({
      x: shape.position.x + shape.width / 2,
      y: shape.position.y + shape.height / 2,
    })
    return `<schematicrect schX={${center.x}} schY={${center.y}} width={${toSchematicUnits(shape.width)}} height={${toSchematicUnits(shape.height)}} strokeWidth={${toSchematicUnits(shape.lineWidth)}} color=${JSON.stringify(shape.color)}${shape.fillColor && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "ELLIPSE") {
    const center = transformPoint(shape.center)
    return `<schematiccircle center={{ x: ${center.x}, y: ${center.y} }} radius={${toSchematicUnits(Math.max(shape.radiusX, shape.radiusY))}} strokeWidth={${toSchematicUnits(shape.lineWidth)}} color=${JSON.stringify(shape.color)}${shape.fillColor && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "POLYLINE" || shape.type === "POLYGON") {
    const isPolygon = shape.type === "POLYGON"
    const points = shape.points.map(transformPoint)
    if (isPolygon && points.length > 0) points.push(points[0])
    return `<schematicpath points={${JSON.stringify(points)}} strokeColor=${JSON.stringify(isPolygon ? shape.lineColor : shape.color)}${isPolygon && shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "PATH") {
    const transformedPath = transformSvgPath(shape.pathData, origin)
    if (!transformedPath) return undefined
    return `<schematicpath svgPath=${JSON.stringify(transformedPath)} strokeColor=${JSON.stringify(shape.strokeColor)}${shape.fillColor !== "none" ? ` isFilled fillColor=${JSON.stringify(shape.fillColor)}` : ""} />`
  }

  if (shape.type === "ARC") {
    const transformedPath = transformSvgPath(shape.pathData, origin)
    if (!transformedPath) return undefined
    return `<schematicpath svgPath=${JSON.stringify(transformedPath)} strokeColor=${JSON.stringify(shape.color)} />`
  }

  if (shape.type === "TEXT") {
    if (shape.visibility !== "1") return undefined
    const position = transformPoint({ x: shape.x, y: shape.y })
    return `<schematictext schX={${position.x}} schY={${position.y}} text=${JSON.stringify(shape.content)} fontSize={${getTextFontSize(shape.fontSize)}} anchor=${JSON.stringify(getTextAnchor(shape.alignment))} color=${JSON.stringify(shape.fontColor)} schRotation={${round(-shape.rotation)}} />`
  }

  if (shape.type === "PIN" && portMetadata) {
    if (shape.visibility !== "show") return undefined
    const direction = getPinDirection(shape.rotation)
    const stemLength = getPinStemLength(shape.path)
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
  const transformPoint = getPointTransformer(origin)
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
