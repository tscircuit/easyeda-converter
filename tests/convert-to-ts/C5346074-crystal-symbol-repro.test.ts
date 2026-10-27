import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C5346074.raweasy.json"

test("C5346074 imports as a native crystal component", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<crystal")
  expect(result).not.toContain("<chip")
  expect(result).not.toContain("symbol={")

  const componentName = result.match(/export const (\w+)/)?.[1]
  expect(componentName).toBeDefined()

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board>
        <${componentName} name="X1" />
      </board>
    )
  `)

  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
  expect(
    circuitJson.filter((element) => element.type === "schematic_component"),
  ).toHaveLength(2)

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5346074-crystal-symbol-repro",
  )
})
