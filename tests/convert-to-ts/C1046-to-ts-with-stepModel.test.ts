import { it, expect } from "bun:test"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

it("should convert C1046 into typescript file with step model", async () => {
  const rawEasy = await fetchEasyEDAComponent("C1046")
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)

  const result = await convertBetterEasyToTsx({
    betterEasy,
    format: "step",
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
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
          supplierPartNumbers={{
      "jlcpcb": [
        "C1046"
      ]
    }}
          manufacturerPartNumber="SDFL2012S100KTF"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.9662159999999176mm" pcbY="0mm" width="1.1325352mm" height="1.3770101999999997mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.9662160000000313mm" pcbY="0mm" width="1.1325352mm" height="1.3770101999999997mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.015949199999909},{"x":-1.5642590000001064,"y":1.015949199999909},{"x":-1.6912590000000591,"y":1.015949199999909},{"x":-1.9452590000000782,"y":0.76194919999989},{"x":-1.9452590000000782,"y":-0.6350507999999309},{"x":-1.9452590000000782,"y":-0.7620508000001109},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
    <silkscreenpath route={[{"x":0.34074099999998,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.6107409999999618,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620508000001109},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.76194919999989},{"x":1.6107409999999618,"y":1.015949199999909},{"x":0.34074099999998,"y":1.015949199999909}]} />
    <silkscreentext text={props.name} pcbX="-0.04190999999991618mm" pcbY="2.0193020000001525mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.1969100000000026,"y":1.2693020000001525},{"x":2.1130900000000565,"y":1.2693020000001525},{"x":2.1130900000000565,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":1.2693020000001525}]} />
          </footprint>}
          cadModel={{
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1046.step?uuid=c7acac53bcbc44d68fbab8f60a747688",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 11111111)
