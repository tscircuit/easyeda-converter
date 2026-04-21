import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"
import {
  getBoundsCenter,
  getBoundsFromPoints,
  type Bounds,
  type Point,
} from "@tscircuit/math-utils"

type ModelBounds = NonNullable<BetterEasyEdaJson["_objMetadata"]>["bounds"]

type RotationDeg = 0 | 90 | 180 | 270

type SvgChildNodeWithAttrs = {
  attrs?: {
    points?: string | number
  }
}

const getCadSvgNode = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = easyEdaJson.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SVGNODE" && shape.svgData.attrs?.uuid,
  )

  return svgNode?.type === "SVGNODE" ? svgNode : null
}

const isSvgChildNodeWithAttrs = (
  childNode: unknown,
): childNode is SvgChildNodeWithAttrs =>
  typeof childNode === "object" && childNode !== null

const getXyBoundsFromModelBounds = (bounds: ModelBounds): Bounds => ({
  minX: bounds.min.x,
  minY: bounds.min.y,
  maxX: bounds.max.x,
  maxY: bounds.max.y,
})

const rotateScenePoint = (point: Point, rotationDeg: RotationDeg): Point => {
  switch (rotationDeg) {
    case 0:
      return point
    case 90:
      return { x: point.y, y: -point.x }
    case 180:
      return { x: -point.x, y: -point.y }
    case 270:
      return { x: -point.y, y: point.x }
  }
}

const getEasyEdaModelOriginOnBoardMm = ({
  svgNode,
  footprintCenterMm,
}: {
  svgNode: NonNullable<ReturnType<typeof getCadSvgNode>>
  footprintCenterMm: Point
}) => {
  const points: Point[] = []

  for (const childNode of svgNode.svgData.childNodes ?? []) {
    if (!isSvgChildNodeWithAttrs(childNode)) continue

    const rawPoints = childNode.attrs?.points
    if (!rawPoints) continue

    const values = String(rawPoints).trim().split(/\s+/).map(Number)
    for (let i = 0; i + 1 < values.length; i += 2) {
      const x = values[i]
      const y = values[i + 1]
      if (Number.isFinite(x) && Number.isFinite(y)) {
        points.push({ x: mil10ToMm(x), y: mil10ToMm(y) })
      }
    }
  }

  let modelOriginMm: Point | null = null

  if (points.length > 0) {
    const bounds = getBoundsFromPoints(points)
    modelOriginMm = bounds ? getBoundsCenter(bounds) : null
  } else {
    const [originX, originY] = String(svgNode.svgData.attrs?.c_origin ?? "0,0")
      .split(",")
      .map((value) => Number(value.trim()))
    if (Number.isFinite(originX) && Number.isFinite(originY)) {
      modelOriginMm = { x: mil10ToMm(originX), y: mil10ToMm(originY) }
    }
  }

  if (!modelOriginMm) return null

  return {
    x: modelOriginMm.x - footprintCenterMm.x,
    y: footprintCenterMm.y - modelOriginMm.y,
  }
}

const snapZero = (value: number) => (Math.abs(value) < 1e-6 ? 0 : value)

const normalizePoint = (point: Point): Point => ({
  x: snapZero(point.x),
  y: snapZero(point.y),
})

export const getCadModelOffsetMm = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = getCadSvgNode(easyEdaJson)
  return getCadModelOffsetMmFromBounds(
    easyEdaJson,
    easyEdaJson._objMetadata?.bounds,
  )
}

export const getCadModelOffsetMmFromBounds = (
  easyEdaJson: BetterEasyEdaJson,
  bounds?: ModelBounds,
  {
    footprintBoundsCenterMm,
  }: {
    footprintBoundsCenterMm?: Point
  } = {},
) => {
  const svgNode = getCadSvgNode(easyEdaJson)
  if (!svgNode || !bounds) return null

  const [, , rotationZRaw] = String(
    svgNode.svgData.attrs?.c_rotation ?? "0,0,0",
  )
    .split(",")
    .map((value) => Number(value.trim()))
  const rotationDeg = (((rotationZRaw % 360) + 360) % 360) as RotationDeg
  if (![0, 90, 180, 270].includes(rotationDeg)) return null

  const modelCenter = getBoundsCenter(getXyBoundsFromModelBounds(bounds))
  const footprintCenter = easyEdaJson.packageDetail.dataStr.head
  const footprintCenterMm = footprintBoundsCenterMm ?? {
    x: mil10ToMm(footprintCenter.x),
    y: mil10ToMm(footprintCenter.y),
  }
  const targetOriginOnBoardMm = getEasyEdaModelOriginOnBoardMm({
    svgNode,
    footprintCenterMm,
  })
  if (!targetOriginOnBoardMm) return null

  const targetOriginInModelFrame = rotateScenePoint(
    targetOriginOnBoardMm,
    rotationDeg,
  )

  return normalizePoint({
    x: modelCenter.x - targetOriginInModelFrame.x,
    y: modelCenter.y - targetOriginInModelFrame.y,
  })
}

export const getCadSvgNodeZOffsetMm = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = getCadSvgNode(easyEdaJson)
  if (!svgNode) return null

  const svgNodeZ = Number(svgNode.svgData.attrs?.z ?? 0)
  if (!Number.isFinite(svgNodeZ)) return null

  return mil10ToMm(svgNodeZ)
}

export const getCadSvgNodeModelUuid = (easyEdaJson: BetterEasyEdaJson) =>
  getCadSvgNode(easyEdaJson)?.svgData.attrs?.uuid ?? null
