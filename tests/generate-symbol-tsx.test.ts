import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  generateSymbolTsx,
  hasNonBoxSchematicSymbol,
} from "lib/websafe/convert-to-typescript-component/generate-symbol-tsx"
import pinsOnlyRawEasy from "./assets/C19076967.raweasy.json"
import ne555RawEasy from "./assets/C46749.raweasy.json"
import rp2040RawEasy from "./assets/C2040.raweasy.json"
import symbolWithArcRawEasy from "./assets/C2961147.raweasy.json"
import symbolWithPathRawEasy from "./assets/C2828420.raweasy.json"
import symbolWithStaleHeadOriginRawEasy from "./assets/C5830143.raweasy.json"

const generateSymbolFromRawEasy = (rawEasy: unknown): string => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  return generateSymbolTsx(betterEasy, circuitJson) ?? ""
}

test("generates a centered symbol with positioned, aliased ports", () => {
  const symbolTsx = generateSymbolFromRawEasy(ne555RawEasy)

  expect(symbolTsx).toContain(
    "<schematicrect schX={0} schY={0} width={17.78} height={12.7}",
  )
  expect(symbolTsx).toContain(
    "<schematiccircle center={{ x: -7.62, y: 5.08 }} radius={0.381}",
  )
  expect(symbolTsx).toContain(
    '<port name="pin1" pinNumber={1} aliases={["GND"]} direction="left" schX={-11.43} schY={3.81} schStemLength={2.54} />',
  )
  expect(symbolTsx.match(/<port /g)).toHaveLength(8)
})

test("transforms EasyEDA paths, arcs, and text into symbol-local coordinates", () => {
  const pathSymbolTsx = generateSymbolFromRawEasy(symbolWithPathRawEasy)
  const arcSymbolTsx = generateSymbolFromRawEasy(symbolWithArcRawEasy)

  expect(pathSymbolTsx).toContain(
    '<schematicpath svgPath="M 1.27 1.778 L -1.27 0 L 1.27 -1.778 Z" strokeColor="#880000" />',
  )
  expect(arcSymbolTsx).toContain(
    '<schematicpath svgPath="M -5.08 1.524 A 1.016 1.016 0 1 0 -5.08 3.556" strokeColor="#880000" />',
  )
  expect(pathSymbolTsx).not.toContain("strokeWidth")
  expect(arcSymbolTsx).not.toContain("strokeWidth")
  expect(generateSymbolFromRawEasy(rp2040RawEasy)).toContain(
    '<schematictext schX={0} schY={2.54} text="RP2040" fontSize={4.056944} anchor="left" color="#0000FF" schRotation={0} />',
  )
})

test("uses the symbol bounds when EasyEDA head coordinates are stale", () => {
  const symbolTsx = generateSymbolFromRawEasy(symbolWithStaleHeadOriginRawEasy)

  expect(symbolTsx).toContain(
    '<port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0} schY={2.794}',
  )
  expect(symbolTsx).not.toContain("-101.854")
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
