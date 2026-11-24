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
      pin1: ["PCINT19","OC2B","INT1_PD3"],
      pin2: ["PCINT20","XCK","T0_PD4"],
      pin3: ["GND3"],
      pin4: ["VCC2"],
      pin5: ["GND2"],
      pin6: ["VCC1"],
      pin7: ["PCINT6","XTAL1","TOSC1_PB6"],
      pin8: ["PCINT7","XTAL2","TOSC2_PB7"],
      pin9: ["PCINT21","OC0B","T1_PD5"],
      pin10: ["PCINT22","OC0A","AIN0_PD6"],
      pin11: ["PCINT23","AIN1_PD7"],
      pin12: ["PCINT0","CLKO","ICP1_PB0"],
      pin13: ["PCINT1","OC1A_PB1"],
      pin14: ["PCINT2","N_SS","OC1B_PB2"],
      pin15: ["PCINT3","OC2A","MOSI_PB3"],
      pin16: ["PCINT4","MISO_PB4"],
      pin17: ["PB5_SCK","PCINT5"],
      pin18: ["AVCC"],
      pin19: ["ADC6"],
      pin20: ["AREF"],
      pin21: ["GND1"],
      pin22: ["ADC7"],
      pin23: ["PC0_ADC0","PCINT8"],
      pin24: ["PC1_ADC1","PCINT9"],
      pin25: ["PC2_ADC2","PCINT10"],
      pin26: ["PC3_ADC3","PCINT11"],
      pin27: ["PC4_ADC4","SDA","PCINT12"],
      pin28: ["PC5_ADC5","SCL","PCINT13"],
      pin29: ["N_PC6_RESET","PCINT14"],
      pin30: ["PD0_RXD","PCINT16"],
      pin31: ["PD1_TXD","PCINT17"],
      pin32: ["PD2_INT0","PCINT18"]
    } as const

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin4: {requiresPower: true},
      pin5: {requiresGround: true},
      pin6: {requiresPower: true},
      pin21: {requiresGround: true}
    } as const

    export const ATMEGA328P_AU = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C14877"
      ]
    }}
          manufacturerPartNumber="ATMEGA328P-AU"
          footprint={<footprint>
            <smtpad portHints={["pin32"]} pcbX="-2.799994mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="-1.999996mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="-1.199998mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="-0.399999mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="0.399999mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="1.199998mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="1.999996mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="2.799994mm" pcbY="4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="4.3688mm" pcbY="2.799994mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="4.3688mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="4.3688mm" pcbY="1.199998mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="4.3688mm" pcbY="0.399999mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="4.3688mm" pcbY="-0.399999mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="4.3688mm" pcbY="-1.199998mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="4.3688mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="4.3688mm" pcbY="-2.799994mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="2.799994mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="1.999996mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="1.199998mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="0.399999mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="-0.399999mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="-1.199998mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="-1.999996mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="-2.799994mm" pcbY="-4.3815mm" width="0.4500118mm" height="1.6500094mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-4.3688mm" pcbY="-2.799994mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-4.3688mm" pcbY="-1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-4.3688mm" pcbY="-1.199998mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-4.3688mm" pcbY="-0.399999mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-4.3688mm" pcbY="0.399999mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-4.3688mm" pcbY="1.199998mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-4.3688mm" pcbY="1.999996mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-4.3688mm" pcbY="2.799994mm" width="1.6500094mm" height="0.4500118mm" radius="0.2250059mm" shape="pill" />
    <silkscreenpath route={[{"x":-4.826,"y":2.967482},{"x":-4.677918,"y":2.8194},{"x":-4.826,"y":2.671318}]} />
    <silkscreenpath route={[{"x":-4.826,"y":2.671318},{"x":-4.974082,"y":2.8194},{"x":-4.826,"y":2.967482}]} />
    <silkscreenpath route={[{"x":2.949956,"y":2.962656},{"x":-2.949956,"y":2.962656},{"x":-2.949956,"y":-2.937256},{"x":2.949956,"y":-2.937256},{"x":2.949956,"y":2.962656}]} />
    <silkscreenpath route={[{"x":-4.064,"y":3.7592},{"x":-4.214642,"y":3.907941},{"x":-4.364019,"y":3.75793},{"x":-4.214642,"y":3.607919},{"x":-4.064,"y":3.75666}]} />
    <silkscreenpath route={[{"x":-1.99898,"y":2.21234},{"x":-2.137897,"y":2.401515},{"x":-2.360928,"y":2.328421},{"x":-2.360928,"y":2.093719},{"x":-2.137897,"y":2.020625},{"x":-1.99898,"y":2.2098}]} />
    <silkscreentext text="{NAME}" pcbX="5.9657mm" pcbY="0mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":5.443805,"y":5.456505},{"x":5.443805,"y":-5.456505},{"x":-5.443805,"y":-5.456505},{"x":-5.443805,"y":5.456505},{"x":5.443805,"y":5.456505}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.obj?uuid=4d9f6c3430024506b87ce44b53201fc5",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14877.step?uuid=4d9f6c3430024506b87ce44b53201fc5",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.003029, y: 0.001298, z: 0.000917 },
          }}
          {...props}
        />
      )
    }"
  `)
})
