import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2848306.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C2848306 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

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
            <smtpad portHints={["pin1"]} pcbX="-0.6774179999999888mm" pcbY="0.40004999999999313mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.6774179999999888mm" pcbY="-0.40005000000000734mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.6774179999999888mm" pcbY="-0.40005000000000734mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.6774179999999888mm" pcbY="0.40004999999999313mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0mm" pcbY="-1.4210854715202004e-14mm" width="0.39999919999999994mm" height="1.0999978mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":0.8261857999999904},{"x":0.8262111999999888,"y":0.8261857999999904}]} />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":-0.826211200000003},{"x":0.8262111999999888,"y":-0.826211200000003}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=09d63d3bb21a495aa100cde68133c9fa&pn=C2848306",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: -1.4210854715202004e-14, z: 0.18995550000000638 },
          }}
          {...props}
        />
      )
    }"
  `)
})
