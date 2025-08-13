import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2913206.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/circuit-json-util"
import type { PcbSmtPadRect } from "circuit-json"

it("should convert C2913206 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  const smtPad1 = su(circuitJson)
    .pcb_smtpad.list()
    .find((smtpad) => smtpad.port_hints?.includes("pin1"))! as PcbSmtPadRect

  expect(smtPad1.width > smtPad1.height).toBeTrue()

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

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
            <smtpad portHints={["pin1"]} pcbX="-6.975094000000013mm" pcbY="5.950076999999965mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-6.975094000000013mm" pcbY="5.10019299999999mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-6.975094000000013mm" pcbY="4.250054999999975mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-6.975094000000013mm" pcbY="3.4001710000000003mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-6.975094000000013mm" pcbY="2.550032999999985mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-6.975094000000013mm" pcbY="1.7001489999998967mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-6.975094000000013mm" pcbY="0.8500109999998813mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-6.975094000000013mm" pcbY="0.0001269999999067295mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-6.975094000000013mm" pcbY="-0.8497570000000678mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-6.975094000000013mm" pcbY="-1.6998950000000832mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-6.975094000000013mm" pcbY="-2.5497790000001714mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-6.975094000000013mm" pcbY="-3.399917000000073mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-6.975094000000013mm" pcbY="-4.249801000000048mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-6.975094000000013mm" pcbY="-5.099939000000063mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-6.975094000000013mm" pcbY="-5.949823000000038mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-5.949950000000058mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-5.1000660000000835mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-4.249928000000068mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-3.4000440000000935mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-2.549906000000078mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="-1.7000220000001036mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-0.8498839999999745mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="0mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="0.8498839999999745mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="1.70002199999999mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="2.5499059999999645mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="3.40004399999998mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="4.249927999999954mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="5.10006599999997mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="5.949949999999944mm" pcbY="-7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="6.975094000000013mm" pcbY="-5.949823000000038mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="6.975094000000013mm" pcbY="-5.099939000000063mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="6.975094000000013mm" pcbY="-4.249801000000048mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="6.975094000000013mm" pcbY="-3.399917000000073mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="6.975094000000013mm" pcbY="-2.5497790000001714mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="6.975094000000013mm" pcbY="-1.6998950000000832mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="6.975094000000013mm" pcbY="-0.8497570000000678mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="6.975094000000013mm" pcbY="0.0001269999999067295mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="6.975094000000013mm" pcbY="0.8500109999998813mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="6.975094000000013mm" pcbY="1.7001489999998967mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="6.975094000000013mm" pcbY="2.550032999999985mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="6.975094000000013mm" pcbY="3.4001710000000003mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="6.975094000000013mm" pcbY="4.250054999999975mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="6.975094000000013mm" pcbY="5.10019299999999mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="6.975094000000013mm" pcbY="5.950076999999965mm" width="0.7999983999999999mm" height="0.39999919999999994mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="5.949949999999944mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="5.10006599999997mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="4.249927999999954mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="3.40004399999998mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="2.5499059999999645mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="1.70002199999999mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="0.8498839999999745mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="0mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin54"]} pcbX="-0.8498839999999745mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="-1.7000220000001036mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="-2.549906000000078mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="-3.4000440000000935mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="-4.249928000000068mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="-5.1000660000000835mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="-5.949950000000058mm" pcbY="7.025004999999965mm" width="0.39999919999999994mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="-6.999986000000149mm" pcbY="7.000113000000056mm" width="0.7999983999999999mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin62"]} pcbX="6.999986000000035mm" pcbY="7.000113000000056mm" width="0.7999983999999999mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin63"]} pcbX="-6.999986000000149mm" pcbY="-6.999859000000129mm" width="0.7999983999999999mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin64"]} pcbX="6.999986000000035mm" pcbY="-6.999859000000129mm" width="0.7999983999999999mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin65"]} pcbX="-1.6499840000000177mm" pcbY="1.6501109999999244mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin66"]} pcbX="0mm" pcbY="1.6501109999999244mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin67"]} pcbX="1.649983999999904mm" pcbY="1.6501109999999244mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin68"]} pcbX="-1.6499840000000177mm" pcbY="0.0001269999999067295mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin69"]} pcbX="0mm" pcbY="0.0001269999999067295mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin70"]} pcbX="1.649983999999904mm" pcbY="0.0001269999999067295mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin71"]} pcbX="-1.6499840000000177mm" pcbY="-1.6498569999999972mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin72"]} pcbX="0mm" pcbY="-1.6498569999999972mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <smtpad portHints={["pin73"]} pcbX="1.649983999999904mm" pcbY="-1.6498569999999972mm" width="1.1999975999999999mm" height="1.1999975999999999mm" shape="rect" />
    <silkscreenpath route={[{"x":-4.8999902000000475,"y":12.100128199999858},{"x":-3.3999932000001536,"y":12.100128199999858},{"x":-3.3999932000001536,"y":10.500131399999987},{"x":-1.1999976000000743,"y":10.500131399999987},{"x":-1.1999976000000743,"y":12.100128199999858},{"x":0.9999979999998914,"y":12.100128199999858},{"x":0.9999979999998914,"y":10.500131399999987},{"x":3.1999935999999707,"y":10.500131399999987},{"x":3.1999935999999707,"y":12.100128199999858},{"x":5.300014799999872,"y":12.100128199999858},{"x":5.300014799999872,"y":9.400133600000004}]} />
    <silkscreenpath route={[{"x":-6.50001240000006,"y":9.400133600000004},{"x":-6.50001240000006,"y":12.100128199999858},{"x":-4.8999902000000475,"y":12.100128199999858},{"x":-4.8999902000000475,"y":9.400133600000004}]} />
    <silkscreenpath route={[{"x":-7.70001000000002,"y":7.749743199999898},{"x":7.800009799999998,"y":7.749743199999898},{"x":7.800009799999998,"y":7.786014399999885}]} />
    <silkscreenpath route={[{"x":-7.70001000000002,"y":12.800126800000044},{"x":7.800009799999998,"y":12.800126800000044},{"x":7.800009799999998,"y":-7.6998830000001135},{"x":-7.70001000000002,"y":-7.6998830000001135},{"x":-7.70001000000002,"y":12.800126800000044}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=1270b5cf7aa247fc9d0ae79a19686940&pn=C2913206",
            rotationOffset: { x: 90, y: 0, z: 0 },
            positionOffset: { x: 0, y: 2.540126999999984, z: 8.22500419999999 },
          }}
          {...props}
        />
      )
    }"
  `)
})
