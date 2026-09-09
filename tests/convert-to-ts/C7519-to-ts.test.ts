import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C7519.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("repro: converts C7519 with a schematic snapshot", async () => {
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
    "C7519-to-ts-schematic",
  )

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"]
    } as const

    export const USBLC6_2SC6 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-0.9,"y":1},{"x":0.9,"y":1},{"x":0.9,"y":-1},{"x":-0.9,"y":-1},{"x":-0.9,"y":1}]} strokeWidth={0.02} strokeColor="#880000" isFilled fillColor="#FFFFFF" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-1.3} schY={0.6} schStemLength={0.4} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-1.3} schY={0} schStemLength={0.4} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-1.3} schY={-0.6} schStemLength={0.4} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={1.3} schY={-0.6} schStemLength={0.4} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="right" schX={1.3} schY={0} schStemLength={0.4} />
              <port name="pin6" pinNumber={6} aliases={["6"]} direction="right" schX={1.3} schY={0.6} schStemLength={0.4} />
              <schematicpath points={[{"x":-0.9,"y":0.6},{"x":0.9,"y":0.6}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.9,"y":-0.6},{"x":0.9,"y":-0.6}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.9,"y":0},{"x":0.9,"y":0}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.14 -0.12 L 0.06 0 L -0.14 0.14 Z" strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":0.1,"y":0.16},{"x":0.06,"y":0.16},{"x":0.06,"y":-0.14},{"x":0,"y":-0.14}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.68,"y":0},{"x":-0.68,"y":0.4},{"x":0.66,"y":0.4},{"x":0.66,"y":-0.4},{"x":-0.68,"y":-0.4},{"x":-0.68,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.6},{"x":0,"y":0.4}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.6},{"x":0,"y":-0.4}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.46 0.28 L -0.26 0.4 L -0.46 0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":-0.26,"y":0.56},{"x":-0.26,"y":0.56},{"x":-0.26,"y":0.26},{"x":-0.26,"y":0.26}]} strokeColor="#880000" />
              <schematicpath svgPath="M 0.22 0.28 L 0.42 0.4 L 0.22 0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":0.42,"y":0.56},{"x":0.42,"y":0.56},{"x":0.42,"y":0.26},{"x":0.42,"y":0.26}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.48 -0.52 L -0.28 -0.4 L -0.48 -0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":-0.28,"y":-0.24},{"x":-0.28,"y":-0.24},{"x":-0.28,"y":-0.54},{"x":-0.28,"y":-0.54}]} strokeColor="#880000" />
              <schematicpath svgPath="M 0.22 -0.52 L 0.42 -0.4 L 0.22 -0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
              <schematicpath points={[{"x":0.42,"y":-0.24},{"x":0.42,"y":-0.24},{"x":0.42,"y":-0.54},{"x":0.42,"y":-0.54}]} strokeColor="#880000" />
              <schematiccircle center={{ x: 0, y: 0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
              <schematiccircle center={{ x: 0, y: 0.4 }} radius={0.02} strokeWidth={0.02} color="#880000" />
              <schematiccircle center={{ x: -0.68, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
              <schematiccircle center={{ x: 0.66, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
              <schematiccircle center={{ x: 0, y: -0.4 }} radius={0.02} strokeWidth={0.02} color="#880000" />
              <schematiccircle center={{ x: 0, y: -0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C7519"
      ]
    }}
          manufacturerPartNumber="USBLC6-2SC6"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
    <silkscreenpath route={[{"x":1.5391891999998961,"y":-0.8892031999998835},{"x":1.5391891999998961,"y":0.8892031999999972}]} />
    <silkscreenpath route={[{"x":-1.5391892000000098,"y":-0.8892031999998835},{"x":-1.5391892000000098,"y":0.8892031999999972}]} />
    <silkscreencircle pcbX="-1.668272mm" pcbY="-1.301496mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.1524mm" pcbY="2.6764mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.078800000000001,"y":1.9264000000000578},{"x":1.7739999999998872,"y":1.9264000000000578},{"x":1.7739999999998872,"y":-2.0279999999999063},{"x":-2.078800000000001,"y":-2.0279999999999063},{"x":-2.078800000000001,"y":1.9264000000000578}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7519.obj?uuid=229b69761e2c45dba6a83d8866dec72d",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7519.step?uuid=229b69761e2c45dba6a83d8866dec72d",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.000012700000070253736, y: 0.000012700000070253736, z: -0.048939 },
          }}
          {...props}
        />
      )
    }"
  `)
})
