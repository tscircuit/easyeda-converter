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
  // The capacitor primitive owns the electrical ports, so the custom symbol
  // contains only EasyEDA drawing primitives and does not duplicate them.
  expect(result).not.toContain("<port ")
  expect(result.match(/<smtpad /g)).toHaveLength(8)

  const circuitJson = await runTscircuitCode(result)
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_capacitor")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(8)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(8)
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C62857-capacitor-array-symbol",
  )
})
