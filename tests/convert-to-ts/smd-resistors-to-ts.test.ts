import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c107701RawEasy from "../assets/C107701.raweasy.json"
import c11702RawEasy from "../assets/C11702.raweasy.json"
import c17168RawEasy from "../assets/C17168.raweasy.json"
import c25744RawEasy from "../assets/C25744.raweasy.json"
import c2929994RawEasy from "../assets/C2929994.raweasy.json"

const resistorCases = [
  {
    rawEasy: c17168RawEasy,
    partNumber: "C17168",
    manufacturerPartNumber: "0402WGF0000TCE",
    packageName: "R0402",
    resistance: "0ohm",
    resistanceOhms: 0,
    displayResistance: "0Ω",
    padX: "0.432816mm",
    padWidth: "0.565658mm",
    padHeight: "0.540004mm",
    modelUuid: "026a4a15ab5c4a92ac0e421d6d013717",
  },
  {
    rawEasy: c11702RawEasy,
    partNumber: "C11702",
    manufacturerPartNumber: "0402WGF1001TCE",
    packageName: "R0402",
    resistance: "1kohm",
    resistanceOhms: 1_000,
    displayResistance: "1kΩ",
    padX: "0.432816mm",
    padWidth: "0.565658mm",
    padHeight: "0.540004mm",
    modelUuid: "026a4a15ab5c4a92ac0e421d6d013717",
  },
  {
    rawEasy: c25744RawEasy,
    partNumber: "C25744",
    manufacturerPartNumber: "0402WGF1002TCE",
    packageName: "R0402",
    resistance: "10kohm",
    resistanceOhms: 10_000,
    displayResistance: "10kΩ",
    padX: "0.432816mm",
    padWidth: "0.565658mm",
    padHeight: "0.540004mm",
    modelUuid: "026a4a15ab5c4a92ac0e421d6d013717",
  },
  {
    rawEasy: c2929994RawEasy,
    partNumber: "C2929994",
    manufacturerPartNumber: "FRC0402F22R0TS",
    packageName: "R0402",
    resistance: "22ohm",
    resistanceOhms: 22,
    displayResistance: "22Ω",
    padX: "0.432816mm",
    padWidth: "0.565658mm",
    padHeight: "0.540004mm",
    modelUuid: "026a4a15ab5c4a92ac0e421d6d013717",
  },
  {
    rawEasy: c107701RawEasy,
    partNumber: "C107701",
    manufacturerPartNumber: "RC0603FR-0722RL",
    packageName: "R0603",
    resistance: "22ohm",
    resistanceOhms: 22,
    displayResistance: "22Ω",
    padX: "0.753364mm",
    padWidth: "0.8064754mm",
    padHeight: "0.8640064mm",
    modelUuid: "6bd5cd867e9542ebae21caaf5d2d4c4d",
  },
] as const

for (const resistorCase of resistorCases) {
  it(`converts ${resistorCase.partNumber} ${resistorCase.packageName} to a resistor`, async () => {
    const betterEasy = EasyEdaJsonSchema.parse(resistorCase.rawEasy)
    expect(betterEasy.dataStr.head.c_para.package).toBe(
      resistorCase.packageName,
    )

    const result = await convertBetterEasyToTsx({ betterEasy })
    const expectedObjUrl = `https://modelcdn.tscircuit.com/easyeda_models/assets/${resistorCase.partNumber}.obj?uuid=${resistorCase.modelUuid}`
    const expectedStepUrl = `https://modelcdn.tscircuit.com/easyeda_models/assets/${resistorCase.partNumber}.step?uuid=${resistorCase.modelUuid}`

    expect(result).toContain(
      'import type { ResistorProps } from "@tscircuit/props"',
    )
    expect(result).toContain('props: Omit<ResistorProps, "resistance">')
    expect(result).toContain("<resistor")
    expect(result).toContain(`resistance="${resistorCase.resistance}"`)
    expect(result).not.toContain("<chip")
    expect(result).not.toContain("ChipProps")
    expect(result).not.toContain("<symbol")
    expect(result).toContain(
      `manufacturerPartNumber="${resistorCase.manufacturerPartNumber}"`,
    )
    expect(result).toContain(`"${resistorCase.partNumber}"`)
    expect(result).toContain(`objUrl: "${expectedObjUrl}"`)
    expect(result).toContain(`stepUrl: "${expectedStepUrl}"`)
    expect(result.match(/<footprint>/g)).toHaveLength(1)
    expect(result.match(/<smtpad /g)).toHaveLength(2)
    expect(result).toContain(
      `<smtpad portHints={["pin1"]} pcbX="-${resistorCase.padX}" pcbY="0mm" width="${resistorCase.padWidth}" height="${resistorCase.padHeight}" shape="rect" />`,
    )
    expect(result).toContain(
      `<smtpad portHints={["pin2"]} pcbX="${resistorCase.padX}" pcbY="0mm" width="${resistorCase.padWidth}" height="${resistorCase.padHeight}" shape="rect" />`,
    )

    const circuitJson = await runTscircuitCode(result)
    expect(circuitJson).toContainEqual(
      expect.objectContaining({
        type: "source_component",
        ftype: "simple_resistor",
        resistance: resistorCase.resistanceOhms,
        display_resistance: resistorCase.displayResistance,
        name: "R1",
        manufacturer_part_number: resistorCase.manufacturerPartNumber,
        supplier_part_numbers: { jlcpcb: [resistorCase.partNumber] },
      }),
    )
    expect(
      circuitJson.filter((element) => element.type === "source_port"),
    ).toHaveLength(2)
    expect(
      circuitJson.filter((element) => element.type === "pcb_smtpad"),
    ).toHaveLength(2)
    expect(
      circuitJson.filter((element) => element.type.endsWith("_error")),
    ).toHaveLength(0)
  })
}
