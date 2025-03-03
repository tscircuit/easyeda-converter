import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C388629.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C388629 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

  expect(result).toMatchInlineSnapshot(`
    "import { createUseComponent } from "@tscircuit/core"
    import type { CommonLayoutProps } from "@tscircuit/props"

    const pinLabels = {
      "pin1": [
        "pin1"
      ],
      "pin2": [
        "pin2"
      ],
      "pin3": [
        "pin3"
      ],
      "pin4": [
        "pin4"
      ],
      "pin5": [
        "pin5",
        "pin4_alt1"
      ]
    } as const

    interface Props extends CommonLayoutProps {
      name: string
    }

    export const DC_C300_5_5A_2_0 = (props: Props) => {
      return (
        <chip
          {...props}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=1290c89544e4464fb2935b860b5e0308&pn=C388629",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: 0, z: 0 },
          }}
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C388629"
      ]
    }}
          manufacturerPartNumber="DC_C300_5_5A_2_0"
          footprint={<footprint>
            <platedhole  portHints={["pin4"]} pcbX="-6.549999599999978mm" pcbY="-4.774977750000062mm" outerDiameter="2.4999949999999997mm" holeDiameter="0.9000235999999999mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="6.549999599999978mm" pcbY="-4.774977750000062mm" outerDiameter="2.4999949999999997mm" holeDiameter="0.9000235999999999mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="0.6500114000001531mm" pcbY="4.6249780499999815mm" outerDiameter="2.7999944mm" holeDiameter="1.7000219999999997mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="6.150025800000094mm" pcbY="1.9250342499999533mm" outerDiameter="1.9999959999999999mm" holeDiameter="0.9000235999999999mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="-6.349974599999996mm" pcbY="1.8249836500000356mm" outerDiameter="2.4999949999999997mm" holeDiameter="0.7999983999999999mm" shape="circle" />
    <silkscreenpath route={[{"x":3.864127400000143,"y":2.724804049999989},{"x":5.101107400000046,"y":2.724804049999989},{"x":5.101107400000046,"y":2.724804049999989},{"x":5.101107400000046,"y":-9.175095950000014},{"x":5.101107400000046,"y":-9.175095950000014}]} />
    <silkscreenpath route={[{"x":-4.136872599999833,"y":2.724804049999989},{"x":-5.310352599999987,"y":2.724804049999989},{"x":-5.310352599999987,"y":-9.175095950000014}]} />
    <silkscreenpath route={[{"x":-4.136974200000054,"y":2.7249818499998355},{"x":3.864025800000036,"y":2.7249818499998355}]} />
    <silkscreenpath route={[{"x":-5.4688485999998875,"y":2.9249814500000184},{"x":-5.4688485999998875,"y":-9.075019950000069}]} />
    <silkscreenpath route={[{"x":5.268798200000106,"y":2.9249814500000184},{"x":5.268798200000106,"y":-9.075019950000069}]} />
    <silkscreenpath route={[{"x":-0.999998000000005,"y":2.9249814500000184},{"x":-5.4688485999998875,"y":2.9249814500000184},{"x":5.268798200000106,"y":2.9249814500000184}]} />
          </footprint>}
        />
      )
    }

    export const useDC_C300_5_5A_2_0 = createUseComponent(DC_C300_5_5A_2_0, pinLabels)"
  `)
})
