import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19795120.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C19795120 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [10, 10, 40],
  })

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
            <hole pcbX="-1.27mm" pcbY="-1.4850046mm" diameter="1.2499848mm" />
    <platedhole  portHints={["pin1"]} pcbX="3.81mm" pcbY="0.6750114mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="1.27mm" pcbY="0.6750114mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-1.27mm" pcbY="0.6750114mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-3.81mm" pcbY="0.6750114mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":2.2696488000000272},{"x":5.0799999999998136,"y":2.2696488000000272}]} />
    <silkscreenpath route={[{"x":-1.9940778000001274,"y":-1.864988599999947},{"x":-5.080000000000041,"y":-1.864988599999947}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-1.864988599999947},{"x":-5.080000000000041,"y":3.9770114000000376},{"x":5.0799999999998136,"y":3.9770114000000376},{"x":5.0799999999998136,"y":-1.864988599999947},{"x":-0.5459222000001773,"y":-1.864988599999947}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="4.9770114mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.380800000000022,"y":4.227011400000038},{"x":5.3554000000000315,"y":4.227011400000038},{"x":5.3554000000000315,"y":-2.622988599999985},{"x":-5.380800000000022,"y":-2.622988599999985},{"x":-5.380800000000022,"y":4.227011400000038}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19795120.obj?uuid=9a93067adc7a4c82860f56e3024924ad",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19795120.step?uuid=9a93067adc7a4c82860f56e3024924ad",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.6350208000000792, z: -3.295008 },
          }}
          {...props}
        />
      )
    }"
  `)
})
