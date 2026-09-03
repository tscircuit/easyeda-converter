import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C472489.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C472489 into typescript file", async () => {
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
      pin1: ["P4_3","UCA0SOMI1","UCA0RXD1","UCB1STE1","S4"],
      pin2: ["P1_4","UCB0CLK","UCA0STE1","TA1_01","S3"],
      pin3: ["P1_5","UCB0STE","UCA0CLK1","TA0_01","S2"],
      pin4: ["P1_6","UCB0SIMO","UCB0SDA","TA0_11","S1"],
      pin5: ["P1_7","UCB0SOMI","UCB0SCL","TA0_21","S0"],
      pin6: ["R33","LCDCAP"],
      pin7: ["P6_0","R23"],
      pin8: ["P6_1","R13","LCDREF"],
      pin9: ["P6_2","COUT1","R03"],
      pin10: ["P6_3","COM0"],
      pin11: ["P6_4","TB0_01","COM1","S30"],
      pin12: ["P6_5","TB0_11","COM2","S29"],
      pin13: ["P6_6","TB0_21","COM3","S28"],
      pin14: ["P3_0","UCB1CLK1","TA3_2","S27"],
      pin15: ["P3_1","UCB1SIMO1","UCB1SDA1","TA3_3","S26"],
      pin16: ["P3_2","UCB1SOMI1","UCB1SCL1","TA3_4","S25"],
      pin17: ["DVSS1"],
      pin18: ["DVCC1"],
      pin19: ["TEST","SBWTCK"],
      pin20: ["N_RST","NMI","SBWTDIO"],
      pin21: ["PJ_0","TDO","TB0OUTH1","SMCLK1","SRSCG1"],
      pin22: ["PJ_1","TDI","TCLK","MCLK","SRSCG0"],
      pin23: ["PJ_2","TMS","ACLK1","SROSCOFF"],
      pin24: ["PJ_3","TCK","COUT2","SRCPUOFF"],
      pin25: ["P3_3","TA1_11","TBOCLK1","S24"],
      pin26: ["P3_4","UCA1SIMO","UCA1TXD","TB0_02","S23"],
      pin27: ["P3_5","UCA1SOMI","UCA1RXD","TB0_12","S22"],
      pin28: ["P3_6","UCA1CLK","TB0_22","S21"],
      pin29: ["P3_7","UCA1STE1","TB0_3","S20"],
      pin30: ["P2_3","UCA0STE2","TB0OUTH2","S19"],
      pin31: ["P2_2","UCA0CLK2","TB0_4","RTCCLK1","S18"],
      pin32: ["P2_1","UCA0SOMI2","UCA0RXD2","TB0_5","DMAE01","S17"],
      pin33: ["P2_0","UCA0SIMO1","UCA0TXD1","TB0_6","TB0CLK","S16"],
      pin34: ["P7_0","TA0CLK1","S15"],
      pin35: ["P7_1","TA0_02","ACLK2","S14"],
      pin36: ["P7_2","TA0_12","S13"],
      pin37: ["P7_3","TA0_22","S12"],
      pin38: ["P7_4","SMCLK2","S11"],
      pin39: ["DVSS2"],
      pin40: ["DVCC2"],
      pin41: ["P1_3","TA1_21","A3","C3"],
      pin42: ["P1_2","TA1_12","TA0CLK2","COUT3","A2","C2"],
      pin43: ["P1_1","TA0_23","TA1CLK1","COUT4","A1","C1","VREF_POS","VeREF_POS"],
      pin44: ["P1_0","TA0_13","DMAE02","RTCCLK2","A0","C0","VREF_NEG","VeREF_NEG"],
      pin45: ["P9_4","A12","C12"],
      pin46: ["P9_5","A13","C13"],
      pin47: ["P9_6","A14","C14"],
      pin48: ["P9_7","A15","C15"],
      pin49: ["AVCC1"],
      pin50: ["AVSS1"],
      pin51: ["PJ_4","LFXIN"],
      pin52: ["PJ_5","LFXOUT"],
      pin53: ["AVSS2"],
      pin54: ["PJ_7","HFXOUT"],
      pin55: ["PJ_6","HFXIN"],
      pin56: ["AVSS3"],
      pin57: ["P5_7","UCA1STE2","TBOCLK2","S10"],
      pin58: ["P4_4","UCB1STE2","TA1CLK2","S9"],
      pin59: ["P4_5","UCB1CLK2","TA1_02","S8"],
      pin60: ["P4_6","UCB1SIMO2","UCB1SDA2","TA1_13","S7"],
      pin61: ["P4_7","UCB1SOMI2","UCB1SCL2","TA1_22","S6"],
      pin62: ["DVSS3"],
      pin63: ["DVCC3"],
      pin64: ["P4_2","UCA0SIMO2","UCA0TXD2","UCB1CLK3","S5"]
    } as const

    export const MSP430FR6972IPMR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C472489"
      ]
    }}
          manufacturerPartNumber="MSP430FR6972IPMR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-3.750056mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-3.24993mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-2.750058mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-2.249932mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-1.75006mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-1.249934mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.750062mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-0.249936mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="0.249936mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="0.750062mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="1.249934mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="1.75006mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="2.249932mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="2.750058mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="3.24993mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="3.750056mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="5.700014mm" pcbY="-3.738245mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="5.700014mm" pcbY="-3.238119mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="5.700014mm" pcbY="-2.738247mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="5.700014mm" pcbY="-2.238121mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="5.700014mm" pcbY="-1.738249mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="5.700014mm" pcbY="-1.238123mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="5.700014mm" pcbY="-0.738251mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="5.700014mm" pcbY="-0.238125mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="5.700014mm" pcbY="0.261747mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="5.700014mm" pcbY="0.761873mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="5.700014mm" pcbY="1.261745mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="5.700014mm" pcbY="1.761871mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="5.700014mm" pcbY="2.261743mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="5.700014mm" pcbY="2.761869mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="5.700014mm" pcbY="3.261741mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin32"]} pcbX="5.700014mm" pcbY="3.761867mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin33"]} pcbX="3.750056mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin34"]} pcbX="3.24993mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin35"]} pcbX="2.750058mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin36"]} pcbX="2.249932mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin37"]} pcbX="1.75006mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin38"]} pcbX="1.249934mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin39"]} pcbX="0.750062mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin40"]} pcbX="0.249936mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin41"]} pcbX="-0.249936mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin42"]} pcbX="-0.750062mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin43"]} pcbX="-1.249934mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin44"]} pcbX="-1.75006mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin45"]} pcbX="-2.249932mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin46"]} pcbX="-2.750058mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin47"]} pcbX="-3.24993mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin48"]} pcbX="-3.750056mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin49"]} pcbX="-5.700014mm" pcbY="3.761867mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin50"]} pcbX="-5.700014mm" pcbY="3.261741mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin51"]} pcbX="-5.700014mm" pcbY="2.761869mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin52"]} pcbX="-5.700014mm" pcbY="2.261743mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin53"]} pcbX="-5.700014mm" pcbY="1.761871mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin54"]} pcbX="-5.700014mm" pcbY="1.261745mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin55"]} pcbX="-5.700014mm" pcbY="0.761873mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin56"]} pcbX="-5.700014mm" pcbY="0.261747mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin57"]} pcbX="-5.700014mm" pcbY="-0.238125mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin58"]} pcbX="-5.700014mm" pcbY="-0.738251mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin59"]} pcbX="-5.700014mm" pcbY="-1.238123mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin60"]} pcbX="-5.700014mm" pcbY="-1.738249mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin61"]} pcbX="-5.700014mm" pcbY="-2.238121mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin62"]} pcbX="-5.700014mm" pcbY="-2.738247mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin63"]} pcbX="-5.700014mm" pcbY="-3.238119mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <smtpad portHints={["pin64"]} pcbX="-5.700014mm" pcbY="-3.738245mm" width="1.499997mm" height="0.2999994mm" radius="0.1499997mm" shape="pill" />
    <silkscreenpath route={[{"x":-4.999989999999997,"y":-4.119397400000011},{"x":-4.999964599999998,"y":-4.119397400000011},{"x":-4.131183000000021,"y":-4.9881790000000095}]} />
    <silkscreenpath route={[{"x":4.999989999999968,"y":5.011800999999991},{"x":4.131208399999991,"y":5.011800999999991}]} />
    <silkscreenpath route={[{"x":4.999989999999968,"y":5.011800999999991},{"x":4.999989999999968,"y":4.142993999999987}]} />
    <silkscreenpath route={[{"x":-4.999989999999997,"y":4.142993999999987},{"x":-4.999989999999997,"y":5.011800999999991},{"x":-4.131183000000021,"y":5.011800999999991}]} />
    <silkscreenpath route={[{"x":-4.131183000000021,"y":-4.9881790000000095},{"x":-4.999989999999997,"y":-4.9881790000000095},{"x":-4.999989999999997,"y":-4.119397400000011}]} />
    <silkscreenpath route={[{"x":4.999989999999968,"y":-4.119397400000011},{"x":4.999989999999968,"y":-4.9881790000000095},{"x":4.131182999999993,"y":-4.9881790000000095}]} />
    <silkscreenpath route={[{"x":-4.2500042000000064,"y":4.261815199999987},{"x":-4.2500042000000064,"y":-4.238193200000012},{"x":4.2500042000000064,"y":-4.238193200000012},{"x":4.2500042000000064,"y":4.261815199999987},{"x":-4.2500042000000064,"y":4.261815199999987}]} />
    <silkscreenpath route={[{"x":-3.2994600000000105,"y":-3.013329000000013},{"x":-3.510394378607913,"y":-3.1025373594299523},{"x":-3.5969167117677614,"y":-3.314587658499434},{"x":-3.508602117039061,"y":-3.525897799829167},{"x":-3.2969200000000285,"y":-3.613317047119125},{"x":-3.0852378829609677,"y":-3.525897799829167},{"x":-2.996923288232267,"y":-3.314587658499434},{"x":-3.0834456213921158,"y":-3.1025373594299523},{"x":-3.294380000000018,"y":-3.013329000000013}]} />
    <silkscreenpath route={[{"x":-4.361256200000014,"y":-5.47817040000001},{"x":-4.509997255997689,"y":-5.628812429703942},{"x":-4.359986200000009,"y":-5.778189824014746},{"x":-4.209975144002357,"y":-5.628812429703942},{"x":-4.3587162000000035,"y":-5.47817040000001}]} />
    <silkscreentext text="{NAME}" pcbX="0mm" pcbY="7.285611mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.549200000000013,"y":6.535610999999989},{"x":6.549199999999985,"y":6.535610999999989},{"x":6.549199999999985,"y":-6.715189000000009},{"x":-6.549200000000013,"y":-6.715189000000009},{"x":-6.549200000000013,"y":6.535610999999989}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C472489.obj?uuid=7e9b9111dcfd48d3add0eab11d882721",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C472489.step?uuid=7e9b9111dcfd48d3add0eab11d882721",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.011810999999994465, z: 0.000795 },
          }}
          {...props}
        />
      )
    }"
  `)
})
