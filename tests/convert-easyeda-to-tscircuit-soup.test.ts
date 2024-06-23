import { it, expect } from "bun:test"
import a555TimerEasyEdaJson from "./a555-timer.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import type { AnySoupElement } from "@tscircuit/soup"

it("should parse easyeda json for a 555 timer and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)
  const soupElements = convertEasyEdaJsonToTscircuitSoupJson(parsedJson)

  // Check if the result is an array and has elements
  expect(Array.isArray(soupElements)).toBe(true)
  expect(soupElements.length).toBeGreaterThan(0)

  // Check for the presence of a source component
  const sourceComponent = soupElements.find(
    (element) => element.type === "source_component"
  )
  expect(sourceComponent).toBeDefined()
  expect(sourceComponent?.name).toBe("U1")
  expect(sourceComponent?.ftype).toBe("ic")

  // Check for the presence of source ports
  const sourcePorts = soupElements.filter(
    (element) => element.type === "source_port"
  )
  expect(sourcePorts.length).toBeGreaterThan(0)

  // Check for the presence of pcb_smtpads
  const pcbSmtPads = soupElements.filter(
    (element) => element.type === "pcb_smtpad"
  )
  expect(pcbSmtPads.length).toBeGreaterThan(0)
  expect(pcbSmtPads.length).toBe(sourcePorts.length)

  // Check properties of a pcb_smtpad
  const firstPcbSmtPad = pcbSmtPads[0] as any
  expect(firstPcbSmtPad.pcb_smtpad_id).toBeDefined()
  expect(firstPcbSmtPad.shape).toBeDefined()
  expect(firstPcbSmtPad.x).toBeDefined()
  expect(firstPcbSmtPad.y).toBeDefined()
  expect(firstPcbSmtPad.width).toBeDefined()
  expect(firstPcbSmtPad.height).toBeDefined()
  expect(firstPcbSmtPad.layer).toBe("top")
  expect(firstPcbSmtPad.port_hints).toBeDefined()
  expect(firstPcbSmtPad.pcb_component_id).toBeDefined()
  expect(firstPcbSmtPad.pcb_port_id).toBeDefined()
})
