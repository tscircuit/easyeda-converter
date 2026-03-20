import type { ChipProps } from "@tscircuit/props"
import type { AnyCircuitElement } from "circuit-json"
import { generateFootprintTsx } from "../generate-footprint-tsx"

interface Params {
  pinLabels: ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  stepUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: ChipProps["supplierPartNumbers"]
  manufacturerPartNumber: string
}

export const generateTypescriptComponent = ({
  pinLabels,
  componentName,
  objUrl,
  stepUrl,
  circuitJson,
  supplierPartNumbers,
  manufacturerPartNumber,
}: Params) => {
  // Ensure pinLabels is defined
  const safePinLabels = pinLabels ?? {}
  const cadComponent = circuitJson.find((item) => item.type === "cad_component")
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

  const cadModelLines = [
    objUrl ? `objUrl: "${objUrl}",` : "",
    stepUrl ? `stepUrl: "${stepUrl}",` : "",
    `pcbRotationOffset: ${cadComponent?.rotation?.z ?? 0},`,
    `modelOriginPosition: { x: ${cadComponent?.model_origin_position?.x ?? 0}, y: ${cadComponent?.model_origin_position?.y ?? 0}, z: ${cadComponent?.model_origin_position?.z ?? 0} },`,
  ]
    .filter(Boolean)
    .map((line) => `        ${line}`)
    .join("\n")

  return `
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...props}
    />
  )
}
`.trim()
}
