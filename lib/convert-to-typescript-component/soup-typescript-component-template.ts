import type { AnyCircuitElement, AnySoupElement } from "circuit-json"
import type { ChipProps } from "@tscircuit/props"
import { su } from "@tscircuit/soup-util"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

interface Params {
  pinLabels: ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: ChipProps["supplierPartNumbers"]
  manufacturerPartNumber: string
}

export const soupTypescriptComponentTemplate = ({
  pinLabels,
  componentName,
  objUrl,
  circuitJson,
  supplierPartNumbers,
  manufacturerPartNumber,
}: Params) => {
  const footprintTsx = generateFootprintTsx(circuitJson)
  return `
import { createUseComponent } from "@tscircuit/core"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = ${JSON.stringify(pinLabels, null, "  ")} as const

export const ${componentName} = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      {...props}
      ${
        objUrl
          ? `cadModel={{
        objUrl: "${objUrl}",
        rotationOffset: { x: 0, y: 0, z: 0 },
        positionOffset: { x: 0, y: 0, z: 0 },
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
