import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19795120.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C19795120 into typescript file", async () => {
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
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"]
    } as const

    export const A_470533000 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C19795120"
      ]
    }}
          manufacturerPartNumber="A_470533000"
          footprint={<footprint>
            <hole pcbX="-1.2700000000000955mm" pcbY="-1.4850046000000248mm" diameter="1.2499848mm" />
    <platedhole  portHints={["pin1"]} pcbX="3.8099999999999454mm" pcbY="0.6750114000000167mm" outerDiameter="1.7199864000000002mm" holeDiameter="1.0200131999999997mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="1.2699999999998681mm" pcbY="0.6750114000000167mm" outerDiameter="1.7199864000000002mm" holeDiameter="1.0200131999999997mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-1.2700000000000955mm" pcbY="0.6750114000000167mm" outerDiameter="1.7199864000000002mm" holeDiameter="1.0200131999999997mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-3.810000000000059mm" pcbY="0.6750114000000167mm" outerDiameter="1.7199864000000002mm" holeDiameter="1.0200131999999997mm" shape="circle" />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":2.2696488000000272},{"x":5.0799999999998136,"y":2.2696488000000272}]} />
    <silkscreenpath route={[{"x":-1.9940778000001274,"y":-1.864988599999947},{"x":-5.080000000000041,"y":-1.864988599999947}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-1.864988599999947},{"x":-5.080000000000041,"y":3.9770114000000376},{"x":5.0799999999998136,"y":3.9770114000000376},{"x":5.0799999999998136,"y":-1.864988599999947},{"x":-0.5459222000001773,"y":-1.864988599999947}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=9a93067adc7a4c82860f56e3024924ad&pn=C19795120",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: -1.1368683772161603e-13, y: 1.0550208000000794, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
