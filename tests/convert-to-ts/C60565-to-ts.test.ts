import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C60565.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C60565 into typescript file", async () => {
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
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"]
    } as const

    export const A_2_54_2_6PWZ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C60565"
      ]
    }}
          manufacturerPartNumber="A_2_54_2_6PWZ"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="6.350000000000023mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="6.350000000000023mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="3.810000000000059mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="3.810000000000059mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="1.2699999999999818mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="1.2699999999999818mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="-1.2699999999999818mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="-1.2699999999999818mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="-3.8099999999999454mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="-3.8099999999999454mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="-6.350000000000023mm" pcbY="5.819927399999983mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin12"]} pcbX="-6.350000000000023mm" pcbY="3.279927399999906mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <silkscreenpath route={[{"x":-5.92686139999978,"y":-0.7199122000000671},{"x":-5.92686139999978,"y":-6.2965584000000945},{"x":-6.350152399999843,"y":-6.719925600000124},{"x":-6.7734433999999055,"y":-6.2965584000000945},{"x":-6.7734433999999055,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":-3.3868359999997892,"y":-0.7199122000000671},{"x":-3.3868359999997892,"y":-6.2965584000000945},{"x":-3.810126999999852,"y":-6.719925600000124},{"x":-4.233417999999915,"y":-6.2965584000000945},{"x":-4.233417999999915,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":-0.8468613999998524,"y":-0.7199122000000671},{"x":-0.8468613999998524,"y":-6.2965584000000945},{"x":-1.2701523999999154,"y":-6.719925600000124},{"x":-1.693443399999751,"y":-6.2965584000000945},{"x":-1.693443399999751,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":1.6931386000001112,"y":-0.7199122000000671},{"x":1.6931386000001112,"y":-6.2965584000000945},{"x":1.269847600000162,"y":-6.719925600000124},{"x":0.846556600000099,"y":-6.2965584000000945},{"x":0.846556600000099,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":4.2331386000001885,"y":-0.7199122000000671},{"x":4.2331386000001885,"y":-6.2965584000000945},{"x":3.8098476000002393,"y":-6.719925600000124},{"x":3.3865566000001763,"y":-6.2965584000000945},{"x":3.3865566000001763,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":6.773113200000125,"y":-0.7199122000000671},{"x":6.773113200000125,"y":-6.2965584000000945},{"x":6.349822200000062,"y":-6.719900199999984},{"x":5.926531200000113,"y":-6.2965584000000945},{"x":5.926531200000113,"y":-0.7199122000000671}]} />
    <silkscreenpath route={[{"x":-7.6201777999997375,"y":-0.7199122000000671},{"x":-7.6201777999997375,"y":1.7801081999999724}]} />
    <silkscreenpath route={[{"x":7.6198222000002716,"y":-0.7199122000000671},{"x":7.6198222000002716,"y":1.7801081999999724}]} />
    <silkscreenpath route={[{"x":-7.6201777999997375,"y":1.7801081999999724},{"x":7.6198222000002716,"y":1.7801081999999724}]} />
    <silkscreenpath route={[{"x":-7.6201777999997375,"y":-0.7199122000000671},{"x":7.6198222000002716,"y":-0.7199122000000671}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=670d46a764844da2b0a74db8fcf217fc&pn=C60565",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
