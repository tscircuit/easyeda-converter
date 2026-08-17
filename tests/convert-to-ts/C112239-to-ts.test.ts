import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C112239.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("repro: aligns BSS138 pin labels on its custom schematic symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["G"],
      pin2: ["S"],
      pin3: ["D"]
    } as const

    export const BSS138 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":0,"y":0},{"x":0.12,"y":-0.04},{"x":0.12,"y":0.04},{"x":0,"y":0}]} strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":0.04},{"x":0.34,"y":-0.06},{"x":0.46,"y":-0.06},{"x":0.4,"y":0.04}]} strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.14},{"x":0.2,"y":0.14},{"x":0.2,"y":0.2},{"x":0.4,"y":0.2},{"x":0.4,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0},{"x":0.2,"y":0},{"x":0.2,"y":-0.2},{"x":0.4,"y":-0.2},{"x":0.4,"y":-0.06}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.14},{"x":0,"y":-0.14}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.04,"y":0.18},{"x":-0.04,"y":-0.18}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.18},{"x":0,"y":0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.04},{"x":0,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.18},{"x":0,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.04,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.48,"y":0.04},{"x":0.44,"y":0.04},{"x":0.36,"y":0.04},{"x":0.32,"y":0.04}]} strokeColor="#880000" />
              <schematictext schX={0.3} schY={0.2} text="D" fontSize={0.14} anchor="right" color="rgb(0, 100, 100)" schRotation={270} />
              <port name="pin3" pinNumber={3} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
              <schematictext schX={-0.18} schY={-0.12} text="G" fontSize={0.14} anchor="left" color="rgb(0, 100, 100)" schRotation={0} />
              <port name="pin1" pinNumber={1} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
              <schematictext schX={0.28} schY={-0.1} text="S" fontSize={0.14} anchor="left" color="rgb(0, 100, 100)" schRotation={270} />
              <port name="pin2" pinNumber={2} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C112239"
      ]
    }}
          manufacturerPartNumber="BSS138"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="1.235075mm" pcbY="-0.94996mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="1.235075mm" pcbY="0.94996mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.235075mm" pcbY="0mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
    <silkscreenpath route={[{"x":0.8760714000002281,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.8760714000002281,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.8760714000002281,"y":0.45539659999997184},{"x":0.8760714000002281,"y":-0.45539659999985815}]} />
    <silkscreentext text="{NAME}" pcbX="-0.012827mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.0281269999999267,"y":1.774000000000001},{"x":2.0024730000002364,"y":1.774000000000001},{"x":2.0024730000002364,"y":-1.7993999999999915},{"x":-2.0281269999999267,"y":-1.7993999999999915},{"x":-2.0281269999999267,"y":1.774000000000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C112239.obj?uuid=cefd4596db214da394d9632b2b88f8f2",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C112239.step?uuid=cefd4596db214da394d9632b2b88f8f2",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0.000012699999956566899, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
