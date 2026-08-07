import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2913197.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C2913197 into typescript file", async () => {
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
      pin1: ["GND1"],
      pin2: ["3V3"],
      pin3: ["EN"],
      pin4: ["IO4"],
      pin5: ["IO5"],
      pin6: ["IO6"],
      pin7: ["IO7"],
      pin8: ["IO15"],
      pin9: ["IO16"],
      pin10: ["IO17"],
      pin11: ["IO18"],
      pin12: ["IO8"],
      pin13: ["IO19"],
      pin14: ["IO20"],
      pin15: ["IO3"],
      pin16: ["IO46"],
      pin17: ["IO9"],
      pin18: ["IO10"],
      pin19: ["IO11"],
      pin20: ["IO12"],
      pin21: ["IO13"],
      pin22: ["IO14"],
      pin23: ["IO21"],
      pin24: ["IO47"],
      pin25: ["IO48"],
      pin26: ["IO45"],
      pin27: ["IO0"],
      pin28: ["IO35"],
      pin29: ["IO36"],
      pin30: ["IO37"],
      pin31: ["IO38"],
      pin32: ["IO39"],
      pin33: ["IO40"],
      pin34: ["IO41"],
      pin35: ["IO42"],
      pin36: ["RXD0"],
      pin37: ["TXD0"],
      pin38: ["IO2"],
      pin39: ["IO1"],
      pin40: ["GND2"],
      pin41: ["GND3"],
      pin42: ["pin41_alt1"],
      pin43: ["pin41_alt1"],
      pin44: ["pin41_alt1"],
      pin45: ["pin41_alt1"],
      pin46: ["pin41_alt1"],
      pin47: ["pin41_alt1"],
      pin48: ["pin41_alt1"],
      pin49: ["pin41_alt1"]
    } as const

    export const ESP32_S3_WROOM_1_N4 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2913197"
      ]
    }}
          manufacturerPartNumber="ESP32_S3_WROOM_1_N4"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-8.89977900000008mm" pcbY="9.104642699999886mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-8.89977900000008mm" pcbY="7.834642699999904mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-8.89977900000008mm" pcbY="6.564642699999922mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-8.89977900000008mm" pcbY="5.29464269999994mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-8.89977900000008mm" pcbY="4.0246426999999585mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-8.89977900000008mm" pcbY="2.754642699999863mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-8.89977900000008mm" pcbY="1.4846426999998812mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-8.89977900000008mm" pcbY="0.21464269999989938mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-8.89977900000008mm" pcbY="-1.0553573000000824mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-8.89977900000008mm" pcbY="-2.3253573000000642mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-8.89977900000008mm" pcbY="-3.595357300000046mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-8.89977900000008mm" pcbY="-4.8653573000001415mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-8.89977900000008mm" pcbY="-6.135357300000123mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-8.89977900000008mm" pcbY="-7.405357300000105mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-6.984873000000107mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-5.714873000000125mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-4.444873000000143mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-3.174873000000048mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-1.904873000000066mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-0.6348730000000842mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="0.6351269999998976mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="1.9051269999998794mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="3.1751269999998613mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="4.445126999999957mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="5.715126999999939mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="6.98512699999992mm" pcbY="-8.804643300000066mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="8.89977900000008mm" pcbY="-7.405357300000105mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="8.89977900000008mm" pcbY="-6.135357300000123mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="8.89977900000008mm" pcbY="-4.8653573000001415mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="8.89977900000008mm" pcbY="-3.595357300000046mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="8.89977900000008mm" pcbY="-2.3253573000000642mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="8.89977900000008mm" pcbY="-1.0553573000000824mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="8.89977900000008mm" pcbY="0.21464269999989938mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="8.89977900000008mm" pcbY="1.4846426999998812mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="8.89977900000008mm" pcbY="2.754642699999863mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="8.89977900000008mm" pcbY="4.0246426999999585mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="8.89977900000008mm" pcbY="5.29464269999994mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="8.89977900000008mm" pcbY="6.564642699999922mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="8.89977900000008mm" pcbY="7.834642699999904mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="8.89977900000008mm" pcbY="9.104642699999886mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="-1.4994890000001533mm" pcbY="1.3850746999999046mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="-2.8995370000000094mm" pcbY="1.3850746999999046mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="-0.09944100000006983mm" pcbY="1.3850746999999046mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-0.09944100000006983mm" pcbY="2.7851226999998744mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-1.4994890000001533mm" pcbY="2.7851226999998744mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-2.8995370000000094mm" pcbY="2.7851226999998744mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-2.8995370000000094mm" pcbY="-0.014973300000065137mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-1.4994890000001533mm" pcbY="-0.014973300000065137mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="-0.09944100000006983mm" pcbY="-0.014973300000065137mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
    <via pcbX="-1.4997429999999667mm" pcbY="2.0850986999998895mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-1.4997429999999667mm" pcbY="0.6850506999999197mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-0.09969500000011067mm" pcbY="0.6850506999999197mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-0.09969500000011067mm" pcbY="2.0850986999998895mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-0.7997189999999819mm" pcbY="2.7851226999998744mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-0.7997189999999819mm" pcbY="1.3850746999999046mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-0.7997189999999819mm" pcbY="-0.014973300000065137mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-2.89979100000005mm" pcbY="0.6850506999999197mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-2.89979100000005mm" pcbY="2.0850986999998895mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-2.1997669999999516mm" pcbY="2.7851226999998744mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-2.1997669999999516mm" pcbY="1.3850746999999046mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <via pcbX="-2.1997669999999516mm" pcbY="-0.014973300000065137mm" outerDiameter="0.39999919999999994mm" holeDiameter="0.12499339999999999mm" layers={["top","bottom"]} />
    <silkscreenpath route={[{"x":-8.99998200000016,"y":11.415001299999858},{"x":8.999981999999932,"y":11.415001299999858}]} />
    <silkscreenpath route={[{"x":-8.99998200000016,"y":9.785743699999784},{"x":-8.99998200000016,"y":11.195240499999954}]} />
    <silkscreenpath route={[{"x":-7.666151799999966,"y":-8.904719300000124},{"x":-8.99998200000016,"y":-8.904719300000124},{"x":-8.99998200000016,"y":-8.086534500000198}]} />
    <silkscreenpath route={[{"x":8.999981999999932,"y":-8.086534500000198},{"x":8.999981999999932,"y":-8.904719300000124},{"x":7.666151799999966,"y":-8.904719300000124}]} />
    <silkscreenpath route={[{"x":-8.99998200000016,"y":11.145253299999922},{"x":-8.99998200000016,"y":16.59522969999989},{"x":8.999981999999932,"y":16.59522969999989},{"x":8.999981999999932,"y":9.785743699999784}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=2f67d4cc1ff84f7d9c05d11f6667143a&pn=C2913197",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: 3.84999229999994, z: -8.754641799999956 },
          }}
          {...props}
        />
      )
    }"
  `)
})
