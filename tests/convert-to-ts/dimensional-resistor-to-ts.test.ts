import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "../assets/C6460576.raweasy.json"

it("preserves resistance for C6460576's dimensional package name", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  expect(betterEasy.dataStr.head.c_para).toMatchObject({
    pre: "R?",
    Value: "60kΩ",
    package: "RES-SMD_L1.55-W0.85",
  })
  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain("<resistor")
  expect(result).toContain('resistance="60kohm"')
  const generic = EasyEdaJsonSchema.parse(rawEasy)
  generic.dataStr.head.c_para.pre = "U?"
  generic.tags = []
  const genericResult = await convertBetterEasyToTsx({ betterEasy: generic })
  for (const pattern of [
    /<footprint>[\s\S]*?<\/footprint>/,
    /cadModel=\{\{[\s\S]*?\}\}/,
  ]) {
    const nativeGeometry = result.match(pattern)?.[0]
    expect(nativeGeometry).toBeDefined()
    expect(nativeGeometry).toBe(genericResult.match(pattern)?.[0])
  }
  const circuitJson = await runTscircuitCode(result)
  const component = circuitJson.find((e) => e.type === "source_component")
  expect(component).toMatchObject({
    ftype: "simple_resistor",
    resistance: 60_000,
    display_resistance: "60kΩ",
    manufacturer_part_number: "RT0603BRD0760KL",
    supplier_part_numbers: { jlcpcb: ["C6460576"] },
  })
  expect(circuitJson.filter((e) => e.type === "source_port")).toHaveLength(2)
  expect(circuitJson.filter((e) => e.type === "pcb_smtpad")).toHaveLength(2)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C6460576-dimensional-resistor",
  )
})

it("does not turn a multi-pin dimensional resistor package into a two-pin resistor", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const pin = betterEasy.dataStr.shape.find((shape) => shape.type === "PIN")
  const pad = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "PAD",
  )
  if (!pin || !pad)
    throw new Error("Expected a pin and pad in C6460576 fixture")
  betterEasy.dataStr.shape.push({ ...pin, pinNumber: 3 })
  betterEasy.packageDetail.dataStr.shape.push({ ...pad, number: "3" })
  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain("<chip")
  expect(result).not.toContain("<resistor")
})
