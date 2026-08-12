import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import connectorRawEasy from "../assets/C404969.raweasy.json"

it("converts C404969 to a connector", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(connectorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain(
    'import type { ConnectorProps } from "@tscircuit/props"',
  )
  expect(result).toContain("<connector")
  expect(result).toContain('pin1: ["VBUS"]')
  expect(result).toContain('pin9: ["SH4"]')
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(result)
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      ftype: "simple_connector",
    }),
  )
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
})
