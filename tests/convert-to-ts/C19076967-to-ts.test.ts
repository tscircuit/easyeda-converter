import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19076967.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C19076967 into typescript file", async () => {
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
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["pin10"],
      pin11: ["pin11"]
    } as const

    export const MFR01_A1F03L1S_B = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C19076967"
      ]
    }}
          manufacturerPartNumber="MFR01_A1F03L1S_B"
          footprint={<footprint>
            <platedhole  portHints={["pin5"]} pcbX="-0.016891mm" pcbY="-12.100052mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin11"]} pcbX="0.016891mm" pcbY="12.100052mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin9"]} pcbX="-7.098919mm" pcbY="9.798812mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="306deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="7.098665mm" pcbY="-9.799066mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="306deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="11.502517mm" pcbY="-3.755136mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="342deg" shape="pill" />
    <platedhole  portHints={["pin8"]} pcbX="-11.502517mm" pcbY="3.755136mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="342deg" shape="pill" />
    <platedhole  portHints={["pin7"]} pcbX="-11.512931mm" pcbY="-3.723132mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="18deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="11.512931mm" pcbY="3.723132mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="18deg" shape="pill" />
    <platedhole  portHints={["pin6"]} pcbX="-7.125843mm" pcbY="-9.779254mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="54deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="7.125335mm" pcbY="9.779mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.1999896mm" rectPad={true} pcbRotation="54deg" shape="pill" />
    <platedhole  portHints={["pin10"]} pcbX="-1.425829mm" pcbY="0mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="4.99999mm" rectPad={true} pcbRotation="0deg" shape="pill" />
    <silkscreenpath route={[{"x":-2.8999942000000374,"y":-4.099991799999998},{"x":2.89999419999981,"y":-4.099991799999998}]} />
    <silkscreenpath route={[{"x":2.224227199999973,"y":12.100001199999951},{"x":-2.275789199999963,"y":12.100001199999951}]} />
    <silkscreenpath route={[{"x":-2.275789199999963,"y":-12.099950400000012},{"x":2.224227199999973,"y":-12.099950400000012}]} />
    <silkscreentext text="{NAME}" pcbX="-0.000381mm" pcbY="17.0274mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-16.277781000000118,"y":16.277399999999943},{"x":16.277018999999882,"y":16.277399999999943},{"x":16.277018999999882,"y":-16.277399999999943},{"x":-16.277781000000118,"y":-16.277399999999943},{"x":-16.277781000000118,"y":16.277399999999943}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19076967.obj?uuid=b6d9880015ca4fcf86b410816d650f7b",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19076967.step?uuid=b6d9880015ca4fcf86b410816d650f7b",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.02600960000017949, y: 0.000012699999956566899, z: -0.000009000000000369823 },
          }}
          {...props}
        />
      )
    }"
  `)
})
