import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C14877.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C14877 into typescript file", async () => {
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
      pin3: ["GND3"],
      pin4: ["VCC2"],
      pin5: ["GND2"],
      pin6: ["VCC1"],
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
      pin17: ["pin17"],
      pin18: ["AVCC"],
      pin19: ["ADC6"],
      pin20: ["AREF"],
      pin21: ["GND1"],
      pin22: ["ADC7"],
      pin23: ["pin23"],
      pin24: ["pin24"],
      pin25: ["pin25"],
      pin26: ["pin26"],
      pin27: ["pin27"],
      pin28: ["pin28"],
      pin29: ["pin29"],
      pin30: ["pin30"],
      pin31: ["pin31"],
      pin32: ["pin32"]
    } as const

    export const ATMEGA328P_AU = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicrect schX={0} schY={0} width={81.28} height={43.18} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -39.37, y: 20.32 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-43.18} schY={19.05} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-43.18} schY={16.51} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["GND3","GND"]} direction="left" schX={-43.18} schY={13.97} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["VCC2","VCC"]} direction="left" schX={-43.18} schY={11.43} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["GND2","GND"]} direction="left" schX={-43.18} schY={8.89} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["VCC1","VCC"]} direction="left" schX={-43.18} schY={6.35} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["7"]} direction="left" schX={-43.18} schY={3.81} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["8"]} direction="left" schX={-43.18} schY={1.27} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["9"]} direction="left" schX={-43.18} schY={-1.27} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["10"]} direction="left" schX={-43.18} schY={-3.81} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["11"]} direction="left" schX={-43.18} schY={-6.35} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["12"]} direction="left" schX={-43.18} schY={-8.89} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["13"]} direction="left" schX={-43.18} schY={-11.43} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["14"]} direction="left" schX={-43.18} schY={-13.97} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["15"]} direction="left" schX={-43.18} schY={-16.51} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["16"]} direction="left" schX={-43.18} schY={-19.05} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["17"]} direction="right" schX={43.18} schY={-19.05} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["AVCC"]} direction="right" schX={43.18} schY={-16.51} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["ADC6"]} direction="right" schX={43.18} schY={-13.97} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["AREF"]} direction="right" schX={43.18} schY={-11.43} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["GND1","GND"]} direction="right" schX={43.18} schY={-8.89} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["ADC7"]} direction="right" schX={43.18} schY={-6.35} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["23"]} direction="right" schX={43.18} schY={-3.81} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["24"]} direction="right" schX={43.18} schY={-1.27} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["25"]} direction="right" schX={43.18} schY={1.27} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["26"]} direction="right" schX={43.18} schY={3.81} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["27"]} direction="right" schX={43.18} schY={6.35} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["28"]} direction="right" schX={43.18} schY={8.89} schStemLength={2.54} />
              <port name="pin29" pinNumber={29} aliases={["29"]} direction="right" schX={43.18} schY={11.43} schStemLength={2.54} />
              <port name="pin30" pinNumber={30} aliases={["30"]} direction="right" schX={43.18} schY={13.97} schStemLength={2.54} />
              <port name="pin31" pinNumber={31} aliases={["31"]} direction="right" schX={43.18} schY={16.51} schStemLength={2.54} />
              <port name="pin32" pinNumber={32} aliases={["32"]} direction="right" schX={43.18} schY={19.05} schStemLength={2.54} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C14877"
      ]
    }}
          manufacturerPartNumber="ATMEGA328P_AU"
          footprint={<footprint>
            <smtpad portHints={["pin32"]} pcbX="-4.3815mm" pcbY="-2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="-4.3815mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="-4.3815mm" pcbY="-1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="-4.3815mm" pcbY="-0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="-4.3815mm" pcbY="0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="-4.3815mm" pcbY="1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="-4.3815mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="-4.3815mm" pcbY="2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="-2.7999944mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="-1.999996mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="-1.1999976mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="-0.3999992mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="0.3999992mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="1.1999976mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="1.999996mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="2.7999944mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="4.3815mm" pcbY="2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="4.3815mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="4.3815mm" pcbY="1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="4.3815mm" pcbY="0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="4.3815mm" pcbY="-0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="4.3815mm" pcbY="-1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="4.3815mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="4.3815mm" pcbY="-2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="2.7999944mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="1.999996mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="1.1999976mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="0.3999992mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-0.3999992mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-1.1999976mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-1.999996mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-2.7999944mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <silkscreenpath route={[{"x":-2.967482000000004,"y":-4.825999999999993},{"x":-2.819400000000016,"y":-4.9740820107053025},{"x":-2.6713180000000136,"y":-4.825999999999993}]} />
    <silkscreenpath route={[{"x":-2.6713180000000136,"y":-4.825999999999993},{"x":-2.819400000000016,"y":-4.677917989294684},{"x":-2.967482000000004,"y":-4.825999999999993}]} />
    <silkscreenpath route={[{"x":-2.9626559999999813,"y":2.9499560000000145},{"x":-2.9626559999999813,"y":-2.949955999999986},{"x":2.937256000000019,"y":-2.949955999999986},{"x":2.937256000000019,"y":2.9499560000000145},{"x":-2.9626559999999813,"y":2.9499560000000145}]} />
    <silkscreenpath route={[{"x":-3.7591999999999928,"y":-4.063999999999993},{"x":-3.907941055997668,"y":-3.9133579702960617},{"x":-3.7579300000000018,"y":-3.763980575985258},{"x":-3.6079189440023356,"y":-3.9133579702960617},{"x":-3.7566599999999966,"y":-4.063999999999993}]} />
    <silkscreenpath route={[{"x":-2.2123399999999975,"y":-1.998980000000003},{"x":-2.4015150142161303,"y":-1.86006255080585},{"x":-2.3284212288967012,"y":-1.6370321891015465},{"x":-2.0937187711032834,"y":-1.6370321891015465},{"x":-2.0206249857838543,"y":-1.86006255080585},{"x":-2.209799999999987,"y":-1.998980000000003}]} />
    <silkscreentext text="{NAME}" pcbX="0mm" pcbY="5.9657mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.228400000000008,"y":5.215700000000012},{"x":5.2283999999999935,"y":5.215700000000012},{"x":5.2283999999999935,"y":-5.215699999999998},{"x":-5.228400000000008,"y":-5.215699999999998},{"x":-5.228400000000008,"y":5.215700000000012}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.obj?uuid=4d9f6c3430024506b87ce44b53201fc5",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.step?uuid=4d9f6c3430024506b87ce44b53201fc5",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.0012984000000164642, y: -0.0030292999999934622, z: 0.000917 },
          }}
          {...props}
        />
      )
    }"
  `)
})
