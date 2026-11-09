import type { AnyCircuitElement } from "circuit-json"

type RotationDegreesCcw = 0 | 90 | 180 | 270

interface Point {
  x: number
  y: number
}

const round = (value: number): number => {
  const rounded = Number(value.toFixed(6))
  return Object.is(rounded, -0) ? 0 : rounded
}

const rotatePoint = (
  point: Point,
  center: Point,
  degreesCcw: RotationDegreesCcw,
): Point => {
  const dx = point.x - center.x
  const dy = point.y - center.y
  if (degreesCcw === 90) return { x: round(center.x - dy), y: round(center.y + dx) }
  if (degreesCcw === 180)
    return { x: round(center.x - dx), y: round(center.y - dy) }
  if (degreesCcw === 270)
    return { x: round(center.x + dy), y: round(center.y - dx) }
  return { x: point.x, y: point.y }
}

const getPadPosition = (element: AnyCircuitElement): Point | undefined => {
  if (element.type === "pcb_smtpad") {
    if (element.shape === "polygon") return getPointsCentroid(element.points)
    return { x: element.x, y: element.y }
  }
  if (element.type === "pcb_plated_hole") {
    if (element.shape === "hole_with_polygon_pad") {
      return getPointsCentroid(element.pad_outline)
    }
    return { x: element.x, y: element.y }
  }
  return undefined
}

const getPointsCentroid = (points: Point[]): Point | undefined => {
  if (points.length === 0) return undefined
  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 },
  )
  return { x: sum.x / points.length, y: sum.y / points.length }
}

const getFootprintPadGeometry = (
  circuitJson: AnyCircuitElement[],
): { pin1: Point; center: Point; maxExtent: number } | undefined => {
  const positions = circuitJson
    .map(getPadPosition)
    .filter((position): position is Point => position !== undefined)
  if (positions.length === 0) return undefined

  const pin1Positions = circuitJson
    .filter(
      (element) =>
        (element.type === "pcb_smtpad" ||
          element.type === "pcb_plated_hole") &&
        element.port_hints?.includes("pin1"),
    )
    .map(getPadPosition)
    .filter((position): position is Point => position !== undefined)
  if (pin1Positions.length === 0) return undefined

  const pin1 = getPointsCentroid(pin1Positions)
  if (!pin1) return undefined

  const xs = positions.map((position) => position.x)
  const ys = positions.map((position) => position.y)
  const extentX = (Math.max(...xs) - Math.min(...xs)) / 2
  const extentY = (Math.max(...ys) - Math.min(...ys)) / 2
  const center = {
    x: (Math.max(...xs) + Math.min(...xs)) / 2,
    y: (Math.max(...ys) + Math.min(...ys)) / 2,
  }
  return { pin1, center, maxExtent: Math.max(extentX, extentY) }
}

export const getPin1TopLeftRotationDegrees = (
  circuitJson: AnyCircuitElement[],
): RotationDegreesCcw => {
  const geometry = getFootprintPadGeometry(circuitJson)
  if (!geometry || geometry.maxExtent === 0) return 0

  const dx = geometry.pin1.x - geometry.center.x
  const dy = geometry.pin1.y - geometry.center.y
  const axisTolerance = geometry.maxExtent * 0.05
  if (Math.abs(dx) < axisTolerance || Math.abs(dy) < axisTolerance) return 0

  if (dx < 0 && dy > 0) return 0
  if (dx < 0 && dy < 0) return 270
  if (dx > 0 && dy > 0) return 90
  return 180
}

const rotateCcwRotation = (
  ccwRotation: number | undefined,
  degreesCcw: RotationDegreesCcw,
): number => (((ccwRotation ?? 0) + degreesCcw) % 360 + 360) % 360

