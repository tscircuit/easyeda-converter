import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { isResistorComponent } from "lib/websafe/convert-to-typescript-component/is-resistor-component"
import resistorRawEasy from "./assets/C5127775.raweasy.json"

for (const category of [
  "Current Sense Resistors/Shunt Resistors",
  "Current Sense Resistors / Shunt Resistors",
  "Chip Resistor - Surface Mount",
  "Resistors",
]) {
  it(`recognizes ${category} with a non-resistor symbol prefix`, () => {
    const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
    betterEasy.tags = [category]
    expect(isResistorComponent(betterEasy)).toBe(true)
  })
}

it("keeps R? resistor detection when categories are absent", () => {
  const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
  betterEasy.tags = []
  betterEasy.dataStr.head.c_para.pre = "R?"
  expect(isResistorComponent(betterEasy)).toBe(true)
})

for (const tags of [[], ["Current Sense Amplifiers"], ["NonResistors"]]) {
  it(`does not classify a U? component from package and resistance alone: ${tags}`, () => {
    const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
    betterEasy.tags = tags
    expect(isResistorComponent(betterEasy)).toBe(false)
  })
}

for (const componentParameters of [
  { package: "SOIC-8", Value: "180mΩ" },
  { package: "R1206", Value: "unavailable" },
  { package: "R1206", Value: "3.9uH" },
]) {
  it(`requires a standard resistor package and valid resistance: ${JSON.stringify(componentParameters)}`, () => {
    const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
    Object.assign(betterEasy.dataStr.head.c_para, componentParameters)
    expect(isResistorComponent(betterEasy)).toBe(false)
  })
}

it("keeps multi-pin components as chips even with resistor metadata", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
  const pin = betterEasy.dataStr.shape.find((shape) => shape.type === "PIN")
  if (!pin) throw new Error("Expected a symbol pin in the resistor fixture")
  betterEasy.dataStr.shape.push({ ...pin, pinNumber: 3 })
  const pad = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "PAD",
  )
  if (!pad) throw new Error("Expected a footprint pad in the resistor fixture")
  betterEasy.packageDetail.dataStr.shape.push({ ...pad, number: "3" })
  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain("<chip")
  expect(result).not.toContain("<resistor")
})
