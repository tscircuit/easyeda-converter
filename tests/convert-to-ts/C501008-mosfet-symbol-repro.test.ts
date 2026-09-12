import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C501008.raweasy.json"

test("repro: C501008 STL130N6F7 renders with a MOSFET symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(mosfetRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board>
        <STL130N6F7 name="Q_HA" channelType="n" mosfetMode="enhancement" schWidth={1.6} schHeight={2} />
      </board>
    )
  `)

  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(8)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C501008-mosfet-symbol-repro",
  )
}, 50_000)
