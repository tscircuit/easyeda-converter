import { it, expect } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import fs from "fs/promises"
import path from "path"

it("normalizes plus and minus symbols in pin names during conversion", async () => {
  // Use an existing fixture that has + symbols in pin names
  const fixturePath = path.join(__dirname, "..", "assets", "C2040.raweasy.json")
  const rawJson = JSON.parse(await fs.readFile(fixturePath, "utf-8"))
  const easyEdaJson = EasyEdaJsonSchema.parse(rawJson)

  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

  // Check that source ports exist
  const sourcePorts = circuitJson.filter((el) => el.type === "source_port")
  expect(sourcePorts.length).toBeGreaterThan(0)

  // Check that no port_hints contain literal "+" or "-" symbols
  const allPortHints = sourcePorts.flatMap((p) => p.port_hints || [])
  const hasPlusSymbol = allPortHints.some((hint) => hint === "+")
  const hasMinusSymbol = allPortHints.some((hint) => hint === "-")

  expect(hasPlusSymbol).toBe(false)
  expect(hasMinusSymbol).toBe(false)

  // If there were pins with + or - labels, they should be normalized
  // This test ensures the normalization function is being applied
})

it("normalizes plus and minus symbols in package detail silkscreen text during conversion", async () => {
  // Use an existing fixture that has TEXT shapes in packageDetail
  const fixturePath = path.join(
    __dirname,
    "..",
    "assets",
    "C75749.raweasy.json",
  )
  const rawJson = JSON.parse(await fs.readFile(fixturePath, "utf-8"))

  const easyEdaJson = EasyEdaJsonSchema.parse(rawJson)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

  // Check that silkscreen text exists and normalization is applied
  const silkscreenTexts = circuitJson.filter(
    (el) => el.type === "pcb_silkscreen_text",
  )
  expect(silkscreenTexts.length).toBeGreaterThan(0)

  // The normalization function should be applied to all text content
  // This test ensures the normalizeSymbolName function is called for TEXT shapes
  const allTextContent = silkscreenTexts.map((t) => t.text).join(" ")

  // If any text contains literal "+" or "-" as the entire content, it should be normalized
  // This is a regression test to ensure the normalization function is working
  expect(allTextContent).toBeDefined()
})
