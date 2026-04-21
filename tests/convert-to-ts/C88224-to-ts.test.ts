import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C88224.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C88224 into typescript file", async () => {
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
      pin1: ["AO11"],
      pin2: ["AO12"],
      pin3: ["PGND11"],
      pin4: ["PGND12"],
      pin5: ["AO21"],
      pin6: ["AO22"],
      pin7: ["BO21"],
      pin8: ["BO22"],
      pin9: ["PGND21"],
      pin10: ["PGND22"],
      pin11: ["BO11"],
      pin12: ["BO12"],
      pin13: ["VM2"],
      pin14: ["VM3"],
      pin15: ["PWMB"],
      pin16: ["BIN2"],
      pin17: ["BIN1"],
      pin18: ["GND"],
      pin19: ["STBY"],
      pin20: ["VCC"],
      pin21: ["AIN1"],
      pin22: ["AIN2"],
      pin23: ["PWMA"],
      pin24: ["VM1"]
    } as const

    export const TB6612FNG_O_C_8_EL = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C88224"
      ]
    }}
          manufacturerPartNumber="TB6612FNG_O_C_8_EL"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-3.57505mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-2.925064mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-2.275078mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.625092mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-0.975106mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-0.324866mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="0.32512mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="0.975106mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="1.625092mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="2.275078mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="2.925064mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="3.57505mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="-3.57505mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="-2.925064mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-2.275078mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="-1.625092mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="-0.975106mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="-0.324866mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="0.32512mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="0.975106mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="1.625092mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="2.275078mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="2.925064mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="3.57505mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" shape="rect" />
    <silkscreenpath route={[{"x":-4.17619179999997,"y":-2.2214077999999517},{"x":-4.17619179999997,"y":2.2214077999999517},{"x":4.17619179999997,"y":2.2214077999999517},{"x":4.17619179999997,"y":-2.2214077999999517},{"x":-4.17619179999997,"y":-2.2214077999999517}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0889mm" pcbY="5.3434mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-4.618799999999965,"y":4.593399999999974},{"x":4.440999999999917,"y":4.593399999999974},{"x":4.440999999999917,"y":-4.694999999999936},{"x":-4.618799999999965,"y":-4.694999999999936},{"x":-4.618799999999965,"y":4.593399999999974}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C88224.obj?uuid=47443b588a77418ba6b4ea51975c36c0",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C88224.step?uuid=47443b588a77418ba6b4ea51975c36c0",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0.000012699999842880061, y: 0, z: -0.1 },
          }}
          {...props}
        />
      )
    }"
  `)
})
