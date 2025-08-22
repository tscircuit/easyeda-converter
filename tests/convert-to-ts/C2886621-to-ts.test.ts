import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2886621.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C2886621 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["TRIOUT"],
      pin2: ["SINEIN_POS"],
      pin3: ["pin3"],
      pin4: ["AUX1IN"],
      pin5: ["AUX2IN"],
      pin6: ["HFTRACK"],
      pin7: ["EXPOFREQ"],
      pin8: ["pin8"],
      pin9: ["TRIMIX"],
      pin10: ["SAWMIX"],
      pin11: ["PULSEMIX"],
      pin12: ["AUX1MIX"],
      pin13: ["AUX2MIX"],
      pin14: ["TCAP"],
      pin15: ["DGND"],
      pin16: ["AGND"],
      pin17: ["HARDSYNC"],
      pin18: ["TIMEREVERSE"],
      pin19: ["SOFTSYNC"],
      pin20: ["HFTBASE"],
      pin21: ["LINFREQ"],
      pin22: ["EXPOSCALE"],
      pin23: ["VREF"],
      pin24: ["SINEOUT"],
      pin25: ["MIXOUT"],
      pin26: ["BWCOMP"],
      pin27: ["V_POS"],
      pin28: ["SQUAREOUT"],
      pin29: ["SAWOUT"],
      pin30: ["PULSEOUT"],
      pin31: ["pin31"],
      pin32: ["PWMIN_POS"],
      pin33: ["EP"]
    } as const

    export const SSI2130 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2886621"
      ]
    }}
          manufacturerPartNumber="SSI2130"
          footprint={<footprint>
            <smtpad portHints={["pin9"]} pcbX="-1.4000479999999982mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-0.999998000000005mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-0.5999480000000119mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-0.1998980000000472mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="0.20015199999997435mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="0.5999479999999835mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="0.9999979999999766mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="1.4000479999999413mm" pcbY="-1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="1.4000479999999413mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="0.9999979999999766mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="0.5999479999999835mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="0.20015199999997435mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="-0.1998980000000472mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="-0.5999480000000119mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="-0.999998000000005mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="-1.4000479999999982mm" pcbY="1.9999959999999959mm" width="0.19999959999999997mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="-2.842170943040401e-14mm" pcbY="0mm" width="2.5999947999999997mm" height="2.5999947999999997mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-1.99999600000001mm" pcbY="1.4000480000000124mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-1.99999600000001mm" pcbY="0.9999979999999908mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.99999600000001mm" pcbY="0.5999479999999977mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.99999600000001mm" pcbY="0.19989799999999036mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.99999600000001mm" pcbY="-0.19989800000000457mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.99999600000001mm" pcbY="-0.5999479999999977mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-1.99999600000001mm" pcbY="-0.999998000000005mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-1.99999600000001mm" pcbY="-1.4000479999999982mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="1.9999959999999817mm" pcbY="-1.4000479999999982mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="1.9999959999999817mm" pcbY="-0.999998000000005mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="1.9999959999999817mm" pcbY="-0.5999479999999977mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="1.9999959999999817mm" pcbY="-0.19989800000000457mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="1.9999959999999817mm" pcbY="0.19989799999999036mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="1.9999959999999817mm" pcbY="0.5999479999999977mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="1.9999959999999817mm" pcbY="0.9999979999999908mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="1.9999959999999817mm" pcbY="1.4000480000000124mm" width="0.6999986mm" height="0.19999959999999997mm" shape="rect" />
    <silkscreenpath route={[{"x":2.199944799999969,"y":1.8300700000000063},{"x":2.199944799999969,"y":2.1998940000000005},{"x":1.8301207999999747,"y":2.1998940000000005}]} />
    <silkscreenpath route={[{"x":1.8301207999999747,"y":-2.1998939999999862},{"x":2.199944799999969,"y":-2.1998939999999862},{"x":2.199944799999969,"y":-1.8300700000000063}]} />
    <silkscreenpath route={[{"x":-1.8300192000000095,"y":-2.1998939999999862},{"x":-2.199843200000032,"y":-2.1998939999999862},{"x":-2.199843200000032,"y":-1.8300700000000063}]} />
    <silkscreenpath route={[{"x":-2.199843200000032,"y":1.8300700000000063},{"x":-2.199843200000032,"y":2.1998940000000005},{"x":-1.8300192000000095,"y":2.1998940000000005}]} />
    <silkscreenpath route={[{"x":-2.514549200000033,"y":1.7780000000000058},{"x":-2.514549200000033,"y":1.7780000000000058}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=7b93dc7f04cd4441a3d58b2a0cf77652&pn=C2886621",
            rotationOffset: { x: 180, y: 0, z: 0 },
            positionOffset: { x: -2.842170943040401e-14, y: 0, z: 2.799996 },
          }}
          {...props}
        />
      )
    }"
  `)
})

it("C2886621 should generate Circuit Json without errors", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
