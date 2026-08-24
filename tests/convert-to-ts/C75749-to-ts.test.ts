import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C75749.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C75749 into typescript file", async () => {
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
    "C75749-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [30, 15, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["MH1"],
      pin11: ["MH2"]
    } as const

    export const DS1037_09FNAKT74_0CC = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-0.4,"y":-0.16},{"x":-0.4,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.8,"y":-0.16},{"x":-0.8,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.16},{"x":0,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.6,"y":-0.3},{"x":-0.6,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.4,"y":-0.16},{"x":0.4,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":-0.3},{"x":-0.2,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.8,"y":-0.16},{"x":0.8,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.3},{"x":0.2,"y":0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.6,"y":-0.3},{"x":0.6,"y":0.04}]} strokeColor="#880000" />
              <schematiccircle center={{ x: 0.6, y: 0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: 0.2, y: 0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: -0.2, y: 0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: -0.6, y: 0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: 0.8, y: -0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: 0.4, y: -0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: 0, y: -0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: -0.4, y: -0.1 }} radius={0.06} color="#880000" />
              <schematiccircle center={{ x: -0.8, y: -0.1 }} radius={0.06} color="#880000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="down" schX={-0.8} schY={-0.7} schStemLength={0.4} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="down" schX={-0.4} schY={-0.7} schStemLength={0.4} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="down" schX={0} schY={-0.7} schStemLength={0.4} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="down" schX={0.4} schY={-0.7} schStemLength={0.4} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="down" schX={0.8} schY={-0.7} schStemLength={0.4} />
              <port name="pin6" pinNumber={6} aliases={["6"]} direction="down" schX={-0.6} schY={-0.7} schStemLength={0.4} />
              <port name="pin7" pinNumber={7} aliases={["7"]} direction="down" schX={-0.2} schY={-0.7} schStemLength={0.4} />
              <port name="pin8" pinNumber={8} aliases={["8"]} direction="down" schX={0.2} schY={-0.7} schStemLength={0.4} />
              <port name="pin9" pinNumber={9} aliases={["9"]} direction="down" schX={0.6} schY={-0.7} schStemLength={0.4} />
              <schematicpath points={[{"x":0.8,"y":-0.3},{"x":-0.8,"y":-0.3}]} strokeColor="#880000" />
              <port name="pin11" pinNumber={11} aliases={["MH2"]} direction="up" schX={-0.4} schY={0.7} schStemLength={0.4} />
              <port name="pin10" pinNumber={10} aliases={["MH1"]} direction="up" schX={0.4} schY={0.7} schStemLength={0.4} />
              <schematicpath points={[{"x":0.8,"y":0.3},{"x":-0.8,"y":0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.8,"y":0.3},{"x":-0.818346,"y":0.298303},{"x":-0.836069,"y":0.293268},{"x":-0.852568,"y":0.285068},{"x":-0.867283,"y":0.27398},{"x":-0.879713,"y":0.260381},{"x":-0.889438,"y":0.244732},{"x":-0.896126,"y":0.227564}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":-0.94,"y":-0.3},{"x":-0.8,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.995732,"y":-0.190366},{"x":-0.998902,"y":-0.204765},{"x":-1,"y":-0.2197},{"x":-0.998987,"y":-0.234645},{"x":-0.995898,"y":-0.249075},{"x":-0.990842,"y":-0.262482},{"x":-0.983998,"y":-0.274395},{"x":-0.975605,"y":-0.284393},{"x":-0.96596,"y":-0.292126},{"x":-0.955401,"y":-0.297321},{"x":-0.9443,"y":-0.299795},{"x":-0.933048,"y":-0.299462}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":-0.9,"y":0.22},{"x":-1,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.896592,"y":0.225882},{"x":0.890096,"y":0.243388},{"x":0.880459,"y":0.259382},{"x":0.868017,"y":0.273305},{"x":0.853203,"y":0.284672},{"x":0.836534,"y":0.293087},{"x":0.818591,"y":0.298257},{"x":0.8,"y":0.3}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.94,"y":-0.3},{"x":0.8,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.933048,"y":-0.299462},{"x":0.9443,"y":-0.299795},{"x":0.955401,"y":-0.297321},{"x":0.96596,"y":-0.292126},{"x":0.975605,"y":-0.284393},{"x":0.983998,"y":-0.274395},{"x":0.990842,"y":-0.262482},{"x":0.995898,"y":-0.249075},{"x":0.998987,"y":-0.234645},{"x":1,"y":-0.2197},{"x":0.998902,"y":-0.204765},{"x":0.995732,"y":-0.190366}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.9,"y":0.22},{"x":1,"y":-0.2}]} strokeColor="#880000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C75749"
      ]
    }}
          manufacturerPartNumber="DS1037-09FNAKT74-0CC"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="-1.41986mm" pcbY="-0.000127mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="0mm" pcbY="-12.499975mm" outerDiameter="4.99999mm" holeDiameter="3.2500316mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="-1.41986mm" pcbY="5.519801mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-1.41986mm" pcbY="2.759837mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-1.41986mm" pcbY="-2.760091mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-1.41986mm" pcbY="-5.520055mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="1.420114mm" pcbY="4.139819mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="1.420114mm" pcbY="1.379855mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="1.420114mm" pcbY="-1.380109mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="1.420114mm" pcbY="-4.140073mm" outerDiameter="1.5748mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="0mm" pcbY="12.499975mm" outerDiameter="4.99999mm" holeDiameter="3.2500316mm" shape="circle" />
    <silkscreenpath route={[{"x":9.500107999999983,"y":-15.400070799999995},{"x":-2.9998924000000216,"y":-15.400070799999995},{"x":-2.9998924000000216,"y":15.39991839999999},{"x":9.500107999999983,"y":15.39991839999999},{"x":9.500107999999983,"y":-15.400070799999995}]} />
    <silkscreenpath route={[{"x":14.78010759999998,"y":-0.005080000000006635},{"x":15.480106199999966,"y":-0.005080000000006635}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":8.369934999999998},{"x":15.500121399999955,"y":8.369934999999998},{"x":15.500121399999955,"y":-8.380069600000013},{"x":9.500107999999983,"y":-8.380069600000013}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":10.429925800000007},{"x":15.500121399999955,"y":10.429925800000007}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":14.569922599999984},{"x":15.500121399999955,"y":14.569922599999984},{"x":15.500121399999955,"y":10.45992320000002}]} />
    <silkscreenpath route={[{"x":15.500121399999955,"y":-14.540077600000004},{"x":15.500121399999955,"y":-10.430078200000011},{"x":9.500107999999983,"y":-10.430078200000011}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":-14.570074999999989},{"x":15.500121399999955,"y":-14.570074999999989}]} />
    <silkscreentext text="1" pcbX="-1.97866mm" pcbY="7.348601mm" anchorAlignment="bottom_left" pcbRotation="270deg" fontSize="1.27mm" />
    <silkscreentext text="5" pcbX="-1.87706mm" pcbY="-6.799199mm" anchorAlignment="bottom_left" pcbRotation="270deg" fontSize="1.27mm" />
    <silkscreentext text="9" pcbX="1.17094mm" pcbY="-6.697599mm" anchorAlignment="bottom_left" pcbRotation="270deg" fontSize="1.27mm" />
    <silkscreentext text="6" pcbX="1.01854mm" pcbY="7.374001mm" anchorAlignment="bottom_left" pcbRotation="270deg" fontSize="1.27mm" />
    <silkscreentext text="{NAME}" pcbX="6.309614mm" pcbY="16.519527mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.3764860000000283,"y":15.76952700000001},{"x":15.995713999999964,"y":15.76952700000001},{"x":15.995713999999964,"y":-15.794673000000017},{"x":-3.3764860000000283,"y":-15.794673000000017},{"x":-3.3764860000000283,"y":15.76952700000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C75749.obj?uuid=dc634ef6f677426f9bef12d13c1b02cd",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C75749.step?uuid=dc634ef6f677426f9bef12d13c1b02cd",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.000012699999999199463, y: -1.497042800000047, z: 0.3381490000000005 },
          }}
          {...props}
        />
      )
    }"
  `)
})
