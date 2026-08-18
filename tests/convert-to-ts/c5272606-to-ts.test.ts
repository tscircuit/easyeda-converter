import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C5272606.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C5272606 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(schematicSvg).toContain("MIPI_AVDD1V8")
  expect(schematicSvg).toContain("VI_CIF_HREF_M0")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "c5272606-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["MIPI_AVDD1V8","GPIO7_VCC1V8"],
      pin2: ["VI_CIF_CLKO_M0","MIPI_CLK0_OUT","GPIO3_C4_d"],
      pin3: ["VI_CIF_VSYNC_M0","GPIO3_C5_d"],
      pin4: ["VI_CIF_D10","PWM7_IR_M2","MIPI_CLK1_OUT","GPIO3_C6_d"],
      pin5: ["VI_CIF_D11","UART5_TX_M2","I2C4_SCL_M2","GPIO3_C7_d"],
      pin6: ["VI_CIF_D13","UART5_RTS_M2","I2C3_SCL_M2","GPIO3_D1_d"],
      pin7: ["VI_CIF_D12","UART5_RX_M2","I2C4_SDA_M2","GPIO3_D0_d"],
      pin8: ["VI_CIF_D14","UART5_CTS_M2","I2C3_SDA_M2","GPIO3_D2_d"],
      pin9: ["VI_CIF_D15","PWM1_M2","GPIO3_D3_d"],
      pin10: ["DVDD_1"],
      pin11: ["SDMMC0_DET","GPIO3_A1_u"],
      pin12: ["SDMMC0_D1","UART2_TX_M0","PWM9_M0","GPIO3_A2_u"],
      pin13: ["GPIO4_VCC"],
      pin14: ["SDMMC0_D0","UART2_RX_M0","PWM8_M0","GPIO3_A3_u"],
      pin15: ["SDMMC0_CLK","UART5_RTS_M0","I2C0_SCL_M2","JTAG_LPMCU_TCK_M1","PWM10_M0","GPIO3_A4_d"],
      pin16: ["SDMMC0_CMD","UART5_CTS_M0","I2C0_SDA_M2","JTAG_LPMCU_TMS_M1","PWM11_IR_M0","GPIO3_A5_u"],
      pin17: ["SDMMC0_D3","UART5_TX_M0","JTAG_CPU_TMS_M0","JTAG_HPMCU_TMS_M1","GPIO3_A6_u"],
      pin18: ["SDMMC0_D2","UART5_RX_M0","JTAG_CPU_TCK_M0","JTAG_HPMCU_TCK_M1","GPIO3_A7_u"],
      pin19: ["RTC_AVDD3V3"],
      pin20: ["RTC_XOUT"],
      pin21: ["RTC_XIN"],
      pin22: ["SARADC_IN1","PWM1_M1","GPI4_C1_z"],
      pin23: ["SARADC_IN0","GPI4_C0_z"],
      pin24: ["SARADC_USB_AVDD1V8"],
      pin25: ["USB_VBUSDET"],
      pin26: ["USB_DM"],
      pin27: ["USB_DP"],
      pin28: ["USB_AVDD3V3"],
      pin29: ["CODEC_LINEOUT"],
      pin30: ["CODEC_VCM"],
      pin31: ["CODEC_AVDD1V8"],
      pin32: ["CODEC_MICBIAS"],
      pin33: ["CODEC_MIC0N"],
      pin34: ["CODEC_MIC0P"],
      pin35: ["CODEC_MIC1N"],
      pin36: ["CODEC_MIC1P"],
      pin37: ["CODEC_AVSS"],
      pin38: ["EMMC_D5","SPI1_CLK_M0","UART1_RX_M2","I2C2_SCL_M1","GPIO4_A7_u"],
      pin39: ["EMMC_D3","FSPI_D3","GPIO4_A6_u"],
      pin40: ["EMMC_D4","SPI1_CS0_M0","UART1_TX_M2","I2C2_SDA_M1","GPIO4_A5_u"],
      pin41: ["EMMC_D0","FSPI_D0","GPIO4_A4_u"],
      pin42: ["EMMC_D1","FSPI_D1","GPIO4_A3_u"],
      pin43: ["GPIO3_VCC"],
      pin44: ["EMMC_D2","FSPI_D2","GPIO4_A2_u"],
      pin45: ["EMMC_D6","SPI1_MOSI_M0","UART0_TX_M2","I2C0_SCL_M1","GPIO4_A1_u"],
      pin46: ["EMMC_D7","SPI1_MISO_M0","UART0_RX_M2","I2C0_SDA_M1","GPIO4_A0_u"],
      pin47: ["EMMC_CMD","FSPI_CS0","GPIO4_B0_u"],
      pin48: ["EMMC_CLK","FSPI_CLK","GPIO4_B1_d"],
      pin49: ["DDR_VDDQ_1"],
      pin50: ["DDR_VDDQ_2"],
      pin51: ["DVDD_2D"],
      pin52: ["RAM_ZQ"],
      pin53: ["DDR_PLL_AVDD1V8"],
      pin54: ["DVDD_3"],
      pin55: ["DVDD_4"],
      pin56: ["DDR_VDDQ_3"],
      pin57: ["TVSS"],
      pin58: ["UART0_RX_M0","CLK_32K","CLK_REFOUT","RTC_CLKO","GPIO0_A0_z"],
      pin59: ["UART0_TX_M0","PWM2_M0","GPIO0_A1_d"],
      pin60: ["PWM3_IR_M0","GPIO0_A2_d"],
      pin61: ["PMU_VCC3V3"],
      pin62: ["PMIC_PWR_CTRL_M1","GPIO0_A3_u"],
      pin63: ["PMIC_PWR_CTRL_M0","PWM1_M0","GPIO0_A4_d"],
      pin64: ["I2C1_SCL_M0","UART1_RTS_M0","PWM5_M0","GPIO0_A5_d"],
      pin65: ["I2C1_SDA_M0","UART1_CTS_M0","PWM6_M0","GPIO0_A6_dn"],
      pin66: ["POR"],
      pin67: ["PMU_DVDD0V9"],
      pin68: ["OSC_XIN"],
      pin69: ["OSC_XOUT"],
      pin70: ["OSC_AVDD1V8","PLL_AVDD1V8"],
      pin71: ["OSC_PLL_DVDD"],
      pin72: ["UART3_TX_M0","I2C2_SCL_M0","PWM7_IR_M0","GPIO1_A0_d"],
      pin73: ["UART3_RX_M0","I2C2_SDA_M0","PWM4_M0","GPIO1_A1_d"],
      pin74: ["PWM0_M0","CPU_AVS","VI_CIF_D0_M1","GPIO1_A2_d"],
      pin75: ["UART1_TX_M0","I2C0_SCL_M0","GPIO1_A3_d"],
      pin76: ["UART1_RX_M0","I2C0_SDA_M0","GPIO1_A4_d"],
      pin77: ["UART4_RX_M0","PWM3_IR_M1","GPIO1_B0_d"],
      pin78: ["UART4_TX_M0","PWM7_IR_M1","SPI1_CS1_M0","VI_CIF_D1_M1","GPIO1_B1_d"],
      pin79: ["JTAG_CPU_TCK_M1","UART2_TX_M1","JTAG_HPMCU_TCK_M0","JTAG_LPMCU_TCK_M0","GPIO1_B2_d"],
      pin80: ["JTAG_CPU_TMS_M1","UART2_RX_M1","JTAG_HPMCU_TMS_M0","JTAG_LPMCU_TMS_M0","GPIO1_B3_u"],
      pin81: ["GPIO1_VCC3V3"],
      pin82: ["DVDD_5"],
      pin83: ["VO_LCDC_D1","VI_CIF_D8_M1","PWM10_M1","UART4_RTS_M1","GPIO1_C6_d"],
      pin84: ["VO_LCDC_D0","VI_CIF_D9_M1","PWM11_IR_M1","UART4_CTS_M1","GPIO1_C7_d"],
      pin85: ["VO_LCDC_CLK","VI_CIF_CLKO_M1","I2C3_SCL_M1","UART5_TX_M1","PWM11_IR_M2","AUD_DSM_N","GPIO1_D3_d"],
      pin86: ["VO_LCDC_VSYNC","VI_CIF_VSYNC_M1","I2C3_SDA_M1","UART5_RX_M1","SPI0_CS1_M0","PWM0_M1","AUD_DSM_P","GPIO1_D2_d"],
      pin87: ["VO_LCDC_HSYNC","VI_CIF_HREF_M1","PWM10_M2","UART5_CTS_M1","UART3_RX_M1","GPIO1_D1_d"],
      pin88: ["GPIO6_VCC"],
      pin89: ["VO_LCDC_DEN","VI_CIF_CLKI_M1","PWM3_IR_M2","UART5_RTS_M1","UART3_TX_M1","GPIO1_D0_d"],
      pin90: ["VO_LCDC_D2","VI_CIF_D7_M1","PWM9_M1","UART4_TX_M1","SDMMC1_D2_M1","GPIO1_C5_d"],
      pin91: ["VO_LCDC_D3","VI_CIF_D6_M1","PWM8_M1","UART4_RX_M1","SDMMC1_D3_M1","GPIO1_C4_d"],
      pin92: ["VO_LCDC_D4","VI_CIF_D5_M1","PWM6_M2","I2C4_SDA_M1","SDMMC1_CMD_M1","SPI0_MISO_M0","GPIO1_C3_d"],
      pin93: ["VO_LCDC_D5","VI_CIF_D4_M1","PWM5_M2","I2C4_SCL_M1","SDMMC1_CLK_M1","SPI0_MOSI_M0","GPIO1_C2_d"],
      pin94: ["VO_LCDC_D6","VI_CIF_D3_M1","PWM4_M2","SPI0_CLK_M0","SDMMC1_D0_M1","GPIO1_C1_d"],
      pin95: ["VO_LCDC_D7","VI_CIF_D2_M1","PWM2_M2","SPI0_CS0_M0","SDMMC1_D1_M1","GPIO1_C0_d"],
      pin96: ["OTP_AVDD1V8","ETH_AVDD1V8","TSADC_AVDD1V8"],
      pin97: ["ETH_PHY_RXN"],
      pin98: ["ETH_PHY_RXP"],
      pin99: ["ETH_PHY_TXN"],
      pin100: ["ETH_PHY_TXP"],
      pin101: ["ETH_AVDD3V3"],
      pin102: ["ETH_EXTR"],
      pin103: ["DVDD_6"],
      pin104: ["UART0_TX_M1","I2C1_SDA_M1","VO_LCDC_D17","PWM6_M1","GPIO2_B1_d"],
      pin105: ["UART0_RX_M1","I2C1_SCL_M1","VO_LCDC_D16","PWM5_M1","GPIO2_ B0"],
      pin106: ["UART0_CTS_M1","I2S0_SDO1_SDI3","VO_LCDC_D15","PWM4_M1","I2C3_SDA_M0","PRELIGHT_TRIG_OUT","GPIO2_A7_d"],
      pin107: ["UART0_RTS_M1","I2S0_SDO2_SDI2","VO_LCDC_D14","PWM2_M1","I2C3_SCL_M0","FLASH_TRIG_OUT","GPIO2_A6_d"],
      pin108: ["GPIO5_VCC"],
      pin109: ["SDMMC1_D1_M0","I2S0_SCLK","VO_LCDC_D8","UART1_CTS_M1","I2C4_SDA_M0","GPIO2_A0_d"],
      pin110: ["SDMMC_D0","I2S0_LRCK","VO_LCDC_D9","UART1_RTS_M1","I2C4_SCL_M0","GPIO2_A1"],
      pin111: ["SDMMC1_CLK_M0","I2S0_MCLK","VO_LCDC_D10","GPIO2_A2_d"],
      pin112: ["SDMMC1_CMD_M0","I2S0_SDO3_SDI1","VO_LCDC_D11","GPIO2_A3_d"],
      pin113: ["SDMMC1_D3_M0","I2S0_SDO0","VO_LCDC_D12","UART1_TX_M1","GPIO2_A4_d"],
      pin114: ["SDMMC1_D2_M0","I2S0_SDI0","VO_LCDC_D13","UART1_RX_M1","GPIO2_A5_d"],
      pin115: ["CPU_DVDD"],
      pin116: ["DVDD_7"],
      pin117: ["VI_CIF_D0_M0","MIPI_CSI_RX_D3N","LVDS_RX_D3N","GPIO3_B0_d"],
      pin118: ["VI_CIF_D1_M0","MIPI_CSI_RX_D3P","LVDS_RX_D3P","GPIO3_B1_d"],
      pin119: ["VI_CIF_D2_M0","MIPI_CSI_RX_CK1N","LVDS_RX_CK1N","GPIO3_B2_d"],
      pin120: ["VI_CIF_D3_M0","MIPI_CSI_RX_CK1P","LVDS_RX_CK1P","GPIO3_B3_d"],
      pin121: ["VI_CIF_D4_M0","MIPI_CSI_RX_D2N","LVDS_RX_D2N","GPIO3_B4_d"],
      pin122: ["VI_CIF_D5_M0","MIPI_CSI_RX_D2P","LVDS_RX_D2P","GPIO3_B5_d"],
      pin123: ["VI_CIF_D6_M0","MIPI_CSI_RX_D1N","LVDS_RX_D1N","GPIO3_B6_d"],
      pin124: ["VI_CIF_D7_M0","MIPI_CSI_RX_D1P","LVDS_RX_D1P","GPIO3_B7_d"],
      pin125: ["VI_CIF_D8_M0","MIPI_CSI_RX_CK0N","LVDS_RX_CK0N","GPIO3_C0_d"],
      pin126: ["VI_CIF_D9_M0","MIPI_CSI_RX_CK0P","LVDS_RX_CK0P","GPIO3_C1_d"],
      pin127: ["VI_CIF_CLKI_M0","MIPI_CSI_RX_D0N","LVDS_RX_D0N","GPIO3_C2_d"],
      pin128: ["VI_CIF_HREF_M0","MIPI_CSI_RX_D0P","LVDS_RX_D0P","GPIO3_C3_d"],
      pin129: ["VSS"]
    } as const

    export const RV1106G2 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5272606"
      ]
    }}
          manufacturerPartNumber="RV1106G2"
          footprint={<footprint>
            <smtpad portHints={["pin129"]} pcbX="-0mm" pcbY="0mm" width="6.999986mm" height="6.999986mm" shape="rect" />
    <smtpad portHints={["pin128"]} pcbX="-5.424932mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin127"]} pcbX="-5.07492mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin126"]} pcbX="-4.724908mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin125"]} pcbX="-4.374896mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin124"]} pcbX="-4.024884mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin123"]} pcbX="-3.674872mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin122"]} pcbX="-3.325114mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin121"]} pcbX="-2.975102mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin120"]} pcbX="-2.62509mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin119"]} pcbX="-2.275078mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin118"]} pcbX="-1.925066mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin117"]} pcbX="-1.575054mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin116"]} pcbX="-1.225042mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin115"]} pcbX="-0.87503mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin114"]} pcbX="-0.525018mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin113"]} pcbX="-0.175006mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin112"]} pcbX="0.175006mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin111"]} pcbX="0.525018mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin110"]} pcbX="0.87503mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin109"]} pcbX="1.225042mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin108"]} pcbX="1.575054mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin107"]} pcbX="1.925066mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin106"]} pcbX="2.275078mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin105"]} pcbX="2.62509mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin104"]} pcbX="2.975102mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin103"]} pcbX="3.325114mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin102"]} pcbX="3.674872mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin101"]} pcbX="4.024884mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin100"]} pcbX="4.374896mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin99"]} pcbX="4.724908mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin98"]} pcbX="5.07492mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin97"]} pcbX="5.424932mm" pcbY="6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin96"]} pcbX="6.057392mm" pcbY="5.424932mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin95"]} pcbX="6.057392mm" pcbY="5.07492mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin94"]} pcbX="6.057392mm" pcbY="4.724908mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin93"]} pcbX="6.057392mm" pcbY="4.374896mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin92"]} pcbX="6.057392mm" pcbY="4.024884mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin91"]} pcbX="6.057392mm" pcbY="3.674872mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin90"]} pcbX="6.057392mm" pcbY="3.325114mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin89"]} pcbX="6.057392mm" pcbY="2.975102mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin88"]} pcbX="6.057392mm" pcbY="2.62509mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin87"]} pcbX="6.057392mm" pcbY="2.275078mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin86"]} pcbX="6.057392mm" pcbY="1.925066mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin85"]} pcbX="6.057392mm" pcbY="1.575054mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin84"]} pcbX="6.057392mm" pcbY="1.225042mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin83"]} pcbX="6.057392mm" pcbY="0.87503mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin82"]} pcbX="6.057392mm" pcbY="0.525018mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin81"]} pcbX="6.057392mm" pcbY="0.175006mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin80"]} pcbX="6.057392mm" pcbY="-0.175006mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin79"]} pcbX="6.057392mm" pcbY="-0.525018mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin78"]} pcbX="6.057392mm" pcbY="-0.87503mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin77"]} pcbX="6.057392mm" pcbY="-1.225042mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin76"]} pcbX="6.057392mm" pcbY="-1.575054mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin75"]} pcbX="6.057392mm" pcbY="-1.925066mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin74"]} pcbX="6.057392mm" pcbY="-2.275078mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin73"]} pcbX="6.057392mm" pcbY="-2.62509mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin72"]} pcbX="6.057392mm" pcbY="-2.975102mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin71"]} pcbX="6.057392mm" pcbY="-3.325114mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin70"]} pcbX="6.057392mm" pcbY="-3.674872mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin69"]} pcbX="6.057392mm" pcbY="-4.024884mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin68"]} pcbX="6.057392mm" pcbY="-4.374896mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin67"]} pcbX="6.057392mm" pcbY="-4.724908mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin66"]} pcbX="6.057392mm" pcbY="-5.07492mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin65"]} pcbX="6.057392mm" pcbY="-5.424932mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin64"]} pcbX="5.424932mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin63"]} pcbX="5.07492mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin62"]} pcbX="4.724908mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="4.374896mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="4.024884mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="3.674872mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="3.325114mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="2.975102mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="2.62509mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="2.275078mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin54"]} pcbX="1.925066mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="1.575054mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="1.225042mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="0.87503mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="0.525018mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="0.175006mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-0.175006mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-0.525018mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-0.87503mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-1.225042mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-1.575054mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="-1.925066mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="-2.275078mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="-2.62509mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="-2.975102mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="-3.325114mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="-3.674872mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="-4.024884mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="-4.374896mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="-4.724908mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="-5.07492mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="-5.424932mm" pcbY="-6.057392mm" width="0.1960118mm" height="0.6649974mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="-6.057392mm" pcbY="-5.424932mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="-6.057392mm" pcbY="-5.07492mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="-6.057392mm" pcbY="-4.724908mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="-6.057392mm" pcbY="-4.374896mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="-6.057392mm" pcbY="-4.024884mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="-6.057392mm" pcbY="-3.674872mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="-6.057392mm" pcbY="-3.325114mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="-6.057392mm" pcbY="-2.975102mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="-6.057392mm" pcbY="-2.62509mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="-6.057392mm" pcbY="-2.275078mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-6.057392mm" pcbY="-1.925066mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="-6.057392mm" pcbY="-1.575054mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-6.057392mm" pcbY="-1.225042mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-6.057392mm" pcbY="-0.87503mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-6.057392mm" pcbY="-0.525018mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-6.057392mm" pcbY="-0.175006mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-6.057392mm" pcbY="0.175006mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-6.057392mm" pcbY="0.525018mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-6.057392mm" pcbY="0.87503mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-6.057392mm" pcbY="1.225042mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-6.057392mm" pcbY="1.575054mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-6.057392mm" pcbY="1.925066mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-6.057392mm" pcbY="2.275078mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-6.057392mm" pcbY="2.62509mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-6.057392mm" pcbY="2.975102mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-6.057392mm" pcbY="3.325114mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-6.057392mm" pcbY="3.674872mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-6.057392mm" pcbY="4.024884mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-6.057392mm" pcbY="4.374896mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-6.057392mm" pcbY="4.724908mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-6.057392mm" pcbY="5.07492mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-6.057392mm" pcbY="5.424932mm" width="0.6649974mm" height="0.1960118mm" shape="rect" />
    <silkscreenpath route={[{"x":-6.226302000000032,"y":5.675376000000028},{"x":-6.226302000000032,"y":6.226175000000012},{"x":-5.675502999999935,"y":6.226175000000012}]} />
    <silkscreenpath route={[{"x":6.226073399999905,"y":5.675376000000028},{"x":6.226073399999905,"y":6.226175000000012},{"x":5.675274400000035,"y":6.226175000000012}]} />
    <silkscreenpath route={[{"x":6.226073399999905,"y":-5.6754013999999415},{"x":6.226073399999905,"y":-6.226174999999898},{"x":5.675274400000035,"y":-6.226174999999898}]} />
    <silkscreenpath route={[{"x":-6.226302000000032,"y":-5.6754013999999415},{"x":-6.226302000000032,"y":-6.226174999999898},{"x":-5.675502999999935,"y":-6.226174999999898}]} />
    <silkscreenpath route={[{"x":-6.428231999999866,"y":5.424932000000126},{"x":-6.432490181340199,"y":5.392587901571574},{"x":-6.444974537339817,"y":5.362448000000086},{"x":-6.464834279768638,"y":5.336566279768817},{"x":-6.490715999999907,"y":5.316706537339996},{"x":-6.520855901571622,"y":5.304222181340265},{"x":-6.553199999999947,"y":5.299964000000045},{"x":-6.585544098428386,"y":5.304222181340265},{"x":-6.6156839999999875,"y":5.316706537339996},{"x":-6.64156572023137,"y":5.336566279768817},{"x":-6.661425462660077,"y":5.362448000000086},{"x":-6.673909818659695,"y":5.392587901571574},{"x":-6.678168000000028,"y":5.424932000000126},{"x":-6.673909818659695,"y":5.457276098428338},{"x":-6.661425462660077,"y":5.487416000000167},{"x":-6.64156572023137,"y":5.513297720231321},{"x":-6.6156839999999875,"y":5.533157462660256},{"x":-6.585544098428386,"y":5.54564181865976},{"x":-6.553199999999947,"y":5.549900000000207},{"x":-6.520855901571622,"y":5.54564181865976},{"x":-6.490715999999907,"y":5.533157462660256},{"x":-6.464834279768638,"y":5.513297720231321},{"x":-6.444974537339817,"y":5.487416000000167},{"x":-6.432490181340199,"y":5.457276098428338},{"x":-6.428231999999866,"y":5.424932000000126}]} />
    <silkscreentext text="{NAME}" pcbX="-0.155702mm" pcbY="7.386576mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.9335020000000895,"y":6.636576000000105},{"x":6.6220979999998235,"y":6.636576000000105},{"x":6.6220979999998235,"y":-6.639624000000026},{"x":-6.9335020000000895,"y":-6.639624000000026},{"x":-6.9335020000000895,"y":6.636576000000105}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5272606.obj?uuid=c1bbd866bce7425ca9a8837b53ffc2ad",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5272606.step?uuid=c1bbd866bce7425ca9a8837b53ffc2ad",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.00012700000002041634, y: 0, z: -0.02 },
          }}
          {...props}
        />
      )
    }"
  `)
})
