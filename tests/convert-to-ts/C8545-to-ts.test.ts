import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C8545.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("repro: imports C8545 with its custom schematic symbol", async () => {
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
    "C8545-oversized-symbol-repro",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C8545-pcb",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["G"],
      pin2: ["S"],
      pin3: ["D"]
    } as const

    export const A_2N7002 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":0,"y":0},{"x":0.12,"y":-0.04},{"x":0.12,"y":0.04},{"x":0,"y":0}]} strokeColor="#880000" isFilled fillColor="#FEFEFE" />
              <schematicpath points={[{"x":0.4,"y":0.04},{"x":0.34,"y":-0.06},{"x":0.46,"y":-0.06},{"x":0.4,"y":0.04}]} strokeColor="#880000" isFilled fillColor="#FEFEFE" />
              <schematicpath points={[{"x":0,"y":0.14},{"x":0.2,"y":0.14},{"x":0.2,"y":0.2},{"x":0.4,"y":0.2},{"x":0.4,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0},{"x":0.2,"y":0},{"x":0.2,"y":-0.2},{"x":0.4,"y":-0.2},{"x":0.4,"y":-0.06}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.14},{"x":0,"y":-0.14}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.04,"y":0.18},{"x":-0.04,"y":-0.18}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.18},{"x":0,"y":0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.04},{"x":0,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.18},{"x":0,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.04,"y":0}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.48,"y":0.04},{"x":0.44,"y":0.04},{"x":0.36,"y":0.04},{"x":0.32,"y":0.04}]} strokeColor="#880000" />
              <port name="pin3" pinNumber={3} aliases={["D"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
              <port name="pin1" pinNumber={1} aliases={["G"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
              <port name="pin2" pinNumber={2} aliases={["S"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
              <schematictext schX={0.02} schY={0.64} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C8545"
      ]
    }}
          manufacturerPartNumber="2N7002"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="0.999998mm" pcbY="-0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.999998mm" pcbY="0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.999998mm" pcbY="0mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <silkscreenpath route={[{"x":0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":0.45539659999997184},{"x":0.726211400000011,"y":-0.45539659999985815}]} />
    <silkscreentext text="{NAME}" pcbX="0.0254mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":1.5600680000000011,"y":-1.1000739999999496},{"x":1.558145067721739,"y":-1.1195978590660616},{"x":1.5524501680956746,"y":-1.138371427177276},{"x":1.5432021529207987,"y":-1.1556732466395943},{"x":1.5307564182340911,"y":-1.1708384182339842},{"x":1.5155912466397012,"y":-1.1832841529206917},{"x":1.498289427177383,"y":-1.1925321680955676},{"x":1.4795158590661686,"y":-1.198227067721632},{"x":1.4599920000000566,"y":-1.2001499999998941},{"x":1.4404681409339446,"y":-1.198227067721632},{"x":1.4216945728227302,"y":-1.1925321680955676},{"x":1.404392753360412,"y":-1.1832841529206917},{"x":1.389227581766022,"y":-1.1708384182339842},{"x":1.3767818470793145,"y":-1.1556732466395943},{"x":1.3675338319044386,"y":-1.138371427177276},{"x":1.3618389322783742,"y":-1.1195978590660616},{"x":1.359916000000112,"y":-1.1000739999999496},{"x":1.3618389322783742,"y":-1.0805501409338376},{"x":1.3675338319044386,"y":-1.0617765728226232},{"x":1.3767818470793145,"y":-1.044474753360305},{"x":1.389227581766022,"y":-1.029309581765915},{"x":1.404392753360412,"y":-1.0168638470792075},{"x":1.4216945728227302,"y":-1.0076158319043316},{"x":1.4404681409339446,"y":-1.0019209322782672},{"x":1.4599920000000566,"y":-0.999998000000005},{"x":1.4795158590661686,"y":-1.0019209322782672},{"x":1.498289427177383,"y":-1.0076158319043316},{"x":1.5155912466397012,"y":-1.0168638470792075},{"x":1.5307564182340911,"y":-1.029309581765915},{"x":1.5432021529207987,"y":-1.044474753360305},{"x":1.5524501680956746,"y":-1.0617765728226232},{"x":1.558145067721739,"y":-1.0805501409338376},{"x":1.5600680000000011,"y":-1.1000739999999496}]} strokeWidth="0.1999996mm" />
    <courtyardoutline outline={[{"x":-1.7499969999998939,"y":1.6999844000000621},{"x":1.7499969999998939,"y":1.6999844000000621},{"x":1.7499969999998939,"y":-1.7000097999999753},{"x":-1.7499969999998939,"y":-1.7000097999999753},{"x":-1.7499969999998939,"y":1.6999844000000621}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0.000012700000070253736, y: -0.000012699999956566899, z: 0.050795 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 15_000)
