import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C46749.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C46749 into typescript file", async () => {
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
      pin1: ["GND"],
      pin2: ["TRIG"],
      pin3: ["OUT"],
      pin4: ["RESET"],
      pin5: ["CONT"],
      pin6: ["THRES"],
      pin7: ["DISCH"],
      pin8: ["VCC"]
    } as const

    export const NE555P = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C46749"
      ]
    }}
          manufacturerPartNumber="NE555P"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="-3.81mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-1.27mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="1.27mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="3.81mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="-3.81mm" pcbY="3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="-1.27mm" pcbY="3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="1.27mm" pcbY="3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="3.81mm" pcbY="3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <silkscreenpath route={[{"x":-4.9399951999999985,"y":0.640003800000045},{"x":-4.940299999999979,"y":0.6350000000001046},{"x":-4.940299999999979,"y":2.649220000000014},{"x":4.960620000000063,"y":2.649220000000014},{"x":4.960620000000063,"y":-2.6492199999999},{"x":-4.940299999999979,"y":-2.6492199999999},{"x":-4.940299999999979,"y":-0.6349999999999909},{"x":-4.9399951999999985,"y":-0.6400037999999313}]} />
    <silkscreenpath route={[{"x":-4.9399951999999985,"y":-0.6400037999999313},{"x":-5.182999179551871,"y":-0.5916673031445043},{"x":-5.389008006053473,"y":-0.4540166060533011},{"x":-5.526658703144676,"y":-0.24800777955169906},{"x":-5.574995200000103,"y":-0.005003799999826697},{"x":-5.526658703144676,"y":0.2380001795518183},{"x":-5.389008006053473,"y":0.4440090060536477},{"x":-5.182999179551871,"y":0.5816597031448509},{"x":-4.9399951999999985,"y":0.6299962000000505}]} />
    <silkscreenpath route={[{"x":-5.234940000000051,"y":-3.8099999999999454},{"x":-5.360561956087622,"y":-3.933721786962792},{"x":-5.484920347892739,"y":-3.808729999999855},{"x":-5.360561956087622,"y":-3.6837382130370315},{"x":-5.234940000000051,"y":-3.8074599999997645}]} />
    <silkscreenpath route={[{"x":-4.450080000000071,"y":-1.65099999999984},{"x":-4.539288359429861,"y":-1.8619343786078844},{"x":-4.751338658499435,"y":-1.9484567117675624},{"x":-4.9626487998291395,"y":-1.8601421170388903},{"x":-5.050068047118998,"y":-1.6484599999997727},{"x":-4.962648799829026,"y":-1.4367778829607687},{"x":-4.751338658499208,"y":-1.3484632882322103},{"x":-4.539288359429861,"y":-1.4349856213918883},{"x":-4.450080000000071,"y":-1.6459199999999328}]} />
    <silkscreentext text="{NAME}" pcbX="-0.3556mm" pcbY="5.572mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.914200000000051,"y":4.822000000000116},{"x":5.2029999999999745,"y":4.822000000000116},{"x":5.2029999999999745,"y":-4.796600000000012},{"x":-5.914200000000051,"y":-4.796600000000012},{"x":-5.914200000000051,"y":4.822000000000116}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46749.obj?uuid=5e8e9a2e75ff40abab9e1f1cacdd2cbb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46749.step?uuid=5e8e9a2e75ff40abab9e1f1cacdd2cbb",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.04300220000004629, y: 0.000012699999842880061, z: -0.5500069999999995 },
          }}
          {...props}
        />
      )
    }"
  `)
})
