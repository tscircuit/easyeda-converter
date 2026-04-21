import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C157929.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C157929 into typescript file", async () => {
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
    camPos: [20, 7, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"]
    } as const

    export const S3B_PH_K_S_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C157929"
      ]
    }}
          manufacturerPartNumber="S3B_PH_K_S_LF__SN_"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="1.999996mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-0mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="-1.999996mm" pcbY="0mm" outerDiameter="1.499997mm" holeDiameter="0.9000236mm" shape="circle" />
    <silkscreenpath route={[{"x":1.0000233999999182,"y":-2.2495256000000836},{"x":1.0000233999999182,"y":-6.250025599999958}]} />
    <silkscreenpath route={[{"x":1.0000233999999182,"y":-2.2495256000000836},{"x":-0.9989312000000155,"y":-2.2495256000000836},{"x":-0.9989312000000155,"y":-6.250025599999958}]} />
    <silkscreenpath route={[{"x":2.895803199999932,"y":-0.2500122000000147},{"x":2.9999939999999015,"y":-0.2500122000000147},{"x":2.9999939999999015,"y":1.349984599999857},{"x":3.950004799999874,"y":1.349984599999857},{"x":3.950004799999874,"y":-6.250000200000045}]} />
    <silkscreenpath route={[{"x":0.8958071999998083,"y":-0.2500122000000147},{"x":1.1041887999999744,"y":-0.2500122000000147}]} />
    <silkscreenpath route={[{"x":-1.069797200000039,"y":-0.2500122000000147},{"x":-0.8958072000000357,"y":-0.2500122000000147}]} />
    <silkscreenpath route={[{"x":3.950004799999874,"y":-6.250000200000045},{"x":-3.9499794000000747,"y":-6.250000200000045},{"x":-3.9499794000000747,"y":1.349984599999857},{"x":-2.999994000000015,"y":1.349984599999857},{"x":-2.999994000000015,"y":-0.2500122000000147},{"x":-2.930067800000188,"y":-0.2500122000000147}]} />
    <silkscreentext text="{NAME}" pcbX="-0.007112mm" pcbY="2.36144mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-4.257612000000108,"y":1.611440000000016},{"x":4.243387999999868,"y":1.611440000000016},{"x":4.243387999999868,"y":-6.533959999999979},{"x":-4.257612000000108,"y":-6.533959999999979},{"x":-4.257612000000108,"y":1.611440000000016}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C157929.obj?uuid=34ff8836248648119b083f641041fec0",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C157929.step?uuid=34ff8836248648119b083f641041fec0",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.00048730000004337803, y: 3.25000779999998, z: 0.09999300000000044 },
          }}
          {...props}
        />
      )
    }"
  `)
})
