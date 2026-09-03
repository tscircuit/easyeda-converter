import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2998002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C2998002 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2998002-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["C1"],
      pin2: ["C2"],
      pin3: ["E1"],
      pin4: ["E2"]
    } as const

    export const BCM62B_215 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematictext schX={0.3} schY={-0.06} text="TR1" fontSize={0.11} anchor="left" color="#0000FF" schRotation={0} />
              <schematictext schX={-0.58} schY={-0.06} text="TR2" fontSize={0.11} anchor="left" color="#0000FF" schRotation={0} />
              <schematiccircle center={{ x: 0, y: 0 }} radius={0.01} strokeWidth={0.02} color="#880000" />
              <schematicrect schX={0} schY={0} width={1.2} height={0.4} strokeWidth={0.02} color="#880000" />
              <schematicpath points={[{"x":0,"y":0},{"x":0,"y":-0.14},{"x":-0.4,"y":-0.14}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.06},{"x":0.4,"y":-0.14},{"x":0.4,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":-0.06},{"x":-0.4,"y":-0.14},{"x":-0.4,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0.04},{"x":-0.26,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0.04},{"x":-0.24,"y":0.08}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.04},{"x":0.24,"y":0.08}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.04},{"x":0.26,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.04},{"x":0.4,"y":0.12},{"x":0.4,"y":0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0.04},{"x":-0.4,"y":0.12},{"x":-0.4,"y":0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0},{"x":0.2,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.1},{"x":0.2,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0.1},{"x":-0.2,"y":-0.1}]} strokeColor="#880000" />
              <port name="pin3" pinNumber={3} aliases={["E1","E"]} direction="up" schX={0.4} schY={0.4} schStemLength={0.2} />
              <schematictext schX={0.4} schY={0.26} text="3" fontSize={0.14} anchor="bottom_left" color="#0000FF" schRotation={270} />
              <port name="pin1" pinNumber={1} aliases={["C1","C"]} direction="down" schX={-0.4} schY={-0.4} schStemLength={0.2} />
              <schematictext schX={-0.42} schY={-0.24} text="1" fontSize={0.14} anchor="bottom_right" color="#0000FF" schRotation={270} />
              <port name="pin2" pinNumber={2} aliases={["C2","C"]} direction="down" schX={0.4} schY={-0.4} schStemLength={0.2} />
              <schematictext schX={0.4} schY={-0.26} text="2" fontSize={0.14} anchor="bottom_right" color="#0000FF" schRotation={270} />
              <port name="pin4" pinNumber={4} aliases={["E2","E"]} direction="up" schX={-0.4} schY={0.4} schStemLength={0.2} />
              <schematictext schX={-0.4} schY={0.26} text="4" fontSize={0.14} anchor="bottom_left" color="#0000FF" schRotation={270} />
              <schematictext schX={-0.606} schY={0.622} text="{NAME}" fontSize={0.2} anchor="bottom_left" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C2998002"
      ]
    }}
          manufacturerPartNumber="BCM62B,215"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="1.099947mm" pcbY="-0.72501125mm" width="0.6999986mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="1.099947mm" pcbY="0.97501075mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.099947mm" pcbY="0.97501075mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.099947mm" pcbY="-0.92516325mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":1.449939950000001},{"x":0.7000239999999991,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-0.00006985000000270247},{"x":0.7000239999999991,"y":0.4998783499999888}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-1.525111250000009},{"x":0.7000239999999991,"y":-1.4501558500000016}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":1.449939950000001},{"x":-0.6999732000000023,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":-0.45008165000000133},{"x":-0.6999732000000023,"y":0.4998783499999888}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":-1.525111250000009},{"x":-0.6999732000000023,"y":-1.4001432499999993}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":1.5749079500000107},{"x":-0.6999732000000023,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-1.525111250000009},{"x":-0.6999732000000023,"y":-1.525111250000009}]} />
    <silkscreencircle pcbX="1.270127mm" pcbY="-1.75320325mm" radius="0.127mm" />
    <silkscreentext text="{NAME}" pcbX="0.000127mm" pcbY="2.57419675mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.6976730000000089,"y":1.8241967499999987},{"x":1.6979269999999929,"y":1.8241967499999987},{"x":1.6979269999999929,"y":-2.130203250000008},{"x":-1.6976730000000089,"y":-2.130203250000008},{"x":-1.6976730000000089,"y":1.8241967499999987}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2998002.obj?uuid=499fe0b8a844428c9e2aff62131a11f8",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2998002.step?uuid=499fe0b8a844428c9e2aff62131a11f8",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.024923749999999245, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
