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
  expect(result).toContain("pin1: {requiresGround: true}")
  expect(result).toContain("pin8: {requiresPower: true}")
  expect(result).toContain("pinAttributes={pinAttributes}")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const groundPort = sourcePorts.find((element) => element.pin_number === 1)
  const powerPort = sourcePorts.find((element) => element.pin_number === 8)

  expect(groundPort?.requires_ground).toBe(true)
  expect(powerPort?.requires_power).toBe(true)
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

    const pinAttributes = {
      pin1: {requiresGround: true},
      pin8: {requiresPower: true}
    } as const

    export const NE555P = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C46749"
      ]
    }}
          manufacturerPartNumber="NE555P"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="-3.81mm" pcbY="3.81mm" holeWidth="0.9000236mm" holeHeight="0.9000236mm" outerWidth="1.499997mm" outerHeight="1.499997mm" rectPad={true} pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="-3.81mm" pcbY="1.27mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-3.81mm" pcbY="-1.27mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-3.81mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="3.81mm" pcbY="3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="3.81mm" pcbY="1.27mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="3.81mm" pcbY="-1.27mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="3.81mm" pcbY="-3.81mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <silkscreenpath route={[{"x":0.640004,"y":4.939995},{"x":0.635,"y":4.9403},{"x":2.64922,"y":4.9403},{"x":2.64922,"y":-4.96062},{"x":-2.64922,"y":-4.96062},{"x":-2.64922,"y":4.9403},{"x":-0.635,"y":4.9403},{"x":-0.640004,"y":4.939995}]} />
    <silkscreenpath route={[{"x":-0.640004,"y":4.939995},{"x":-0.591667,"y":4.696991},{"x":-0.454017,"y":4.490982},{"x":-0.248008,"y":4.353332},{"x":-0.005004,"y":4.304995},{"x":0.238,"y":4.353332},{"x":0.444009,"y":4.490982},{"x":0.58166,"y":4.696991},{"x":0.629996,"y":4.939995}]} />
    <silkscreenpath route={[{"x":-3.81,"y":5.23494},{"x":-3.933722,"y":5.109318},{"x":-3.80873,"y":4.98496},{"x":-3.683738,"y":5.109318},{"x":-3.80746,"y":5.23494}]} />
    <silkscreenpath route={[{"x":-1.651,"y":4.45008},{"x":-1.861934,"y":4.360872},{"x":-1.948457,"y":4.148821},{"x":-1.860142,"y":3.937511},{"x":-1.64846,"y":3.850092},{"x":-1.436778,"y":3.937511},{"x":-1.348463,"y":4.148821},{"x":-1.434986,"y":4.360872},{"x":-1.64592,"y":4.45008}]} />
    <silkscreentext text="{NAME}" pcbX="5.572mm" pcbY="0.3556mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":4.809998,"y":5.192992},{"x":4.809998,"y":-5.106988},{"x":-4.809999,"y":-5.106988},{"x":-4.809999,"y":5.192992},{"x":4.809998,"y":5.192992}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46749.obj?uuid=5e8e9a2e75ff40abab9e1f1cacdd2cbb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46749.step?uuid=5e8e9a2e75ff40abab9e1f1cacdd2cbb",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0.000013, y: -0.043002, z: -0.5500069999999995 },
          }}
          {...props}
        />
      )
    }"
  `)
})
