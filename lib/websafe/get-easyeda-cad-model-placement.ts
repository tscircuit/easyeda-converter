import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"
import { getModelCdnUrl } from "./get-model-cdn-url"

type ModelBounds = {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

export type EasyEdaCadModelPlacement = {
  modelObjUrl?: string
  modelStepUrl?: string
  positionZMm: number
  bounds: ModelBounds
}

const placementCache = new Map<
  string,
  Promise<EasyEdaCadModelPlacement | null>
>()

const parseObjBounds = (objText: string): ModelBounds | null => {
  let minX = Number.POSITIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let minZ = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  let maxZ = Number.NEGATIVE_INFINITY
  let vertexCount = 0

  for (const line of objText.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed.startsWith("v ")) continue

    const [, xStr, yStr, zStr] = trimmed.split(/\s+/, 4)
    const x = Number(xStr)
    const y = Number(yStr)
    const z = Number(zStr)

    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      continue
    }

    vertexCount += 1
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    minZ = Math.min(minZ, z)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    maxZ = Math.max(maxZ, z)
  }

  if (vertexCount === 0) return null

  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  }
}

const getSvgNodeZOffsetMm = (easyEdaJson: BetterEasyEdaJson) => {
  const svgNode = easyEdaJson.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SVGNODE" && shape.svgData.attrs?.uuid,
  )

  if (!svgNode || svgNode.type !== "SVGNODE") return null

  const svgNodeZ = Number(svgNode.svgData.attrs?.z ?? 0)
  if (!Number.isFinite(svgNodeZ)) return null

  return mil10ToMm(svgNodeZ)
}

const getPositionZMmFromBounds = (
  bounds: ModelBounds,
  svgNodeZOffsetMm: number,
) => {
  const minZ = Math.abs(bounds.min.z) < 1e-6 ? 0 : bounds.min.z
  return minZ - svgNodeZOffsetMm
}

export const getEasyEdaCadModelPlacement = async (
  easyEdaJson: BetterEasyEdaJson,
  { fetch = globalThis.fetch }: { fetch?: typeof globalThis.fetch } = {},
): Promise<EasyEdaCadModelPlacement | null> => {
  const svgNode = easyEdaJson.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SVGNODE" && shape.svgData.attrs?.uuid,
  )

  if (!svgNode || svgNode.type !== "SVGNODE") return null

  const modelUuid = svgNode.svgData.attrs?.uuid
  const partNumber = easyEdaJson.lcsc.number
  const svgNodeZOffsetMm = getSvgNodeZOffsetMm(easyEdaJson)

  if (!modelUuid || !partNumber || svgNodeZOffsetMm == null || !fetch) {
    return null
  }

  const modelObjUrl = getModelCdnUrl({
    easyedaModelUuid: modelUuid,
    easyedaPartNumber: partNumber,
  })
  const modelStepUrl = getModelCdnUrl({
    easyedaModelUuid: modelUuid,
    easyedaPartNumber: partNumber,
    format: "step",
  })

  const metadataBounds = easyEdaJson._objMetadata?.bounds
  if (metadataBounds) {
    return {
      modelObjUrl,
      modelStepUrl,
      bounds: metadataBounds,
      positionZMm: getPositionZMmFromBounds(metadataBounds, svgNodeZOffsetMm),
    }
  }

  const cacheKey = `${modelObjUrl}::${svgNodeZOffsetMm}`
  const cachedPlacement = placementCache.get(cacheKey)
  if (cachedPlacement) return cachedPlacement

  const placementPromise = (async () => {
    try {
      const response = await fetch(modelObjUrl)
      if (!response.ok) return null

      const objText = await response.text()
      const bounds = parseObjBounds(objText)
      if (!bounds) return null

      return {
        modelObjUrl,
        modelStepUrl,
        bounds,
        // Align the EasyEDA SVG-node Z against the model's minimum Z.
        positionZMm: getPositionZMmFromBounds(bounds, svgNodeZOffsetMm),
      }
    } catch (error) {
      console.error(
        `Error resolving EasyEDA CAD placement for ${partNumber}:`,
        error,
      )
      return null
    }
  })()

  placementCache.set(cacheKey, placementPromise)
  return placementPromise
}
