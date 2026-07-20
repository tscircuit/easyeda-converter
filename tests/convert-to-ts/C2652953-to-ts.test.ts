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
