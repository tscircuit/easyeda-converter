import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2843335.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C2843335 into typescript file", async () => {
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
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2843335-to-ts-schematic",
  )

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["N_CS"],
      pin2: ["DO_IO1"],
      pin3: ["WP__IO2"],
      pin4: ["GND"],
      pin5: ["DI_IO0"],
      pin6: ["CLK"],
      pin7: ["HOLD_orRESET__IO3"],
      pin8: ["VCC"],
      pin9: ["EP"]
    } as const

    const pinAttributes = {
      pin4: {requiresGround: true},
      pin8: {requiresPower: true}
    } as const

    export const W25Q16JVUXIQ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2843335"
      ]
    }}
          manufacturerPartNumber="W25Q16JVUXIQ"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.750062mm" pcbY="-1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.249936mm" pcbY="-1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.249936mm" pcbY="-1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.750062mm" pcbY="-1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.750062mm" pcbY="1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-0.249936mm" pcbY="1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="0.249936mm" pcbY="1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0.750062mm" pcbY="1.50749mm" width="0.2800096mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="0mm" pcbY="0mm" width="1.6999966mm" height="0.2999994mm" shape="rect" />
    <silkscreenpath route={[{"x":1.0763249999998834,"y":-1.5760446000000456},{"x":1.0763249999998834,"y":1.5763240000001133}]} />
    <silkscreenpath route={[{"x":-1.0761472000000367,"y":1.5763240000001133},{"x":-1.0761472000000367,"y":-1.5760446000000456}]} />
    <silkscreencircle pcbX="-0.762mm" pcbY="-2.032mm" radius="0.100076mm" />
    <silkscreentext text="{NAME}" pcbX="0.003556mm" pcbY="2.813306mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.2679557999999815,"y":2.0574894000000086},{"x":1.2520553999999038,"y":2.0574894000000086},{"x":1.2520553999999038,"y":-2.0574894000000086},{"x":-1.2679557999999815,"y":-2.0574894000000086},{"x":-1.2679557999999815,"y":2.0574894000000086}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2843335.obj?uuid=2b35e1c3dcc44b77887d4f445b51370a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2843335.step?uuid=2b35e1c3dcc44b77887d4f445b51370a",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.00795020000009572, y: 0.027940000000057807, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
