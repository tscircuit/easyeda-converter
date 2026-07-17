import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2886621.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2886621 into typescript file", async () => {
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
      pin1: ["TRIOUT"],
      pin2: ["SINEIN_POS"],
      pin3: ["pin3"],
      pin4: ["AUX1IN"],
      pin5: ["AUX2IN"],
      pin6: ["HFTRACK"],
      pin7: ["EXPOFREQ"],
      pin8: ["pin8"],
      pin9: ["TRIMIX"],
      pin10: ["SAWMIX"],
      pin11: ["PULSEMIX"],
      pin12: ["AUX1MIX"],
      pin13: ["AUX2MIX"],
      pin14: ["TCAP"],
      pin15: ["DGND"],
      pin16: ["AGND"],
      pin17: ["HARDSYNC"],
      pin18: ["TIMEREVERSE"],
      pin19: ["SOFTSYNC"],
      pin20: ["HFTBASE"],
      pin21: ["LINFREQ"],
      pin22: ["EXPOSCALE"],
      pin23: ["VREF"],
      pin24: ["SINEOUT"],
      pin25: ["MIXOUT"],
      pin26: ["BWCOMP"],
      pin27: ["V_POS"],
      pin28: ["SQUAREOUT"],
      pin29: ["SAWOUT"],
      pin30: ["PULSEOUT"],
      pin31: ["pin31"],
      pin32: ["PWMIN_POS"],
      pin33: ["EP"]
    } as const

    export const SSI2130 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicrect schX={0} schY={-1.27} width={35.56} height={43.18} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -16.51, y: 19.05 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["TRIOUT"]} direction="left" schX={-20.32} schY={17.78} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["SINEIN_POS"]} direction="left" schX={-20.32} schY={15.24} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-20.32} schY={12.7} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["AUX1IN"]} direction="left" schX={-20.32} schY={10.16} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["AUX2IN"]} direction="left" schX={-20.32} schY={7.62} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["HFTRACK"]} direction="left" schX={-20.32} schY={5.08} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["EXPOFREQ"]} direction="left" schX={-20.32} schY={2.54} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["8"]} direction="left" schX={-20.32} schY={0} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["TRIMIX"]} direction="left" schX={-20.32} schY={-2.54} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["SAWMIX"]} direction="left" schX={-20.32} schY={-5.08} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["PULSEMIX"]} direction="left" schX={-20.32} schY={-7.62} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["AUX1MIX"]} direction="left" schX={-20.32} schY={-10.16} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["AUX2MIX"]} direction="left" schX={-20.32} schY={-12.7} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["TCAP"]} direction="left" schX={-20.32} schY={-15.24} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["DGND"]} direction="left" schX={-20.32} schY={-17.78} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["AGND"]} direction="left" schX={-20.32} schY={-20.32} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["HARDSYNC"]} direction="right" schX={20.32} schY={-20.32} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["TIMEREVERSE"]} direction="right" schX={20.32} schY={-17.78} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["SOFTSYNC"]} direction="right" schX={20.32} schY={-15.24} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["HFTBASE"]} direction="right" schX={20.32} schY={-12.7} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["LINFREQ"]} direction="right" schX={20.32} schY={-10.16} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["EXPOSCALE"]} direction="right" schX={20.32} schY={-7.62} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["VREF"]} direction="right" schX={20.32} schY={-5.08} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["SINEOUT"]} direction="right" schX={20.32} schY={-2.54} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["MIXOUT"]} direction="right" schX={20.32} schY={0} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["BWCOMP"]} direction="right" schX={20.32} schY={2.54} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["V_POS"]} direction="right" schX={20.32} schY={5.08} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["SQUAREOUT"]} direction="right" schX={20.32} schY={7.62} schStemLength={2.54} />
              <port name="pin29" pinNumber={29} aliases={["SAWOUT"]} direction="right" schX={20.32} schY={10.16} schStemLength={2.54} />
              <port name="pin30" pinNumber={30} aliases={["PULSEOUT"]} direction="right" schX={20.32} schY={12.7} schStemLength={2.54} />
              <port name="pin31" pinNumber={31} aliases={["31"]} direction="right" schX={20.32} schY={15.24} schStemLength={2.54} />
              <port name="pin32" pinNumber={32} aliases={["PWMIN_POS"]} direction="right" schX={20.32} schY={17.78} schStemLength={2.54} />
              <port name="pin33" pinNumber={33} aliases={["EP"]} direction="up" schX={0} schY={22.86} schStemLength={2.54} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C2886621"
      ]
    }}
          manufacturerPartNumber="SSI2130"
          footprint={<footprint>
            <smtpad portHints={["pin9"]} pcbX="-1.400048mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="-0.999998mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="-0.599948mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="-0.199898mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="0.200152mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="0.599948mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="0.999998mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="1.400048mm" pcbY="-1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="1.400048mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="0.999998mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="0.599948mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="0.200152mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="-0.199898mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="-0.599948mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="-0.999998mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin32"]} pcbX="-1.400048mm" pcbY="1.999996mm" width="0.1999996mm" height="0.6999986mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin33"]} pcbX="-0mm" pcbY="0mm" width="2.5999948mm" height="2.5999948mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-1.999996mm" pcbY="1.400048mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-1.999996mm" pcbY="0.999998mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-1.999996mm" pcbY="0.599948mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-1.999996mm" pcbY="0.199898mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-1.999996mm" pcbY="-0.199898mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-1.999996mm" pcbY="-0.599948mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-1.999996mm" pcbY="-0.999998mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-1.999996mm" pcbY="-1.400048mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="1.999996mm" pcbY="-1.400048mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="1.999996mm" pcbY="-0.999998mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="1.999996mm" pcbY="-0.599948mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="1.999996mm" pcbY="-0.199898mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="1.999996mm" pcbY="0.199898mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="1.999996mm" pcbY="0.599948mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="1.999996mm" pcbY="0.999998mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="1.999996mm" pcbY="1.400048mm" width="0.6999986mm" height="0.1999996mm" radius="0.0999998mm" shape="pill" />
    <silkscreenpath route={[{"x":2.199944799999969,"y":1.8300700000000063},{"x":2.199944799999969,"y":2.1998940000000005},{"x":1.8301207999999747,"y":2.1998940000000005}]} />
    <silkscreenpath route={[{"x":1.8301207999999747,"y":-2.1998939999999862},{"x":2.199944799999969,"y":-2.1998939999999862},{"x":2.199944799999969,"y":-1.8300700000000063}]} />
    <silkscreenpath route={[{"x":-1.8300192000000095,"y":-2.1998939999999862},{"x":-2.199843200000032,"y":-2.1998939999999862},{"x":-2.199843200000032,"y":-1.8300700000000063}]} />
    <silkscreenpath route={[{"x":-2.199843200000032,"y":1.8300700000000063},{"x":-2.199843200000032,"y":2.1998940000000005},{"x":-1.8300192000000095,"y":2.1998940000000005}]} />
    <silkscreenpath route={[{"x":-2.514549200000033,"y":1.7780000000000058},{"x":-2.514549200000033,"y":1.7780000000000058}]} />
    <silkscreentext text="{NAME}" pcbX="-0.1524mm" pcbY="3.362454mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.91700000000003,"y":2.6124539999999996},{"x":2.612199999999973,"y":2.6124539999999996},{"x":2.612199999999973,"y":-2.5865459999999842},{"x":-2.91700000000003,"y":-2.5865459999999842},{"x":-2.91700000000003,"y":2.6124539999999996}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2886621.obj?uuid=7b93dc7f04cd4441a3d58b2a0cf77652",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2886621.step?uuid=7b93dc7f04cd4441a3d58b2a0cf77652",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: -0.85 },
          }}
          {...props}
        />
      )
    }"
  `)
})
