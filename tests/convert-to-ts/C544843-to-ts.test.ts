import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C544843.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C544843 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["C1_POS"],
      pin2: ["V_POS"],
      pin3: ["C1_NEG"],
      pin4: ["C2_POS"],
      pin5: ["C2_NEG"],
      pin6: ["V_NEG"],
      pin7: ["DOUT2"],
      pin8: ["RIN2"],
      pin9: ["ROUT2"],
      pin10: ["DIN2"],
      pin11: ["DIN1"],
      pin12: ["ROUT1"],
      pin13: ["RIN1"],
      pin14: ["DOUT1"],
      pin15: ["GND"],
      pin16: ["VCC"]
    } as const

    const pinAttributes = {
      pin15: {requiresGround: true},
      pin16: {requiresPower: true}
    } as const

    export const MAX3232ECDB = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C544843"
      ]
    }}
          manufacturerPartNumber="MAX3232ECDB"
          footprint={<footprint>
            <smtpad portHints={["pin16"]} pcbX="-2.275078mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="2.275078mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="1.625092mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="0.975106mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="0.32512mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-0.32512mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-0.975106mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-1.625092mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-2.275078mm" pcbY="-3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="-1.625092mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="-0.975106mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="-0.32512mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="2.275078mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="1.625092mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="0.975106mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="0.32512mm" pcbY="3.450082mm" width="0.3999992mm" height="2.0999958mm" radius="0.1999996mm" shape="pill" />
    <silkscreenpath route={[{"x":3.100095400000015,"y":-2.139950000000013},{"x":3.100095400000015,"y":2.152649999999994}]} />
    <silkscreenpath route={[{"x":-3.098799999999983,"y":-0.85090000000001},{"x":-3.098799999999983,"y":-2.139950000000013}]} />
    <silkscreenpath route={[{"x":-3.0998921999999993,"y":0.8501125999999886},{"x":-3.0998921999999993,"y":2.152649999999994}]} />
    <silkscreenpath route={[{"x":-3.0998921999999993,"y":2.152649999999994},{"x":3.100095400000015,"y":2.152649999999994}]} />
    <silkscreenpath route={[{"x":-3.0998921999999993,"y":-2.139950000000013},{"x":3.100095400000015,"y":-2.139950000000013}]} />
    <silkscreenpath route={[{"x":-3.0998921999999993,"y":0.8501125999999886},{"x":-2.861245106215449,"y":0.8147543472352368},{"x":-2.642126756869402,"y":0.713809855606172},{"x":-2.4601671962199987,"y":0.5554010184199996},{"x":-2.3300067093781536,"y":0.3522732530222612},{"x":-2.262117879541563,"y":0.12077001720508918},{"x":-2.261962974376331,"y":-0.12048216913687781},{"x":-2.329554457397734,"y":-0.35207239525480816},{"x":-2.4594539851685795,"y":-0.5553671421011188},{"x":-2.6412099709981476,"y":-0.7140095167224985},{"x":-2.860198509202945,"y":-0.8152353115838764},{"x":-3.098799999999983,"y":-0.85090000000001}]} />
    <silkscreentext text="{NAME}" pcbX="0.00254mm" pcbY="5.29514mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.346260000000001,"y":4.5451400000000035},{"x":3.3513399999999933,"y":4.5451400000000035},{"x":3.3513399999999933,"y":-4.565460000000002},{"x":-3.346260000000001,"y":-4.565460000000002},{"x":-3.346260000000001,"y":4.5451400000000035}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C544843.obj?uuid=e68da2a1e3cb458897aa15108dc78818",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C544843.step?uuid=e68da2a1e3cb458897aa15108dc78818",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: 0.025 },
          }}
          {...props}
        />
      )
    }"
  `)
})
