import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2838502.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2838502 into typescript file", async () => {
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
    camPos: [20, 20, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["GND1"],
      pin2: ["GND2"],
      pin3: ["3V3"],
      pin4: ["NC1"],
      pin5: ["IO2"],
      pin6: ["IO3"],
      pin7: ["NC2"],
      pin8: ["EN"],
      pin9: ["NC3"],
      pin10: ["NC4"],
      pin11: ["GND3"],
      pin12: ["IO0"],
      pin13: ["IO1"],
      pin14: ["GND4"],
      pin15: ["NC5"],
      pin16: ["IO10"],
      pin17: ["NC6"],
      pin18: ["IO4"],
      pin19: ["IO5"],
      pin20: ["IO6"],
      pin21: ["IO7"],
      pin22: ["IO8"],
      pin23: ["IO9"],
      pin24: ["NC7"],
      pin25: ["NC8"],
      pin26: ["IO18"],
      pin27: ["IO19"],
      pin28: ["NC9"],
      pin29: ["NC10"],
      pin30: ["RXD0"],
      pin31: ["TXD0"],
      pin32: ["NC11"],
      pin33: ["NC12"],
      pin34: ["NC13"],
      pin35: ["NC14"],
      pin36: ["GND5"],
      pin37: ["GND6"],
      pin38: ["GND7"],
      pin39: ["GND8"],
      pin40: ["GND9"],
      pin41: ["GND10"],
      pin42: ["GND11"],
      pin43: ["GND12"],
      pin44: ["GND13"],
      pin45: ["GND14"],
      pin46: ["GND15"],
      pin47: ["GND16"],
      pin48: ["GND17"],
      pin49: ["GND22"],
      pin50: ["GND18"],
      pin51: ["GND19"],
      pin52: ["GND20"],
      pin53: ["GND21"],
      pin54: ["pin49_alt1"],
      pin55: ["pin49_alt1"],
      pin56: ["pin49_alt1"],
      pin57: ["pin49_alt1"],
      pin58: ["pin49_alt1"],
      pin59: ["pin49_alt1"],
      pin60: ["pin49_alt1"],
      pin61: ["pin49_alt1"]
    } as const

    export const ESP32_C3_MINI_1_N4 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2838502"
      ]
    }}
          manufacturerPartNumber="ESP32_C3_MINI_1_N4"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-5.899912mm" pcbY="3.999992mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-5.899912mm" pcbY="3.199892mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-5.899912mm" pcbY="2.400046mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-5.899912mm" pcbY="1.599946mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-5.899912mm" pcbY="0.8001mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-5.899912mm" pcbY="0mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-5.899912mm" pcbY="-0.8001mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-5.899912mm" pcbY="-1.599946mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-5.899912mm" pcbY="-2.400046mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-5.899912mm" pcbY="-3.199892mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-5.899912mm" pcbY="-3.999992mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-4.800092mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-3.999992mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-3.199892mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-2.400046mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-1.599946mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-0.8001mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="0mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="0.8001mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="1.599946mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="2.400046mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="3.199892mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="3.999992mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="4.800092mm" pcbY="-4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="5.899912mm" pcbY="-3.999992mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="5.899912mm" pcbY="-3.199892mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="5.899912mm" pcbY="-2.400046mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="5.899912mm" pcbY="-1.599946mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="5.899912mm" pcbY="-0.8001mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="5.899912mm" pcbY="0mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="5.899912mm" pcbY="0.8001mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="5.899912mm" pcbY="1.599946mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="5.899912mm" pcbY="2.400046mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="5.899912mm" pcbY="3.199892mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="5.899912mm" pcbY="3.999992mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="4.800092mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="3.999992mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="3.199892mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="2.400046mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="1.599946mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="0.8001mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="0mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="-0.8001mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-1.599946mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-2.400046mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-3.199892mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-3.999992mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-4.800092mm" pcbY="4.899914mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="5.94995mm" pcbY="4.949952mm" width="0.6999986mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="5.94995mm" pcbY="-4.949952mm" width="0.6999986mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="-5.94995mm" pcbY="-4.949952mm" width="0.6999986mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="-5.94995mm" pcbY="4.949952mm" width="0.6999986mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin49"]} points={[{x: "-2.7001216mm", y: "2.099945mm"}, {x: "-2.1001228mm", y: "2.6999438mm"}, {x: "-1.2501372mm", y: "2.6999438mm"}, {x: "-1.2501372mm", y: "1.2499594mm"}, {x: "-2.7001216mm", y: "1.2499594mm"}]} shape="polygon" />
    <smtpad portHints={["pin54"]} pcbX="1.97485mm" pcbY="-1.975104mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="0mm" pcbY="-1.975104mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="-1.975104mm" pcbY="-1.975104mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="-1.975104mm" pcbY="0mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="0mm" pcbY="1.97485mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="1.97485mm" pcbY="1.97485mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="1.97485mm" pcbY="0mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="0mm" pcbY="0mm" width="1.4500098mm" height="1.4500098mm" shape="rect" />
    <silkscreenpath route={[{"x":6.600012199999924,"y":-5.5999888000000055},{"x":6.6000375999999505,"y":11.000054200000022}]} />
    <silkscreenpath route={[{"x":6.6000375999999505,"y":5.599988800000119},{"x":-6.6000375999999505,"y":5.599988800000119}]} />
    <silkscreenpath route={[{"x":-6.6000375999999505,"y":11.000028799999995},{"x":6.6000375999999505,"y":11.000028799999995}]} />
    <silkscreenpath route={[{"x":-6.600012200000037,"y":-5.5999888000000055},{"x":-6.6000375999999505,"y":11.000028799999995}]} />
    <silkscreenpath route={[{"x":-6.600012200000037,"y":-5.5999888000000055},{"x":6.600012199999924,"y":-5.5999888000000055}]} />
    <silkscreentext text="{NAME}" pcbX="-0.3429mm" pcbY="12.0998mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-7.641399999999976,"y":11.349800000000073},{"x":6.955600000000004,"y":11.349800000000073},{"x":6.955600000000004,"y":-5.939599999999928},{"x":-7.641399999999976,"y":-5.939599999999928},{"x":-7.641399999999976,"y":11.349800000000073}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2838502.obj?uuid=789e2235438340f8bef14c336f136f9e",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2838502.step?uuid=789e2235438340f8bef14c336f136f9e",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -2.7150060000000167, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
