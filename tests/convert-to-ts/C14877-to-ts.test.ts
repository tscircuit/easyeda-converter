import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C14877.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C14877 into typescript file", async () => {
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
      pin3: ["GND3"],
      pin4: ["VCC2"],
      pin5: ["GND2"],
      pin6: ["VCC1"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"],
      pin13: ["pin13"],
      pin14: ["pin14"],
      pin15: ["pin15"],
      pin16: ["pin16"],
      pin17: ["pin17"],
      pin18: ["AVCC"],
      pin19: ["ADC6"],
      pin20: ["AREF"],
      pin21: ["GND1"],
      pin22: ["ADC7"],
      pin23: ["pin23"],
      pin24: ["pin24"],
      pin25: ["pin25"],
      pin26: ["pin26"],
      pin27: ["pin27"],
      pin28: ["pin28"],
      pin29: ["pin29"],
      pin30: ["pin30"],
      pin31: ["pin31"],
      pin32: ["pin32"]
    } as const

    export const ATMEGA328P_AU = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C14877"
      ]
    }}
          manufacturerPartNumber="ATMEGA328P_AU"
          footprint={<footprint>
            <smtpad portHints={["pin32"]} pcbX="-4.3815mm" pcbY="-2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="-4.3815mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="-4.3815mm" pcbY="-1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="-4.3815mm" pcbY="-0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="-4.3815mm" pcbY="0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="-4.3815mm" pcbY="1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="-4.3815mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="-4.3815mm" pcbY="2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="-2.7999944mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="-1.999996mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="-1.1999976mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="-0.3999992mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="0.3999992mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="1.1999976mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="1.999996mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="2.7999944mm" pcbY="4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="4.3815mm" pcbY="2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="4.3815mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="4.3815mm" pcbY="1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="4.3815mm" pcbY="0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="4.3815mm" pcbY="-0.3999992mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="4.3815mm" pcbY="-1.1999976mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="4.3815mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="4.3815mm" pcbY="-2.7999944mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="2.7999944mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="1.999996mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="1.1999976mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="0.3999992mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-0.3999992mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-1.1999976mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-1.999996mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-2.7999944mm" pcbY="-4.3688mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <silkscreenpath route={[{"x":-2.967482000000004,"y":-4.825999999999993},{"x":-2.819400000000016,"y":-4.9740820107053025},{"x":-2.6713180000000136,"y":-4.825999999999993}]} />
    <silkscreenpath route={[{"x":-2.6713180000000136,"y":-4.825999999999993},{"x":-2.819400000000016,"y":-4.677917989294684},{"x":-2.967482000000004,"y":-4.825999999999993}]} />
    <silkscreenpath route={[{"x":-2.9626559999999813,"y":2.9499560000000145},{"x":-2.9626559999999813,"y":-2.949955999999986},{"x":2.937256000000019,"y":-2.949955999999986},{"x":2.937256000000019,"y":2.9499560000000145},{"x":-2.9626559999999813,"y":2.9499560000000145}]} />
    <silkscreenpath route={[{"x":-3.7591999999999928,"y":-4.063999999999993},{"x":-3.907941055997668,"y":-3.9133579702960617},{"x":-3.7579300000000018,"y":-3.763980575985258},{"x":-3.6079189440023356,"y":-3.9133579702960617},{"x":-3.7566599999999966,"y":-4.063999999999993}]} />
    <silkscreenpath route={[{"x":-2.2123399999999975,"y":-1.998980000000003},{"x":-2.4015150142161303,"y":-1.86006255080585},{"x":-2.3284212288967012,"y":-1.6370321891015465},{"x":-2.0937187711032834,"y":-1.6370321891015465},{"x":-2.0206249857838543,"y":-1.86006255080585},{"x":-2.209799999999987,"y":-1.998980000000003}]} />
    <silkscreentext text="{NAME}" pcbX="0mm" pcbY="5.9657mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.228400000000008,"y":5.215700000000012},{"x":5.2283999999999935,"y":5.215700000000012},{"x":5.2283999999999935,"y":-5.215699999999998},{"x":-5.228400000000008,"y":-5.215699999999998},{"x":-5.228400000000008,"y":5.215700000000012}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.obj?uuid=4d9f6c3430024506b87ce44b53201fc5",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.step?uuid=4d9f6c3430024506b87ce44b53201fc5",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.0012984000000164642, y: -0.0030292999999934622, z: 0.000917 },
          }}
          {...props}
        />
      )
    }"
  `)
})
