import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C23689428.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C23689428 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [20, -20, 10],
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
      pin7: ["pin7"]
    } as const

    export const DIN_504 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C23689428"
      ]
    }}
          manufacturerPartNumber="DIN-504"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="-3.850005mm" pcbY="7.499985mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-3.850005mm" pcbY="-0.000127mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-3.850005mm" pcbY="-7.499985mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-6.149975mm" pcbY="4.999863mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-6.149975mm" pcbY="-5.000117mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="6.149975mm" pcbY="4.999863mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="6.149975mm" pcbY="-5.000117mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <silkscreenpath route={[{"x":-4.777715,"y":-8.308035},{"x":-4.777715,"y":-10.500081}]} />
    <silkscreenpath route={[{"x":-4.777715,"y":-0.808203},{"x":-4.777715,"y":-6.691935}]} />
    <silkscreenpath route={[{"x":-4.777715,"y":6.691935},{"x":-4.777715,"y":0.807949}]} />
    <silkscreenpath route={[{"x":-4.777715,"y":10.491572},{"x":-4.777715,"y":8.30801}]} />
    <silkscreenpath route={[{"x":6.749898,"y":-6.243904},{"x":6.749898,"y":-10.500081}]} />
    <silkscreenpath route={[{"x":6.749898,"y":3.756101},{"x":6.749898,"y":-3.756355}]} />
    <silkscreenpath route={[{"x":6.749898,"y":10.499827},{"x":6.749898,"y":6.24365}]} />
    <silkscreenpath route={[{"x":-10.45017,"y":-10.500081},{"x":-10.45017,"y":9.499879},{"x":-10.45017,"y":10.499827}]} />
    <silkscreenpath route={[{"x":8.449818,"y":10.499827},{"x":-10.45017,"y":10.499827}]} />
    <silkscreenpath route={[{"x":8.449818,"y":-10.500081},{"x":-10.45017,"y":-10.500081}]} />
    <silkscreenpath route={[{"x":8.449818,"y":-10.500081},{"x":8.449818,"y":10.499827}]} />
    <silkscreencircle pcbX="-5.599989mm" pcbY="11.199978mm" radius="0.1999996mm" />
    <silkscreentext text="{NAME}" pcbX="-0.992657mm" pcbY="-11.592232mm" anchorAlignment="center" pcbRotation="180deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":6.69986,"y":10.499852},{"x":6.799859,"y":10.599852},{"x":8.399856,"y":10.599852},{"x":8.499856,"y":10.499852},{"x":8.499856,"y":-10.500106},{"x":8.399856,"y":-10.600106},{"x":6.799859,"y":-10.600106},{"x":6.69986,"y":-10.500106},{"x":6.69986,"y":-10.400106},{"x":8.299856,"y":-10.400106},{"x":8.299856,"y":10.399852},{"x":6.69986,"y":10.399852},{"x":6.69986,"y":10.499852}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":7.549973,"y":-10.749979},{"x":-7.549973,"y":-10.749979},{"x":-7.549973,"y":10.749979},{"x":7.549973,"y":10.749979},{"x":7.549973,"y":-10.749979}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23689428.obj?uuid=41dedda2470f44618e688797cde191ed",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23689428.step?uuid=41dedda2470f44618e688797cde191ed",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0, y: 0.990003, z: -9.850007000000002 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 10000)
