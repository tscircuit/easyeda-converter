import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  generateSymbolTsx,
  hasNonBoxSchematicSymbol,
} from "lib/websafe/convert-to-typescript-component/generate-symbol-tsx"
import rp2040RawEasy from "./assets/C2040.raweasy.json"
import ne555RawEasy from "./assets/C46749.raweasy.json"
import duplicateSymbolPinRawEasy from "./assets/C113367.raweasy.json"
import crystalRawEasy from "./assets/C1985372.raweasy.json"
import symbolWithPathRawEasy from "./assets/C2828420.raweasy.json"
import symbolWithArcRawEasy from "./assets/C2961147.raweasy.json"
import symbolWithStaleHeadOriginRawEasy from "./assets/C5830143.raweasy.json"
import twoPinCustomSymbolRawEasy from "./assets/C49234237.raweasy.json"
import pinsOnlyRawEasy from "./assets/C19076967.raweasy.json"
import unicodePolarityRawEasy from "./assets/C2886621.raweasy.json"

const generateSymbolFromRawEasy = (rawEasy: unknown): string => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  return generateSymbolTsx(betterEasy, circuitJson) ?? ""
}

test("generates a centered symbol with positioned, aliased ports", () => {
  const symbolTsx = generateSymbolFromRawEasy(ne555RawEasy)

  expect(symbolTsx).toContain(
    "<schematicrect schX={0} schY={0} width={1.4} height={1} strokeWidth={0.02}",
  )
  expect(symbolTsx).toContain(
    "<schematiccircle center={{ x: -0.6, y: 0.4 }} radius={0.03} strokeWidth={0.02}",
  )
  expect(symbolTsx).toContain(
    '<port name="pin1" pinNumber={1} aliases={["GND"]} direction="left" schX={-0.9} schY={0.3} schStemLength={0.2} />',
  )
  expect(symbolTsx.match(/<port /g)).toHaveLength(8)
})

test("transforms EasyEDA paths, arcs, and text into symbol-local coordinates", () => {
  const pathSymbolTsx = generateSymbolFromRawEasy(symbolWithPathRawEasy)
  const arcSymbolTsx = generateSymbolFromRawEasy(symbolWithArcRawEasy)

  expect(pathSymbolTsx).toContain(
    '<schematicpath svgPath="M 0.1 0.14 L -0.1 0 L 0.1 -0.14 Z" strokeColor="#880000" />',
  )
  expect(arcSymbolTsx).toContain(
    '<schematicpath svgPath="M -0.4 0.12 A 0.08 0.08 0 1 0 -0.4 0.28" strokeColor="#880000" />',
  )
  expect(generateSymbolFromRawEasy(rp2040RawEasy)).toContain(
    '<schematictext schX={0} schY={0.2} text="RP2040" fontSize={0.23} anchor="left" color="#0000FF" schRotation={0} />',
  )
})

test("keeps imported crystal symbols on tscircuit's schematic grid", () => {
  const symbolTsx = generateSymbolFromRawEasy(crystalRawEasy)

  expect(symbolTsx).toContain(
    "<schematicrect schX={0} schY={0} width={0.8} height={0.8} strokeWidth={0.02}",
  )
  expect(symbolTsx).toContain(
    '<port name="pin1" pinNumber={1} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.2} />',
  )
  expect(symbolTsx).not.toContain("width={10.16}")
})

test("uses the symbol bounds when EasyEDA head coordinates are stale", () => {
  const symbolTsx = generateSymbolFromRawEasy(symbolWithStaleHeadOriginRawEasy)

  expect(symbolTsx).toContain(
    '<port name="pin2" pinNumber={2} direction="up" schX={0} schY={0.22}',
  )
  expect(symbolTsx).not.toContain("-101.854")
})

test("maps duplicate EasyEDA symbol pin numbers to unused footprint ports", () => {
  const symbolTsx = generateSymbolFromRawEasy(duplicateSymbolPinRawEasy)

  expect(symbolTsx).toContain(
    '<port name="pin4" pinNumber={4} direction="left"',
  )
  expect(symbolTsx).toContain('aliases={["N_SD"]}')
  expect(symbolTsx).toContain('aliases={["IN_NEG"]}')
  expect(symbolTsx).toContain('aliases={["VO_NEG"]}')
  expect(symbolTsx).not.toContain('aliases={["SD#"]}')
  expect(symbolTsx).not.toContain('aliases={["IN-"]}')
  expect(symbolTsx).not.toContain('aliases={["VO-"]}')
  expect(symbolTsx.match(/name="pin8"/g)).toHaveLength(1)
})

test("keeps Unicode polarity characters out of selector aliases", () => {
  const symbolTsx = generateSymbolFromRawEasy(unicodePolarityRawEasy)

  expect(symbolTsx).toContain('aliases={["SINEIN_NEG"]}')
  expect(symbolTsx).not.toContain('aliases={["SINEIN–"]}')
})

test("keeps duplicate custom-symbol aliases uniquely numbered", () => {
  const betterEasy = EasyEdaJsonSchema.parse(twoPinCustomSymbolRawEasy)
  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")
  if (pins.length !== 2) throw new Error("Expected a two-pin custom symbol")

  pins[0].label = "PA0/ADC"
  pins[1].label = "PA1/ADC"

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const symbolTsx = generateSymbolTsx(betterEasy, circuitJson) ?? ""

  expect(symbolTsx).toContain(
    'name="pin1" pinNumber={1} aliases={["PA0","ADC1"]}',
  )
  expect(symbolTsx).toContain(
    'name="pin2" pinNumber={2} aliases={["PA1","ADC2"]}',
  )
  expect(symbolTsx).not.toContain('"ADC"')
})

test("distinguishes custom symbols from chip box representations", () => {
  expect(hasNonBoxSchematicSymbol(EasyEdaJsonSchema.parse(ne555RawEasy))).toBe(
    false,
  )
  expect(
    hasNonBoxSchematicSymbol(EasyEdaJsonSchema.parse(pinsOnlyRawEasy)),
  ).toBe(false)
  expect(hasNonBoxSchematicSymbol(EasyEdaJsonSchema.parse(rp2040RawEasy))).toBe(
    false,
  )
  expect(
    hasNonBoxSchematicSymbol(EasyEdaJsonSchema.parse(symbolWithArcRawEasy)),
  ).toBe(true)
})
