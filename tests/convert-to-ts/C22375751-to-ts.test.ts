import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C22375751.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C22375751 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["GPIO1"],
      pin2: ["GPIO2"],
      pin3: ["GPIO3"],
      pin4: ["GPIO4"],
      pin5: ["GPIO5"],
      pin6: ["GPIO6"],
      pin7: ["GPIO7"],
      pin8: ["GPIO8"],
      pin9: ["VDDPST_1"],
      pin10: ["GPIO9"],
      pin11: ["GPIO10"],
      pin12: ["GPIO11"],
      pin13: ["GPIO12"],
      pin14: ["GPIO13"],
      pin15: ["GPIO14"],
      pin16: ["GPIO15"],
      pin17: ["GPIO16"],
      pin18: ["GPIO17"],
      pin19: ["GPIO18"],
      pin20: ["GPIO19"],
      pin21: ["VDDPST_2"],
      pin22: ["GPIO20"],
      pin23: ["GPIO21"],
      pin24: ["GPIO22"],
      pin25: ["GPIO23"],
      pin26: ["VDD_HP_0"],
      pin27: ["FLASH_CS"],
      pin28: ["FLASH_Q"],
      pin29: ["FLASH_WP"],
      pin30: ["VDDPST_3"],
      pin31: ["FLASH_HOLD"],
      pin32: ["FLASH_CK"],
      pin33: ["FLASH_D"],
      pin34: ["DSI_REXT"],
      pin35: ["DSI_DATAP1"],
      pin36: ["DSI_DATAN1"],
      pin37: ["DSI_CLKN"],
      pin38: ["DSI_CLKP"],
      pin39: ["DSI_DATAP0"],
      pin40: ["DSI_DATAN0"],
      pin41: ["VDD_MIPI_DPHY"],
      pin42: ["CSI_DATAN0"],
      pin43: ["CSI_DATAP0"],
      pin44: ["CSI_CLKP"],
      pin45: ["CSI_CLKN"],
      pin46: ["CSI_DATAN1"],
      pin47: ["CSI_DATAP1"],
      pin48: ["CSI_REXT"],
      pin49: ["DM"],
      pin50: ["DP"],
      pin51: ["VCCA"],
      pin52: ["GPIO24"],
      pin53: ["GPIO25"],
      pin54: ["NC"],
      pin55: ["GPIO26"],
      pin56: ["GPIO27"],
      pin57: ["GPIO28"],
      pin58: ["GPIO29"],
      pin59: ["VDDPST1"],
      pin60: ["GPIO30"],
      pin61: ["GPIO31"],
      pin62: ["VDDPST_4"],
      pin63: ["GPIO32"],
      pin64: ["GPIO33"],
      pin65: ["GPIO34"],
      pin66: ["GPIO35"],
      pin67: ["VDDPST2"],
      pin68: ["GPIO36"],
      pin69: ["GPIO37"],
      pin70: ["GPIO38"],
      pin71: ["pin71"],
      pin72: ["pin72"],
      pin73: ["pin73"],
      pin74: ["pin74"],
      pin75: ["VDDPST_LDO"],
      pin76: ["VDD_HP_2"],
      pin77: ["VDDPST_DCDC"],
      pin78: ["FB_DCDC"],
      pin79: ["EN_DCDC"],
      pin80: ["GPIO39"],
      pin81: ["GPIO40"],
      pin82: ["GPIO41"],
      pin83: ["GPIO42"],
      pin84: ["GPIO43"],
      pin85: ["VDDPST_5"],
      pin86: ["GPIO44"],
      pin87: ["GPIO45"],
      pin88: ["GPIO46"],
      pin89: ["GPIO47"],
      pin90: ["GPIO48"],
      pin91: ["VDD_HP_3"],
      pin92: ["GPIO49"],
      pin93: ["GPIO50"],
      pin94: ["GPIO51"],
      pin95: ["GPIO52"],
      pin96: ["VDDPST_6"],
      pin97: ["GPIO53"],
      pin98: ["GPIO54"],
      pin99: ["XTAL_N"],
      pin100: ["XTAL_P"],
      pin101: ["VDDA"],
      pin102: ["VBAT"],
      pin103: ["CHIP_PU"],
      pin104: ["GPIO0"],
      pin105: ["GND"]
    } as const

    const pinAttributes = {
      pin54: {doNotConnect: true},
      pin101: {requiresPower: true},
      pin105: {requiresGround: true}
    } as const

    export const ESP32_P4 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C22375751"
      ]
    }}
          manufacturerPartNumber="ESP32-P4"
          footprint={<footprint>
            <smtpad portHints={["pin105"]} pcbX="0mm" pcbY="0mm" width="7.499985mm" height="7.499985mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="-4.024884mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="-4.374896mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-4.99999mm" pcbY="4.374896mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-4.99999mm" pcbY="4.024884mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-4.99999mm" pcbY="3.674872mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-4.99999mm" pcbY="3.32486mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-4.99999mm" pcbY="2.975102mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-4.99999mm" pcbY="2.62509mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-4.99999mm" pcbY="2.275078mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-4.99999mm" pcbY="1.925066mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-4.99999mm" pcbY="1.575054mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-4.99999mm" pcbY="1.225042mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-4.99999mm" pcbY="0.87503mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-4.99999mm" pcbY="0.525018mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-4.99999mm" pcbY="0.175006mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-4.99999mm" pcbY="-0.175006mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-4.99999mm" pcbY="-0.525018mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-4.99999mm" pcbY="-0.87503mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-4.99999mm" pcbY="-1.225042mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-4.99999mm" pcbY="-1.575054mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-4.99999mm" pcbY="-1.925066mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-4.99999mm" pcbY="-2.275078mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="-4.99999mm" pcbY="-2.62509mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-4.99999mm" pcbY="-2.975102mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="-4.99999mm" pcbY="-3.325114mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="-4.99999mm" pcbY="-3.675126mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="-4.99999mm" pcbY="-4.024884mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="-4.99999mm" pcbY="-4.374896mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="-3.674872mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="-3.32486mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="-2.975102mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="-2.62509mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="-2.275078mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="-1.925066mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="-1.575054mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="-1.225042mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="-0.87503mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="-0.525018mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="-0.175006mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="0.175006mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="0.525018mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="0.87503mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="1.225042mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="1.575054mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="1.925066mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="2.275078mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="2.62509mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="2.975102mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="3.325114mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="3.675126mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="4.024884mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="4.374896mm" pcbY="-4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="4.99999mm" pcbY="-4.374896mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin54"]} pcbX="4.99999mm" pcbY="-4.024884mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="4.99999mm" pcbY="-3.674872mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="4.99999mm" pcbY="-3.32486mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="4.99999mm" pcbY="-2.975102mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="4.99999mm" pcbY="-2.62509mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="4.99999mm" pcbY="-2.275078mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="4.99999mm" pcbY="-1.925066mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="4.99999mm" pcbY="-1.575054mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin62"]} pcbX="4.99999mm" pcbY="-1.225042mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin63"]} pcbX="4.99999mm" pcbY="-0.87503mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin64"]} pcbX="4.99999mm" pcbY="-0.525018mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin65"]} pcbX="4.99999mm" pcbY="-0.175006mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin66"]} pcbX="4.99999mm" pcbY="0.175006mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin67"]} pcbX="4.99999mm" pcbY="0.525018mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin68"]} pcbX="4.99999mm" pcbY="0.87503mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin69"]} pcbX="4.99999mm" pcbY="1.225042mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin70"]} pcbX="4.99999mm" pcbY="1.575054mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin71"]} pcbX="4.99999mm" pcbY="1.925066mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin72"]} pcbX="4.99999mm" pcbY="2.275078mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin73"]} pcbX="4.99999mm" pcbY="2.62509mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin74"]} pcbX="4.99999mm" pcbY="2.975102mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin75"]} pcbX="4.99999mm" pcbY="3.325114mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin76"]} pcbX="4.99999mm" pcbY="3.675126mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin77"]} pcbX="4.99999mm" pcbY="4.024884mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin78"]} pcbX="4.99999mm" pcbY="4.374896mm" width="0.6500114mm" height="0.1500124mm" shape="rect" />
    <smtpad portHints={["pin79"]} pcbX="4.374896mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin80"]} pcbX="4.024884mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin81"]} pcbX="3.674872mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin82"]} pcbX="3.32486mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin83"]} pcbX="2.975102mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin84"]} pcbX="2.62509mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin85"]} pcbX="2.275078mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin86"]} pcbX="1.925066mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin87"]} pcbX="1.575054mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin88"]} pcbX="1.225042mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin89"]} pcbX="0.87503mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin90"]} pcbX="0.525018mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin91"]} pcbX="0.175006mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin92"]} pcbX="-0.175006mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin93"]} pcbX="-0.525018mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin94"]} pcbX="-0.87503mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin95"]} pcbX="-1.225042mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin96"]} pcbX="-1.575054mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin97"]} pcbX="-1.925066mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin98"]} pcbX="-2.275078mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin99"]} pcbX="-2.62509mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin100"]} pcbX="-2.975102mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin101"]} pcbX="-3.325114mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin102"]} pcbX="-3.675126mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin103"]} pcbX="-4.024884mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin104"]} pcbX="-4.374896mm" pcbY="4.99999mm" width="0.1500124mm" height="0.6500114mm" shape="rect" />
    <silkscreenpath route={[{"x":-5.076189999999997,"y":4.625390800000005},{"x":-5.076189999999997,"y":5.076190000000011},{"x":-4.625390800000005,"y":5.076190000000011}]} />
    <silkscreenpath route={[{"x":5.076190000000011,"y":4.625390800000005},{"x":5.076190000000011,"y":5.076190000000011},{"x":4.625390799999991,"y":5.076190000000011}]} />
    <silkscreenpath route={[{"x":5.076190000000011,"y":-4.625390800000005},{"x":5.076190000000011,"y":-5.076189999999983},{"x":4.625390799999991,"y":-5.076189999999983}]} />
    <silkscreenpath route={[{"x":-5.076189999999997,"y":-4.625390800000005},{"x":-5.076189999999997,"y":-5.076189999999983},{"x":-4.625390800000005,"y":-5.076189999999983}]} />
    <silkscreencircle pcbX="-5.842mm" pcbY="4.572mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.3302mm" pcbY="6.334mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.244400000000013,"y":5.584000000000003},{"x":5.583999999999989,"y":5.584000000000003},{"x":5.583999999999989,"y":-5.558599999999998},{"x":-6.244400000000013,"y":-5.558599999999998},{"x":-6.244400000000013,"y":5.584000000000003}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22375751.obj?uuid=497d609d215940218ebe839e7686d01e",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22375751.step?uuid=497d609d215940218ebe839e7686d01e",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000012699999984988608, y: -0.000012699999999199463, z: -0.02 },
          }}
          {...props}
        />
      )
    }"
  `)
})
