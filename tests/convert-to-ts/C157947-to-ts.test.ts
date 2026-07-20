import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C157947.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C157947 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

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
      pin10: ["pin10"]
    } as const

    export const S10B_PH_K_S_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C157947"
      ]
    }}
          manufacturerPartNumber="S10B_PH_K_S_LF__SN_"
          footprint={<footprint>
            <platedhole  portHints={["pin10"]} pcbX="8.999982mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="6.999986mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="4.99999mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="2.999994mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="0.999998mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-0.999998mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-2.999994mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-4.99999mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-6.999986mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="-8.999982mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
    <silkscreenpath route={[{"x":10.999952600000142,"y":1.4999970000000076},{"x":9.999954600000137,"y":1.4999970000000076},{"x":9.999954600000137,"y":0}]} />
    <silkscreenpath route={[{"x":8.000441200000068,"y":-1.9990053999999873},{"x":8.000441200000068,"y":-5.999505400000089}]} />
    <silkscreenpath route={[{"x":7.9999332000001,"y":-1.9990053999999873},{"x":-7.999018799999931,"y":-1.9990053999999873},{"x":-7.999018799999931,"y":-5.999505400000089}]} />
    <silkscreenpath route={[{"x":-11.000003399999969,"y":1.4999970000000076},{"x":-10.000005400000077,"y":1.4999970000000076},{"x":-10.000005400000077,"y":0}]} />
    <silkscreenpath route={[{"x":11.000206599999956,"y":-6.1010800000000245},{"x":11.000206599999956,"y":1.5011146000000508}]} />
    <silkscreenpath route={[{"x":-11.000003399999969,"y":1.4999970000000076},{"x":-11.000003399999969,"y":-6.099962399999981}]} />
    <silkscreenpath route={[{"x":10.999952600000142,"y":-6.1010800000000245},{"x":-10.998758800000019,"y":-6.1010800000000245}]} />
    <silkscreentext text="{NAME}" pcbX="-0.017018mm" pcbY="2.61544mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-11.404917999999952,"y":1.865440000000035},{"x":11.370881999999938,"y":1.865440000000035},{"x":11.370881999999938,"y":-6.508559999999989},{"x":-11.404917999999952,"y":-6.508559999999989},{"x":-11.404917999999952,"y":1.865440000000035}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C157947.obj?uuid=56658e1f2fb34d408c9e670ada201bdf",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C157947.step?uuid=56658e1f2fb34d408c9e670ada201bdf",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.015062200000102166, y: 2.315006799999992, z: 0.09999300000000044 },
          }}
          {...props}
        />
      )
    }"
  `)
})
