import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C1046.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C1046 into typescript file", async () => {
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
    "C1046-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

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
              <schematicpath points={[{"x":-0.3376,"y":0.0014},{"x":-0.337688,"y":0.015859},{"x":-0.335037,"y":0.030086},{"x":-0.329738,"y":0.043592},{"x":-0.321973,"y":0.055911},{"x":-0.31201,"y":0.066622},{"x":-0.30019,"y":0.075355},{"x":-0.286919,"y":0.081811},{"x":-0.272655,"y":0.085768},{"x":-0.257887,"y":0.08709},{"x":-0.243122,"y":0.085731},{"x":-0.228868,"y":0.081738},{"x":-0.215615,"y":0.075249},{"x":-0.203818,"y":0.066486},{"x":-0.193883,"y":0.05575},{"x":-0.186151,"y":0.043411},{"x":-0.180887,"y":0.029893},{"x":-0.178274,"y":0.015659},{"x":-0.1784,"y":0.0012}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":-0.168,"y":0.0014},{"x":-0.168107,"y":0.015859},{"x":-0.165475,"y":0.03009},{"x":-0.160194,"y":0.043602},{"x":-0.152445,"y":0.055931},{"x":-0.142496,"y":0.066654},{"x":-0.130688,"y":0.075402},{"x":-0.117426,"y":0.081875},{"x":-0.103167,"y":0.08585},{"x":-0.0884,"y":0.08719},{"x":-0.073633,"y":0.08585},{"x":-0.059374,"y":0.081875},{"x":-0.046112,"y":0.075402},{"x":-0.034304,"y":0.066654},{"x":-0.024355,"y":0.055931},{"x":-0.016606,"y":0.043602},{"x":-0.011325,"y":0.03009},{"x":-0.008693,"y":0.015859},{"x":-0.0088,"y":0.0014}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.0014,"y":0.0014},{"x":0.001293,"y":0.015859},{"x":0.003925,"y":0.03009},{"x":0.009206,"y":0.043602},{"x":0.016955,"y":0.055931},{"x":0.026904,"y":0.066654},{"x":0.038712,"y":0.075402},{"x":0.051974,"y":0.081875},{"x":0.066233,"y":0.08585},{"x":0.081,"y":0.08719},{"x":0.095767,"y":0.08585},{"x":0.110026,"y":0.081875},{"x":0.123288,"y":0.075402},{"x":0.135096,"y":0.066654},{"x":0.145045,"y":0.055931},{"x":0.152794,"y":0.043602},{"x":0.158075,"y":0.03009},{"x":0.160707,"y":0.015859},{"x":0.1606,"y":0.0014}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.174,"y":0.0014},{"x":0.174189,"y":0.016584},{"x":0.177393,"y":0.031445},{"x":0.183488,"y":0.045418},{"x":0.192246,"y":0.057976},{"x":0.203332,"y":0.068641},{"x":0.216328,"y":0.077009},{"x":0.230741,"y":0.082764},{"x":0.246024,"y":0.085687},{"x":0.261599,"y":0.085668},{"x":0.276874,"y":0.082706},{"x":0.291272,"y":0.076915},{"x":0.304245,"y":0.068514},{"x":0.315304,"y":0.057821},{"x":0.324028,"y":0.045242},{"x":0.330087,"y":0.031253},{"x":0.333251,"y":0.016384},{"x":0.3334,"y":0.0012}]} strokeColor="#880000" strokeWidth={0.02} />
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
