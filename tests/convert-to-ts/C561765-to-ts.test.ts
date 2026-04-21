import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C561765.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C561765 into typescript file", async () => {
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
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"]
    } as const

    export const A_1053131104 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C561765"
      ]
    }}
          manufacturerPartNumber="A_1053131104"
          footprint={<footprint>
            <hole pcbX="-3.749929mm" pcbY="-4.0150351mm" diameter="1.5999968mm" />
    <hole pcbX="3.749929mm" pcbY="-4.0150351mm" diameter="1.5999968mm" />
    <platedhole  portHints={["pin4"]} pcbX="-3.749929mm" pcbY="3.1650369mm" outerDiameter="1.7999964mm" holeDiameter="1.1999976mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-1.250061mm" pcbY="3.1650369mm" outerDiameter="1.7999964mm" holeDiameter="1.1999976mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="1.250061mm" pcbY="3.1650369mm" outerDiameter="1.7999964mm" holeDiameter="1.1999976mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="3.749929mm" pcbY="3.1650369mm" outerDiameter="1.7999964mm" holeDiameter="1.1999976mm" shape="circle" />
    <silkscreenpath route={[{"x":2.5999694000000773,"y":-8.674969900000065},{"x":2.5999694000000773,"y":-7.234942300000171}]} />
    <silkscreenpath route={[{"x":-2.5999947999998767,"y":-8.674969900000065},{"x":-2.5999947999998767,"y":-7.234942300000171}]} />
    <silkscreenpath route={[{"x":-2.5999947999998767,"y":-8.674969900000065},{"x":2.5999694000000773,"y":-8.674969900000065}]} />
    <silkscreenpath route={[{"x":5.450001800000109,"y":1.2650406999998722},{"x":-5.449976399999969,"y":1.2650406999998722},{"x":-5.449976399999969,"y":-7.234942300000171},{"x":5.450001800000109,"y":-7.234942300000171}]} />
    <silkscreenpath route={[{"x":5.450001800000109,"y":1.2650406999998722},{"x":5.450001800000109,"y":-7.234942300000171}]} />
    <silkscreentext text="{NAME}" pcbX="0.016129mm" pcbY="5.1048369mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.7202709999999115,"y":4.354836899999896},{"x":5.752528999999981,"y":4.354836899999896},{"x":5.752528999999981,"y":-8.946763100000226},{"x":-5.7202709999999115,"y":-8.946763100000226},{"x":-5.7202709999999115,"y":4.354836899999896}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C561765.obj?uuid=b9df3af421404a02b675e13120fa0c0c",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C561765.step?uuid=b9df3af421404a02b675e13120fa0c0c",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.0050000000000003375, y: 2.9399516000000676, z: -1.7900066000000003 },
          }}
          {...props}
        />
      )
    }"
  `)
})
