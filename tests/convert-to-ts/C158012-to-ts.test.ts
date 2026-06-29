import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C158012.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C158012 into typescript file", async () => {
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
    camPos: [20, 7, 20],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const B2B_XH_A_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C158012"
      ]
    }}
          manufacturerPartNumber="B2B_XH_A_LF__SN_"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="1.2499975mm" pcbY="0mm" outerDiameter="1.6999966mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-1.2499975mm" pcbY="0mm" outerDiameter="1.6999966mm" holeDiameter="0.999998mm" shape="circle" />
    <silkscreenpath route={[{"x":3.6829872999999225,"y":-2.413000000000011},{"x":3.6829872999999225,"y":-2.158999999999878}]} />
    <silkscreenpath route={[{"x":-3.6830127000001767,"y":-2.413000000000011},{"x":-3.6830127000001767,"y":-2.158999999999878}]} />
    <silkscreenpath route={[{"x":3.6829872999999225,"y":-2.413000000000011},{"x":2.5399872999998934,"y":-2.413000000000011}]} />
    <silkscreenpath route={[{"x":-1.270012700000052,"y":-2.413000000000011},{"x":1.2699872999997979,"y":-2.413000000000011}]} />
    <silkscreenpath route={[{"x":-3.6830127000001767,"y":-2.413000000000011},{"x":-2.6670127000001003,"y":-2.413000000000011}]} />
    <silkscreenpath route={[{"x":-3.6830127000001767,"y":-1.0159999999999627},{"x":-3.6830127000001767,"y":3.4289999999999736}]} />
    <silkscreenpath route={[{"x":-3.6830127000001767,"y":3.4289999999999736},{"x":3.6829872999999225,"y":3.4289999999999736},{"x":3.6829872999999225,"y":-1.0159999999999627}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0000127mm" pcbY="4.556mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-4.060012700000129,"y":3.80600000000004},{"x":4.059987299999875,"y":3.80600000000004},{"x":4.059987299999875,"y":-2.7899999999999636},{"x":-4.060012700000129,"y":-2.7899999999999636},{"x":-4.060012700000129,"y":3.80600000000004}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C158012.obj?uuid=417e395cbf3443fdb9642576696e80a3",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C158012.step?uuid=417e395cbf3443fdb9642576696e80a3",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 1.2499999999997726, y: 2.72549270000003, z: -1.800005 },
          }}
          {...props}
        />
      )
    }"
  `)
})
