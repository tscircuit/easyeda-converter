import type { RawEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { getModelCdnUrl } from "./get-model-cdn-url"

type ModelBounds = {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

const getModelUuidFromRawPackageDetail = (result: RawEasyEdaJson) => {
  const shapes = result.packageDetail?.dataStr?.shape
  if (!Array.isArray(shapes)) return null

  for (const shape of shapes) {
    if (typeof shape !== "string" || !shape.startsWith("SVGNODE~")) continue

    const svgNodeJson = shape.slice("SVGNODE~".length)
    try {
      const svgNode = JSON.parse(svgNodeJson)
      const modelUuid = svgNode?.attrs?.uuid
      if (typeof modelUuid === "string" && modelUuid.length > 0) {
        return modelUuid
      }
    } catch {
      continue
    }
  }

  return null
}

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

export async function fetchEasyEDAComponent(
  jlcpcbPartNumber: string,
  {
    fetch = globalThis.fetch,
    includeModelMetadata = true,
  }: {
    fetch?: typeof globalThis.fetch
    includeModelMetadata?: boolean
  } = {},
): Promise<RawEasyEdaJson> {
  const searchUrl = "https://easyeda.com/api/components/search"
  const componentUrl = (uuid: string) =>
    `https://easyeda.com/api/components/${uuid}?version=6.4.7&uuid=${uuid}&datastrid=`

  const searchHeaders = {
    authority: "easyeda.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    accept: "application/json, text/javascript, */*; q=0.01",
    "x-requested-with": "XMLHttpRequest",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    origin: "https://easyeda.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://easyeda.com/editor",
    "accept-language": "cs,en;q=0.9,sk;q=0.8,en-GB;q=0.7",
    cookie: "<PUT your cookies here>",
  }

  const searchData = `type=3&doctype%5B%5D=2&uid=0819f05c4eef4c71ace90d822a990e87&returnListStyle=classifyarr&wd=${jlcpcbPartNumber}&version=6.4.7`

  // Perform the search request
  const searchResponse = await fetch(searchUrl, {
    method: "POST",
    headers: searchHeaders,
    body: searchData,
  })

  if (!searchResponse.ok) {
    throw new Error("Failed to search for the component")
  }

  const searchResult = await searchResponse.json()
  if (!searchResult.success || !searchResult.result.lists.lcsc.length) {
    throw new Error("Component not found")
  }

  const bestMatchComponent =
    searchResult.result.lists.lcsc.find(
      (component: any) =>
        component.dataStr.head.c_para["Supplier Part"] === jlcpcbPartNumber,
    ) ?? searchResult.result.lists.lcsc[0]

  const componentUUID = bestMatchComponent.uuid

  // Perform the component fetch request
  const componentResponse = await fetch(componentUrl(componentUUID), {
    method: "GET",
    headers: {
      ...searchHeaders,
      referer: `https://easyeda.com/editor?uuid=${componentUUID}`,
    },
  })

  if (!componentResponse.ok) {
    throw new Error("Failed to fetch the component details")
  }

  const componentResult = await componentResponse.json()
  const result = componentResult.result as RawEasyEdaJson

  if (includeModelMetadata) {
    const modelUuid = getModelUuidFromRawPackageDetail(result)
    const partNumber = result.lcsc?.number

    if (modelUuid && partNumber) {
      try {
        const objUrl = getModelCdnUrl({
          easyedaModelUuid: modelUuid,
          easyedaPartNumber: partNumber,
        })
        const objResponse = await fetch(objUrl)

        if (objResponse.ok) {
          const objText = await objResponse.text()
          const bounds = parseObjBounds(objText)
          if (bounds) {
            ;(
              result as RawEasyEdaJson & {
                _objMetadata?: { bounds: ModelBounds }
              }
            )._objMetadata = { bounds }
          }
        }
      } catch (error) {
        console.error(
          `Error fetching model metadata for ${jlcpcbPartNumber}:`,
          error,
        )
      }
    }
  }

  return result
}

// Usage example
// fetchEasyEDAComponent("C558438")
//   .then((component) => console.log(component))
//   .catch((error) => console.error(error))
