import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C75749.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

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
          supplierPartNumbers={{
      "jlcpcb": [
        "C75749"
      ]
    }}
          manufacturerPartNumber="DS1037_09FNAKT74_0CC"
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
    <silkscreentext text="1" pcbX="-1.97866mm" pcbY="7.348601mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="5" pcbX="-1.87706mm" pcbY="-6.799199mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="9" pcbX="1.17094mm" pcbY="-6.697599mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="6" pcbX="1.01854mm" pcbY="7.374001mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
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
