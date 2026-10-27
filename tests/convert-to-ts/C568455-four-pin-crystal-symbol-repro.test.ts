import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C568455.raweasy.json"

test("repro: C568455 four-pin crystal imports as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")
  expect(result).not.toContain("<crystal")
  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"]
    } as const

    export const ABC2_16_000MHZ_4_T = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":0.2,"y":0},{"x":0.2,"y":-0.2},{"x":0.4,"y":-0.2}]} strokeColor="#881100" />
              <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.2,"y":0.2},{"x":-0.4,"y":0.2}]} strokeColor="#881100" />
              <schematicrect schX={0} schY={0} width={0.08} height={0.28} strokeWidth={0.02} color="#880000" />
              <schematicpath points={[{"x":0.4,"y":0.2},{"x":0.2,"y":0.2},{"x":0.2,"y":0},{"x":0.1,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.4,"y":-0.2},{"x":-0.2,"y":-0.2},{"x":-0.2,"y":0},{"x":-0.1,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.1,"y":-0.14},{"x":0.1,"y":0.14}]} strokeColor="#881100" />
              <schematicpath points={[{"x":-0.1,"y":-0.14},{"x":-0.1,"y":0.14}]} strokeColor="#881100" />
              <schematiccircle center={{ x: -0.3, y: -0.3 }} radius={0.03} strokeWidth={0.02} color="#880000" isFilled fillColor="#880000" />
              <schematicrect schX={0} schY={0} width={0.8} height={0.8} strokeWidth={0.02} color="#880000" />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.2} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="left" schX={-0.6} schY={0.2} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.2} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.2} />
              <schematictext schX={-0.001} schY={0.606} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C568455"
      ]
    }}
          manufacturerPartNumber="ABC2-16.000MHZ-4-T"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-2.54mm" pcbY="-2.199894mm" width="2.3999952mm" height="2.2999954mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="2.54mm" pcbY="-2.199894mm" width="2.3999952mm" height="2.2999954mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="2.54mm" pcbY="2.199894mm" width="2.3999952mm" height="2.2999954mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-2.54mm" pcbY="2.199894mm" width="2.3999952mm" height="2.2999954mm" shape="rect" />
    <silkscreenpath route={[{"x":3.9711375999999063,"y":-2.7500072000000273},{"x":5.8999882000000525,"y":-2.7500072000000273}]} />
    <silkscreenpath route={[{"x":-1.108862400000021,"y":-2.7500072000000273},{"x":1.1088623999999072,"y":-2.7500072000000273}]} />
    <silkscreenpath route={[{"x":-5.8999882000000525,"y":-2.7500072000000273},{"x":-3.97113760000002,"y":-2.7500072000000273}]} />
    <silkscreenpath route={[{"x":3.9711375999999063,"y":2.750032600000054},{"x":5.8999882000000525,"y":2.750032600000054}]} />
    <silkscreenpath route={[{"x":-1.108862400000021,"y":2.750032600000054},{"x":1.1088623999999072,"y":2.750032600000054}]} />
    <silkscreenpath route={[{"x":-5.8999882000000525,"y":2.750032600000054},{"x":-3.97113760000002,"y":2.750032600000054}]} />
    <silkscreenpath route={[{"x":5.8999882000000525,"y":2.750032600000054},{"x":5.8999882000000525,"y":-2.7500072000000273}]} />
    <silkscreenpath route={[{"x":-5.8999882000000525,"y":2.750032600000054},{"x":-5.8999882000000525,"y":-2.7500072000000273}]} />
    <silkscreencircle pcbX="-4.445mm" pcbY="-3.302mm" radius="0.179578mm" />
    <silkscreentext text="{NAME}" pcbX="0mm" pcbY="4.3528mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.1499882000000525,"y":3.5998917000000574},{"x":6.1499882000000525,"y":3.5998917000000574},{"x":6.1499882000000525,"y":-3.5998916999999437},{"x":-6.1499882000000525,"y":-3.5998916999999437},{"x":-6.1499882000000525,"y":3.5998917000000574}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C568455.obj?uuid=ddd628bbe6914ab1b2d93b67a0927452",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C568455.step?uuid=ddd628bbe6914ab1b2d93b67a0927452",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0.000012699999956566899, z: -0.01 },
          }}
          {...props}
        />
      )
    }"
  `)

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

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C568455-four-pin-crystal-symbol-repro",
  )
})
