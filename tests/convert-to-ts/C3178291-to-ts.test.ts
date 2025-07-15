import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C3178291.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C3178291 into typescript file", async () => {
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
      pin1: ["AVDDVCSEL"],
      pin2: ["AVSSVCSEL"],
      pin3: ["GND"],
      pin4: ["GND2"],
      pin5: ["XSHUT"],
      pin6: ["GND3"],
      pin7: ["GPIO1"],
      pin8: ["DNC"],
      pin9: ["SDA"],
      pin10: ["SCL"],
      pin11: ["AVDD"],
      pin12: ["GND4"]
    } as const

    export const VL53L4CDV0DH_1 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C3178291"
      ]
    }}
          manufacturerPartNumber="VL53L4CDV0DH_1"
          footprint={<footprint>
            <smtpad portHints={["pin10"]} pcbX="0.799972999999909mm" pcbY="0.7999730000000227mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.6000730000000658mm" pcbY="0.7999730000000227mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.6000730000000658mm" pcbY="-0.00012700000002041634mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-0.00012700000013410317mm" pcbY="0.7999730000000227mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.7999730000000227mm" pcbY="0.7999730000000227mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.6000730000000658mm" pcbY="-0.00012700000002041634mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-1.6000730000000658mm" pcbY="0.7999730000000227mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.6000730000000658mm" pcbY="-0.799972999999909mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.7999730000000227mm" pcbY="-0.799972999999909mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.799972999999909mm" pcbY="-0.799972999999909mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.00012700000013410317mm" pcbY="-0.799972999999909mm" width="0.508mm" height="0.508mm" shape="rect" />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=f3ceff5efad3481c85905821fe6f8192&pn=C3178291",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
