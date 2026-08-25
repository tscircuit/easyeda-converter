import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C281113.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C281113 into typescript file", async () => {
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
    "C281113-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const MGFL2012F100MT_LF = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.06} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.06} />
              <schematicpath points={[{"x":-0.33766,"y":0.00136},{"x":-0.337584,"y":0.016608},{"x":-0.334467,"y":0.031551},{"x":-0.328428,"y":0.045617},{"x":-0.319697,"y":0.058269},{"x":-0.308608,"y":0.069022},{"x":-0.295586,"y":0.077467},{"x":-0.281127,"y":0.083279},{"x":-0.265785,"y":0.086239},{"x":-0.250145,"y":0.086231},{"x":-0.234806,"y":0.083256},{"x":-0.220354,"y":0.077429},{"x":-0.20734,"y":0.068971},{"x":-0.196263,"y":0.058207},{"x":-0.187546,"y":0.045546},{"x":-0.181521,"y":0.031474},{"x":-0.17842,"y":0.016529},{"x":-0.17836,"y":0.00128}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":-0.168,"y":0.00142},{"x":-0.167922,"y":0.016668},{"x":-0.164803,"y":0.031611},{"x":-0.158762,"y":0.045676},{"x":-0.150029,"y":0.058326},{"x":-0.13894,"y":0.069078},{"x":-0.125916,"y":0.077521},{"x":-0.111456,"y":0.083332},{"x":-0.096114,"y":0.086289},{"x":-0.080474,"y":0.08628},{"x":-0.065135,"y":0.083303},{"x":-0.050684,"y":0.077474},{"x":-0.037671,"y":0.069015},{"x":-0.026595,"y":0.058249},{"x":-0.01788,"y":0.045587},{"x":-0.011857,"y":0.031515},{"x":-0.008758,"y":0.016569},{"x":-0.0087,"y":0.00132}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.00134,"y":0.00142},{"x":0.001418,"y":0.016668},{"x":0.004537,"y":0.031611},{"x":0.010578,"y":0.045676},{"x":0.019311,"y":0.058326},{"x":0.0304,"y":0.069078},{"x":0.043424,"y":0.077521},{"x":0.057884,"y":0.083332},{"x":0.073226,"y":0.086289},{"x":0.088866,"y":0.08628},{"x":0.104205,"y":0.083303},{"x":0.118656,"y":0.077474},{"x":0.131669,"y":0.069015},{"x":0.142745,"y":0.058249},{"x":0.15146,"y":0.045587},{"x":0.157483,"y":0.031515},{"x":0.160582,"y":0.016569},{"x":0.16064,"y":0.00132}]} strokeColor="#880000" strokeWidth={0.02} />
              <schematicpath points={[{"x":0.174,"y":0.00138},{"x":0.174078,"y":0.016628},{"x":0.177197,"y":0.031571},{"x":0.183238,"y":0.045636},{"x":0.191971,"y":0.058286},{"x":0.20306,"y":0.069038},{"x":0.216084,"y":0.077481},{"x":0.230544,"y":0.083292},{"x":0.245886,"y":0.086249},{"x":0.261526,"y":0.08624},{"x":0.276865,"y":0.083263},{"x":0.291316,"y":0.077434},{"x":0.304329,"y":0.068975},{"x":0.315405,"y":0.058209},{"x":0.32412,"y":0.045547},{"x":0.330143,"y":0.031475},{"x":0.333242,"y":0.016529},{"x":0.3333,"y":0.00128}]} strokeColor="#880000" strokeWidth={0.02} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C281113"
      ]
    }}
          manufacturerPartNumber="MGFL2012F100MT-LF"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.015949199999909},{"x":-1.5642590000001064,"y":1.015949199999909},{"x":-1.6912590000000591,"y":1.015949199999909},{"x":-1.9452590000000782,"y":0.76194919999989},{"x":-1.9452590000000782,"y":-0.6350507999999309},{"x":-1.9452590000000782,"y":-0.7620508000001109},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
    <silkscreenpath route={[{"x":0.34074099999998,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.6107409999999618,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620508000001109},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.76194919999989},{"x":1.6107409999999618,"y":1.015949199999909},{"x":0.34074099999998,"y":1.015949199999909}]} />
    <silkscreentext text="{NAME}" pcbX="-0.04191mm" pcbY="2.019302mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.1969100000000026,"y":1.2693020000001525},{"x":2.1130900000000565,"y":1.2693020000001525},{"x":2.1130900000000565,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":1.2693020000001525}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C281113.obj?uuid=c7acac53bcbc44d68fbab8f60a747688",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C281113.step?uuid=c7acac53bcbc44d68fbab8f60a747688",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.000038099999983387534, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
