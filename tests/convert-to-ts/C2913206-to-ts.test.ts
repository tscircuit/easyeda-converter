import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2913206.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2913206 into typescript file", async () => {
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
      pin1: ["GND1"],
      pin2: ["GND2"],
      pin3: ["3V3"],
      pin4: ["IO0"],
      pin5: ["IO1"],
      pin6: ["IO2"],
      pin7: ["IO3"],
      pin8: ["IO4"],
      pin9: ["IO5"],
      pin10: ["IO6"],
      pin11: ["IO7"],
      pin12: ["IO8"],
      pin13: ["IO9"],
      pin14: ["IO10"],
      pin15: ["IO11"],
      pin16: ["IO12"],
      pin17: ["IO13"],
      pin18: ["IO14"],
      pin19: ["IO15"],
      pin20: ["IO16"],
      pin21: ["IO17"],
      pin22: ["IO18"],
      pin23: ["IO19"],
      pin24: ["IO20"],
      pin25: ["IO21"],
      pin26: ["IO26"],
      pin27: ["IO47"],
      pin28: ["IO33"],
      pin29: ["IO34"],
      pin30: ["IO48"],
      pin31: ["IO35"],
      pin32: ["IO36"],
      pin33: ["IO37"],
      pin34: ["IO38"],
      pin35: ["IO39"],
      pin36: ["IO40"],
      pin37: ["IO41"],
      pin38: ["IO42"],
      pin39: ["TXD0"],
      pin40: ["RXD0"],
      pin41: ["IO45"],
      pin42: ["GND3"],
      pin43: ["GND4"],
      pin44: ["IO46"],
      pin45: ["EN"],
      pin46: ["GND5"],
      pin47: ["GND6"],
      pin48: ["GND7"],
      pin49: ["GND8"],
      pin50: ["GND9"],
      pin51: ["GND10"],
      pin52: ["GND11"],
      pin53: ["GND12"],
      pin54: ["GND13"],
      pin55: ["GND14"],
      pin56: ["GND15"],
      pin57: ["GND16"],
      pin58: ["GND17"],
      pin59: ["GND18"],
      pin60: ["GND19"],
      pin61: ["GND20"],
      pin62: ["GND21"],
      pin63: ["GND22"],
      pin64: ["GND23"],
      pin65: ["GND24"],
      pin66: ["GND25"],
      pin67: ["GND26"],
      pin68: ["GND27"],
      pin69: ["GND28"],
      pin70: ["GND29"],
      pin71: ["GND30"],
      pin72: ["GND31"],
      pin73: ["GND32"]
    } as const

    export const ESP32_S3_MINI_1_N8 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2913206"
      ]
    }}
          manufacturerPartNumber="ESP32_S3_MINI_1_N8"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-6.975094mm" pcbY="5.950077mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-6.975094mm" pcbY="5.100193mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-6.975094mm" pcbY="4.250055mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-6.975094mm" pcbY="3.400171mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-6.975094mm" pcbY="2.550033mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-6.975094mm" pcbY="1.700149mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-6.975094mm" pcbY="0.850011mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-6.975094mm" pcbY="0.000127mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-6.975094mm" pcbY="-0.849757mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-6.975094mm" pcbY="-1.699895mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-6.975094mm" pcbY="-2.549779mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-6.975094mm" pcbY="-3.399917mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-6.975094mm" pcbY="-4.249801mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-6.975094mm" pcbY="-5.099939mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-6.975094mm" pcbY="-5.949823mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-5.94995mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-5.100066mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-4.249928mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-3.400044mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-2.549906mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="-1.700022mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-0.849884mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="0mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="0.849884mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="1.700022mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="2.549906mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="3.400044mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="4.249928mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="5.100066mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="5.94995mm" pcbY="-7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="6.975094mm" pcbY="-5.949823mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="6.975094mm" pcbY="-5.099939mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="6.975094mm" pcbY="-4.249801mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="6.975094mm" pcbY="-3.399917mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="6.975094mm" pcbY="-2.549779mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="6.975094mm" pcbY="-1.699895mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="6.975094mm" pcbY="-0.849757mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="6.975094mm" pcbY="0.000127mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="6.975094mm" pcbY="0.850011mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="6.975094mm" pcbY="1.700149mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="6.975094mm" pcbY="2.550033mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="6.975094mm" pcbY="3.400171mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="6.975094mm" pcbY="4.250055mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="6.975094mm" pcbY="5.100193mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="6.975094mm" pcbY="5.950077mm" width="0.7999984mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="5.94995mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="5.100066mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="4.249928mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="3.400044mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="2.549906mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="1.700022mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="0.849884mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="0mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin54"]} pcbX="-0.849884mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="-1.700022mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="-2.549906mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="-3.400044mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="-4.249928mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="-5.100066mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="-5.94995mm" pcbY="7.025005mm" width="0.3999992mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="-6.999986mm" pcbY="7.000113mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin62"]} pcbX="6.999986mm" pcbY="7.000113mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin63"]} pcbX="-6.999986mm" pcbY="-6.999859mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin64"]} pcbX="6.999986mm" pcbY="-6.999859mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
    <smtpad portHints={["pin65"]} pcbX="-1.649984mm" pcbY="1.650111mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin66"]} pcbX="0mm" pcbY="1.650111mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin67"]} pcbX="1.649984mm" pcbY="1.650111mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin68"]} pcbX="-1.649984mm" pcbY="0.000127mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin69"]} pcbX="0mm" pcbY="0.000127mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin70"]} pcbX="1.649984mm" pcbY="0.000127mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin71"]} pcbX="-1.649984mm" pcbY="-1.649857mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin72"]} pcbX="0mm" pcbY="-1.649857mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin73"]} pcbX="1.649984mm" pcbY="-1.649857mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
    <silkscreenpath route={[{"x":-4.8999902000000475,"y":12.100128199999858},{"x":-3.3999932000001536,"y":12.100128199999858},{"x":-3.3999932000001536,"y":10.500131399999987},{"x":-1.1999976000000743,"y":10.500131399999987},{"x":-1.1999976000000743,"y":12.100128199999858},{"x":0.9999979999998914,"y":12.100128199999858},{"x":0.9999979999998914,"y":10.500131399999987},{"x":3.1999935999999707,"y":10.500131399999987},{"x":3.1999935999999707,"y":12.100128199999858},{"x":5.300014799999872,"y":12.100128199999858},{"x":5.300014799999872,"y":9.400133600000004}]} />
    <silkscreenpath route={[{"x":-6.50001240000006,"y":9.400133600000004},{"x":-6.50001240000006,"y":12.100128199999858},{"x":-4.8999902000000475,"y":12.100128199999858},{"x":-4.8999902000000475,"y":9.400133600000004}]} />
    <silkscreenpath route={[{"x":-7.70001000000002,"y":7.749743199999898},{"x":7.800009799999998,"y":7.749743199999898},{"x":7.800009799999998,"y":7.786014399999885}]} />
    <silkscreenpath route={[{"x":-7.70001000000002,"y":12.800126800000044},{"x":7.800009799999998,"y":12.800126800000044},{"x":7.800009799999998,"y":-7.6998830000001135},{"x":-7.70001000000002,"y":-7.6998830000001135},{"x":-7.70001000000002,"y":12.800126800000044}]} />
    <silkscreentext text="{NAME}" pcbX="-0.2667mm" pcbY="13.801727mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.58120000000008,"y":13.051726999999914},{"x":8.047799999999825,"y":13.051726999999914},{"x":8.047799999999825,"y":-7.971473000000174},{"x":-8.58120000000008,"y":-7.971473000000174},{"x":-8.58120000000008,"y":13.051726999999914}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2913206.obj?uuid=1270b5cf7aa247fc9d0ae79a19686940",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2913206.step?uuid=1270b5cf7aa247fc9d0ae79a19686940",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -2.5401143000000275, z: -0.02 },
          }}
          {...props}
        />
      )
    }"
  `)
})
