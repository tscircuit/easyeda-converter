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
    <silkscreenpath route={[{"x":-3.4249360000000024,"y":-1.469135999999935},{"x":-3.430051010512557,"y":-1.5079883621365298},{"x":-3.445047462536195,"y":-1.5441930000000639},{"x":-3.4689033726488105,"y":-1.5752826273510436},{"x":-3.4999930000000177,"y":-1.5991385374636593},{"x":-3.536197637863438,"y":-1.6141349894875248},{"x":-3.5750499999999192,"y":-1.6192499999999654},{"x":-3.613902362136514,"y":-1.6141349894875248},{"x":-3.650107000000048,"y":-1.5991385374636593},{"x":-3.681196627351028,"y":-1.5752826273510436},{"x":-3.7050525374636436,"y":-1.5441930000000639},{"x":-3.720048989487509,"y":-1.5079883621365298},{"x":-3.7251639999999497,"y":-1.469135999999935},{"x":-3.720048989487509,"y":-1.4302836378634538},{"x":-3.7050525374636436,"y":-1.3940789999999197},{"x":-3.681196627351028,"y":-1.3629893726490536},{"x":-3.650107000000048,"y":-1.3391334625362106},{"x":-3.613902362136514,"y":-1.3241370105124588},{"x":-3.5750499999999192,"y":-1.3190220000000181},{"x":-3.536197637863438,"y":-1.3241370105124588},{"x":-3.4999930000000177,"y":-1.3391334625362106},{"x":-3.4689033726488105,"y":-1.3629893726490536},{"x":-3.445047462536195,"y":-1.3940789999999197},{"x":-3.430051010512557,"y":-1.4302836378634538},{"x":-3.4249360000000024,"y":-1.469135999999935}]} />
    <silkscreenpath route={[{"x":-4.059174000000098,"y":-3.4909759999999324},{"x":-4.064289010512653,"y":-3.529828362136641},{"x":-4.079285462536291,"y":-3.5660330000000613},{"x":-4.103141372648906,"y":-3.597122627351041},{"x":-4.1342310000001135,"y":-3.6209785374636567},{"x":-4.170435637863534,"y":-3.635974989487522},{"x":-4.209288000000015,"y":-3.6410900000000765},{"x":-4.24814036213661,"y":-3.635974989487522},{"x":-4.284345000000144,"y":-3.6209785374636567},{"x":-4.315434627351124,"y":-3.597122627351041},{"x":-4.339290537463739,"y":-3.5660330000000613},{"x":-4.354286989487605,"y":-3.529828362136641},{"x":-4.3594020000000455,"y":-3.4909759999999324},{"x":-4.354286989487605,"y":-3.4521236378634512},{"x":-4.339290537463739,"y":-3.415919000000031},{"x":-4.315434627351124,"y":-3.3848293726489374},{"x":-4.284345000000144,"y":-3.3609734625363217},{"x":-4.24814036213661,"y":-3.34597701051257},{"x":-4.209288000000015,"y":-3.3408620000000155},{"x":-4.170435637863534,"y":-3.34597701051257},{"x":-4.1342310000001135,"y":-3.3609734625363217},{"x":-4.103141372648906,"y":-3.3848293726489374},{"x":-4.079285462536291,"y":-3.415919000000031},{"x":-4.064289010512653,"y":-3.4521236378634512},{"x":-4.059174000000098,"y":-3.4909759999999324}]} />
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
