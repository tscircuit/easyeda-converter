import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import capacitorArrayRawEasy from "../assets/C62857.raweasy.json"

it("reproduces C62857 capacitor array being emitted as one capacitor", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorArrayRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // C62857 contains four independent capacitors in one eight-pin package.
  expect(betterEasy.lcsc.number).toBe("C62857")
  expect(betterEasy.tags).toEqual(["Capacitor Networks, Arrays"])
  expect(betterEasy.dataStr.head.c_para["Manufacturer Part"]).toBe(
    "6124B104K500NT",
  )
  expect(betterEasy.dataStr.head.c_para.Value).toBe("100nF")
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "CAP-ARRAY-SMD_6124-8P-L1.6-W3.2-BL",
  )

  // Reproduce the bug: the complete array is represented as one capacitor.
  expect(result).toContain(
    'import type { CapacitorProps } from "@tscircuit/props"',
  )
  expect(result).toContain("<capacitor")
  expect(result).not.toContain("<chip")
  expect(result.match(/<smtpad /g)).toHaveLength(8)

  const circuitJson = await runTscircuitCode(result)
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_capacitor")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(8)
  // Only two of those eight electrical ports appear on the schematic.
  expect(
    circuitJson.filter((element) => element.type === "schematic_port"),
  ).toHaveLength(2)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(8)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C62857-capacitor-array-misclassification",
  )
})
