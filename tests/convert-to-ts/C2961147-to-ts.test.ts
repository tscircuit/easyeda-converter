import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2961147.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2961147 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const soupCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const platedHoles = soupCircuitJson.filter(
    (element) => element.type === "pcb_plated_hole",
  )

  expect(platedHoles.length).toBe(3)
  expect(platedHoles.every((hole) => hole.shape === "pill")).toBe(true)

  expect(
    convertCircuitJsonToPcbSvg(soupCircuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2961147-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"]
    } as const

    export const PJ_002AH = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.6} schY={0} schStemLength={0.4} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.4} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.4} />
              <schematicpath points={[{"x":-0.14,"y":-0.2},{"x":-0.12,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0},{"x":-0.14,"y":0},{"x":-0.14,"y":-0.2},{"x":-0.16,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":-0.38,"y":-0.2},{"x":-0.42,"y":-0.12},{"x":-0.46,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.4 0.12 A 0.08 0.08 0 1 0 -0.4 0.28" strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.12},{"x":-0.4,"y":0.12}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.28},{"x":-0.4,"y":0.28}]} strokeColor="#880000" />
              <schematicrect schX={0.04} schY={0.2} width={0.08} height={0.24} strokeWidth={0.02} color="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.2},{"x":0.08,"y":0.2}]} strokeColor="#880000" />
              <schematictext schX={0.07} schY={0.6} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C2961147"
      ]
    }}
          manufacturerPartNumber="PJ-002AH"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="2.350008mm" pcbY="0mm" holeWidth="0.999998mm" holeHeight="2.999994mm" outerWidth="1.7999964mm" outerHeight="3.999992mm" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="-2.350008mm" pcbY="-2.999994mm" holeWidth="0.999998mm" holeHeight="2.999994mm" outerWidth="1.7999964mm" outerHeight="3.999992mm" pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="-2.350008mm" pcbY="2.999994mm" holeWidth="0.999998mm" holeHeight="3.5000184mm" outerWidth="1.999996mm" outerHeight="4.499991mm" pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":2.150008,"y":-7.199986},{"x":-6.849974,"y":-7.199986}]} />
    <silkscreenpath route={[{"x":-4.612208,"y":3.699993},{"x":-6.849974,"y":3.699993},{"x":-6.849974,"y":-10.699979},{"x":2.130019,"y":-10.699979}]} />
    <silkscreenpath route={[{"x":2.150008,"y":2.21328},{"x":2.150008,"y":3.699993},{"x":-0.087757,"y":3.699993}]} />
    <silkscreenpath route={[{"x":2.150008,"y":-10.699979},{"x":2.150008,"y":-2.21328}]} />
    <silkscreentext text="{NAME}" pcbX="3.550668mm" pcbY="-3.51282mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":2.199996,"y":-2.399995},{"x":2.199996,"y":-10.700004},{"x":2.099996,"y":-10.800004},{"x":-6.800012,"y":-10.800004},{"x":-6.900012,"y":-10.700004},{"x":-6.900012,"y":3.699993},{"x":-6.800012,"y":3.799992},{"x":-4.599991,"y":3.799992},{"x":-4.599991,"y":3.599993},{"x":-6.800012,"y":3.599993},{"x":-6.800012,"y":-10.600004},{"x":2.099996,"y":-10.600004},{"x":2.099996,"y":-2.199996},{"x":2.199996,"y":-2.199996},{"x":2.199996,"y":-2.399995}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":2.199996,"y":2.199996},{"x":2.199996,"y":3.699993},{"x":2.099996,"y":3.799992},{"x":-0.1,"y":3.799992},{"x":-0.1,"y":3.599993},{"x":2.099996,"y":3.599993},{"x":2.099996,"y":2.199996},{"x":2.199996,"y":2.199996}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":1.999996,"y":-7.300011},{"x":-6.700012,"y":-7.300011},{"x":-6.700012,"y":-7.100011},{"x":1.999996,"y":-7.100011},{"x":1.999996,"y":-7.300011}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":3.500006,"y":4.249992},{"x":3.500006,"y":-10.949979},{"x":-7.124993,"y":-10.949979},{"x":-7.124993,"y":4.249992},{"x":3.500006,"y":4.249992}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2961147.obj?uuid=666ccfc7884a46cb8ce1cb7a9df39419",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2961147.step?uuid=666ccfc7884a46cb8ce1cb7a9df39419",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 2.375002, y: 4.699993, z: -11.000007 },
          }}
          {...props}
        />
      )
    }"
  `)
})
