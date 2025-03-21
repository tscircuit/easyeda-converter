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
  // Ensure pinLabels is defined
  const safePinLabels = pinLabels ?? {}

  const footprintTsx = generateFootprintTsx(circuitJson)

  // Simplify pin labels to include only the second element
  const simplifiedPinLabels = Object.fromEntries(
    Object.entries(safePinLabels).map(([pin, labels]) => {
      // Ensure labels is an array and has a second element
      if (Array.isArray(labels) && labels.length > 1) {
        return [pin, [labels[1]]]
      }
      return [pin, labels] // Fallback to original if not an array or missing second element
    }),
  )

  const pinLabelsString = Object.entries(simplifiedPinLabels)
    .map(([pin, labels]) => `  ${pin}: ${JSON.stringify(labels)}`)
    .join(",\n")

  return `
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

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
`.trim()
}
