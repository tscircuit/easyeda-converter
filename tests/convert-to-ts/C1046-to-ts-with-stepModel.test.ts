import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import chipRawEasy from "../assets/C1046.raweasy.json"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should include both obj and step cad model urls", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("objUrl")
  expect(result).toContain("stepUrl")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C1046-to-ts-with-stepModel-schematic",
  )

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const SDFL2012S100KTF = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.06} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.06} />
              <schematicarc center={{ x: -0.25799, y: 0.00909 }} radius={0.079} startAngleDegrees={-174.482889} endAngleDegrees={-365.661141} direction="clockwise" strokeWidth={0.02} color="#880000" />
              <schematicarc center={{ x: -0.0884, y: 0.00919 }} radius={0.079} startAngleDegrees={-174.410412} endAngleDegrees={-365.589588} direction="clockwise" strokeWidth={0.02} color="#880000" />
              <schematicarc center={{ x: 0.081, y: 0.00919 }} radius={0.079} startAngleDegrees={-174.410412} endAngleDegrees={-365.589588} direction="clockwise" strokeWidth={0.02} color="#880000" />
              <schematicarc center={{ x: 0.253709, y: 0.008048 }} radius={0.079} startAngleDegrees={-175.232427} endAngleDegrees={-364.911405} direction="clockwise" strokeWidth={0.02} color="#880000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C1046"
      ]
    }}
          manufacturerPartNumber="SDFL2012S100KTF"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.015949199999909},{"x":-1.5642590000001064,"y":1.015949199999909},{"x":-1.6912590000000591,"y":1.015949199999909},{"x":-1.9452590000000782,"y":0.76194919999989},{"x":-1.9452590000000782,"y":-0.6350507999999309},{"x":-1.9452590000000782,"y":-0.7620508000001109},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
    <silkscreenpath route={[{"x":0.34074099999998,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.6107409999999618,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620508000001109},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.76194919999989},{"x":1.6107409999999618,"y":1.015949199999909},{"x":0.34074099999998,"y":1.015949199999909}]} />
    <silkscreentext text="{NAME}" pcbX="-0.04191mm" pcbY="2.019302mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.1969100000000026,"y":1.2693020000001525},{"x":2.1130900000000565,"y":1.2693020000001525},{"x":2.1130900000000565,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":1.2693020000001525}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1046.obj?uuid=c7acac53bcbc44d68fbab8f60a747688",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1046.step?uuid=c7acac53bcbc44d68fbab8f60a747688",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.000038099999983387534, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
