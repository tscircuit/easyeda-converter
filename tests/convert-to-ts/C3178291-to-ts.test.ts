import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C3178291.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C3178291 into typescript file", async () => {
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
            <smtpad portHints={["pin10"]} pcbX="0.7682738mm" pcbY="0.7999984mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.5683738mm" pcbY="0.7999984mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.5683738mm" pcbY="-0.0001016mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-0.0318262mm" pcbY="0.7999984mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.8316722mm" pcbY="0.7999984mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.6317722mm" pcbY="-0.0001016mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-1.6317722mm" pcbY="0.7999984mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.6317722mm" pcbY="-0.7999476mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.8316722mm" pcbY="-0.7999476mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin1"]} points={[{x: "1.2507722mm", y: "-0.5459984mm"}, {x: "1.8857722mm", y: "-0.5459984mm"}, {x: "1.8857722mm", y: "-0.7999984mm"}, {x: "1.7587722mm", y: "-0.7999984mm"}, {x: "1.7587722mm", y: "-1.0539984mm"}, {x: "1.2507722mm", y: "-1.0539984mm"}, {x: "1.2507722mm", y: "-0.5459984mm"}]} shape="polygon" />
    <smtpad portHints={["pin2"]} pcbX="0.7682738mm" pcbY="-0.7999476mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.0318262mm" pcbY="-0.7999476mm" width="0.508mm" height="0.508mm" shape="rect" />
    <silkscreenpath route={[{"x":1.8734278000001723,"y":-1.6511016000001746},{"x":1.8691003799388,"y":-1.6839716187280374},{"x":1.856413026280734,"y":-1.714601600000151},{"x":1.8362303612108235,"y":-1.7409041612107785},{"x":1.809927800000196,"y":-1.761086826280689},{"x":1.779297818728196,"y":-1.773774179938755},{"x":1.7464278000002196,"y":-1.7781016000001273},{"x":1.7135577812721294,"y":-1.773774179938755},{"x":1.6829278000002432,"y":-1.761086826280689},{"x":1.6566252387893883,"y":-1.7409041612107785},{"x":1.6364425737195916,"y":-1.714601600000151},{"x":1.6237552200614118,"y":-1.6839716187280374},{"x":1.6194278000002669,"y":-1.6511016000001746},{"x":1.6237552200614118,"y":-1.6182315812720844},{"x":1.6364425737195916,"y":-1.5876016000001982},{"x":1.6566252387893883,"y":-1.5612990387893433},{"x":1.6829278000002432,"y":-1.5411163737195466},{"x":1.7135577812721294,"y":-1.5284290200613668},{"x":1.7464278000002196,"y":-1.5241015999999945},{"x":1.779297818728196,"y":-1.5284290200613668},{"x":1.809927800000196,"y":-1.5411163737195466},{"x":1.8362303612108235,"y":-1.5612990387893433},{"x":1.856413026280734,"y":-1.5876016000001982},{"x":1.8691003799388,"y":-1.6182315812720844},{"x":1.8734278000001723,"y":-1.6511016000001746}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0442722mm" pcbY="2.2825984mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.542172199999868,"y":1.5325983999999835},{"x":2.4536278000000493,"y":1.5325983999999835},{"x":2.4536278000000493,"y":-2.0154016000000183},{"x":-2.542172199999868,"y":-2.0154016000000183},{"x":-2.542172199999868,"y":1.5325983999999835}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3178291.obj?uuid=f3ceff5efad3481c85905821fe6f8192",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3178291.step?uuid=f3ceff5efad3481c85905821fe6f8192",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.03168649999997797, y: -0.000038099999983387534, z: -0.31 },
          }}
          {...props}
        />
      )
    }"
  `)
})
