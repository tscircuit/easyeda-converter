import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19076967.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"

it("should convert C19076967 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

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
            <platedhole  portHints={["pin5"]} pcbX="-0.016891000000100576mm" pcbY="-12.100051999999891mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin11"]} pcbX="0.016890999999873202mm" pcbY="12.100052000000005mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="270deg" shape="pill" />
    <platedhole  portHints={["pin9"]} pcbX="-7.098919000000137mm" pcbY="9.798811999999998mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="306deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="7.098664999999869mm" pcbY="-9.799066000000039mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="306deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="11.502516999999898mm" pcbY="-3.755135999999993mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="342deg" shape="pill" />
    <platedhole  portHints={["pin8"]} pcbX="-11.502517000000239mm" pcbY="3.755135999999993mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="342deg" shape="pill" />
    <platedhole  portHints={["pin7"]} pcbX="-11.512931000000094mm" pcbY="-3.723131999999964mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="18deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="11.51293099999998mm" pcbY="3.723131999999964mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="18deg" shape="pill" />
    <platedhole  portHints={["pin6"]} pcbX="-7.125843000000032mm" pcbY="-9.779254000000037mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="54deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="7.12533499999995mm" pcbY="9.778999999999996mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="5.199989599999999mm" rectPad={true} pcbRotation="54deg" shape="pill" />
    <platedhole  portHints={["pin10"]} pcbX="-1.4258290000001352mm" pcbY="0mm" holeWidth="1.5000224mm" holeHeight="3.90005824mm" outerWidth="2.1999956mm" outerHeight="4.9999899999999995mm" rectPad={true} pcbRotation="0deg" shape="pill" />
    <silkscreenpath route={[{"x":-2.8999942000000374,"y":-4.099991799999998},{"x":2.89999419999981,"y":-4.099991799999998}]} />
    <silkscreenpath route={[{"x":2.224227199999973,"y":12.100001199999951},{"x":-2.275789199999963,"y":12.100001199999951}]} />
    <silkscreenpath route={[{"x":-2.275789199999963,"y":-12.099950400000012},{"x":2.224227199999973,"y":-12.099950400000012}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=b6d9880015ca4fcf86b410816d650f7b&pn=C19076967",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: -0.026009600000065802, y: 0, z: -11.350051999999902 },
          }}
          {...props}
        />
      )
    }"
  `)

  const circuitJson = await runTscircuitCode(result)

  expect(convertCircuitJsonToPcbSvg(circuitJson as any)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