export const rotateFootprintToPin1TopLeft = (
  circuitJson: AnyCircuitElement[],
): AnyCircuitElement[] => {
  const degreesCcw = getPin1TopLeftRotationDegrees(circuitJson)
  if (degreesCcw === 0) return circuitJson

  const geometry = getFootprintPadGeometry(circuitJson)!
  const center = geometry.center
  const isQuarterTurn = degreesCcw === 90 || degreesCcw === 270

  for (const element of circuitJson) {
    switch (element.type) {
      case "pcb_smtpad": {
        if (element.shape === "polygon") {
          element.points = element.points.map((point) =>
            rotatePoint(point, center, degreesCcw),
          )
        } else {
          const rotated = rotatePoint(element, center, degreesCcw)
          element.x = rotated.x
          element.y = rotated.y
          if (element.shape === "rotated_rect" || element.shape === "rotated_pill") {
            element.ccw_rotation = rotateCcwRotation(
              element.ccw_rotation,
              degreesCcw,
            )
          } else if (isQuarterTurn && (element.shape === "rect" || element.shape === "pill")) {
            ;[element.width, element.height] = [element.height, element.width]
          }
        }
        break
      }
      case "pcb_plated_hole": {
        const rotated = rotatePoint(element, center, degreesCcw)
        element.x = rotated.x
        element.y = rotated.y
        if ("hole_offset_x" in element && "hole_offset_y" in element) {
          const rotatedOffset = rotatePoint(
            { x: element.hole_offset_x, y: element.hole_offset_y },
            { x: 0, y: 0 },
            degreesCcw,
          )
          element.hole_offset_x = rotatedOffset.x
          element.hole_offset_y = rotatedOffset.y
        }
        if (element.shape === "oval" || element.shape === "pill") {
          element.ccw_rotation = rotateCcwRotation(
            element.ccw_rotation,
            degreesCcw,
          )
        } else if (element.shape === "pill_hole_with_rect_pad") {
          if (isQuarterTurn) {
            ;[element.hole_width, element.hole_height] = [
              element.hole_height,
              element.hole_width,
            ]
            ;[element.rect_pad_width, element.rect_pad_height] = [
              element.rect_pad_height,
              element.rect_pad_width,
            ]
          }
        } else if (element.shape === "rotated_pill_hole_with_rect_pad") {
          element.hole_ccw_rotation = rotateCcwRotation(
            element.hole_ccw_rotation,
            degreesCcw,
          )
          element.rect_ccw_rotation = rotateCcwRotation(
            element.rect_ccw_rotation,
            degreesCcw,
          )
        } else if (element.shape === "circular_hole_with_rect_pad") {
          if (element.rect_ccw_rotation !== undefined) {
            element.rect_ccw_rotation = rotateCcwRotation(
              element.rect_ccw_rotation,
              degreesCcw,
            )
          } else if (isQuarterTurn) {
            ;[element.rect_pad_width, element.rect_pad_height] = [
              element.rect_pad_height,
              element.rect_pad_width,
            ]
          }
        } else if (element.shape === "hole_with_polygon_pad") {
          element.pad_outline = element.pad_outline.map((point) =>
            rotatePoint(point, center, degreesCcw),
          )
          if (element.ccw_rotation !== undefined) {
            element.ccw_rotation = rotateCcwRotation(
              element.ccw_rotation,
              degreesCcw,
            )
          } else if (
            isQuarterTurn &&
            element.hole_width !== undefined &&
            element.hole_height !== undefined
          ) {
            ;[element.hole_width, element.hole_height] = [
              element.hole_height,
              element.hole_width,
            ]
          }
        }
        break
      }
      case "pcb_hole": {
        const rotated = rotatePoint(element, center, degreesCcw)
        element.x = rotated.x
        element.y = rotated.y
        if (
          isQuarterTurn &&
          "hole_width" in element &&
          "hole_height" in element
        ) {
          ;[element.hole_width, element.hole_height] = [
            element.hole_height,
            element.hole_width,
          ]
        }
        break
      }
      case "pcb_via": {
        const rotated = rotatePoint(element, center, degreesCcw)
        element.x = rotated.x
        element.y = rotated.y
        break
      }
      case "pcb_silkscreen_path":
      case "pcb_fabrication_note_path": {
        element.route = element.route.map((point) =>
          rotatePoint(point, center, degreesCcw),
        )
        break
      }
      case "pcb_silkscreen_line": {
        const start = rotatePoint(
          { x: element.x1, y: element.y1 },
          center,
          degreesCcw,
        )
        const end = rotatePoint(
          { x: element.x2, y: element.y2 },
          center,
          degreesCcw,
        )
        element.x1 = start.x
        element.y1 = start.y
        element.x2 = end.x
        element.y2 = end.y
        break
      }
      case "pcb_silkscreen_circle": {
        element.center = rotatePoint(element.center, center, degreesCcw)
        break
      }
      case "pcb_silkscreen_oval": {
        element.center = rotatePoint(element.center, center, degreesCcw)
        if (isQuarterTurn) {
          ;[element.radius_x, element.radius_y] = [
            element.radius_y,
            element.radius_x,
          ]
        }
        break
      }
      case "pcb_silkscreen_rect":
      case "pcb_fabrication_note_rect":
      case "pcb_courtyard_rect": {
        element.center = rotatePoint(element.center, center, degreesCcw)
        if (isQuarterTurn) {
          ;[element.width, element.height] = [element.height, element.width]
        }
        if ("ccw_rotation" in element && element.ccw_rotation !== undefined) {
          element.ccw_rotation = rotateCcwRotation(
            element.ccw_rotation,
            degreesCcw,
          )
        }
        break
      }
      case "pcb_silkscreen_text":
      case "pcb_fabrication_note_text": {
        element.anchor_position = rotatePoint(
          element.anchor_position,
          center,
          degreesCcw,
        )
        element.ccw_rotation = rotateCcwRotation(
          element.ccw_rotation,
          degreesCcw,
        )
        break
      }
      case "pcb_courtyard_outline": {
        element.outline = element.outline.map((point) =>
          rotatePoint(point, center, degreesCcw),
        )
        break
      }
      case "pcb_courtyard_polygon": {
        element.points = element.points.map((point) =>
          rotatePoint(point, center, degreesCcw),
        )
        break
      }
      case "pcb_cutout": {
        if (element.shape === "polygon" || element.shape === "path") {
          const points =
            element.shape === "polygon" ? element.points : element.route
          const rotatedPoints = points.map((point) =>
            rotatePoint(point, center, degreesCcw),
          )
          if (element.shape === "polygon") element.points = rotatedPoints
          else element.route = rotatedPoints
        } else if (element.shape === "rect") {
          element.center = rotatePoint(element.center, center, degreesCcw)
          element.rotation = rotateCcwRotation(element.rotation, degreesCcw)
        } else if (element.shape === "circle") {
          element.center = rotatePoint(element.center, center, degreesCcw)
        }
        break
      }
      case "pcb_component": {
        if (isQuarterTurn) {
          ;[element.width, element.height] = [element.height, element.width]
        }
        break
      }
      case "cad_component": {
        const rotatedPosition = rotatePoint(
          element.position,
          center,
          degreesCcw,
        )
        element.position = {
          ...element.position,
          x: rotatedPosition.x,
          y: rotatedPosition.y,
        }
        if (element.rotation) {
          element.rotation = {
            ...element.rotation,
            z: rotateCcwRotation(element.rotation.z, degreesCcw),
          }
        }
        if (element.model_origin_position) {
          const rotatedOrigin = rotatePoint(
            element.model_origin_position,
            center,
            degreesCcw,
          )
          element.model_origin_position = {
            ...element.model_origin_position,
            x: rotatedOrigin.x,
            y: rotatedOrigin.y,
          }
        }
        break
      }
    }
  }

  return circuitJson
}
