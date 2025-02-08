import type { AnyCircuitElement, AnySoupElement } from "circuit-json"
import type { ChipProps } from "@tscircuit/props"
import { su } from "@tscircuit/soup-util"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

interface Params {
  pinLabels: Record<string, string[]> | Record<string, string> // ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  circuitJson: AnyCircuitElement[]
  positionOffset: { x: number; y: number; z: number }
  rotationOffset: { x: number; y: number; z: number }
  supplierPartNumbers: Record<string, string[]>
  manufacturerPartNumber: string
}
function formatPositionOffset(positionOffset: {
  x: number
  y: number
  z: number
}) {
  return `{ x: ${positionOffset.x}, y: ${positionOffset.y}, z: ${positionOffset.z} }`
}

function formatRotationOffset(rotationOffset: {
  x: number
  y: number
  z: number
}) {
  return `{ x: ${rotationOffset.x}, y: ${rotationOffset.y}, z: ${rotationOffset.z} }`
}

export const soupTypescriptComponentTemplate = ({
  pinLabels,
  componentName,
  objUrl,
  positionOffset,
  rotationOffset,
  circuitJson,
  supplierPartNumbers,
  manufacturerPartNumber,
}: Params) => {
  const footprintTsx = generateFootprintTsx(circuitJson)
  return `
import { createUseComponent } from "@tscircuit/core"
import type { CommonLayoutProps } from "@tscircuit/props"

const pinLabels = ${JSON.stringify(pinLabels, null, "  ")} as const

interface Props extends CommonLayoutProps {
  name: string
}

export const ${componentName} = (props: Props) => {
  return (
    <chip
      {...props}
      ${
        objUrl
          ? `cadModel={{
        objUrl: "${objUrl}",
        rotationOffset: ${formatRotationOffset(rotationOffset)},
        positionOffset: ${formatPositionOffset(positionOffset)},
      }}`
          : ""
      }
      pinLabels={pinLabels}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
    />
  )
}

export const use${componentName} = createUseComponent(${componentName}, pinLabels)

`.trim()
}
