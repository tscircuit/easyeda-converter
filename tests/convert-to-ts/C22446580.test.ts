import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C22446580.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

it("should convert C22446580 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["Y4"],
      pin2: ["Y6"],
      pin3: ["Z"],
      pin4: ["Y7"],
      pin5: ["Y5"],
      pin6: ["E"],
      pin7: ["VEE"],
      pin8: ["VSS"],
      pin9: ["A2"],
      pin10: ["A1"],
      pin11: ["A0"],
      pin12: ["Y3"],
      pin13: ["Y0"],
      pin14: ["Y1"],
      pin15: ["Y2"],
      pin16: ["VCC"],
      pin17: ["GND"]
    } as const

    export const A_74HC4051LQ_TR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C22446580"
      ]
    }}
          manufacturerPartNumber="A_74HC4051LQ_TR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-1.4999969999999934mm" pcbY="0.750062000000014mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-1.4999969999999934mm" pcbY="0.24993600000001237mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.4999969999999934mm" pcbY="-0.24993599999999816mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.4999969999999934mm" pcbY="-0.7500619999999998mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-0.7500620000000069mm" pcbY="-1.4999969999999934mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-0.24993600000000527mm" pcbY="-1.4999969999999934mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="0.24993600000000527mm" pcbY="-1.4999969999999934mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="0.7500619999999998mm" pcbY="-1.4999969999999934mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="1.4999970000000076mm" pcbY="-0.7500619999999998mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="1.4999970000000076mm" pcbY="-0.24993599999999816mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.4999970000000076mm" pcbY="0.24993600000001237mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.4999970000000076mm" pcbY="0.750062000000014mm" width="0.7999983999999999mm" height="0.2800096mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="0.7500619999999998mm" pcbY="1.4999970000000005mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="0.24993600000000527mm" pcbY="1.4999970000000005mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-0.24993600000000527mm" pcbY="1.4999970000000005mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-0.7500620000000069mm" pcbY="1.4999970000000005mm" width="0.2800096mm" height="0.7999983999999999mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="0mm" pcbY="7.105427357601002e-15mm" width="1.5999967999999998mm" height="1.5999967999999998mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.7249139999999983,"y":1.275029200000013},{"x":-1.7249139999999983,"y":1.7248632000000086},{"x":-1.2750800000000027,"y":1.7248632000000086}]} />
    <silkscreenpath route={[{"x":1.2750799999999884,"y":1.7248632000000086},{"x":1.7249139999999983,"y":1.7248632000000086},{"x":1.7249139999999983,"y":1.275029200000013}]} />
    <silkscreenpath route={[{"x":1.2750799999999884,"y":-1.724964799999995},{"x":1.7249139999999983,"y":-1.724964799999995},{"x":1.7249139999999983,"y":-1.2751307999999923}]} />
    <silkscreenpath route={[{"x":-1.2750800000000027,"y":-1.724964799999995},{"x":-1.7249139999999983,"y":-1.724964799999995},{"x":-1.7249139999999983,"y":-1.2751307999999923}]} />
    <silkscreenpath route={[{"x":-2.075179999999996,"y":1.5239492000000041},{"x":-1.9245379702960648,"y":1.672690255997665},{"x":-1.775160575985261,"y":1.522679200000006},{"x":-1.9245379702960648,"y":1.372668144002347},{"x":-2.075179999999996,"y":1.521409200000008}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=86016d4675144293b45eabfe7e8ef2ff&pn=C22446580",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: -0.000050799999989692424, z: -1.0999962000000003 },
          }}
          {...props}
        />
      )
    }"
  `)

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
