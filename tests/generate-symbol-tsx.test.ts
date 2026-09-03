import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { SingleLetterShapeSchema } from "lib/schemas/single-letter-shape-schema"
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
import switchRawEasy from "./assets/C2941005.raweasy.json"
import slideSwitchRawEasy from "./assets/C136720.raweasy.json"

const generateSymbolFromRawEasy = (rawEasy: unknown): string => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  return generateSymbolTsx(betterEasy, circuitJson) ?? ""
}

test("preserves the switch drawing, pin-number positions, and dashed contacts", () => {
  const symbolTsx = generateSymbolFromRawEasy(switchRawEasy)
  expect(symbolTsx.match(/<port /g)).toHaveLength(6)
  expect(symbolTsx.match(/<schematictext /g)).toHaveLength(7)
  expect(symbolTsx).toContain('text="{NAME}"')
  expect(symbolTsx).toContain(
    '<schematictext schX={-0.22} schY={0.4} text="3" fontSize={0.14} anchor="bottom_right" color="#0000FF" schRotation={270} />',
  )
  expect(symbolTsx.match(/dashLength=\{0.06\} dashGap=\{0.06\}/g)).toHaveLength(
    2,
  )
  expect(symbolTsx).toContain(
    '<schematicpath points={[{"x":0,"y":0.6},{"x":0,"y":0.7},{"x":-0.2,"y":0.7},{"x":-0.2,"y":0.4}]} strokeColor="#880000" dashLength={0.06} dashGap={0.06} />',
  )
})

test("keeps hidden mounting-pin numbers hidden in the imported slide switch", () => {
  const symbolTsx = generateSymbolFromRawEasy(slideSwitchRawEasy)
  expect(symbolTsx.match(/<port /g)).toHaveLength(5)
  expect(symbolTsx.match(/<schematictext /g)).toHaveLength(4)
  expect(symbolTsx).not.toContain('text="4"')
  expect(symbolTsx).not.toContain('text="5"')
})

test("omits hidden pins and renders dotted paths with a shorter dash", () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const pin = betterEasy.dataStr.shape.find((shape) => shape.type === "PIN")!
  pin.visibility = "hide"
  const path = betterEasy.dataStr.shape.find(
    (shape) => shape.type === "POLYLINE",
  )!
  path.strokeStyle = "dotted"
  const symbolTsx = generateSymbolTsx(
    betterEasy,
    convertEasyEdaJsonToCircuitJson(betterEasy),
  )!
  expect(symbolTsx.match(/<port /g)).toHaveLength(5)
  expect(symbolTsx).not.toContain('text="3"')
  expect(symbolTsx).toContain("dashLength={0.02} dashGap={0.04}")
})

test("uses the source reference position and respects a hidden reference", () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const prefix = SingleLetterShapeSchema.parse(
    "T~P~390~250~0~#0000FF~~7pt~~~~comment~SW?~1~start~ref1~0",
  )
  if (prefix.type !== "TEXT") throw new Error("Expected a text shape")
  betterEasy.dataStr.shape.push(prefix)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const symbolTsx = generateSymbolTsx(betterEasy, circuitJson)!
  expect(symbolTsx.match(/text="\{NAME\}"/g)).toHaveLength(1)
  expect(symbolTsx).toContain(
    '<schematictext schX={0} schY={0.8} text="{NAME}"',
  )
  expect(symbolTsx).not.toContain("SW?")
  prefix.visibility = "0"
  expect(generateSymbolTsx(betterEasy, circuitJson)).not.toContain("{NAME}")
})

test("does not add pin annotations or a reference to a drawing-only symbol", () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const symbolTsx = generateSymbolTsx(
    betterEasy,
    convertEasyEdaJsonToCircuitJson(betterEasy),
    { includePorts: false },
  )!
  expect(symbolTsx).not.toContain("<port ")
  expect(symbolTsx).not.toContain("<schematictext ")
})

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
    '<port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.2} />',
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
