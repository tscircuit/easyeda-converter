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
            <platedhole  portHints={["pin3"]} pcbX="-1.4198600000000567mm" pcbY="-0.00012700000000620548mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="0mm" pcbY="-12.499975000000006mm" outerDiameter="4.9999899999999995mm" holeDiameter="3.2500316000000002mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="-1.4198600000000567mm" pcbY="5.519801000000015mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-1.4198600000000567mm" pcbY="2.7598370000000187mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-1.4198600000000567mm" pcbY="-2.7600910000000027mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-1.4198600000000567mm" pcbY="-5.520054999999999mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="1.420113999999984mm" pcbY="4.139819000000017mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="1.420113999999984mm" pcbY="1.3798550000000205mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="1.420113999999984mm" pcbY="-1.3801090000000045mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="1.420113999999984mm" pcbY="-4.140073000000001mm" outerDiameter="1.5748mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="0mm" pcbY="12.499974999999978mm" outerDiameter="4.9999899999999995mm" holeDiameter="3.2500316000000002mm" shape="circle" />
    <silkscreenpath route={[{"x":9.500107999999983,"y":-15.400070799999995},{"x":-2.9998924000000216,"y":-15.400070799999995},{"x":-2.9998924000000216,"y":15.39991839999999},{"x":9.500107999999983,"y":15.39991839999999},{"x":9.500107999999983,"y":-15.400070799999995}]} />
    <silkscreenpath route={[{"x":14.78010759999998,"y":-0.005080000000006635},{"x":15.480106199999966,"y":-0.005080000000006635}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":8.369934999999998},{"x":15.500121399999955,"y":8.369934999999998},{"x":15.500121399999955,"y":-8.380069600000013},{"x":9.500107999999983,"y":-8.380069600000013}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":10.429925800000007},{"x":15.500121399999955,"y":10.429925800000007}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":14.569922599999984},{"x":15.500121399999955,"y":14.569922599999984},{"x":15.500121399999955,"y":10.45992320000002}]} />
    <silkscreenpath route={[{"x":15.500121399999955,"y":-14.540077600000004},{"x":15.500121399999955,"y":-10.430078200000011},{"x":9.500107999999983,"y":-10.430078200000011}]} />
    <silkscreenpath route={[{"x":9.500107999999983,"y":-14.570074999999989},{"x":15.500121399999955,"y":-14.570074999999989}]} />
    <silkscreentext text="1" pcbX="-1.9786599999999908mm" pcbY="7.348600999999974mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="5" pcbX="-1.8770600000000002mm" pcbY="-6.799198999999987mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="9" pcbX="1.1709400000000016mm" pcbY="-6.697599000000011mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <silkscreentext text="6" pcbX="1.0185400000000016mm" pcbY="7.374001000000021mm" anchorAlignment="bottom_left" fontSize="1.27mm" />
    <courtyardoutline outline={[{"x":-225.98437200000004,"y":-137.7656},{"x":-206.61217200000004,"y":-137.7656},{"x":-206.61217200000004,"y":-106.20139999999998},{"x":-225.98437200000004,"y":-106.20139999999998},{"x":-225.98437200000004,"y":-137.7656}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=dc634ef6f677426f9bef12d13c1b02cd&pn=C75749",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0, y: 0, z: 0.3381490000000005 },
          }}
          {...props}
        />
      )
    }"
  `)
})
