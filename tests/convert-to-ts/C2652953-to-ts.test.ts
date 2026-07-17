import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2652953.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/circuit-json-util"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C2652953 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })
  const circuitJson = await runTscircuitCode(
    `
    ${result}
    export default () => (
      <board width="10mm" height="10mm">
        <TXS0104EQPWRQ1 name="U_LCB1" />
      </board>
    )
    `,
  )
  expect(
    su(circuitJson)
      .pcb_silkscreen_text.list()
      .some((t) => t.text === "U_LCB1"),
  ).toBe(true)
  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // const circuitJson = await runTscircuitCode(
  //   wrapTsxWithBoardFor3dSnapshot(result),
  // )
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

    export const TXS0104EQPWRQ1 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematiccircle center={{ x: -8.89, y: 9.398 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <schematicrect schX={0} schY={0} width={20.32} height={21.336} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -8.89, y: 9.398 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["VCCA"]} direction="left" schX={-12.7} schY={7.62} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["A1"]} direction="left" schX={-12.7} schY={5.08} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["A2"]} direction="left" schX={-12.7} schY={2.54} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["A3"]} direction="left" schX={-12.7} schY={0} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["A4"]} direction="left" schX={-12.7} schY={-2.54} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["NC1","NC"]} direction="left" schX={-12.7} schY={-5.08} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["GND"]} direction="left" schX={-12.7} schY={-7.62} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["OE"]} direction="right" schX={12.7} schY={-7.62} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["NC2","NC"]} direction="right" schX={12.7} schY={-5.08} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["B4"]} direction="right" schX={12.7} schY={-2.54} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["B3"]} direction="right" schX={12.7} schY={0} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["B2"]} direction="right" schX={12.7} schY={2.54} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["B1"]} direction="right" schX={12.7} schY={5.08} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["VCCB"]} direction="right" schX={12.7} schY={7.62} schStemLength={2.54} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C2652953"
      ]
    }}
          manufacturerPartNumber="TXS0104EQPWRQ1"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-2.799969mm" pcbY="1.949958mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-2.799969mm" pcbY="1.299972mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-2.799969mm" pcbY="0.649986mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-2.799969mm" pcbY="0mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-2.799969mm" pcbY="-0.649986mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-2.799969mm" pcbY="-1.299972mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-2.799969mm" pcbY="-1.949958mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="2.799969mm" pcbY="-1.949958mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="2.799969mm" pcbY="-1.299972mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="2.799969mm" pcbY="-0.649986mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="2.799969mm" pcbY="0mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="2.799969mm" pcbY="0.649986mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="2.799969mm" pcbY="1.299972mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="2.799969mm" pcbY="1.949958mm" width="1.6999966mm" height="0.3999992mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.60014919999999,"y":2.514574599999989},{"x":-0.6857492000000036,"y":2.514574599999989}]} />
    <silkscreenpath route={[{"x":0.6858508000000114,"y":2.514574599999989},{"x":1.6002507999999978,"y":2.514574599999989}]} />
    <silkscreenpath route={[{"x":2.2500590000000074,"y":2.4999696000000142},{"x":2.2500590000000074,"y":2.3843233999999995}]} />
    <silkscreenpath route={[{"x":2.2500590000000074,"y":-2.3843741999999963},{"x":2.2500590000000074,"y":-2.500020399999997},{"x":-2.2499573999999996,"y":-2.500020399999997},{"x":-2.2499573999999996,"y":-2.3843741999999963}]} />
    <silkscreenpath route={[{"x":-2.2499573999999996,"y":2.3843233999999995},{"x":-2.2499573999999996,"y":2.4999696000000142}]} />
    <silkscreenpath route={[{"x":1.6002507999999978,"y":2.514574599999989},{"x":2.2500590000000074,"y":2.514574599999989}]} />
    <silkscreenpath route={[{"x":-1.60014919999999,"y":2.514574599999989},{"x":-2.2499573999999996,"y":2.514574599999989}]} />
    <silkscreenpath route={[{"x":0.6858508000000114,"y":2.514574599999989},{"x":-0.6857492000000036,"y":2.514574599999989}]} />
    <silkscreenpath route={[{"x":-2.8497529999999927,"y":2.75005800000001},{"x":-2.8548680105124618,"y":2.7112056378635003},{"x":-2.869864462536313,"y":2.675001000000009},{"x":-2.893720372648957,"y":2.6439113726489722},{"x":-2.924810000000008,"y":2.6200554625362997},{"x":-2.961014637863485,"y":2.6050590105124627},{"x":-2.999867000000009,"y":2.599944000000008},{"x":-3.0387193621365185,"y":2.6050590105124627},{"x":-3.0749239999999958,"y":2.6200554625362997},{"x":-3.1060136273510466,"y":2.6439113726489722},{"x":-3.129869537463705,"y":2.675001000000009},{"x":-3.144865989487556,"y":2.7112056378635003},{"x":-3.149981000000011,"y":2.75005800000001},{"x":-3.144865989487556,"y":2.7889103621365194},{"x":-3.129869537463705,"y":2.825115000000011},{"x":-3.1060136273510466,"y":2.8562046273510475},{"x":-3.0749239999999958,"y":2.880060537463706},{"x":-3.0387193621365185,"y":2.895056989487557},{"x":-2.999867000000009,"y":2.900172000000012},{"x":-2.961014637863485,"y":2.895056989487557},{"x":-2.924810000000008,"y":2.880060537463706},{"x":-2.893720372648957,"y":2.8562046273510475},{"x":-2.869864462536313,"y":2.825115000000011},{"x":-2.8548680105124618,"y":2.7889103621365194},{"x":-2.8497529999999927,"y":2.75005800000001}]} />
    <silkscreentext text="{NAME}" pcbX="-0.014605mm" pcbY="3.893568mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.90950500000001,"y":3.143568000000002},{"x":3.8802949999999896,"y":3.143568000000002},{"x":3.8802949999999896,"y":-2.7666320000000013},{"x":-3.90950500000001,"y":-2.7666320000000013},{"x":-3.90950500000001,"y":3.143568000000002}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2652953.obj?uuid=5377177da492449fa1a3111d646cac17",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2652953.step?uuid=5377177da492449fa1a3111d646cac17",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.00006349999999599731, y: 0.00002539999998418807, z: -0.069083 },
          }}
          {...props}
        />
      )
    }"
  `)
  const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson)
  expect(pcbSvg).toMatchSvgSnapshot(import.meta.path)
}, 20000)
