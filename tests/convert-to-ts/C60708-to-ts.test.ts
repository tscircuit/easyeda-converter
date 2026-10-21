import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C60708.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C60708 into typescript file", async () => {
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
      pin1: ["VCCA"],
      pin2: ["A1"],
      pin3: ["A2"],
      pin4: ["A3"],
      pin5: ["A4"],
      pin6: ["NC1"],
      pin7: ["GND"],
      pin8: ["OE"],
      pin9: ["NC2"],
      pin10: ["B4"],
      pin11: ["B3"],
      pin12: ["B2"],
      pin13: ["B1"],
      pin14: ["VCCB"]
    } as const

    const pinAttributes = {
      pin6: {doNotConnect: true},
      pin7: {requiresGround: true},
      pin9: {doNotConnect: true}
    } as const

    export const TXB0104PWR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-1,"y":1.1},{"x":1,"y":1.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":1,"y":1.1},{"x":1,"y":-1.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":1,"y":-1.1},{"x":-1,"y":-1.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-1,"y":-1.1},{"x":-1,"y":1.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-1,"y":-0.9},{"x":-0.2,"y":-0.9}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":-0.9},{"x":-0.2,"y":0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.2,"y":0.3},{"x":-1,"y":0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":1,"y":0.3},{"x":0.2,"y":0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.3},{"x":0.2,"y":-0.9}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.9},{"x":1,"y":-0.9}]} strokeColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["VCCA"]} direction="up" schX={-0.2} schY={1.3} schStemLength={0.2} />
              <port name="pin2" pinNumber={2} aliases={["A1"]} direction="left" schX={-1.2} schY={0.1} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} aliases={["A2"]} direction="left" schX={-1.2} schY={-0.1} schStemLength={0.2} />
              <port name="pin4" pinNumber={4} aliases={["A3"]} direction="left" schX={-1.2} schY={-0.3} schStemLength={0.2} />
              <port name="pin5" pinNumber={5} aliases={["A4"]} direction="left" schX={-1.2} schY={-0.5} schStemLength={0.2} />
              <port name="pin7" pinNumber={7} aliases={["GND"]} direction="down" schX={0} schY={-1.3} schStemLength={0.2} />
              <port name="pin14" pinNumber={14} aliases={["VCCB"]} direction="up" schX={0.2} schY={1.3} schStemLength={0.2} />
              <port name="pin13" pinNumber={13} aliases={["B1"]} direction="right" schX={1.2} schY={0.1} schStemLength={0.2} />
              <port name="pin12" pinNumber={12} aliases={["B2"]} direction="right" schX={1.2} schY={-0.1} schStemLength={0.2} />
              <port name="pin11" pinNumber={11} aliases={["B3"]} direction="right" schX={1.2} schY={-0.3} schStemLength={0.2} />
              <port name="pin10" pinNumber={10} aliases={["B4"]} direction="right" schX={1.2} schY={-0.5} schStemLength={0.2} />
              <port name="pin8" pinNumber={8} aliases={["OE"]} direction="left" schX={-1.2} schY={0.5} schStemLength={0.2} />
              <schematictext schX={-0.9} schY={-0.8} text="1.2-3.6V" fontSize={0.1} anchor="left" color="#000000" schRotation={0} />
              <schematictext schX={0.24} schY={-0.8} text="1.65-5.5V" fontSize={0.1} anchor="left" color="#000000" schRotation={0} />
              <port name="pin6" pinNumber={6} aliases={["NC1"]} direction="up" schX={-0.8} schY={1.3} schStemLength={0.2} />
              <port name="pin9" pinNumber={9} aliases={["NC2"]} direction="up" schX={0.8} schY={1.3} schStemLength={0.2} />
              <schematictext schX={0.06} schY={1.658} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C60708"
      ]
    }}
          manufacturerPartNumber="TXB0104PWR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-1.949958mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-1.299972mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.649986mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0.649986mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="1.299972mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="1.949958mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="1.949958mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="1.299972mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="0.649986mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="0mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-0.649986mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-1.299972mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-1.949958mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
    <silkscreenpath route={[{"x":2.4999949999999984,"y":1.7432782000000202},{"x":2.4999949999999984,"y":-1.7401539999999898}]} />
    <silkscreenpath route={[{"x":-2.5146000000000015,"y":0.6858000000000004},{"x":-2.5146000000000015,"y":1.7432782000000202}]} />
    <silkscreenpath route={[{"x":-2.5146000000000015,"y":-1.6001999999999867},{"x":-2.5146000000000015,"y":-0.6857999999999862}]} />
    <silkscreenpath route={[{"x":-2.5146000000000015,"y":-1.7401539999999898},{"x":2.4999949999999984,"y":-1.7401539999999898}]} />
    <silkscreenpath route={[{"x":-2.5146000000000015,"y":1.7432782000000202},{"x":2.4999949999999984,"y":1.7432782000000202}]} />
    <silkscreenpath route={[{"x":-2.5146000000000015,"y":0.6858000000000004},{"x":-2.2800426027520473,"y":0.6444411824873129},{"x":-2.0737762936569197,"y":0.525353256474375},{"x":-1.9206798308624684,"y":0.34289998171723823},{"x":-1.839218905095663,"y":0.11908791331384805},{"x":-1.839218905095663,"y":-0.11908791331383384},{"x":-1.9206798308624684,"y":-0.3428999817172098},{"x":-2.0737762936569197,"y":-0.5253532564743608},{"x":-2.2800426027520473,"y":-0.6444411824872986},{"x":-2.5146000000000015,"y":-0.6857999999999862}]} />
    <silkscreencircle pcbX="-1.6299942mm" pcbY="-1.1100054mm" radius="0.199898mm" />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="4.6576mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-1.8140679999999918,"y":-3.661917999999986},{"x":-1.8169475178787735,"y":-3.691154235657322},{"x":-1.8254754132578483,"y":-3.7192669391742186},{"x":-1.8393239639003411,"y":-3.7451757551203},{"x":-1.8579609777713841,"y":-3.7678850222285973},{"x":-1.8806702448796813,"y":-3.7865220360996403},{"x":-1.906579060825763,"y":-3.800370586742133},{"x":-1.9346917643426593,"y":-3.808898482121208},{"x":-1.9639279999999957,"y":-3.8117779999999897},{"x":-1.993164235657332,"y":-3.808898482121208},{"x":-2.0212769391742285,"y":-3.800370586742133},{"x":-2.04718575512031,"y":-3.7865220360996403},{"x":-2.069895022228607,"y":-3.7678850222285973},{"x":-2.08853203609965,"y":-3.7451757551203},{"x":-2.102380586742143,"y":-3.7192669391742186},{"x":-2.110908482121218,"y":-3.691154235657322},{"x":-2.1137879999999996,"y":-3.661917999999986},{"x":-2.110908482121218,"y":-3.6326817643426494},{"x":-2.102380586742143,"y":-3.604569060825753},{"x":-2.08853203609965,"y":-3.5786602448796714},{"x":-2.069895022228607,"y":-3.5559509777713743},{"x":-2.04718575512031,"y":-3.5373139639003313},{"x":-2.0212769391742285,"y":-3.5234654132578385},{"x":-1.993164235657332,"y":-3.5149375178787636},{"x":-1.9639279999999957,"y":-3.512057999999982},{"x":-1.9346917643426593,"y":-3.5149375178787636},{"x":-1.906579060825763,"y":-3.5234654132578385},{"x":-1.8806702448796813,"y":-3.5373139639003313},{"x":-1.8579609777713841,"y":-3.5559509777713743},{"x":-1.8393239639003411,"y":-3.5786602448796714},{"x":-1.8254754132578483,"y":-3.604569060825753},{"x":-1.8169475178787735,"y":-3.6326817643426494},{"x":-1.8140679999999918,"y":-3.661917999999986}]} strokeWidth="0.2999994mm" />
    <courtyardoutline outline={[{"x":-2.749994999999984,"y":3.9000943000000063},{"x":2.7499949999999984,"y":3.9000943000000063},{"x":2.7499949999999984,"y":-3.900094299999992},{"x":-2.749994999999984,"y":-3.900094299999992},{"x":-2.749994999999984,"y":3.9000943000000063}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C60708.obj?uuid=5377177da492449fa1a3111d646cac17",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C60708.step?uuid=5377177da492449fa1a3111d646cac17",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.000012700000013410317, y: 0, z: -0.069083 },
          }}
          {...props}
        />
      )
    }"
  `)
})
