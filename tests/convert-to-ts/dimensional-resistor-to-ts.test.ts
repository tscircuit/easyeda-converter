import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "../assets/C6460576.raweasy.json"

it("reproduces lost resistance for C6460576's dimensional package name", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  expect(betterEasy.dataStr.head.c_para).toMatchObject({
    pre: "R?",
    Value: "60kΩ",
    package: "RES-SMD_L1.55-W0.85",
  })
  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain("<chip")
  expect(result).not.toContain('resistance="60kohm"')
  const circuitJson = await runTscircuitCode(result)
  const component = circuitJson.find((e) => e.type === "source_component")
  expect(component).toMatchObject({
    ftype: "simple_chip",
    manufacturer_part_number: "RT0603BRD0760KL",
    supplier_part_numbers: { jlcpcb: ["C6460576"] },
  })
  expect(component).not.toHaveProperty("resistance")
  expect(circuitJson.filter((e) => e.type === "source_port")).toHaveLength(2)
  expect(circuitJson.filter((e) => e.type === "pcb_smtpad")).toHaveLength(2)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C6460576-dimensional-resistor",
  )
})
