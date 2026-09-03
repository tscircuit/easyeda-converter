import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import capacitorArrayRawEasy from "../assets/C62857.raweasy.json"

it("converts C62857 capacitor array with its EasyEDA symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorArrayRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(betterEasy.lcsc.number).toBe("C62857")
  expect(betterEasy.tags).toEqual(["Capacitor Networks, Arrays"])
  expect(betterEasy.dataStr.head.c_para["Manufacturer Part"]).toBe(
    "6124B104K500NT",
  )
  expect(betterEasy.dataStr.head.c_para.Value).toBe("100nF")
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "CAP-ARRAY-SMD_6124-8P-L1.6-W3.2-BL",
  )

  expect(result).toContain(
    'import type { CapacitorProps } from "@tscircuit/props"',
  )
  expect(result).toContain("<capacitor")
  expect(result).not.toContain("<chip")
  expect(result).toContain("symbol={")
  expect(result).toContain("<symbol>")
  expect(result.match(/<schematicpath /g)).toHaveLength(17)
  expect(result.match(/<port /g)).toHaveLength(8)
  expect(result).toContain(
    '<port name="pin1" pinNumber={1} direction="left" schX={-0.7} schY={0.46} schStemLength={0.4} />',
  )
  expect(result).toContain(
    '<port name="pin8" pinNumber={8} direction="right" schX={0.7} schY={0.46} schStemLength={0.4} />',
  )
  expect(result.match(/<smtpad /g)).toHaveLength(8)

  const circuitJson = await runTscircuitCode(result)
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_capacitor")
  const importedSourcePorts = circuitJson
    .filter((element) => element.type === "source_port")
    // Older core versions also create the passive's two native ports. The
    // explicit symbol ports are appended after them.
    .slice(-8)
  const importedSourcePortIds = new Set(
    importedSourcePorts.map((port) => port.source_port_id),
  )
  const importedSchematicPorts = circuitJson.filter(
    (element) =>
      element.type === "schematic_port" &&
      importedSourcePortIds.has(element.source_port_id),
  )

  expect(importedSourcePorts).toHaveLength(8)
  expect(importedSchematicPorts).toHaveLength(8)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(8)
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
  const circuitJsonWithImportedPorts = circuitJson.filter(
    (element) =>
      (element.type !== "source_port" ||
        importedSourcePortIds.has(element.source_port_id)) &&
      (element.type !== "schematic_port" ||
        importedSourcePortIds.has(element.source_port_id)),
  )
  expect(
    convertCircuitJsonToSchematicSvg(circuitJsonWithImportedPorts, {
      css: ".schematic-port-hover circle { opacity: 1; fill: none; stroke: rgb(132, 0, 0); stroke-width: 2px; }",
    }),
  ).toMatchSvgSnapshot(import.meta.path, "C62857-capacitor-array-symbol")
})
