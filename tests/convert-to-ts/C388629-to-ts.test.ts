import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C388629.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
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
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin4_alt1"]
    } as const

    export const DC_C300_5_5A_2_0 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C388629"
      ]
    }}
          manufacturerPartNumber="DC_C300_5_5A_2_0"
          footprint={<footprint>
            <platedhole  portHints={["pin4"]} pcbX="-6.549999599999978mm" pcbY="-4.999964599999998mm" holeWidth="2.34006136mm" holeHeight="0.9000235999999999mm" outerWidth="2.4999949999999997mm" outerHeight="1.499997mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin5"]} pcbX="6.549999599999978mm" pcbY="-4.999964599999998mm" holeWidth="2.34006136mm" holeHeight="0.9000235999999999mm" outerWidth="2.4999949999999997mm" outerHeight="1.499997mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="0.6500114000001531mm" pcbY="4.399991200000045mm" outerDiameter="2.7999944mm" holeDiameter="1.7000219999999997mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="6.150025800000094mm" pcbY="1.7000474000000168mm" holeWidth="2.34006136mm" holeHeight="0.9000235999999999mm" outerWidth="1.9999959999999999mm" outerHeight="1.2999973999999999mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="-6.349974599999996mm" pcbY="1.599996800000099mm" holeWidth="2.0799958399999996mm" holeHeight="0.7999983999999999mm" outerWidth="2.4999949999999997mm" outerHeight="1.2999973999999999mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":3.864127400000143,"y":2.4998172000000523},{"x":5.101107400000046,"y":2.4998172000000523},{"x":5.101107400000046,"y":2.4998172000000523},{"x":5.101107400000046,"y":-9.40008279999995},{"x":5.101107400000046,"y":-9.40008279999995}]} />
    <silkscreenpath route={[{"x":-4.136872599999833,"y":2.4998172000000523},{"x":-5.310352599999987,"y":2.4998172000000523},{"x":-5.310352599999987,"y":-9.40008279999995}]} />
    <silkscreenpath route={[{"x":-4.136974200000054,"y":2.499994999999899},{"x":3.864025800000036,"y":2.499994999999899}]} />
    <silkscreenpath route={[{"x":-5.4688485999998875,"y":2.699994600000082},{"x":-5.4688485999998875,"y":-9.300006800000006}]} />
    <silkscreenpath route={[{"x":5.268798200000106,"y":2.699994600000082},{"x":5.268798200000106,"y":-9.300006800000006}]} />
    <silkscreenpath route={[{"x":-0.999998000000005,"y":2.699994600000082},{"x":-5.4688485999998875,"y":2.699994600000082},{"x":5.268798200000106,"y":2.699994600000082}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=1290c89544e4464fb2935b860b5e0308&pn=C388629",
            rotationOffset: { x: 180, y: 0, z: 0 },
            positionOffset: { x: -0.12494259999994028, y: -2.1790151999999807, z: 1.8 },
          }}
          {...props}
        />
      )
    }"
  `)
})
