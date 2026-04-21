import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2848306.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2848306 into typescript file", async () => {
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
      pin1: ["SDA"],
      pin2: ["SCL"],
      pin3: ["VDD"],
      pin4: ["VSS"],
      pin5: ["EP"]
    } as const

    export const SHT40_AD1B_R3 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2848306"
      ]
    }}
          manufacturerPartNumber="SHT40_AD1B_R3"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.677418mm" pcbY="0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.677418mm" pcbY="-0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.677418mm" pcbY="-0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.677418mm" pcbY="0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0mm" pcbY="-0mm" width="0.3999992mm" height="1.0999978mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":0.8261857999999904},{"x":0.8262111999999888,"y":0.8261857999999904}]} />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":-0.826211200000003},{"x":0.8262111999999888,"y":-0.826211200000003}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0508mm" pcbY="1.8382mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.29140000000001,"y":1.0882000000000005},{"x":1.189799999999991,"y":1.0882000000000005},{"x":1.189799999999991,"y":-1.06280000000001},{"x":-1.29140000000001,"y":-1.06280000000001},{"x":-1.29140000000001,"y":1.0882000000000005}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2848306.obj?uuid=09d63d3bb21a495aa100cde68133c9fa",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2848306.step?uuid=09d63d3bb21a495aa100cde68133c9fa",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.000012700000013410317, y: -0.000012699999999199463, z: -0.01 },
          }}
          {...props}
        />
      )
    }"
  `)
})
