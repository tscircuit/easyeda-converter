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

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin4: {requiresGround: true},
      pin9: {requiresGround: true},
      pin10: {requiresGround: true},
      pin18: {requiresGround: true},
      pin20: {requiresPower: true}
    } as const

    export const TB6612FNG_O_C_8_EL = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C88224"
      ]
    }}
          manufacturerPartNumber="TB6612FNG(O,C,8,EL"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-3.57505mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-2.925064mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-2.275078mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-1.625092mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-0.975106mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-0.324866mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="0.32512mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="0.975106mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="1.625092mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="2.275078mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="2.925064mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="3.57505mm" pcbY="-3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="-3.57505mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="-2.925064mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="-2.275078mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="-1.625092mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="-0.975106mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="-0.324866mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="0.32512mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="0.975106mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="1.625092mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="2.275078mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="2.925064mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="3.57505mm" pcbY="3.490976mm" width="0.3640074mm" height="2.0820126mm" radius="0.1820037mm" shape="pill" />
    <silkscreenpath route={[{"x":-4.17619179999997,"y":-2.2214077999999517},{"x":-4.17619179999997,"y":2.2214077999999517},{"x":4.17619179999997,"y":2.2214077999999517},{"x":4.17619179999997,"y":-2.2214077999999517},{"x":-4.17619179999997,"y":-2.2214077999999517}]} />
    <silkscreencircle pcbX="-3.57505mm" pcbY="-1.469136mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-4.209288mm" pcbY="-3.490976mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.0889mm" pcbY="5.3434mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-3.4249360000000024,"y":-4.29996600000004},{"x":-3.427820398417566,"y":-4.329251788599208},{"x":-3.436362747856606,"y":-4.357412140766087},{"x":-3.450234770618863,"y":-4.383364869959564},{"x":-3.468903372649038,"y":-4.406112627351035},{"x":-3.491651130040509,"y":-4.42478122938121},{"x":-3.5176038592339864,"y":-4.438653252143467},{"x":-3.545764211400865,"y":-4.447195601582507},{"x":-3.575050000000033,"y":-4.450080000000071},{"x":-3.604335788599201,"y":-4.447195601582507},{"x":-3.6324961407660794,"y":-4.438653252143467},{"x":-3.6584488699595568,"y":-4.42478122938121},{"x":-3.681196627351028,"y":-4.406112627351035},{"x":-3.699865229381203,"y":-4.383364869959564},{"x":-3.71373725214346,"y":-4.357412140766087},{"x":-3.7222796015824997,"y":-4.329251788599208},{"x":-3.7251640000000634,"y":-4.29996600000004},{"x":-3.7222796015824997,"y":-4.270680211400872},{"x":-3.71373725214346,"y":-4.242519859233994},{"x":-3.699865229381203,"y":-4.2165671300405165},{"x":-3.681196627351028,"y":-4.193819372649045},{"x":-3.6584488699595568,"y":-4.17515077061887},{"x":-3.6324961407660794,"y":-4.161278747856613},{"x":-3.604335788599201,"y":-4.152736398417574},{"x":-3.575050000000033,"y":-4.14985200000001},{"x":-3.545764211400865,"y":-4.152736398417574},{"x":-3.5176038592339864,"y":-4.161278747856613},{"x":-3.491651130040509,"y":-4.17515077061887},{"x":-3.468903372649038,"y":-4.193819372649045},{"x":-3.450234770618863,"y":-4.2165671300405165},{"x":-3.436362747856606,"y":-4.242519859233994},{"x":-3.427820398417566,"y":-4.270680211400872},{"x":-3.4249360000000024,"y":-4.29996600000004}]} strokeWidth="0.2999994mm" />
    <courtyardoutline outline={[{"x":-4.449991600000089,"y":4.781982300000095},{"x":4.449991599999976,"y":4.781982300000095},{"x":4.449991599999976,"y":-4.781982300000095},{"x":-4.449991600000089,"y":-4.781982300000095},{"x":-4.449991600000089,"y":4.781982300000095}]} />
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
