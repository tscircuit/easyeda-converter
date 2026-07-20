import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C22446580.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C22446580 into typescript file", async () => {
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
            <smtpad portHints={["pin1"]} pcbX="-1.499997mm" pcbY="0.750062mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-1.499997mm" pcbY="0.249936mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-1.499997mm" pcbY="-0.249936mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-1.499997mm" pcbY="-0.750062mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-0.750062mm" pcbY="-1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-0.249936mm" pcbY="-1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="0.249936mm" pcbY="-1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="0.750062mm" pcbY="-1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="1.499997mm" pcbY="-0.750062mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="1.499997mm" pcbY="-0.249936mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="1.499997mm" pcbY="0.249936mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="1.499997mm" pcbY="0.750062mm" width="0.7999984mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="0.750062mm" pcbY="1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="0.249936mm" pcbY="1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="-0.249936mm" pcbY="1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="-0.750062mm" pcbY="1.499997mm" width="0.2800096mm" height="0.7999984mm" radius="0.1400048mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="0mm" pcbY="0mm" width="1.5999968mm" height="1.5999968mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.7249139999999983,"y":1.275029200000013},{"x":-1.7249139999999983,"y":1.7248632000000086},{"x":-1.2750800000000027,"y":1.7248632000000086}]} />
    <silkscreenpath route={[{"x":1.2750799999999884,"y":1.7248632000000086},{"x":1.7249139999999983,"y":1.7248632000000086},{"x":1.7249139999999983,"y":1.275029200000013}]} />
    <silkscreenpath route={[{"x":1.2750799999999884,"y":-1.724964799999995},{"x":1.7249139999999983,"y":-1.724964799999995},{"x":1.7249139999999983,"y":-1.2751307999999923}]} />
    <silkscreenpath route={[{"x":-1.2750800000000027,"y":-1.724964799999995},{"x":-1.7249139999999983,"y":-1.724964799999995},{"x":-1.7249139999999983,"y":-1.2751307999999923}]} />
    <silkscreenpath route={[{"x":-2.075179999999996,"y":1.5239492000000041},{"x":-1.9245379702960648,"y":1.672690255997665},{"x":-1.775160575985261,"y":1.522679200000006},{"x":-1.9245379702960648,"y":1.372668144002347},{"x":-2.075179999999996,"y":1.521409200000008}]} />
    <silkscreentext text="{NAME}" pcbX="-0.3175mm" pcbY="2.7526mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.637600000000006,"y":2.002600000000001},{"x":2.002600000000001,"y":2.002600000000001},{"x":2.002600000000001,"y":-2.0279999999999987},{"x":-2.637600000000006,"y":-2.0279999999999987},{"x":-2.637600000000006,"y":2.002600000000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22446580.obj?uuid=86016d4675144293b45eabfe7e8ef2ff",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22446580.step?uuid=86016d4675144293b45eabfe7e8ef2ff",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0.000050799999989692424, z: 0.01 },
          }}
          {...props}
        />
      )
    }"
  `)
})
