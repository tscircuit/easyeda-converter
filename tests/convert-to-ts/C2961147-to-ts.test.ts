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
              <schematictext schX={0.3} schY={0.02} text="3" fontSize={0.14} anchor="bottom_left" color="#0000FF" schRotation={0} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.4} />
              <schematictext schX={0.3} schY={-0.18} text="2" fontSize={0.14} anchor="bottom_left" color="#0000FF" schRotation={0} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.4} />
              <schematictext schX={0.3} schY={0.22} text="1" fontSize={0.14} anchor="bottom_left" color="#0000FF" schRotation={0} />
              <schematicpath points={[{"x":-0.14,"y":-0.2},{"x":-0.12,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":0},{"x":-0.14,"y":0},{"x":-0.14,"y":-0.2},{"x":-0.16,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":-0.38,"y":-0.2},{"x":-0.42,"y":-0.12},{"x":-0.46,"y":-0.2}]} strokeColor="#880000" />
              <schematicpath svgPath="M -0.4 0.12 A 0.08 0.08 0 1 0 -0.4 0.28" strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.12},{"x":-0.4,"y":0.12}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.28},{"x":-0.4,"y":0.28}]} strokeColor="#880000" />
              <schematicrect schX={0.04} schY={0.2} width={0.08} height={0.24} strokeWidth={0.02} color="#880000" />
              <schematicpath points={[{"x":0.2,"y":0.2},{"x":0.08,"y":0.2}]} strokeColor="#880000" />
              <schematictext schX={-0.48} schY={0.6} text="{NAME}" fontSize={0.2} anchor="bottom_left" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C2961147"
      ]
    }}
          manufacturerPartNumber="PJ-002AH"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="-0mm" pcbY="2.350008mm" holeWidth="0.999998mm" holeHeight="3.1999936mm" outerWidth="1.7999964mm" outerHeight="3.999992mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="2.999994mm" pcbY="-2.350008mm" holeWidth="0.999998mm" holeHeight="3.1999936mm" outerWidth="1.7999964mm" outerHeight="3.999992mm" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="-2.999994mm" pcbY="-2.350008mm" holeWidth="0.999998mm" holeHeight="3.499993mm" outerWidth="1.999996mm" outerHeight="4.499991mm" pcbRotation="180deg" shape="pill" />
    <silkscreenpath route={[{"x":7.199985599999991,"y":2.1500083999999333},{"x":7.199985599999991,"y":-6.849973599999998}]} />
    <silkscreenpath route={[{"x":-3.699992599999973,"y":-4.612208199999941},{"x":-3.699992599999973,"y":-6.849973599999998},{"x":10.699978599999895,"y":-6.849973599999998},{"x":10.699978599999895,"y":2.130018600000085}]} />
    <silkscreenpath route={[{"x":-2.213279800000123,"y":2.1500083999999333},{"x":-3.699992599999973,"y":2.1500083999999333},{"x":-3.699992599999973,"y":-0.08775699999989683}]} />
    <silkscreenpath route={[{"x":10.699978599999895,"y":2.1500083999999333},{"x":2.2132798000000093,"y":2.1500083999999333}]} />
    <silkscreentext text="{NAME}" pcbX="3.51282mm" pcbY="3.550668mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":2.399995200000035,"y":2.1999955999999656},{"x":10.700003999999922,"y":2.1999955999999656},{"x":10.8000037999999,"y":2.099995799999988},{"x":10.8000037999999,"y":-6.800011799999993},{"x":10.700003999999922,"y":-6.900011599999971},{"x":-3.699992599999973,"y":-6.900011599999971},{"x":-3.7999924000000647,"y":-6.800011799999993},{"x":-3.7999924000000647,"y":-4.5999908000000005},{"x":-3.5999927999999954,"y":-4.5999908000000005},{"x":-3.5999927999999954,"y":-6.800011799999993},{"x":10.600004199999944,"y":-6.800011799999993},{"x":10.600004199999944,"y":2.099995799999988},{"x":2.1999955999999656,"y":2.099995799999988},{"x":2.1999955999999656,"y":2.1999955999999656},{"x":2.399995200000035,"y":2.1999955999999656}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-2.199995600000193,"y":2.1999955999999656},{"x":-3.699992599999973,"y":2.1999955999999656},{"x":-3.7999924000000647,"y":2.099995799999988},{"x":-3.7999924000000647,"y":-0.09999979999997777},{"x":-3.5999927999999954,"y":-0.09999979999997777},{"x":-3.5999927999999954,"y":2.099995799999988},{"x":-2.199995600000193,"y":2.099995799999988},{"x":-2.199995600000193,"y":2.1999955999999656}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":7.3000107999999955,"y":1.99999600000001},{"x":7.3000107999999955,"y":-6.700012000000015},{"x":7.3000107999999955,"y":1.99999600000001}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-4.039679999999976,"y":2.800668000000087},{"x":11.065319999999929,"y":2.800668000000087},{"x":11.065319999999929,"y":-7.148131999999919},{"x":-4.039679999999976,"y":-7.148131999999919},{"x":-4.039679999999976,"y":2.800668000000087}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2961147.obj?uuid=666ccfc7884a46cb8ce1cb7a9df39419",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2961147.step?uuid=666ccfc7884a46cb8ce1cb7a9df39419",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -4.699992999999904, y: 2.3750019999999497, z: -11.000007 },
          }}
          {...props}
        />
      )
    }"
  `)
})
