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
import pinsOnlyRawEasy from "./assets/C19076967.raweasy.json"
import protectionDiodeRawEasy from "./assets/C7519.raweasy.json"
import transistorRawEasy from "./assets/C20526.raweasy.json"

const generateSymbolFromRawEasy = (rawEasy: unknown): string => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  return generateSymbolTsx(betterEasy, circuitJson) ?? ""
}

test("keeps automatic pin stems for older data without label positions", () => {
  const betterEasy = EasyEdaJsonSchema.parse(transistorRawEasy)
  for (const shape of betterEasy.dataStr.shape) {
    if (shape.type === "PIN") delete shape.labelText
  }
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const symbolTsx = generateSymbolTsx(betterEasy, circuitJson) ?? ""

  expect(symbolTsx.match(/schStemLength=\{0.2\}/g)).toHaveLength(3)
  expect(symbolTsx).not.toContain("<schematictext")
})

test("imports labels on large, horizontal-pin symbols without overlap checks", () => {
  const symbolTsx = generateSymbolFromRawEasy(ne555RawEasy)

  expect(symbolTsx).toContain(
    '<schematictext schX={-0.626} schY={0.22} text="GND" fontSize={0.14} anchor="left" color="#000000" schRotation={0} />',
  )
  expect(symbolTsx.match(/<schematictext /g)).toHaveLength(8)
  expect(symbolTsx.match(/schStemLength=\{0\}/g)).toHaveLength(8)
})

test("preserves visible source label text, size, color, alignment, and rotation", () => {
  const rawEasy = structuredClone(transistorRawEasy)
  rawEasy.dataStr.shape = rawEasy.dataStr.shape.map((shape) =>
    shape.replace(
      "^^0~13~-7~270~C~end~~~#0000FF",
      "^^1~13~-7~270~C+~middle~~12~#123456",
    ),
  )
  const symbolTsx = generateSymbolFromRawEasy(rawEasy)

  expect(symbolTsx).toContain(
    '<schematictext schX={0.26} schY={0.14} text="C+" fontSize={0.24} anchor="center" color="#123456" schRotation={270} />',
  )
  expect(symbolTsx.match(/<schematictext /g)).toHaveLength(1)
})

test("does not introduce labels hidden in the source symbol", () => {
  const symbolTsx = generateSymbolFromRawEasy(transistorRawEasy)

  expect(symbolTsx).not.toContain("<schematictext")
  expect(symbolTsx.match(/<port /g)).toHaveLength(3)
  expect(symbolTsx.match(/schStemLength=\{0\}/g)).toHaveLength(3)
  expect(symbolTsx).toContain(
    '<schematicpath svgPath="M 0.2 0.4 L 0.2 0.2" strokeColor="#880000" />',
  )
})

test("preserves visible numeric pin names", () => {
  const rawEasy = structuredClone(transistorRawEasy)
  rawEasy.dataStr.shape = rawEasy.dataStr.shape.map((shape) =>
    shape.replace("^^0~13~-7~270~C~end", "^^1~13~-7~270~3~end"),
  )
  expect(generateSymbolFromRawEasy(rawEasy)).toContain('text="3"')
})

test.each(["none", "#880000", ""])(
  "keeps the rectangle primitive when its fill is %s",
  (fillColor) => {
    const rawEasy = structuredClone(protectionDiodeRawEasy)
    rawEasy.dataStr.shape[0] = rawEasy.dataStr.shape[0].replace(
      "#FFFFFF",
      fillColor,
    )
    const symbolTsx = generateSymbolFromRawEasy(rawEasy)

    expect(symbolTsx).toContain(
      '<schematicrect schX={0} schY={0} width={1.8} height={2} strokeWidth={0.02} color="#880000"',
    )
    expect(symbolTsx.match(/<port /g)).toHaveLength(6)
  },
)

test("generates a centered symbol with positioned, aliased ports", () => {
  const symbolTsx = generateSymbolFromRawEasy(ne555RawEasy)

  expect(symbolTsx).toContain(
    "<schematicrect schX={0} schY={0} width={1.4} height={1} strokeWidth={0.02}",
  )
  expect(symbolTsx).toContain(
    "<schematiccircle center={{ x: -0.6, y: 0.4 }} radius={0.03} strokeWidth={0.02}",
  )
  expect(symbolTsx).toContain(
    '<port name="pin1" pinNumber={1} aliases={["GND"]} direction="left" schX={-0.9} schY={0.3} schStemLength={0} />',
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
    '<port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0} />',
  )
  expect(symbolTsx).not.toContain("width={10.16}")
})

test("uses the symbol bounds when EasyEDA head coordinates are stale", () => {
  const symbolTsx = generateSymbolFromRawEasy(symbolWithStaleHeadOriginRawEasy)

  expect(symbolTsx).toContain(
    '<port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0} schY={0.22}',
  )
  expect(symbolTsx).not.toContain("-101.854")
})

test("maps duplicate EasyEDA symbol pin numbers to unused footprint ports", () => {
  const symbolTsx = generateSymbolFromRawEasy(duplicateSymbolPinRawEasy)

  expect(symbolTsx).toContain(
    '<port name="pin4" pinNumber={4} aliases={["NC"]}',
  )
  expect(symbolTsx.match(/name="pin8"/g)).toHaveLength(1)
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
