import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C70593.raweasy.json"

test("repro: C70593 four-pin crystal imports as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")
  expect(result).not.toContain("<crystal")
  expect(result).toContain('pin1: ["OSC1"]')
  expect(result).toContain('pin2: ["GND2"]')
  expect(result).toContain('pin3: ["OSC2"]')
  expect(result).toContain('pin4: ["GND1"]')
  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["OSC1"],
      pin2: ["GND2"],
      pin3: ["OSC2"],
      pin4: ["GND1"]
    } as const

    const pinAttributes = {
      pin2: {requiresGround: true},
      pin4: {requiresGround: true}
    } as const

    export const X322525MRB4SI = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-0.1,"y":-0.08},{"x":-0.1,"y":0.08}]} strokeColor="#880011" />
              <schematicpath points={[{"x":0.06,"y":-0.14},{"x":-0.06,"y":-0.14}]} strokeColor="#880011" />
              <schematicpath points={[{"x":0.1,"y":-0.08},{"x":0.1,"y":0.08}]} strokeColor="#880011" />
              <schematicpath points={[{"x":-0.06,"y":-0.14},{"x":-0.06,"y":0.14},{"x":0.06,"y":0.14},{"x":0.06,"y":-0.14}]} strokeColor="#880011" />
              <schematicpath points={[{"x":0.4,"y":0.2},{"x":0.2,"y":0.2},{"x":0.2,"y":0},{"x":0.12,"y":0}]} strokeColor="#880011" />
              <schematicpath points={[{"x":-0.4,"y":-0.2},{"x":-0.2,"y":-0.2},{"x":-0.2,"y":0},{"x":-0.12,"y":0}]} strokeColor="#880011" />
              <schematicpath points={[{"x":0.1,"y":-0.14},{"x":0.1,"y":0.14}]} strokeColor="#880011" />
              <schematicpath points={[{"x":-0.1,"y":-0.14},{"x":-0.1,"y":0.14}]} strokeColor="#880011" />
              <schematicpath points={[{"x":0.06,"y":0.14},{"x":0.06,"y":-0.14},{"x":-0.06,"y":-0.14},{"x":-0.06,"y":0.14},{"x":0.06,"y":0.14}]} strokeColor="#880011" />
              <port name="pin4" pinNumber={4} aliases={["GND1"]} direction="left" schX={-0.6} schY={0.2} schStemLength={0.2} />
              <port name="pin2" pinNumber={2} aliases={["GND2"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.2} />
              <schematicrect schX={0} schY={0} width={0.8} height={0.8} strokeWidth={0.02} color="#880000" />
              <port name="pin1" pinNumber={1} aliases={["OSC1"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} aliases={["OSC2"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.2} />
              <schematictext schX={0} schY={0.6} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C70593"
      ]
    }}
          manufacturerPartNumber="X322525MRB4SI"
          footprint={<footprint>
            <smtpad portHints={["pin3"]} pcbX="1.100074mm" pcbY="0.9499854mm" width="1.3999972mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-1.100074mm" pcbY="-0.9499854mm" width="1.3999972mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.100074mm" pcbY="0.9499854mm" width="1.3999972mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="1.100074mm" pcbY="-0.9499854mm" width="1.3999972mm" height="1.1999976mm" shape="rect" />
    <silkscreenpath route={[{"x":-2.5397460000000365,"y":-1.270126999999988},{"x":-2.5397460000000365,"y":-1.270126999999988},{"x":-2.5397460000000365,"y":-2.2861270000000076},{"x":-2.5397460000000365,"y":-2.2861270000000076},{"x":-1.523746000000017,"y":-2.2861270000000076},{"x":-1.523746000000017,"y":-2.2861270000000076}]} />
    <silkscreenpath route={[{"x":-2.1003260000000523,"y":-1.699894999999998},{"x":2.1008339999999635,"y":-1.699894999999998},{"x":2.1008339999999635,"y":1.7001490000000103},{"x":-2.1003260000000523,"y":1.7001490000000103},{"x":-2.1003260000000523,"y":-1.699894999999998}]} />
    <silkscreenpath route={[{"x":-1.0160000000000196,"y":-1.7779999999999916},{"x":-1.1647410559976379,"y":-1.9286420297039513},{"x":-1.014729999999986,"y":-2.078019424014741},{"x":-0.8647189440023908,"y":-1.9286420297038944},{"x":-1.013460000000066,"y":-1.7779999999999916}]} />
    <silkscreentext text="{NAME}" pcbX="-0.220726mm" pcbY="2.697101mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.0500726000000213,"y":1.7999842000000115},{"x":2.0500726000000213,"y":1.7999842000000115},{"x":2.0500726000000213,"y":-1.7999841999999973},{"x":-2.0500726000000213,"y":-1.7999841999999973},{"x":-2.0500726000000213,"y":1.7999842000000115}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C70593.obj?uuid=3d8e5f33629249f9a4089449c02742d4",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C70593.step?uuid=3d8e5f33629249f9a4089449c02742d4",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0.000012699999984988608, z: -0.01 },
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
    "C70593-four-pin-crystal-symbol-repro",
  )
})
