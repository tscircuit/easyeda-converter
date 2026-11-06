import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import {
  getCadModelOffsetMm,
  getCadModelOffsetMmFromBounds,
  getCadSvgNodeModelUuid,
  getCadSvgNodeZOffsetMm,
} from "./get-easyeda-cad-placement-helpers"
import { getModelObjCdnUrl, getModelStepCdnUrl } from "./get-model-cdn-url"

type ModelBounds = {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

export type EasyEdaCadModelPlacement = {
  modelObjUrl: string
  positionXMm: number
  positionYMm: number
  modelStepUrl?: string
  positionZMm: number
  bounds: ModelBounds
}

const boundsCache = new Map<string, Promise<ModelBounds | null>>()

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
  const modelUuid = getCadSvgNodeModelUuid(easyEdaJson)
  const partNumber = easyEdaJson.lcsc.number
  const svgNodeZOffsetMm = getCadSvgNodeZOffsetMm(easyEdaJson)

  if (!modelUuid || !partNumber || svgNodeZOffsetMm == null || !fetch) {
    return null
  }

  const modelObjUrl = getModelObjCdnUrl({
    easyedaModelUuid: modelUuid,
    easyedaPartNumber: partNumber,
  })
  const modelStepUrl = getModelStepCdnUrl({
    easyedaModelUuid: modelUuid,
    easyedaPartNumber: partNumber,
  })

  const metadataBounds = easyEdaJson._objMetadata?.bounds
  if (metadataBounds) {
    const derivedOffsetMm = getCadModelOffsetMm(easyEdaJson)
    if (!derivedOffsetMm) return null

    return {
      modelObjUrl,
      positionXMm: derivedOffsetMm.x,
      positionYMm: derivedOffsetMm.y,
      modelStepUrl,
      bounds: metadataBounds,
      positionZMm: getPositionZMmFromBounds(metadataBounds, svgNodeZOffsetMm),
    }
  }

  let boundsPromise = boundsCache.get(modelObjUrl)
  if (!boundsPromise) {
    boundsPromise = (async () => {
      try {
        const response = await fetch(modelObjUrl)
        if (!response.ok) {
          boundsCache.delete(modelObjUrl)
          return null
        }

        const objText = await response.text()
        const parsedBounds = parseObjBounds(objText)
        if (!parsedBounds) {
          boundsCache.delete(modelObjUrl)
          return null
        }

        return parsedBounds
      } catch (error) {
        boundsCache.delete(modelObjUrl)
        console.error(
          `Error resolving EasyEDA CAD placement for ${partNumber}:`,
          error,
        )
        return null
      }
    })()

    boundsCache.set(modelObjUrl, boundsPromise)
  }

  const bounds = await boundsPromise
  if (!bounds) return null

  const derivedOffsetMm = getCadModelOffsetMmFromBounds(easyEdaJson, bounds)
  if (!derivedOffsetMm) return null

  return {
    modelObjUrl,
    positionXMm: derivedOffsetMm.x,
    positionYMm: derivedOffsetMm.y,
    modelStepUrl,
    bounds,
    // Align the EasyEDA SVG-node Z against the model's minimum Z.
    positionZMm: getPositionZMmFromBounds(bounds, svgNodeZOffsetMm),
  }
}
