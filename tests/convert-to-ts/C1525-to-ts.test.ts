import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import capacitorRawEasy from "../assets/C1525.raweasy.json"

for (const microSymbol of [
  { character: "µ", codePoint: "U+00B5" },
  { character: "μ", codePoint: "U+03BC" },
]) {
  it(`normalizes the ${microSymbol.codePoint} micro symbol`, async () => {
    const rawEasy = structuredClone(capacitorRawEasy)
    rawEasy.dataStr.head.c_para.Value = `1${microSymbol.character}F`
    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const result = await convertBetterEasyToTsx({ betterEasy })

    expect(result).toContain("<capacitor")
    expect(result).toContain('capacitance="1uF"')

    const circuitJson = await runTscircuitCode(result)
    expect(circuitJson).toContainEqual(
      expect.objectContaining({
        type: "source_component",
        ftype: "simple_capacitor",
        capacitance: 1e-6,
      }),
    )
  })
}

it("converts C1525 to a capacitor with its exact footprint", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain(
    'import type { CapacitorProps } from "@tscircuit/props"',
  )
  expect(result).toContain('props: Omit<CapacitorProps, "capacitance">')
  expect(result).toContain("<capacitor")
  expect(result).toContain('capacitance="100nF"')
  expect(result).not.toContain("<chip")
  expect(result).not.toContain("ChipProps")
  expect(result).not.toContain("symbol={")
  expect(result).not.toContain("<symbol>")
  expect(result).not.toContain("<schematicpath")
  expect(result).not.toContain("<port ")
  expect(result).toContain('manufacturerPartNumber="CL05B104KO5NNNC"')
  expect(result).toContain('"C1525"')
  expect(result.match(/<smtpad /g)).toHaveLength(2)
  expect(result).toContain(
    '<smtpad portHints={["pin1"]} pcbX="-0.420116mm" pcbY="0mm" width="0.499999mm" height="0.540004mm" shape="rect" />',
  )
  expect(result).toContain(
    '<smtpad portHints={["pin2"]} pcbX="0.420116mm" pcbY="0mm" width="0.499999mm" height="0.540004mm" shape="rect" />',
  )

  const circuitJson = await runTscircuitCode(result)
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      ftype: "simple_capacitor",
      capacitance: 1e-7,
      display_capacitance: "100nF",
      name: "C1",
      manufacturer_part_number: "CL05B104KO5NNNC",
      supplier_part_numbers: { jlcpcb: ["C1525"] },
    }),
  )
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const sourcePortIds = new Set(sourcePorts.map((port) => port.source_port_id))
  expect(sourcePorts).toHaveLength(2)
  expect(sourcePorts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "pin1",
        pin_number: 1,
        port_hints: expect.arrayContaining(["pin1", "1"]),
      }),
      expect.objectContaining({
        name: "pin2",
        pin_number: 2,
        port_hints: expect.arrayContaining(["pin2", "2"]),
      }),
    ]),
  )
  expect(
    circuitJson.filter(
      (element) =>
        element.type === "schematic_port" &&
        sourcePortIds.has(element.source_port_id),
    ),
  ).toHaveLength(2)
  const pcbSmtPads = circuitJson.filter(
    (element) => element.type === "pcb_smtpad",
  )
  expect(pcbSmtPads).toHaveLength(2)
  expect(new Set(pcbSmtPads.map((pad) => pad.pcb_port_id)).size).toBe(2)
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
})

it("captures the current imported schematic symbol for C1525", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(result)

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C1525-imported-capacitor-schematic",
  )
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      ftype: "simple_capacitor",
    }),
  )
  expect(result).toContain("symbol={")
  expect(result).toContain("<schematicpath")
})

it("preserves imported capacitor polarity with the native symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorRawEasy)
  for (const pin of betterEasy.dataStr.shape.filter(
    (shape) => shape.type === "PIN",
  )) {
    pin.label = pin.pinNumber === 1 ? "+" : "-"
  }

  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(result)

  expect(result).toContain("const pinLabels = {")
  expect(result).toContain("pinLabels={pinLabels}")
  expect(result).toContain("      polarized")
  expect(result).not.toContain("symbol={")
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      ftype: "simple_capacitor",
      are_pins_interchangeable: false,
    }),
  )
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "schematic_component",
      symbol_name: "capacitor_polarized_right",
    }),
  )
})
