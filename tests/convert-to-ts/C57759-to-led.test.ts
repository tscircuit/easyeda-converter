import { expect, it } from "bun:test"
import { runTscircuitCode } from "tscircuit"
import diodeRawEasy from "../assets/C57759.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"

it("should convert led category components to led elements", async () => {
  const betterEasy = EasyEdaJsonSchema.parse({
    ...diodeRawEasy,
    tags: [],
    category: "Light Emitting Diode",
  })
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toMatchInlineSnapshot(`
    "import type { LedProps } from "@tscircuit/props"

    export const A_1N4148WS = (props: LedProps) => {
      const { name = "LED1", ...restProps } = props

      return (
        <led
          name={name}
          supplierPartNumbers={{
      "jlcpcb": [
        "C57759"
      ]
    }}
          manufacturerPartNumber="A_1N4148WS"
          footprint={<footprint>
            <smtpad portHints={["pin2","cathode"]} pcbX="-1.172591mm" pcbY="0mm" width="0.999998mm" height="0.7500112mm" shape="rect" />
    <smtpad portHints={["pin1","anode"]} pcbX="1.172591mm" pcbY="0mm" width="0.999998mm" height="0.7500112mm" shape="rect" />
    <silkscreenpath route={[{"x":0.9012427999999773,"y":-0.726211400000011},{"x":0.9012427999999773,"y":-0.5199887999999646}]} />
    <silkscreenpath route={[{"x":0.9012427999999773,"y":0.726211400000011},{"x":0.9012427999999773,"y":0.5299964000000728}]} />
    <silkscreenpath route={[{"x":-0.8512047999998913,"y":0.726211400000011},{"x":0.9012427999999773,"y":0.726211400000011}]} />
    <silkscreenpath route={[{"x":-0.8512047999998913,"y":-0.726211400000011},{"x":0.9012427999999773,"y":-0.726211400000011}]} />
    <silkscreenpath route={[{"x":-0.44676059999994777,"y":0.726211400000011},{"x":-0.44676059999994777,"y":-0.726211400000011}]} />
    <silkscreentext text="{NAME}" pcbX="0.004191mm" pcbY="1.6604mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.5158089999998765,"y":0.9103999999999814},{"x":1.5241910000000871,"y":0.9103999999999814},{"x":1.5241910000000871,"y":-0.8849999999999909},{"x":-1.5158089999998765,"y":-0.8849999999999909},{"x":-1.5158089999998765,"y":0.9103999999999814}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C57759.obj?uuid=973acf8a660c48b1975f1ba1c890421a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C57759.step?uuid=973acf8a660c48b1975f1ba1c890421a",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: -0.01 },
          }}
          {...restProps}
        />
      )
    }"
  `)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_led")
  expect(sourceComponent?.supplier_part_numbers).toEqual({ jlcpcb: ["C57759"] })
})
