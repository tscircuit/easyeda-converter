import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C18185602.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C18185602 into typescript file", async () => {
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
    camPos: [-10, -20, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["D"],
      pin2: ["C"],
      pin3: ["B"],
      pin4: ["A"]
    } as const

    export const PJ_320A_4P_DIP = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C18185602"
      ]
    }}
          manufacturerPartNumber="PJ_320A_4P_DIP"
          footprint={<footprint>
            <hole pcbX="2.4249824mm" pcbY="0mm" diameter="1.1999976mm" />
    <hole pcbX="-4.5750036mm" pcbY="0mm" diameter="1.1999976mm" />
    <platedhole  portHints={["pin1"]} pcbX="4.0249284mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="0.0249364mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="-2.9750576mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="5.1250024mm" pcbY="-2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":-6.174975000000018,"y":-2.4595836000000872},{"x":-6.1749496000001045,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":-2.5000204000000394},{"x":-6.174975000000018,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":2.499969599999986},{"x":-6.158947600000147,"y":2.499969599999986}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":2.499969599999986},{"x":-8.158943600000043,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-3.175025400000095},{"x":-6.174975000000018,"y":-3.175025400000095},{"x":-6.174975000000018,"y":-2.300096999999937}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-3.0925516000000925},{"x":5.941028200000005,"y":-3.175025400000095}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":3.0558485999999903},{"x":5.941028200000005,"y":-1.5074899999999616}]} />
    <silkscreenpath route={[{"x":4.933003799999824,"y":3.0558485999999903},{"x":5.941028200000005,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":0.9330117999999175,"y":3.0558485999999903},{"x":3.349034399999823,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-2.066982199999984,"y":3.0558485999999903},{"x":-0.6509575999999697,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-6.158947600000147,"y":3.0558485999999903},{"x":-3.650951599999985,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-2.7312365999999884},{"x":5.941028200000005,"y":-2.848101999999926}]} />
    <silkscreentext text="{NAME}" pcbX="-1.1063796mm" pcbY="4.06197mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.442979600000058,"y":3.311969999999974},{"x":6.230220400000007,"y":3.311969999999974},{"x":6.230220400000007,"y":-3.4110299999999825},{"x":-8.442979600000058,"y":-3.4110299999999825},{"x":-8.442979600000058,"y":3.311969999999974}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.obj?uuid=f90b68db56444592a325e6a33e48bfdb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.step?uuid=f90b68db56444592a325e6a33e48bfdb",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 1.108957700000019, y: -0.0050000000000001155, z: -2.5000069999999996 },
          }}
          {...props}
        />
      )
    }"
  `)
})
