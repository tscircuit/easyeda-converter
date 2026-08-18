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
      pin1: ["P4.3","UCA0SOMI","UCA0RXD","UCB1STE","S4"],
      pin2: ["P1.4","UCB0CLK","UCA0STE","TA1.0","S3"],
      pin3: ["P1.5","UCB0STE","UCA0CLK","TA0.0","S2"],
      pin4: ["P1.6","UCB0SIMO","UCB0SDA","TA0.1","S1"],
      pin5: ["P1.7","UCB0SOMI","UCB0SCL","TA0.2","S0"],
      pin6: ["R33","LCDCAP"],
      pin7: ["P6.0","R23"],
      pin8: ["P6.1","R13","LCDREF"],
      pin9: ["P6.2","COUT","R03"],
      pin10: ["P6.3","COM0"],
      pin11: ["P6.4","TB0.0","COM1","S30"],
      pin12: ["P6.5","TB0.1","COM2","S29"],
      pin13: ["P6.6","TB0.2","COM3","S28"],
      pin14: ["P3.0","UCB1CLK","TA3.2","S27"],
      pin15: ["P3.1","UCB1SIMO","UCB1SDA","TA3.3","S26"],
      pin16: ["P3.2","UCB1SOMI","UCB1SCL","TA3.4","S25"],
      pin17: ["DVSS1"],
      pin18: ["DVCC1"],
      pin19: ["TEST","SBWTCK"],
      pin20: ["N_RST","NMI","SBWTDIO"],
      pin21: ["PJ.0","TDO","TB0OUTH","SMCLK","SRSCG1"],
      pin22: ["PJ.1","TDI","TCLK","MCLK","SRSCG0"],
      pin23: ["PJ.2","TMS","ACLK","SROSCOFF"],
      pin24: ["PJ.3","TCK","COUT","SRCPUOFF"],
      pin25: ["P3.3","TA1.1","TBOCLK","S24"],
      pin26: ["P3.4","UCA1SIMO","UCA1TXD","TB0.0","S23"],
      pin27: ["P3.5","UCA1SOMI","UCA1RXD","TB0.1","S22"],
      pin28: ["P3.6","UCA1CLK","TB0.2","S21"],
      pin29: ["P3.7","UCA1STE","TB0.3","S20"],
      pin30: ["P2.3","UCA0STE","TB0OUTH","S19"],
      pin31: ["P2.2","UCA0CLK","TB0.4","RTCCLK","S18"],
      pin32: ["P2.1","UCA0SOMI","UCA0RXD","TB0.5","DMAE0","S17"],
      pin33: ["P2.0","UCA0SIMO","UCA0TXD","TB0.6","TB0CLK","S16"],
      pin34: ["P7.0","TA0CLK","S15"],
      pin35: ["P7.1","TA0.0","ACLK","S14"],
      pin36: ["P7.2","TA0.1","S13"],
      pin37: ["P7.3","TA0.2","S12"],
      pin38: ["P7.4","SMCLK","S11"],
      pin39: ["DVSS2"],
      pin40: ["DVCC2"],
      pin41: ["P1.3","TA1.2","A3","C3"],
      pin42: ["P1.2","TA1.1","TA0CLK","COUT","A2","C2"],
      pin43: ["P1.1","TA0.2","TA1CLK","COUT","A1","C1","VREF+","VeREF_POS"],
      pin44: ["P1.0","TA0.1","DMAE0","RTCCLK","A0","C0","VREF-","VeREF_NEG"],
      pin45: ["P9.4","A12","C12"],
      pin46: ["P9.5","A13","C13"],
      pin47: ["P9.6","A14","C14"],
      pin48: ["P9.7","A15","C15"],
      pin49: ["AVCC1"],
      pin50: ["AVSS1"],
      pin51: ["PJ.4","LFXIN"],
      pin52: ["PJ.5","LFXOUT"],
      pin53: ["AVSS2"],
      pin54: ["PJ.7","HFXOUT"],
      pin55: ["PJ.6","HFXIN"],
      pin56: ["AVSS3"],
      pin57: ["P5.7","UCA1STE","TBOCLK","S10"],
      pin58: ["P4.4","UCB1STE","TA1CLK","S9"],
      pin59: ["P4.5","UCB1CLK","TA1.0","S8"],
      pin60: ["P4.6","UCB1SIMO","UCB1SDA","TA1.1","S7"],
      pin61: ["P4.7","UCB1SOMI","UCB1SCL","TA1.2","S6"],
      pin62: ["DVSS3"],
      pin63: ["DVCC3"],
      pin64: ["P4.2","UCA0SIMO","UCA0TXD","UCB1CLK","S5"]
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
    <silkscreenpath route={[{"x":-3.2994600000000105,"y":-3.013329000000013},{"x":-3.510394378607913,"y":-2.9241206405700666},{"x":-3.5969167117677614,"y":-2.712070341500585},{"x":-3.508602117039061,"y":-2.500760200170852},{"x":-3.2969200000000285,"y":-2.413340952880887},{"x":-3.0852378829609677,"y":-2.500760200170852},{"x":-2.996923288232267,"y":-2.712070341500585},{"x":-3.0834456213921158,"y":-2.9241206405700666},{"x":-3.294380000000018,"y":-3.013329000000013}]} />
    <silkscreenpath route={[{"x":-4.361256200000014,"y":-5.47817040000001},{"x":-4.509997255997689,"y":-5.327528370296079},{"x":-4.359986200000009,"y":-5.178150975985275},{"x":-4.209975144002357,"y":-5.327528370296079},{"x":-4.3587162000000035,"y":-5.47817040000001}]} />
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
