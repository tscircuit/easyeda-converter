import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C393941.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C393941 into typescript file", async () => {
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
    camPos: [20, 7, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["DAT2"],
      pin2: ["CD1","DAT3"],
      pin3: ["CMD"],
      pin4: ["VDD"],
      pin5: ["CLX"],
      pin6: ["VSS"],
      pin7: ["DAT0"],
      pin8: ["DAT1"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"],
      pin13: ["pin13"],
      pin14: ["CD2"]
    } as const

    const pinAttributes = {
      pin4: {requiresPower: true},
      pin6: {requiresGround: true}
    } as const

    export const TF_PUSH = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C393941"
      ]
    }}
          manufacturerPartNumber="TF PUSH"
          footprint={<footprint>
            <hole pcbX="5.700014mm" pcbY="-4.799952mm" diameter="1.1999976mm" />
    <hole pcbX="5.700014mm" pcbY="3.200032mm" diameter="1.1999976mm" />
    <smtpad portHints={["pin8"]} pcbX="-5.299964mm" pcbY="-5.299824mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-5.299964mm" pcbY="-4.200004mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-5.299964mm" pcbY="-3.09993mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-5.299964mm" pcbY="-1.999856mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-5.299964mm" pcbY="-0.900036mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-5.299964mm" pcbY="0.200038mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-5.299964mm" pcbY="1.300112mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-5.299964mm" pcbY="2.400186mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-5.299964mm" pcbY="-6.399898mm" width="1.5999968mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-4.299966mm" pcbY="-7.600048mm" width="1.499997mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="5.299964mm" pcbY="-7.600048mm" width="2.1999956mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="5.299964mm" pcbY="7.900048mm" width="2.1999956mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-4.299966mm" pcbY="7.000126mm" width="1.499997mm" height="1.5999968mm" shape="rect" />
    <silkscreenpath route={[{"x":9.700031,"y":-7.08994},{"x":6.760007,"y":-7.08994}]} />
    <silkscreenpath route={[{"x":-5.299964,"y":4.852149},{"x":-5.299964,"y":2.999981}]} />
    <silkscreenpath route={[{"x":-5.29971,"y":4.852048},{"x":-5.29971,"y":5.639448},{"x":-3.19913,"y":5.639448},{"x":-3.199968,"y":5.650014}]} />
    <silkscreenpath route={[{"x":3.968852,"y":8.130019},{"x":-3.199943,"y":8.130019},{"x":-3.199968,"y":5.640006}]} />
    <silkscreenpath route={[{"x":-3.24993,"y":-7.109981},{"x":3.910076,"y":-7.109981}]} />
    <silkscreenpath route={[{"x":9.700031,"y":-7.08994},{"x":9.700031,"y":8.149984}]} />
    <silkscreenpath route={[{"x":9.700031,"y":8.149984},{"x":6.71002,"y":8.149984}]} />
    <silkscreencircle pcbX="-4.551934mm" pcbY="3.237116mm" radius="0.052324mm" />
    <silkscreentext text="{NAME}" pcbX="-7.10235mm" pcbY="0.142888mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.349962,"y":-8.450047},{"x":-6.349962,"y":8.750046},{"x":9.944012,"y":8.750046},{"x":9.944012,"y":-8.450047},{"x":-6.349962,"y":-8.450047}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C393941.obj?uuid=cd5a60561ab44a95a0b64769461b3210",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C393941.step?uuid=cd5a60561ab44a95a0b64769461b3210",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -2.144027, y: 0.149962, z: -0.0000012000000000345068 },
          }}
          {...props}
        />
      )
    }"
  `)
})
