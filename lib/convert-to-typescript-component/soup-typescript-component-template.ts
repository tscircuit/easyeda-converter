import type { AnySoupElement } from "circuit-json"
import type { ChipProps } from "@tscircuit/props"
import { su } from "@tscircuit/soup-util"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"

interface Params {
  pinLabels: ChipProps["pinLabels"]
  componentName: string
  schPinArrangement: ChipProps["schPortArrangement"]
  objUrl?: string
  easyEdaJson: BetterEasyEdaJson
}

export const soupTypescriptComponentTemplate = ({
  pinLabels,
  componentName,
  schPinArrangement,
  objUrl,
  easyEdaJson,
}: Params) => {
  const footprintTsx = generateFootprintTsx(easyEdaJson)
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
      footprint={${footprintTsx}}
      ${
        objUrl
          ? `cadModel={{
        objUrl: "${objUrl}"
      }}`
          : ""
      }
      pinLabels={pinLabels}
      schPinSpacing={0.75}
      schPortArrangement={${JSON.stringify(schPinArrangement, null, "  ")}}
    />
  )
}

export const use${componentName} = createUseComponent(${componentName}, pinNames)

`.trim()
}
