import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C131337.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C131337 into typescript file", async () => {
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
    camPos: [0, 5, -10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const B2B_PH_K_S_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C131337"
      ]
    }}
          manufacturerPartNumber="B2B-PH-K-S(LF)(SN)"
          footprint={<footprint>
            <platedhole  portHints={["pin2"]} pcbX="-0.999998mm" pcbY="-0.550037mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="0.999998mm" pcbY="-0.550037mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <silkscreenpath route={[{"x":-2.921000000000049,"y":-0.2960369999999557},{"x":-2.413000000000011,"y":-0.2960369999999557},{"x":-2.413000000000011,"y":1.608963000000017},{"x":2.53999999999985,"y":1.608963000000017},{"x":2.53999999999985,"y":-0.2960369999999557},{"x":2.9209999999998217,"y":-0.2960369999999557}]} />
    <silkscreenpath route={[{"x":3.000044799999955,"y":-0.9310370000000603},{"x":2.4920448000000306,"y":-0.9310370000000603},{"x":2.4920448000000306,"y":-1.6930370000001176},{"x":0.3330447999999251,"y":-1.6930370000001176},{"x":0.3330447999999251,"y":-2.201037000000042}]} />
    <silkscreenpath route={[{"x":-2.921000000000049,"y":-0.9310370000000603},{"x":-2.413000000000011,"y":-0.9310370000000603},{"x":-2.413000000000011,"y":-1.6930370000001176},{"x":-0.2540000000001328,"y":-1.6930370000001176},{"x":-0.2540000000001328,"y":-2.201037000000042}]} />
    <silkscreenrect pcbX="0mm" pcbY="0mm" width="5.999988mm" height="4.500118mm" strokeWidth="0.0762mm" />
    <silkscreentext text="{NAME}" pcbX="0.016002mm" pcbY="3.345563mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.2565980000001673,"y":2.59556299999997},{"x":3.288601999999969,"y":2.59556299999997},{"x":3.288601999999969,"y":-2.5018369999999095},{"x":-3.2565980000001673,"y":-2.5018369999999095},{"x":-3.2565980000001673,"y":2.59556299999997}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C131337.obj?uuid=ee6b32b5c03144688a5663b32f9648c4",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C131337.step?uuid=ee6b32b5c03144688a5663b32f9648c4",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: -0.9995, y: -0.5500381999999945, z: -0.000006999999999646178 },
          }}
          {...props}
        />
      )
    }"
  `)
})
