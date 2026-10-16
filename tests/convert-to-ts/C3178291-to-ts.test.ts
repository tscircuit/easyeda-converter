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

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin4: {requiresGround: true},
      pin6: {requiresGround: true},
      pin12: {requiresGround: true}
    } as const

    export const VL53L4CDV0DH_1 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C3178291"
      ]
    }}
          manufacturerPartNumber="VL53L4CDV0DH/1"
          footprint={<footprint>
            <smtpad portHints={["pin10"]} pcbX="0.768096mm" pcbY="0.8001mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.568196mm" pcbY="0.8001mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.568196mm" pcbY="-0mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-0.032004mm" pcbY="0.8001mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.83185mm" pcbY="0.8001mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.63195mm" pcbY="-0mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-1.63195mm" pcbY="0.8001mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.63195mm" pcbY="-0.799846mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.83185mm" pcbY="-0.799846mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin1"]} points={[{x: "1.2505944mm", y: "-0.5458968mm"}, {x: "1.8855944mm", y: "-0.5458968mm"}, {x: "1.8855944mm", y: "-0.7998968mm"}, {x: "1.7585944mm", y: "-0.7998968mm"}, {x: "1.7585944mm", y: "-1.0538968mm"}, {x: "1.2505944mm", y: "-1.0538968mm"}, {x: "1.2505944mm", y: "-0.5458968mm"}]} shape="polygon" />
    <smtpad portHints={["pin2"]} pcbX="0.768096mm" pcbY="-0.799846mm" width="0.508mm" height="0.508mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.032004mm" pcbY="-0.799846mm" width="0.508mm" height="0.508mm" shape="rect" />
    <silkscreencircle pcbX="1.74625mm" pcbY="-1.651mm" radius="0.127mm" />
    <silkscreenrect pcbX="0mm" pcbY="0mm" width="4.3815mm" height="2.54mm" strokeWidth="0.0999998mm" />
    <silkscreentext text="{NAME}" pcbX="-0.04445mm" pcbY="2.2827mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":2.1272500000000036,"y":-1.524000000000001},{"x":2.1248097306112186,"y":-1.5487764708960867},{"x":2.1175827006289865,"y":-1.5726007959103754},{"x":2.105846640762479,"y":-1.5945574195934569},{"x":2.0900525612107685,"y":-1.6138025612107185},{"x":2.070807419593507,"y":-1.6295966407624292},{"x":2.0488507959104254,"y":-1.6413327006289364},{"x":2.0250264708961367,"y":-1.6485597306111686},{"x":2.000250000000051,"y":-1.6509999999999536},{"x":1.9754735291039651,"y":-1.6485597306111686},{"x":1.9516492040896765,"y":-1.6413327006289364},{"x":1.929692580406595,"y":-1.6295966407624292},{"x":1.9104474387893333,"y":-1.6138025612107185},{"x":1.8946533592376227,"y":-1.5945574195934569},{"x":1.8829172993711154,"y":-1.5726007959103754},{"x":1.8756902693888833,"y":-1.5487764708960867},{"x":1.8732500000000982,"y":-1.524000000000001},{"x":1.8756902693888833,"y":-1.499223529103915},{"x":1.8829172993711154,"y":-1.4753992040896264},{"x":1.8946533592376227,"y":-1.453442580406545},{"x":1.9104474387893333,"y":-1.4341974387892833},{"x":1.929692580406595,"y":-1.4184033592375727},{"x":1.9516492040896765,"y":-1.4066672993710654},{"x":1.9754735291039651,"y":-1.3994402693888333},{"x":2.000250000000051,"y":-1.3970000000000482},{"x":2.0250264708961367,"y":-1.3994402693888333},{"x":2.0488507959104254,"y":-1.4066672993710654},{"x":2.070807419593507,"y":-1.4184033592375727},{"x":2.0900525612107685,"y":-1.4341974387892833},{"x":2.105846640762479,"y":-1.453442580406545},{"x":2.1175827006289865,"y":-1.4753992040896264},{"x":2.1248097306112186,"y":-1.499223529103915},{"x":2.1272500000000036,"y":-1.524000000000001}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-2.5318598000000065,"y":1.5001371999999265},{"x":2.468131200000016,"y":1.5001371999999265},{"x":2.468131200000016,"y":-1.4998578000000862},{"x":-2.5318598000000065,"y":-1.4998578000000862},{"x":-2.5318598000000065,"y":1.5001371999999265}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3178291.obj?uuid=f3ceff5efad3481c85905821fe6f8192",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3178291.step?uuid=f3ceff5efad3481c85905821fe6f8192",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.031864300000052026, y: -0.00013969999997698324, z: -0.31 },
          }}
          {...props}
        />
      )
    }"
  `)
})
