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
            <hole pcbX="2.149983mm" pcbY="0mm" diameter="1.1999976mm" />
    <hole pcbX="-4.850003mm" pcbY="0mm" diameter="1.1999976mm" />
    <platedhole  portHints={["pin1"]} pcbX="3.749929mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="-0.250063mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="-3.250057mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="4.850003mm" pcbY="-2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":-6.449974399999974,"y":-2.4595836000000872},{"x":-6.4499490000000606,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-8.433943,"y":-2.5000204000000394},{"x":-6.449974399999974,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":-8.433943,"y":2.499969599999986},{"x":-6.433947000000103,"y":2.499969599999986}]} />
    <silkscreenpath route={[{"x":-8.433943,"y":2.499969599999986},{"x":-8.433943,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":5.666028800000049,"y":-3.175025400000095},{"x":-6.449974399999974,"y":-3.175025400000095},{"x":-6.449974399999974,"y":-2.300096999999937}]} />
    <silkscreenpath route={[{"x":5.666028800000049,"y":-3.0925516000000925},{"x":5.666028800000049,"y":-3.175025400000095}]} />
    <silkscreenpath route={[{"x":5.666028800000049,"y":3.0558485999999903},{"x":5.666028800000049,"y":-1.5074899999999616}]} />
    <silkscreenpath route={[{"x":4.658004399999868,"y":3.0558485999999903},{"x":5.666028800000049,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":0.6580123999999614,"y":3.0558485999999903},{"x":3.074034999999867,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-2.34198159999994,"y":3.0558485999999903},{"x":-0.9259569999999258,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-6.433947000000103,"y":3.0558485999999903},{"x":-3.925950999999941,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":5.666028800000049,"y":-2.7312365999999884},{"x":5.666028800000049,"y":-2.848101999999926}]} />
    <silkscreentext text="{NAME}" pcbX="-1.381379mm" pcbY="4.06197mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.717979000000014,"y":3.311969999999974},{"x":5.955221000000051,"y":3.311969999999974},{"x":5.955221000000051,"y":-3.4110299999999825},{"x":-8.717979000000014,"y":-3.4110299999999825},{"x":-8.717979000000014,"y":3.311969999999974}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.obj?uuid=f90b68db56444592a325e6a33e48bfdb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.step?uuid=f90b68db56444592a325e6a33e48bfdb",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 1.383957099999975, y: -0.0050000000000001155, z: -2.5000069999999996 },
          }}
          {...props}
        />
      )
    }"
  `)
})
