export const soupTypescriptComponentTemplate = ({
  pinLabels,
  componentName,
  schPinArrangement,
}: any) => {
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
      footprint={
        <footprint>

        </footprint>
      }
      cadModel={
        
      }
      pinLabels={pinLabels}
      schPinSpacing={0.75}
      schPinArrangement={${JSON.stringify(schPinArrangement, null, "  ")}}
    />
  )
}

export const use${componentName} = createUseComponent(${componentName}, pinNames)

`.trim()
}
