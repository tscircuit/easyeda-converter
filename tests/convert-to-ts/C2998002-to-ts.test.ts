import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2998002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C2998002 into typescript file", async () => {
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

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["C1"],
      pin2: ["C2"],
      pin3: ["E1"],
      pin4: ["E2"]
    } as const

    export const BCM62B_215 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2998002"
      ]
    }}
          manufacturerPartNumber="BCM62B_215"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="1.099947mm" pcbY="-0.72501125mm" width="0.6999986mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="1.099947mm" pcbY="0.97501075mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.099947mm" pcbY="0.97501075mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.099947mm" pcbY="-0.92516325mm" width="0.6999986mm" height="0.5999988mm" shape="rect" />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":1.449939950000001},{"x":0.7000239999999991,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-0.00006985000000270247},{"x":0.7000239999999991,"y":0.4998783499999888}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-1.525111250000009},{"x":0.7000239999999991,"y":-1.4501558500000016}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":1.449939950000001},{"x":-0.6999732000000023,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":-0.45008165000000133},{"x":-0.6999732000000023,"y":0.4998783499999888}]} />
    <silkscreenpath route={[{"x":-0.6999732000000023,"y":-1.525111250000009},{"x":-0.6999732000000023,"y":-1.4001432499999993}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":1.5749079500000107},{"x":-0.6999732000000023,"y":1.5749079500000107}]} />
    <silkscreenpath route={[{"x":0.7000239999999991,"y":-1.525111250000009},{"x":-0.6999732000000023,"y":-1.525111250000009}]} />
    <silkscreentext text="{NAME}" pcbX="0.000127mm" pcbY="2.57419675mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.6976730000000089,"y":1.8241967499999987},{"x":1.6979269999999929,"y":1.8241967499999987},{"x":1.6979269999999929,"y":-2.130203250000008},{"x":-1.6976730000000089,"y":-2.130203250000008},{"x":-1.6976730000000089,"y":1.8241967499999987}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2998002.obj?uuid=499fe0b8a844428c9e2aff62131a11f8",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2998002.step?uuid=499fe0b8a844428c9e2aff62131a11f8",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.024923749999999245, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
