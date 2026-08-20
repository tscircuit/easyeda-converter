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
    <silkscreenpath route={[{"x":1.8732500000000982,"y":-1.651000000000181},{"x":1.868922579938726,"y":-1.6838700187280438},{"x":1.8562352262806598,"y":-1.7145000000001573},{"x":1.8360525612107494,"y":-1.740802561210785},{"x":1.8097500000001219,"y":-1.7609852262806953},{"x":1.779120018728122,"y":-1.7736725799387614},{"x":1.7462500000001455,"y":-1.7780000000001337},{"x":1.7133799812720554,"y":-1.7736725799387614},{"x":1.6827500000001692,"y":-1.7609852262806953},{"x":1.6564474387893142,"y":-1.740802561210785},{"x":1.6362647737195175,"y":-1.7145000000001573},{"x":1.6235774200613378,"y":-1.6838700187280438},{"x":1.6192500000001928,"y":-1.651000000000181},{"x":1.6235774200613378,"y":-1.6181299812720908},{"x":1.6362647737195175,"y":-1.5875000000002046},{"x":1.6564474387893142,"y":-1.5611974387893497},{"x":1.6827500000001692,"y":-1.541014773719553},{"x":1.7133799812720554,"y":-1.5283274200613732},{"x":1.7462500000001455,"y":-1.524000000000001},{"x":1.779120018728122,"y":-1.5283274200613732},{"x":1.8097500000001219,"y":-1.541014773719553},{"x":1.8360525612107494,"y":-1.5611974387893497},{"x":1.8562352262806598,"y":-1.5875000000002046},{"x":1.868922579938726,"y":-1.6181299812720908},{"x":1.8732500000000982,"y":-1.651000000000181}]} />
    <silkscreenrect pcbX="0mm" pcbY="0mm" width="4.3815mm" height="2.54mm" strokeWidth="0.0762mm" />
    <silkscreentext text="{NAME}" pcbX="-0.04445mm" pcbY="2.2827mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.542349999999942,"y":1.532699999999977},{"x":2.4534499999999753,"y":1.532699999999977},{"x":2.4534499999999753,"y":-2.0153000000000247},{"x":-2.542349999999942,"y":-2.0153000000000247},{"x":-2.542349999999942,"y":1.532699999999977}]} />
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
