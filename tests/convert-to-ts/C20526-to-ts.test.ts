import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C20526.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves C20526 source pin artwork and hidden labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const pinLabels = circuitJson.filter(
    (element) => element.type === "schematic_text",
  )
  expect(pinLabels).toHaveLength(0)
  const ports = circuitJson.filter(
    (element) => element.type === "schematic_port",
  )
  expect(ports).toHaveLength(3)
  expect(ports.map((port) => port.center)).toEqual(
    expect.arrayContaining([
      { x: -0.2, y: 0 },
      { x: 0.2, y: 0.4 },
      { x: 0.2, y: -0.4 },
    ]),
  )
  const svg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(svg).not.toContain("sch-pin-label")
  expect(svg).toMatchSvgSnapshot(import.meta.path, "C20526-to-ts-schematic")

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
              <port name="pin3" pinNumber={3} aliases={["C"]} direction="up" schX={0.2} schY={0.4} schStemLength={0} />
              <schematicpath svgPath="M 0.2 0.4 L 0.2 0.2" strokeColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["B"]} direction="left" schX={-0.2} schY={0} schStemLength={0} />
              <schematicpath svgPath="M -0.2 0 L 0 0" strokeColor="#880000" />
              <port name="pin2" pinNumber={2} aliases={["E"]} direction="down" schX={0.2} schY={-0.4} schStemLength={0} />
              <schematicpath svgPath="M 0.2 -0.4 L 0.2 -0.2" strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.2},{"x":0,"y":0.06}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.06},{"x":0.2,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.18},{"x":0,"y":-0.18}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.14,"y":-0.1},{"x":0.08,"y":-0.18},{"x":0.2,"y":-0.2}]} strokeColor="#880000" isFilled fillColor="#880000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C20526"
      ]
    }}
          manufacturerPartNumber="MMBT3904(RANGE:100-300)"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="0.999998mm" pcbY="-0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.999998mm" pcbY="0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-0.999998mm" pcbY="0mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <silkscreenpath route={[{"x":0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":0.45539659999997184},{"x":0.726211400000011,"y":-0.45539659999985815}]} />
    <silkscreentext text="{NAME}" pcbX="0.0254mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.748600000000124,"y":1.774000000000001},{"x":1.7993999999998778,"y":1.774000000000001},{"x":1.7993999999998778,"y":-1.774000000000001},{"x":-1.748600000000124,"y":-1.774000000000001},{"x":-1.748600000000124,"y":1.774000000000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0.000012700000070253736, y: -0.000012699999956566899, z: 0.050795 },
          }}
          {...props}
        />
      )
    }"
  `)
})

it("renders visible pin labels at their source positions with their source styling", async () => {
  const rawEasy = structuredClone(chipRawEasy)
  rawEasy.dataStr.shape = rawEasy.dataStr.shape.map((shape) =>
    shape.replace(
      "^^0~13~-7~270~C~end~~~#0000FF",
      "^^1~13~-7~270~C~end~~12~#123456",
    ),
  )
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    circuitJson.filter((element) => element.type === "schematic_text"),
  ).toEqual([
    expect.objectContaining({
      text: "C",
      position: { x: 0.26, y: 0.14 },
      rotation: 270,
      font_size: 0.24,
      color: "#123456",
    }),
  ])
  const svg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(svg).not.toContain("sch-pin-label")
  expect(svg).toMatchSvgSnapshot(
    import.meta.path,
    "C20526-visible-source-label",
  )
})
