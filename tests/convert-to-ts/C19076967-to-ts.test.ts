import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19076967.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C19076967 into typescript file", async () => {
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
      pin10: ["pin10"],
      pin11: ["pin11"]
    } as const

    export const MFR01_A1F03L1S_B = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C19076967"
      ]
    }}
          manufacturerPartNumber="MFR01-A1F03L1S-B"
          footprint={<footprint>
            <platedhole  portHints={["pin5"]} pcbX="12.100052mm" pcbY="-0.016891mm" holeWidth="1.5000224mm" holeHeight="4.5000164mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="0deg" shape="pill" />
    <platedhole  portHints={["pin11"]} pcbX="-12.100052mm" pcbY="0.016891mm" holeWidth="1.5000224mm" holeHeight="4.5000164mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="0deg" shape="pill" />
    <platedhole  portHints={["pin9"]} pcbX="-9.798812mm" pcbY="-7.098919mm" holeWidth="1.5000224mm" holeHeight="4.5000164mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="36deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="9.799066mm" pcbY="7.098665mm" holeWidth="1.5000224mm" holeHeight="4.499991mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="36deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="3.755136mm" pcbY="11.502517mm" holeWidth="1.5000224mm" holeHeight="4.499991mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="72deg" shape="pill" />
    <platedhole  portHints={["pin8"]} pcbX="-3.755136mm" pcbY="-11.502517mm" holeWidth="1.5000224mm" holeHeight="4.4999656mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="72deg" shape="pill" />
    <platedhole  portHints={["pin7"]} pcbX="3.723132mm" pcbY="-11.512931mm" holeWidth="1.5000224mm" holeHeight="4.5000164mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="108deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="-3.723132mm" pcbY="11.512931mm" holeWidth="1.5000224mm" holeHeight="4.499991mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="108deg" shape="pill" />
    <platedhole  portHints={["pin6"]} pcbX="9.779254mm" pcbY="-7.125843mm" holeWidth="1.5000224mm" holeHeight="4.499991mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="144deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="-9.779mm" pcbY="7.125335mm" holeWidth="1.5000224mm" holeHeight="4.499991mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="144deg" shape="pill" />
    <platedhole  portHints={["pin10"]} pcbX="0mm" pcbY="-1.425829mm" holeWidth="1.5000224mm" holeHeight="3.999992mm" outerWidth="2.1999956mm" outerHeight="4.99999mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":4.099992,"y":-2.899994},{"x":4.099992,"y":2.899994}]} />
    <silkscreenpath route={[{"x":-12.100001,"y":2.224227},{"x":-12.100001,"y":-2.275789}]} />
    <silkscreenpath route={[{"x":12.09995,"y":-2.275789},{"x":12.09995,"y":2.224227}]} />
    <silkscreencircle pcbX="0mm" pcbY="-0.025781mm" radius="15.999968mm" />
    <silkscreencircle pcbX="0mm" pcbY="-10.999851mm" radius="2.050034mm" />
    <silkscreencircle pcbX="0mm" pcbY="11.000105mm" radius="2.050034mm" />
    <silkscreencircle pcbX="0mm" pcbY="-0.025781mm" radius="12.199874mm" />
    <silkscreencircle pcbX="0mm" pcbY="0.000127mm" radius="4.99999mm" />
    <silkscreencircle pcbX="-14.732mm" pcbY="0.000127mm" radius="0.359156mm" />
    <silkscreentext text="{NAME}" pcbX="-17.0274mm" pcbY="-0.000381mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":4.064,"y":-2.667},{"x":4.064,"y":2.794},{"x":4.29409,"y":2.763708},{"x":4.5085,"y":2.674897},{"x":4.692618,"y":2.533618},{"x":4.833897,"y":2.3495},{"x":4.922708,"y":2.13509},{"x":4.953,"y":1.905},{"x":4.953,"y":0},{"x":4.953,"y":-1.778},{"x":4.922708,"y":-2.00809},{"x":4.833897,"y":-2.2225},{"x":4.692618,"y":-2.406618},{"x":4.5085,"y":-2.547897},{"x":4.29409,"y":-2.636708},{"x":4.064,"y":-2.667}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":-16.094952,"y":-16.275978},{"x":-16.094952,"y":16.223958},{"x":16.094977,"y":16.223958},{"x":16.094977,"y":-16.275978},{"x":-16.094952,"y":-16.275978}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19076967.obj?uuid=b6d9880015ca4fcf86b410816d650f7b",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19076967.step?uuid=b6d9880015ca4fcf86b410816d650f7b",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.000013, y: 0.02601, z: -0.000009000000000369823 },
          }}
          {...props}
        />
      )
    }"
  `)
})
