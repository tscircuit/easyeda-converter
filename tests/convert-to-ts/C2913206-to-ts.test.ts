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
          symbol={
            <symbol>
              <schematicrect schX={0} schY={0} width={17.78} height={78.74} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -7.62, y: 38.1 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["GND1","GND"]} direction="left" schX={-11.43} schY={36.83} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["GND2","GND"]} direction="left" schX={-11.43} schY={34.29} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["3V3"]} direction="left" schX={-11.43} schY={31.75} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["IO0"]} direction="left" schX={-11.43} schY={29.21} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["IO1"]} direction="left" schX={-11.43} schY={26.67} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["IO2"]} direction="left" schX={-11.43} schY={24.13} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["IO3"]} direction="left" schX={-11.43} schY={21.59} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["IO4"]} direction="left" schX={-11.43} schY={19.05} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["IO5"]} direction="left" schX={-11.43} schY={16.51} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["IO6"]} direction="left" schX={-11.43} schY={13.97} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["IO7"]} direction="left" schX={-11.43} schY={11.43} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["IO8"]} direction="left" schX={-11.43} schY={8.89} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["IO9"]} direction="left" schX={-11.43} schY={6.35} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["IO10"]} direction="left" schX={-11.43} schY={3.81} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["IO11"]} direction="left" schX={-11.43} schY={1.27} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["IO12"]} direction="left" schX={-11.43} schY={-1.27} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["IO13"]} direction="left" schX={-11.43} schY={-3.81} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["IO14"]} direction="left" schX={-11.43} schY={-6.35} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["IO15"]} direction="left" schX={-11.43} schY={-8.89} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["IO16"]} direction="left" schX={-11.43} schY={-11.43} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["IO17"]} direction="left" schX={-11.43} schY={-13.97} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["IO18"]} direction="left" schX={-11.43} schY={-16.51} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["IO19"]} direction="left" schX={-11.43} schY={-19.05} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["IO20"]} direction="left" schX={-11.43} schY={-21.59} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["IO21"]} direction="left" schX={-11.43} schY={-24.13} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["IO26"]} direction="left" schX={-11.43} schY={-26.67} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["IO47"]} direction="left" schX={-11.43} schY={-29.21} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["IO33"]} direction="left" schX={-11.43} schY={-31.75} schStemLength={2.54} />
              <port name="pin29" pinNumber={29} aliases={["IO34"]} direction="left" schX={-11.43} schY={-34.29} schStemLength={2.54} />
              <port name="pin30" pinNumber={30} aliases={["IO48"]} direction="left" schX={-11.43} schY={-36.83} schStemLength={2.54} />
              <port name="pin31" pinNumber={31} aliases={["IO35"]} direction="right" schX={11.43} schY={-36.83} schStemLength={2.54} />
              <port name="pin32" pinNumber={32} aliases={["IO36"]} direction="right" schX={11.43} schY={-34.29} schStemLength={2.54} />
              <port name="pin33" pinNumber={33} aliases={["IO37"]} direction="right" schX={11.43} schY={-31.75} schStemLength={2.54} />
              <port name="pin34" pinNumber={34} aliases={["IO38"]} direction="right" schX={11.43} schY={-29.21} schStemLength={2.54} />
              <port name="pin35" pinNumber={35} aliases={["IO39"]} direction="right" schX={11.43} schY={-26.67} schStemLength={2.54} />
              <port name="pin36" pinNumber={36} aliases={["IO40"]} direction="right" schX={11.43} schY={-24.13} schStemLength={2.54} />
              <port name="pin37" pinNumber={37} aliases={["IO41"]} direction="right" schX={11.43} schY={-21.59} schStemLength={2.54} />
              <port name="pin38" pinNumber={38} aliases={["IO42"]} direction="right" schX={11.43} schY={-19.05} schStemLength={2.54} />
              <port name="pin39" pinNumber={39} aliases={["TXD0"]} direction="right" schX={11.43} schY={-16.51} schStemLength={2.54} />
              <port name="pin40" pinNumber={40} aliases={["RXD0"]} direction="right" schX={11.43} schY={-13.97} schStemLength={2.54} />
              <port name="pin41" pinNumber={41} aliases={["IO45"]} direction="right" schX={11.43} schY={-11.43} schStemLength={2.54} />
              <port name="pin42" pinNumber={42} aliases={["GND3","GND"]} direction="right" schX={11.43} schY={-8.89} schStemLength={2.54} />
              <port name="pin43" pinNumber={43} aliases={["GND4","GND"]} direction="right" schX={11.43} schY={-6.35} schStemLength={2.54} />
              <port name="pin44" pinNumber={44} aliases={["IO46"]} direction="right" schX={11.43} schY={-3.81} schStemLength={2.54} />
              <port name="pin45" pinNumber={45} aliases={["EN"]} direction="right" schX={11.43} schY={-1.27} schStemLength={2.54} />
              <port name="pin46" pinNumber={46} aliases={["GND5","GND"]} direction="right" schX={11.43} schY={1.27} schStemLength={2.54} />
              <port name="pin47" pinNumber={47} aliases={["GND6","GND"]} direction="right" schX={11.43} schY={3.81} schStemLength={2.54} />
              <port name="pin48" pinNumber={48} aliases={["GND7","GND"]} direction="right" schX={11.43} schY={6.35} schStemLength={2.54} />
              <port name="pin49" pinNumber={49} aliases={["GND8","GND"]} direction="right" schX={11.43} schY={8.89} schStemLength={2.54} />
              <port name="pin50" pinNumber={50} aliases={["GND9","GND"]} direction="right" schX={11.43} schY={11.43} schStemLength={2.54} />
              <port name="pin51" pinNumber={51} aliases={["GND10","GND"]} direction="right" schX={11.43} schY={13.97} schStemLength={2.54} />
              <port name="pin52" pinNumber={52} aliases={["GND11","GND"]} direction="right" schX={11.43} schY={16.51} schStemLength={2.54} />
              <port name="pin53" pinNumber={53} aliases={["GND12","GND"]} direction="right" schX={11.43} schY={19.05} schStemLength={2.54} />
              <port name="pin54" pinNumber={54} aliases={["GND13","GND"]} direction="right" schX={11.43} schY={21.59} schStemLength={2.54} />
              <port name="pin55" pinNumber={55} aliases={["GND14","GND"]} direction="right" schX={11.43} schY={24.13} schStemLength={2.54} />
              <port name="pin56" pinNumber={56} aliases={["GND15","GND"]} direction="right" schX={11.43} schY={26.67} schStemLength={2.54} />
              <port name="pin57" pinNumber={57} aliases={["GND16","GND"]} direction="right" schX={11.43} schY={29.21} schStemLength={2.54} />
              <port name="pin58" pinNumber={58} aliases={["GND17","GND"]} direction="right" schX={11.43} schY={31.75} schStemLength={2.54} />
              <port name="pin59" pinNumber={59} aliases={["GND18","GND"]} direction="right" schX={11.43} schY={34.29} schStemLength={2.54} />
              <port name="pin60" pinNumber={60} aliases={["GND19","GND"]} direction="right" schX={11.43} schY={36.83} schStemLength={2.54} />
              <port name="pin61" pinNumber={61} aliases={["GND20","GND"]} direction="up" schX={0} schY={41.91} schStemLength={2.54} />
            </symbol>
          }
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
    <silkscreenpath route={[{"x":-8.05840400000011,"y":6.300088999999957},{"x":-8.063224745948219,"y":6.263471799136937},{"x":-8.077358457923424,"y":6.22934999999984},{"x":-8.099841946811239,"y":6.200048946811194},{"x":-8.129143000000113,"y":6.177565457923379},{"x":-8.163264799137096,"y":6.163431745948174},{"x":-8.199882000000002,"y":6.158610999999951},{"x":-8.236499200863022,"y":6.163431745948174},{"x":-8.270621000000006,"y":6.177565457923379},{"x":-8.299922053188652,"y":6.200048946811194},{"x":-8.322405542076694,"y":6.22934999999984},{"x":-8.336539254051672,"y":6.263471799136937},{"x":-8.341359999999895,"y":6.300088999999957},{"x":-8.336539254051672,"y":6.336706200862977},{"x":-8.322405542076694,"y":6.37082799999996},{"x":-8.299922053188652,"y":6.400129053188607},{"x":-8.270621000000006,"y":6.422612542076536},{"x":-8.236499200863022,"y":6.436746254051627},{"x":-8.199882000000002,"y":6.44156699999985},{"x":-8.163264799137096,"y":6.436746254051627},{"x":-8.129143000000113,"y":6.422612542076536},{"x":-8.099841946811239,"y":6.400129053188607},{"x":-8.077358457923424,"y":6.37082799999996},{"x":-8.063224745948219,"y":6.336706200862977},{"x":-8.05840400000011,"y":6.300088999999957}]} />
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
