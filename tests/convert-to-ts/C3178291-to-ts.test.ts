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
            <smtpad portHints={["pin10"]} pcbX="0.7682738000000882mm" pcbY="0.7999983999999358mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.568373800000245mm" pcbY="0.7999983999999358mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.568373800000245mm" pcbY="-0.00010160000010728254mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-0.03182619999995495mm" pcbY="0.7999983999999358mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.8316721999998435mm" pcbY="0.7999983999999358mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.6317721999998867mm" pcbY="-0.00010160000010728254mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-1.6317721999998867mm" pcbY="0.7999983999999358mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.6317721999998867mm" pcbY="-0.7999475999999959mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.8316721999998435mm" pcbY="-0.7999475999999959mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin1"]} points={[{x: "1.2507722000001422mm", y: "-0.5459984000001441mm"}, {x: "1.8857722000000194mm", y: "-0.5459984000001441mm"}, {x: "1.8857722000000194mm", y: "-0.7999984000000495mm"}, {x: "1.7587722000000667mm", y: "-0.7999984000000495mm"}, {x: "1.7587722000000667mm", y: "-1.0539984000000686mm"}, {x: "1.2507722000001422mm", y: "-1.0539984000000686mm"}, {x: "1.2507722000001422mm", y: "-0.5459984000001441mm"}]} shape="polygon" />
    <smtpad portHints={["pin2"]} pcbX="0.7682738000000882mm" pcbY="-0.7999475999999959mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.03182619999995495mm" pcbY="-0.7999475999999959mm" width="0.508mm" height="0.508mm" shape="rect" />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=f3ceff5efad3481c85905821fe6f8192&pn=C3178291",
            rotationOffset: { x: 180, y: 0, z: 0 },
            positionOffset: { x: -0.03169919999982085, y: 0.000025400000026820635, z: 2.0499975 },
          }}
          {...props}
        />
      )
    }"
  `)
})
