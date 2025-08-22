import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C5248081.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C5248081 into typescript file", async () => {
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
      pin1: ["GND"],
      pin2: ["VCC"],
      pin3: ["SCL"],
      pin4: ["SDA"]
    } as const

    export const HS91L02W2C01 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5248081"
      ]
    }}
          manufacturerPartNumber="HS91L02W2C01"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="-3.8099999999999454mm" outerDiameter="1.5999967999999998mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-1.2699999999999818mm" outerDiameter="1.5999967999999998mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="1.2699999999999818mm" outerDiameter="1.5999967999999998mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="0mm" pcbY="3.810000000000059mm" outerDiameter="1.5999967999999998mm" holeDiameter="0.9999979999999999mm" shape="circle" />
    <silkscreenpath route={[{"x":-1.4999970000000076,"y":5.999987999999917},{"x":36.49992699999984,"y":5.999987999999917},{"x":36.49992699999984,"y":-5.999987999999917},{"x":-1.4999970000000076,"y":-5.999987999999917},{"x":-1.4999970000000076,"y":5.999987999999917}]} />
    <silkscreentext text="1" pcbX="1.659127999999896mm" pcbY="-5.676899999999932mm" anchorAlignment="bottom_left" fontSize="2.032mm" />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=9018832d564840e08b96db89bf75c8cc&pn=C5248081",
            rotationOffset: { x: 180, y: 0, z: 0 },
            positionOffset: { x: 17.499964999999975, y: 0, z: 1.8 },
          }}
          {...props}
        />
      )
    }"
  `)
})
