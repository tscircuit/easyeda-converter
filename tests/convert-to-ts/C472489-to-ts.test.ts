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
          symbol={
            <symbol>
              <schematicrect schX={0} schY={0} width={134.62} height={165.1} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -66.04, y: 81.28 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-69.85} schY={19.05} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-69.85} schY={16.51} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-69.85} schY={13.97} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="left" schX={-69.85} schY={11.43} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="left" schX={-69.85} schY={8.89} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["6"]} direction="left" schX={-69.85} schY={6.35} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["7"]} direction="left" schX={-69.85} schY={3.81} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["8"]} direction="left" schX={-69.85} schY={1.27} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["9"]} direction="left" schX={-69.85} schY={-1.27} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["10"]} direction="left" schX={-69.85} schY={-3.81} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["11"]} direction="left" schX={-69.85} schY={-6.35} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["12"]} direction="left" schX={-69.85} schY={-8.89} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["13"]} direction="left" schX={-69.85} schY={-11.43} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["14"]} direction="left" schX={-69.85} schY={-13.97} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["15"]} direction="left" schX={-69.85} schY={-16.51} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["16"]} direction="left" schX={-69.85} schY={-19.05} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["DVSS1"]} direction="down" schX={-19.05} schY={-85.09} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["DVCC1"]} direction="down" schX={-16.51} schY={-85.09} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["19"]} direction="down" schX={-13.97} schY={-85.09} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["20"]} direction="down" schX={-11.43} schY={-85.09} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["21"]} direction="down" schX={-8.89} schY={-85.09} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["22"]} direction="down" schX={-6.35} schY={-85.09} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["23"]} direction="down" schX={-3.81} schY={-85.09} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["24"]} direction="down" schX={-1.27} schY={-85.09} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["25"]} direction="down" schX={1.27} schY={-85.09} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["26"]} direction="down" schX={3.81} schY={-85.09} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["27"]} direction="down" schX={6.35} schY={-85.09} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["28"]} direction="down" schX={8.89} schY={-85.09} schStemLength={2.54} />
              <port name="pin29" pinNumber={29} aliases={["29"]} direction="down" schX={11.43} schY={-85.09} schStemLength={2.54} />
              <port name="pin30" pinNumber={30} aliases={["30"]} direction="down" schX={13.97} schY={-85.09} schStemLength={2.54} />
              <port name="pin31" pinNumber={31} aliases={["31"]} direction="down" schX={16.51} schY={-85.09} schStemLength={2.54} />
              <port name="pin32" pinNumber={32} aliases={["32"]} direction="down" schX={19.05} schY={-85.09} schStemLength={2.54} />
              <port name="pin33" pinNumber={33} aliases={["33"]} direction="right" schX={69.85} schY={-19.05} schStemLength={2.54} />
              <port name="pin34" pinNumber={34} aliases={["34"]} direction="right" schX={69.85} schY={-16.51} schStemLength={2.54} />
              <port name="pin35" pinNumber={35} aliases={["35"]} direction="right" schX={69.85} schY={-13.97} schStemLength={2.54} />
              <port name="pin36" pinNumber={36} aliases={["36"]} direction="right" schX={69.85} schY={-11.43} schStemLength={2.54} />
              <port name="pin37" pinNumber={37} aliases={["37"]} direction="right" schX={69.85} schY={-8.89} schStemLength={2.54} />
              <port name="pin38" pinNumber={38} aliases={["38"]} direction="right" schX={69.85} schY={-6.35} schStemLength={2.54} />
              <port name="pin39" pinNumber={39} aliases={["DVSS2"]} direction="right" schX={69.85} schY={-3.81} schStemLength={2.54} />
              <port name="pin40" pinNumber={40} aliases={["DVCC2"]} direction="right" schX={69.85} schY={-1.27} schStemLength={2.54} />
              <port name="pin41" pinNumber={41} aliases={["41"]} direction="right" schX={69.85} schY={1.27} schStemLength={2.54} />
              <port name="pin42" pinNumber={42} aliases={["42"]} direction="right" schX={69.85} schY={3.81} schStemLength={2.54} />
              <port name="pin43" pinNumber={43} aliases={["43"]} direction="right" schX={69.85} schY={6.35} schStemLength={2.54} />
              <port name="pin44" pinNumber={44} aliases={["44"]} direction="right" schX={69.85} schY={8.89} schStemLength={2.54} />
              <port name="pin45" pinNumber={45} aliases={["45"]} direction="right" schX={69.85} schY={11.43} schStemLength={2.54} />
              <port name="pin46" pinNumber={46} aliases={["46"]} direction="right" schX={69.85} schY={13.97} schStemLength={2.54} />
              <port name="pin47" pinNumber={47} aliases={["47"]} direction="right" schX={69.85} schY={16.51} schStemLength={2.54} />
              <port name="pin48" pinNumber={48} aliases={["48"]} direction="right" schX={69.85} schY={19.05} schStemLength={2.54} />
              <port name="pin49" pinNumber={49} aliases={["AVCC1"]} direction="up" schX={19.05} schY={85.09} schStemLength={2.54} />
              <port name="pin50" pinNumber={50} aliases={["AVSS1"]} direction="up" schX={16.51} schY={85.09} schStemLength={2.54} />
              <port name="pin51" pinNumber={51} aliases={["51"]} direction="up" schX={13.97} schY={85.09} schStemLength={2.54} />
              <port name="pin52" pinNumber={52} aliases={["52"]} direction="up" schX={11.43} schY={85.09} schStemLength={2.54} />
              <port name="pin53" pinNumber={53} aliases={["AVSS2"]} direction="up" schX={8.89} schY={85.09} schStemLength={2.54} />
              <port name="pin54" pinNumber={54} aliases={["54"]} direction="up" schX={6.35} schY={85.09} schStemLength={2.54} />
              <port name="pin55" pinNumber={55} aliases={["55"]} direction="up" schX={3.81} schY={85.09} schStemLength={2.54} />
              <port name="pin56" pinNumber={56} aliases={["AVSS3"]} direction="up" schX={1.27} schY={85.09} schStemLength={2.54} />
              <port name="pin57" pinNumber={57} aliases={["57"]} direction="up" schX={-1.27} schY={85.09} schStemLength={2.54} />
              <port name="pin58" pinNumber={58} aliases={["58"]} direction="up" schX={-3.81} schY={85.09} schStemLength={2.54} />
              <port name="pin59" pinNumber={59} aliases={["59"]} direction="up" schX={-6.35} schY={85.09} schStemLength={2.54} />
              <port name="pin60" pinNumber={60} aliases={["60"]} direction="up" schX={-8.89} schY={85.09} schStemLength={2.54} />
              <port name="pin61" pinNumber={61} aliases={["61"]} direction="up" schX={-11.43} schY={85.09} schStemLength={2.54} />
              <port name="pin62" pinNumber={62} aliases={["DVSS3"]} direction="up" schX={-13.97} schY={85.09} schStemLength={2.54} />
              <port name="pin63" pinNumber={63} aliases={["DVCC3"]} direction="up" schX={-16.51} schY={85.09} schStemLength={2.54} />
              <port name="pin64" pinNumber={64} aliases={["64"]} direction="up" schX={-19.05} schY={85.09} schStemLength={2.54} />
            </symbol>
          }
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
