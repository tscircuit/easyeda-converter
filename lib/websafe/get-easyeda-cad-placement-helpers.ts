import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"

type XYBounds = {
  min: { x: number; y: number }
  max: { x: number; y: number }
}

type RotationDeg = 0 | 90 | 180 | 270

const milToMm = (mil: number) => mil * 0.0254

const getBoundsCenter = (bounds: XYBounds) => ({
  x: (bounds.min.x + bounds.max.x) / 2,
  y: (bounds.min.y + bounds.max.y) / 2,
})

const getCadSvgNode = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = easyEdaJson.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SVGNODE" && shape.svgData.attrs?.uuid,
  )

  return svgNode?.type === "SVGNODE" ? svgNode : null
}

const parseMil10Value = (value: string | number) =>
  Number(String(value).replace("mil", "")) / 10

const isZeroish = (value: number) => Math.abs(value) < 1e-6

const getPadCenter = (easyEdaJson: BetterEasyEdaJson) => {
  const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "PAD",
  )
  if (pads.length === 0) return null

  const xs = pads.map((pad) => parseMil10Value(pad.center.x))
  const ys = pads.map((pad) => parseMil10Value(pad.center.y))

  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2,
  }
}

const getRotatedOffsetMm = ({
  bounds,
  rawOffsetMil,
  rotationDeg,
}: {
  bounds: XYBounds
  rawOffsetMil: { x: number; y: number }
  rotationDeg: RotationDeg
}) => {
  const center = getBoundsCenter(bounds)
  const offsetX = milToMm(rawOffsetMil.x)
  const offsetY = milToMm(rawOffsetMil.y)

  switch (rotationDeg) {
    case 0:
      return { x: center.x + offsetX, y: center.y + offsetY }
    case 90:
      return { x: center.x + offsetY, y: center.y + offsetX }
    case 180:
      return { x: center.x - offsetX, y: center.y - offsetY }
    case 270:
      return { x: center.x - offsetY, y: center.y - offsetX }
  }
}

export const getCadModelOffsetMm = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = getCadSvgNode(easyEdaJson)
  const bounds = easyEdaJson._objMetadata?.bounds
  if (!svgNode || !bounds) return null

  const [originX, originY] = String(svgNode.svgData.attrs?.c_origin ?? "0,0")
    .split(",")
    .map((value) => Number(value.trim()))
  if (!Number.isFinite(originX) || !Number.isFinite(originY)) return null

  const [, , rotationZRaw] = String(
    svgNode.svgData.attrs?.c_rotation ?? "0,0,0",
  )
    .split(",")
    .map((value) => Number(value.trim()))
  const rotationDeg = (((rotationZRaw % 360) + 360) % 360) as RotationDeg
  if (![0, 90, 180, 270].includes(rotationDeg)) return null

  const modelCenter = getBoundsCenter(bounds)
  const footprintCenter = easyEdaJson.packageDetail.dataStr.head
  const padCenter = getPadCenter(easyEdaJson)

  if (
    padCenter &&
    isZeroish(modelCenter.x) &&
    isZeroish(modelCenter.y) &&
    isZeroish(padCenter.x - footprintCenter.x) &&
    isZeroish(padCenter.y - footprintCenter.y)
  ) {
    return { x: 0, y: 0 }
  }

  return getRotatedOffsetMm({
    bounds,
    rawOffsetMil: {
      x: (originX - footprintCenter.x) * 10,
      y: (originY - footprintCenter.y) * 10,
    },
    rotationDeg,
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
