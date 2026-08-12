import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import inductorRawEasy from "../assets/C2041570.raweasy.json"

it("converts C2041570 to an inductor", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(inductorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain(
    'import type { InductorProps } from "@tscircuit/props"',
  )
  expect(result).toContain('props: Omit<InductorProps, "inductance">')
  expect(result).toContain("<inductor")
  expect(result).toContain('inductance="2.2uH"')
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(result)
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      ftype: "simple_inductor",
      inductance: "2.2uH",
    }),
  )
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
})
