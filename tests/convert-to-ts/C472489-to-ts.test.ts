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
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"],
      pin13: ["pin13"],
      pin14: ["pin14"],
      pin15: ["pin15"],
      pin16: ["pin16"],
      pin17: ["DVSS1"],
      pin18: ["DVCC1"],
      pin19: ["pin19"],
      pin20: ["pin20"],
      pin21: ["pin21"],
      pin22: ["pin22"],
      pin23: ["pin23"],
      pin24: ["pin24"],
      pin25: ["pin25"],
      pin26: ["pin26"],
      pin27: ["pin27"],
      pin28: ["pin28"],
      pin29: ["pin29"],
      pin30: ["pin30"],
      pin31: ["pin31"],
      pin32: ["pin32"],
      pin33: ["pin33"],
      pin34: ["pin34"],
      pin35: ["pin35"],
      pin36: ["pin36"],
      pin37: ["pin37"],
      pin38: ["pin38"],
      pin39: ["DVSS2"],
      pin40: ["DVCC2"],
      pin41: ["pin41"],
      pin42: ["pin42"],
      pin43: ["pin43"],
      pin44: ["pin44"],
      pin45: ["pin45"],
      pin46: ["pin46"],
      pin47: ["pin47"],
      pin48: ["pin48"],
      pin49: ["AVCC1"],
      pin50: ["AVSS1"],
      pin51: ["pin51"],
      pin52: ["pin52"],
      pin53: ["AVSS2"],
      pin54: ["pin54"],
      pin55: ["pin55"],
      pin56: ["AVSS3"],
      pin57: ["pin57"],
      pin58: ["pin58"],
      pin59: ["pin59"],
      pin60: ["pin60"],
      pin61: ["pin61"],
      pin62: ["DVSS3"],
      pin63: ["DVCC3"],
      pin64: ["pin64"]
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
            <smtpad portHints={["pin1"]} pcbX="-3.750056mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-3.24993mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-2.750058mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-2.249932mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.75006mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.249934mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-0.750062mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.249936mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="0.249936mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="0.750062mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.249934mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.75006mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="2.249932mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="2.750058mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="3.24993mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="3.750056mm" pcbY="-5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="5.700014mm" pcbY="-3.738245mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="5.700014mm" pcbY="-3.238119mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="5.700014mm" pcbY="-2.738247mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="5.700014mm" pcbY="-2.238121mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="5.700014mm" pcbY="-1.738249mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="5.700014mm" pcbY="-1.238123mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="5.700014mm" pcbY="-0.738251mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="5.700014mm" pcbY="-0.238125mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="5.700014mm" pcbY="0.261747mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="5.700014mm" pcbY="0.761873mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="5.700014mm" pcbY="1.261745mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="5.700014mm" pcbY="1.761871mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="5.700014mm" pcbY="2.261743mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="5.700014mm" pcbY="2.761869mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="5.700014mm" pcbY="3.261741mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="5.700014mm" pcbY="3.761867mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="3.750056mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="3.24993mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="2.750058mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="2.249932mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="1.75006mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="1.249934mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="0.750062mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="0.249936mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="-0.249936mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="-0.750062mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="-1.249934mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-1.75006mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-2.249932mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-2.750058mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-3.24993mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-3.750056mm" pcbY="5.688203mm" width="0.2999994mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="-5.700014mm" pcbY="3.761867mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin50"]} pcbX="-5.700014mm" pcbY="3.261741mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin51"]} pcbX="-5.700014mm" pcbY="2.761869mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin52"]} pcbX="-5.700014mm" pcbY="2.261743mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin53"]} pcbX="-5.700014mm" pcbY="1.761871mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin54"]} pcbX="-5.700014mm" pcbY="1.261745mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin55"]} pcbX="-5.700014mm" pcbY="0.761873mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin56"]} pcbX="-5.700014mm" pcbY="0.261747mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin57"]} pcbX="-5.700014mm" pcbY="-0.238125mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin58"]} pcbX="-5.700014mm" pcbY="-0.738251mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin59"]} pcbX="-5.700014mm" pcbY="-1.238123mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin60"]} pcbX="-5.700014mm" pcbY="-1.738249mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin61"]} pcbX="-5.700014mm" pcbY="-2.238121mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin62"]} pcbX="-5.700014mm" pcbY="-2.738247mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin63"]} pcbX="-5.700014mm" pcbY="-3.238119mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin64"]} pcbX="-5.700014mm" pcbY="-3.738245mm" width="1.499997mm" height="0.2999994mm" shape="rect" />
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
