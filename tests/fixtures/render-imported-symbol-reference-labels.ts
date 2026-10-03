import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"

export const renderImportedSymbolReferenceLabels = async ({
  rawEasy,
  componentName,
  referencePrefix,
}: {
  rawEasy: unknown
  componentName: string
  referencePrefix: string
}) => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  const referenceNames = [`${referencePrefix}1`, `${referencePrefix}2`]
  const circuitJson = await runTscircuitCode(`${tsx}
export default () => (
  <board width={30} height={20} routingDisabled>
    <${componentName} name="${referenceNames[0]}" schX={-2} pcbX={-6} />
    <${componentName} name="${referenceNames[1]}" schX={2} pcbX={6} />
  </board>
)
`)
  return { tsx, circuitJson, referenceNames }
}
