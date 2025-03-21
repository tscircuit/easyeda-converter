import type { AnyCircuitElement } from "circuit-json"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"

interface Params {
  pinLabels: Record<string, string[]> | Record<string, string> // ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: Record<string, string[]>
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
import { ChipProps } from "@tscircuit/props"

const pinLabels = ${JSON.stringify(pinLabels, null, "  ")} as const

const ${componentName} = (props: ChipProps<typeof pinLabels>) => (
  <chip
    {...props}
    ${objUrl
      ? `cadModel={{
      objUrl: "${objUrl}",
      rotationOffset: { x: 0, y: 0, z: 0 },
      positionOffset: { x: 0, y: 0, z: 0 },
    }}`
      : ""}
    pinLabels={pinLabels}
    supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
    manufacturerPartNumber="${manufacturerPartNumber}"
    footprint={${footprintTsx}}
  />
)

export default ${componentName}
`.trim()
}
