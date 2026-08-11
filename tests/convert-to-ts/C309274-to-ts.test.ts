import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C309274.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C309274 into typescript file", async () => {
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
    "C309274-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [20, -20, 20],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"]
    } as const

    export const PJ_609 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicrect schX={-0.46} schY={0.1} width={0.12} height={0.6} color="#880000" />
              <schematicpath points={[{"x":0.4,"y":0.4},{"x":0.2,"y":0.4},{"x":0.2,"y":0.6},{"x":0.22,"y":0.48}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.6},{"x":0.18,"y":0.48}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":0},{"x":0.2,"y":0},{"x":0.2,"y":0.2},{"x":0.18,"y":0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.2},{"x":0.22,"y":0.1}]} strokeColor="#880000" />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.6} schY={0.6} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.6} schY={0.4} schStemLength={0.2} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.2} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="right" schX={0.6} schY={0} schStemLength={0.2} />
              <port name="pin6" pinNumber={6} aliases={["6"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.2} />
              <port name="pin7" pinNumber={7} aliases={["7"]} direction="right" schX={0.6} schY={-0.4} schStemLength={0.2} />
              <schematicpath points={[{"x":0.4,"y":0.6},{"x":-0.2,"y":0.6},{"x":-0.2,"y":0.2}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.28 0.2 C -0.28 0.14 -0.2 0.14 -0.2 0.2" strokeColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":-0.4},{"x":0.2,"y":-0.4},{"x":0.2,"y":-0.2},{"x":0.18,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.22,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":0.2},{"x":0.04,"y":0.2},{"x":0,"y":0.28},{"x":-0.04,"y":0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":-0.2},{"x":0.14,"y":-0.2},{"x":0.1,"y":-0.12},{"x":0.06,"y":-0.2}]} strokeColor="#880000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C309274"
      ]
    }}
          manufacturerPartNumber="PJ-609"
          footprint={<footprint>
            <platedhole  portHints={["pin2"]} pcbX="-6.299962mm" pcbY="-8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="-6.299962mm" pcbY="8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="0mm" pcbY="-8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin6"]} pcbX="6.299962mm" pcbY="-8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin7"]} pcbX="6.299962mm" pcbY="8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin5"]} pcbX="0mm" pcbY="8.10006mm" holeWidth="0.7999984mm" holeHeight="2.3999952mm" outerWidth="1.5999968mm" outerHeight="3.1999936mm" pcbRotation="270deg" shape="pill" />
    <silkscreenpath route={[{"x":-10.500436200000195,"y":10.000132399999984},{"x":10.499547199999824,"y":10.000132399999984}]} />
    <silkscreenpath route={[{"x":-10.500436200000195,"y":10.000132399999984},{"x":-10.500436200000195,"y":-9.999878399999943},{"x":10.499547199999824,"y":-9.999878399999943}]} />
    <silkscreenpath route={[{"x":10.499547199999824,"y":10.000132399999984},{"x":10.499547199999824,"y":-9.999878399999943}]} />
    <silkscreenpath route={[{"x":-10.500436200000195,"y":5.500141400000075},{"x":-19.000444600000037,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-10.500436200000195,"y":-5.499861999999894},{"x":-19.000444600000037,"y":-5.499861999999894}]} />
    <silkscreenpath route={[{"x":14.099539999999934,"y":1.4001242000000502},{"x":13.49954119999984,"y":4.4501308000001245}]} />
    <silkscreenpath route={[{"x":14.099539999999934,"y":-1.3998701999998957},{"x":13.49954119999984,"y":-4.44987679999997}]} />
    <silkscreenpath route={[{"x":10.499547199999824,"y":4.4501308000001245},{"x":13.49954119999984,"y":4.4501308000001245}]} />
    <silkscreenpath route={[{"x":10.499547199999824,"y":-4.44987679999997},{"x":13.49954119999984,"y":-4.44987679999997}]} />
    <silkscreenpath route={[{"x":14.099539999999934,"y":1.4001242000000502},{"x":14.099539999999934,"y":-1.3998701999998957}]} />
    <silkscreenpath route={[{"x":13.49954119999984,"y":4.4501308000001245},{"x":13.49954119999984,"y":-4.44987679999997}]} />
    <silkscreenpath route={[{"x":-19.000444600000037,"y":5.500141400000075},{"x":-19.000444600000037,"y":-5.499861999999894}]} />
    <silkscreenpath route={[{"x":-16.00045060000025,"y":-5.499861999999894},{"x":-17.00044860000014,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-18.000446600000032,"y":-5.499861999999894},{"x":-19.000444600000037,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-17.00044860000014,"y":-5.499861999999894},{"x":-18.000446600000032,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-15.00045260000013,"y":-5.499861999999894},{"x":-16.00045060000025,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-14.000454600000012,"y":-5.499861999999894},{"x":-15.00045260000013,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-13.00045660000012,"y":-5.499861999999894},{"x":-14.000454600000012,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-12.000458600000115,"y":-5.499861999999894},{"x":-13.00045660000012,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-11.000460600000224,"y":-5.499861999999894},{"x":-12.000458600000115,"y":5.500141400000075}]} />
    <silkscreenpath route={[{"x":-10.500436200000195,"y":0.00012700000002041634},{"x":-11.000460600000224,"y":5.500141400000075}]} />
    <silkscreentext text="{NAME}" pcbX="-2.738374mm" pcbY="11.004552mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-19.828574000000117,"y":10.254552000000103},{"x":14.351825999999846,"y":10.254552000000103},{"x":14.351825999999846,"y":-10.286047999999937},{"x":-19.828574000000117,"y":-10.286047999999937},{"x":-19.828574000000117,"y":10.254552000000103}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C309274.obj?uuid=1d9ce8bda5164b838444742ab1b7a83d",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C309274.step?uuid=1d9ce8bda5164b838444742ab1b7a83d",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.050006700000085225, y: 0.00005080000005364127, z: -0.10000799999999987 },
          }}
          {...props}
        />
      )
    }"
  `)
})
