import type { AnyCircuitElement, AnySoupElement } from "circuit-json"
import type { ChipProps } from "@tscircuit/props"
import { su } from "@tscircuit/soup-util"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

interface Params {
  pinLabels: Record<string, string[]> | Record<string, string> // ChipProps["pinLabels"]
  componentName: string
  schPinArrangement: ChipProps["schPortArrangement"]
  objUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: Record<string, string[]>
}

export const soupTypescriptComponentTemplate = ({
  pinLabels,
  componentName,
  schPinArrangement,
  objUrl,
  circuitJson,
  supplierPartNumbers,
}: Params) => {
  const footprintTsx = generateFootprintTsx(circuitJson)
  return `
import { createUseComponent } from "@tscircuit/core"
import type { CommonLayoutProps } from "@tscircuit/props"

const pinLabels = ${JSON.stringify(pinLabels, null, "  ")} as const
const pinNames = Object.values(pinLabels)

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
        rotationOffset: { x: 0, y: 0, z: 0 },
        positionOffset: { x: 0, y: 0, z: 0 },
      }}`
          : ""
      }
      pinLabels={pinLabels}
      schPinSpacing={0.75}
      schPortArrangement={${JSON.stringify(schPinArrangement, null, "  ")}}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      footprint={${footprintTsx}}
    />
  )
}

export const use${componentName} = createUseComponent(${componentName}, pinNames)

`.trim()
}
