import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C20917.raweasy.json"

test("C20917 AO3400A imports as a chip despite having a MOSFET symbol", async () => {
  const result = await convertBetterEasyToTsx({
    betterEasy: EasyEdaJsonSchema.parse(mosfetRawEasy),
  })
  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board routingDisabled>
        <AO3400A name="Q1"
          channelType="n" mosfetMode="enhancement"
          connections={{ G: "net.GATE", S: "net.SOURCE", D: "net.DRAIN" }} />
      </board>
    )
  `)

  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      name: "Q1",
      ftype: "simple_chip",
    }),
  )
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(3)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C20917-mosfet-repro",
  )
})
