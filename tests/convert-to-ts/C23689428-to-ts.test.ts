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
          manufacturerPartNumber="DIN_504"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="3.850005mm" pcbY="-7.499985mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="3.850005mm" pcbY="0.000127mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="3.850005mm" pcbY="7.499985mm" outerDiameter="1.999996mm" holeDiameter="1.3000228mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="6.149975mm" pcbY="-4.999863mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="6.149975mm" pcbY="5.000117mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="-6.149975mm" pcbY="-4.999863mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="-6.149975mm" pcbY="5.000117mm" outerDiameter="2.2999954mm" holeDiameter="1.5999968mm" shape="circle" />
    <silkscreenpath route={[{"x":4.777714600000081,"y":8.308035200000177},{"x":4.777714600000081,"y":10.50008060000016}]} />
    <silkscreenpath route={[{"x":4.777714600000081,"y":0.8082026000001861},{"x":4.777714600000081,"y":6.69193480000024}]} />
    <silkscreenpath route={[{"x":4.777714600000081,"y":-6.691934799999899},{"x":4.777714600000081,"y":-0.8079485999999179}]} />
    <silkscreenpath route={[{"x":4.777714600000081,"y":-10.49157159999993},{"x":4.777714600000081,"y":-8.308009799999923}]} />
    <silkscreenpath route={[{"x":-6.74989759999994,"y":6.243904200000088},{"x":-6.74989759999994,"y":10.50008060000016}]} />
    <silkscreenpath route={[{"x":-6.74989759999994,"y":-3.7561011999998755},{"x":-6.74989759999994,"y":3.7563552000001437}]} />
    <silkscreenpath route={[{"x":-6.74989759999994,"y":-10.499826599999778},{"x":-6.74989759999994,"y":-6.24365019999982}]} />
    <silkscreenpath route={[{"x":10.450169600000095,"y":10.50008060000016},{"x":10.450169600000095,"y":-9.499879399999827},{"x":10.450169600000095,"y":-10.499826599999778}]} />
    <silkscreenpath route={[{"x":-8.449817999999823,"y":-10.499826599999778},{"x":10.450169600000095,"y":-10.499826599999778}]} />
    <silkscreenpath route={[{"x":-8.449817999999823,"y":10.50008060000016},{"x":10.450169600000095,"y":10.50008060000016}]} />
    <silkscreenpath route={[{"x":-8.449817999999823,"y":10.50008060000016},{"x":-8.449817999999823,"y":-10.499826599999778}]} />
    <silkscreentext text="{NAME}" pcbX="0.9926574mm" pcbY="11.5922318mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.74424259999978,"y":10.842231800000036},{"x":10.729557400000203,"y":10.842231800000036},{"x":10.729557400000203,"y":-11.654168199999845},{"x":-8.74424259999978,"y":-11.654168199999845},{"x":-8.74424259999978,"y":10.842231800000036}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23689428.obj?uuid=41dedda2470f44618e688797cde191ed",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23689428.step?uuid=41dedda2470f44618e688797cde191ed",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0, y: -0.9900031000000808, z: -9.850007000000002 },
          }}
          {...props}
        />
      )
    }"
  `)
})
