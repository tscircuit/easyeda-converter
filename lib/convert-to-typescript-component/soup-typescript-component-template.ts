import type { AnySoupElement } from "@tscircuit/soup"
import type { BugProps } from "@tscircuit/props"
import { su } from "@tscircuit/soup-util"
import type { EasyEdaJson } from "../schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "../generate-footprint-tsx"

interface Params {
  pinLabels: BugProps["pinLabels"]
  componentName: string
  schPinArrangement: BugProps["schPortArrangement"]
  objUrl?: string
  easyEdaJson: EasyEdaJson
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
import { createUseComponent } from "tscircuit"
import type { CommonLayoutProps } from "@tscircuit/props"

const pinLabels = ${JSON.stringify(pinLabels, null, "  ")} as const
const pinNames = Object.values(pinLabels)

interface Props extends CommonLayoutProps {
  name: string
}

export const ${componentName} = (props: Props) => {
  return (
    <bug
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
