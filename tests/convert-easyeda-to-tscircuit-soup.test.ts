import { it, expect } from "bun:test"
import a555TimerEasyEdaJson from "./a555-timer.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/soup-util"
import type { AnySoupElement } from "@tscircuit/soup"

it("should parse easyeda json for a 555 timer and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)
  const soupElements = convertEasyEdaJsonToTscircuitSoupJson(parsedJson)

  // Check if the result is an array and has elements
  expect(Array.isArray(soupElements)).toBe(true)
  expect(soupElements.length).toBeGreaterThan(0)

  // Check for the presence of a source component
  const sourceComponent = su(soupElements).source_component.list()[0]!
  expect(sourceComponent).toBeDefined()
  expect(sourceComponent?.name).toBe("U1")
  expect(sourceComponent?.ftype).toBe("simple_bug")

  // Check for the presence of source ports
  const sourcePorts = su(soupElements).source_port.list()
  expect(sourcePorts.length).toBeGreaterThan(0)

  // Check for the presence of pcb_smtpads
  const pcbSmtPads = su(soupElements).pcb_smtpad.list()
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
