import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C7203002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C7203002 into typescript file", async () => {
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
      pin1: ["GP0"],
      pin2: ["GP1"],
      pin3: ["GND8"],
      pin4: ["GP2"],
      pin5: ["GP3"],
      pin6: ["GP4"],
      pin7: ["GP5"],
      pin8: ["GND6"],
      pin9: ["GP6"],
      pin10: ["GP7"],
      pin11: ["GP8"],
      pin12: ["GP9"],
      pin13: ["GND4"],
      pin14: ["GP10"],
      pin15: ["GP11"],
      pin16: ["GP12"],
      pin17: ["GP13"],
      pin18: ["GND2"],
      pin19: ["GP14"],
      pin20: ["GP15"],
      pin21: ["GP16"],
      pin22: ["GP17"],
      pin23: ["GND1"],
      pin24: ["GP18"],
      pin25: ["GP19"],
      pin26: ["GP20"],
      pin27: ["GP21"],
      pin28: ["GND3"],
      pin29: ["GP22"],
      pin30: ["RUN"],
      pin31: ["GP26"],
      pin32: ["GP27"],
      pin33: ["GND5"],
      pin34: ["GP28"],
      pin35: ["ADC_VREF"],
      pin36: ["3V3_OUT"],
      pin37: ["3V3_EN"],
      pin38: ["GND7"],
      pin39: ["VSYS"],
      pin40: ["VBUS"],
      pin41: ["SWCLK"],
      pin42: ["GND9"],
      pin43: ["SWDIO"],
      pin44: ["TP1"],
      pin45: ["TP2"],
      pin46: ["TP3"],
      pin47: ["TP4"],
      pin48: ["TP5"],
      pin49: ["TP6"]
    } as const

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin8: {requiresGround: true},
      pin13: {requiresGround: true},
      pin18: {requiresGround: true},
      pin23: {requiresGround: true},
      pin28: {requiresGround: true},
      pin33: {requiresGround: true},
      pin38: {requiresGround: true},
      pin40: {requiresPower: true},
      pin42: {requiresGround: true}
    } as const

    export const PICO = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C7203002"
      ]
    }}
          manufacturerPartNumber="PICO"
          footprint={<footprint>
            <smtpad portHints={["pin21"]} pcbX="9.662357mm" pcbY="-23.814875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-10.512355mm" pcbY="-23.814875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="9.662357mm" pcbY="-21.274875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-10.512355mm" pcbY="-21.274875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="9.662357mm" pcbY="-18.734875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-10.512355mm" pcbY="-18.734875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="9.662357mm" pcbY="-16.194875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-10.512355mm" pcbY="-16.194875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="9.662357mm" pcbY="-13.654875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-10.512355mm" pcbY="-13.654875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="9.662357mm" pcbY="-11.114875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-10.512355mm" pcbY="-11.114875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="9.662357mm" pcbY="-8.574875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-10.512355mm" pcbY="-8.574875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="9.662357mm" pcbY="-6.034875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-10.512355mm" pcbY="-6.034875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="9.662357mm" pcbY="-3.494875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-10.512355mm" pcbY="-3.494875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="9.662357mm" pcbY="-0.954875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-10.512355mm" pcbY="-0.954875mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="9.662357mm" pcbY="1.585125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-10.512355mm" pcbY="1.585125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="9.662357mm" pcbY="4.125125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-10.512355mm" pcbY="4.125125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="9.662357mm" pcbY="6.665125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-10.512355mm" pcbY="6.665125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="9.662357mm" pcbY="9.205125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-10.512355mm" pcbY="9.205125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="9.662357mm" pcbY="11.745125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-10.512355mm" pcbY="11.745125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="9.662357mm" pcbY="14.285125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-10.512355mm" pcbY="14.285125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="9.662357mm" pcbY="16.825125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-10.512355mm" pcbY="16.825125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="9.662357mm" pcbY="19.365125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-10.512355mm" pcbY="19.365125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="9.662357mm" pcbY="21.905125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-10.512355mm" pcbY="21.905125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="9.662357mm" pcbY="24.445125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-10.512355mm" pcbY="24.445125mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="-2.964999mm" pcbY="-24.614975mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="-0.424999mm" pcbY="-24.614975mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="2.115001mm" pcbY="-24.614975mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-0.42505mm" pcbY="21.314981mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="0.574999mm" pcbY="24.614975mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-1.424997mm" pcbY="24.614975mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-2.924994mm" pcbY="17.814988mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-2.924994mm" pcbY="15.187968mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="-2.924994mm" pcbY="12.814999mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <silkscreenpath route={[{"x":-10.924978,"y":-24.84609},{"x":-10.924978,"y":-25.184926},{"x":-3.996163,"y":-25.184926}]} />
    <silkscreenpath route={[{"x":3.146038,"y":-25.184926},{"x":10.07498,"y":-25.184926},{"x":10.07498,"y":-24.84609}]} />
    <silkscreenpath route={[{"x":0.606038,"y":-25.184926},{"x":1.083837,"y":-25.184926}]} />
    <silkscreenpath route={[{"x":-1.933962,"y":-25.184926},{"x":-1.456163,"y":-25.184926}]} />
    <silkscreenpath route={[{"x":10.074853,"y":25.47606},{"x":10.074853,"y":25.81482}]} />
    <silkscreenpath route={[{"x":10.07498,"y":25.814998},{"x":-10.924978,"y":25.814998},{"x":-10.924978,"y":25.476162}]} />
    <silkscreenpath route={[{"x":3.574536,"y":27.114843},{"x":3.574536,"y":26.714666},{"x":-4.425347,"y":26.714666},{"x":-4.425347,"y":27.114843}]} />
    <silkscreenpath route={[{"x":-4.234034,"y":26.714666},{"x":-4.234034,"y":25.840296},{"x":-4.259459,"y":25.81482}]} />
    <silkscreenpath route={[{"x":3.377406,"y":26.714666},{"x":3.377406,"y":25.81482}]} />
    <silkscreenpath route={[{"x":3.574536,"y":27.114843},{"x":-4.425347,"y":27.114843}]} />
    <silkscreenpath route={[{"x":10.07498,"y":22.936162},{"x":10.07498,"y":23.41391}]} />
    <silkscreenpath route={[{"x":10.07498,"y":20.396162},{"x":10.07498,"y":20.873911}]} />
    <silkscreenpath route={[{"x":10.07498,"y":17.856162},{"x":10.07498,"y":18.33391}]} />
    <silkscreenpath route={[{"x":10.07498,"y":15.316162},{"x":10.07498,"y":15.79391}]} />
    <silkscreenpath route={[{"x":10.07498,"y":12.776162},{"x":10.07498,"y":13.253911}]} />
    <silkscreenpath route={[{"x":10.07498,"y":10.236162},{"x":10.07498,"y":10.71391}]} />
    <silkscreenpath route={[{"x":10.07498,"y":7.696162},{"x":10.07498,"y":8.173911}]} />
    <silkscreenpath route={[{"x":10.07498,"y":5.156162},{"x":10.07498,"y":5.633911}]} />
    <silkscreenpath route={[{"x":10.07498,"y":2.616162},{"x":10.07498,"y":3.09391}]} />
    <silkscreenpath route={[{"x":10.07498,"y":0.076162},{"x":10.07498,"y":0.553911}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-2.463838},{"x":10.07498,"y":-1.986089}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-5.003838},{"x":10.07498,"y":-4.52609}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-7.543838},{"x":10.07498,"y":-7.066089}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-10.083838},{"x":10.07498,"y":-9.606089}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-12.623838},{"x":10.07498,"y":-12.14609}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-15.163838},{"x":10.07498,"y":-14.686089}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-17.703838},{"x":10.07498,"y":-17.22609}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-20.243838},{"x":10.07498,"y":-19.76609}]} />
    <silkscreenpath route={[{"x":10.07498,"y":-22.783838},{"x":10.07498,"y":-22.306089}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-22.306089},{"x":-10.924978,"y":-22.783838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-19.76609},{"x":-10.924978,"y":-20.243838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-17.22609},{"x":-10.924978,"y":-17.703838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-14.686089},{"x":-10.924978,"y":-15.163838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-12.14609},{"x":-10.924978,"y":-12.623838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-9.606089},{"x":-10.924978,"y":-10.083838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-7.066089},{"x":-10.924978,"y":-7.543838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-4.52609},{"x":-10.924978,"y":-5.003838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":-1.986089},{"x":-10.924978,"y":-2.463838}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":0.553911},{"x":-10.924978,"y":0.076162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":3.09391},{"x":-10.924978,"y":2.616162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":5.633911},{"x":-10.924978,"y":5.156162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":8.173911},{"x":-10.924978,"y":7.696162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":10.71391},{"x":-10.924978,"y":10.236162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":13.253911},{"x":-10.924978,"y":12.776162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":15.79391},{"x":-10.924978,"y":15.316162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":18.33391},{"x":-10.924978,"y":17.856162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":20.873911},{"x":-10.924978,"y":20.396162}]} />
    <silkscreenpath route={[{"x":-10.924978,"y":23.41391},{"x":-10.924978,"y":22.936162}]} />
    <silkscreencircle pcbX="-12.925101mm" pcbY="24.464937mm" radius="0.249936mm" />
    <silkscreencircle pcbX="5.074863mm" pcbY="-23.034841mm" radius="0.8001mm" />
    <silkscreencircle pcbX="5.074863mm" pcbY="-23.034841mm" radius="1.400048mm" />
    <silkscreencircle pcbX="-5.925115mm" pcbY="-23.034841mm" radius="0.8001mm" />
    <silkscreencircle pcbX="-5.925115mm" pcbY="-23.034841mm" radius="1.400048mm" />
    <silkscreencircle pcbX="5.074863mm" pcbY="23.665091mm" radius="1.400048mm" />
    <silkscreencircle pcbX="5.074863mm" pcbY="23.665091mm" radius="0.8001mm" />
    <silkscreencircle pcbX="-5.925115mm" pcbY="23.665091mm" radius="1.400048mm" />
    <silkscreencircle pcbX="-5.925115mm" pcbY="23.665091mm" radius="0.8001mm" />
    <silkscreentext text="{NAME}" pcbX="12.262049mm" pcbY="0.512737mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":9.947929,"y":25.476187},{"x":9.947929,"y":25.814998},{"x":10.074929,"y":25.941998},{"x":10.201929,"y":25.814998},{"x":10.201929,"y":25.476187},{"x":10.074929,"y":25.349187},{"x":9.947929,"y":25.476187}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":-4.386129,"y":25.814998},{"x":-4.379603,"y":25.855174},{"x":-4.360704,"y":25.891223},{"x":-4.360704,"y":26.714996},{"x":-4.323506,"y":26.804799},{"x":-4.233704,"y":26.841996},{"x":-4.143901,"y":26.804799},{"x":-4.106704,"y":26.714996},{"x":-4.106704,"y":25.840373},{"x":-4.116368,"y":25.79178},{"x":-4.143889,"y":25.750584},{"x":-4.169289,"y":25.725184},{"x":-4.210496,"y":25.697645},{"x":-4.259104,"y":25.687972},{"x":-4.348927,"y":25.725175},{"x":-4.386129,"y":25.814998},{"x":-4.386129,"y":25.814998}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":10.074573,"y":25.68782},{"x":-10.798461,"y":25.68782},{"x":-10.798461,"y":25.476035},{"x":-10.925461,"y":25.349035},{"x":-11.052461,"y":25.476035},{"x":-11.052461,"y":25.81482},{"x":-11.015263,"y":25.904623},{"x":-10.925461,"y":25.94182},{"x":10.074573,"y":25.94182},{"x":10.201573,"y":25.81482},{"x":10.074573,"y":25.68782}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":3.504736,"y":26.714996},{"x":3.504736,"y":25.814998},{"x":3.377736,"y":25.687998},{"x":3.250736,"y":25.814998},{"x":3.250736,"y":26.714996},{"x":3.377736,"y":26.841996},{"x":3.504736,"y":26.714996}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":3.574942,"y":26.987995},{"x":-4.425042,"y":26.987995},{"x":-4.552042,"y":27.114995},{"x":-4.425042,"y":27.241995},{"x":3.574942,"y":27.241995},{"x":3.701942,"y":27.114995},{"x":3.574942,"y":26.987995}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":3.701942,"y":27.114995},{"x":3.701942,"y":26.714996},{"x":3.664745,"y":26.625194},{"x":3.574942,"y":26.587996},{"x":-4.425042,"y":26.587996},{"x":-4.514845,"y":26.625194},{"x":-4.552042,"y":26.714996},{"x":-4.552042,"y":27.114995},{"x":-4.425042,"y":27.241995},{"x":-4.298042,"y":27.114995},{"x":-4.298042,"y":26.841996},{"x":3.447942,"y":26.841996},{"x":3.447942,"y":27.114995},{"x":3.574942,"y":27.241995},{"x":3.701942,"y":27.114995}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":11.512049,"y":27.496237},{"x":11.512049,"y":-26.470763},{"x":-13.422751,"y":-26.470763},{"x":-13.422751,"y":27.496237},{"x":11.512049,"y":27.496237}]} />
          </footprint>}
          
          {...props}
        />
      )
    }"
  `)
}, 10000)
