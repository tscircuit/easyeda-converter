import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C20526.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("repro: converts C20526 with a schematic snapshot", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C20526-to-ts-schematic",
  )

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["B"],
      pin2: ["E"],
      pin3: ["C"]
    } as const

    export const MMBT3904_RANGE_100_300_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin3" pinNumber={3} aliases={["C"]} direction="up" schX={0.2} schY={0.4} schStemLength={0.2} />
              <port name="pin1" pinNumber={1} aliases={["B"]} direction="left" schX={-0.2} schY={0} schStemLength={0.2} />
              <port name="pin2" pinNumber={2} aliases={["E"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0.2} />
              <schematicpath points={[{"x":0.2,"y":0.2},{"x":0,"y":0.06}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.06},{"x":0.2,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.18},{"x":0,"y":-0.18}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.14,"y":-0.1},{"x":0.08,"y":-0.18},{"x":0.2,"y":-0.2}]} strokeColor="#880000" isFilled fillColor="#880000" />
              <schematictext schX={0} schY={0.64} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C20526"
      ]
    }}
          manufacturerPartNumber="MMBT3904(RANGE:100-300)"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.999998mm" pcbY="0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.999998mm" pcbY="-0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.999998mm" pcbY="0mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.726211,"y":-1.52621},{"x":0.726211,"y":-1.52621},{"x":0.726211,"y":-0.494589}]} />
    <silkscreenpath route={[{"x":-0.726211,"y":1.52621},{"x":0.726211,"y":1.52621},{"x":0.726211,"y":0.494589}]} />
    <silkscreenpath route={[{"x":-0.726211,"y":-0.455397},{"x":-0.726211,"y":0.455397}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="-2.524mm" anchorAlignment="center" pcbRotation="180deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":1.749997,"y":-1.699984},{"x":-1.749997,"y":-1.699984},{"x":-1.749997,"y":1.70001},{"x":1.749997,"y":1.70001},{"x":1.749997,"y":-1.699984}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000013, y: 0.000013, z: 0.050795 },
          }}
          {...props}
        />
      )
    }"
  `)
})
