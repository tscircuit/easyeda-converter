import { it, expect } from "bun:test"
import a555TimerEasyEdaJson from "../assets/a555-timer-dip.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/circuit-json-util"
import type { PcbPlatedHole, PcbSmtPad } from "circuit-json"

it("should parse easyeda json for a 555 timer and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson) as any

  // Check if the result is an array and has elements
  expect(Array.isArray(soupElements)).toBe(true)
  expect(soupElements.length).toBeGreaterThan(0)

  // Check for the presence of a source component
  const sourceComponent = su(soupElements).source_component.list()[0]!
  expect(sourceComponent).toBeDefined()
  expect(sourceComponent?.name).toBe("U1")
  expect(sourceComponent?.ftype).toBe("simple_chip")

  // Check for the presence of source ports
  const sourcePorts = su(soupElements).source_port.list()
  expect(sourcePorts.length).toBeGreaterThan(0)

  // Check for the presence of pcb_smtpads and pcb_plated_holes
  const pcbSmtPads = su(soupElements).pcb_smtpad.list() as PcbSmtPad[]
  const pcbPlatedHoles = su(
    soupElements,
  ).pcb_plated_hole.list() as PcbPlatedHole[]
  expect(pcbSmtPads.length + pcbPlatedHoles.length).toBeGreaterThan(0)
  expect(pcbSmtPads.length + pcbPlatedHoles.length).toBe(sourcePorts.length)

  // Check properties of a pcb_smtpad or pcb_plated_hole
  const firstPad = pcbSmtPads[0] || pcbPlatedHoles[0]
  expect(firstPad).toBeDefined()
  expect(firstPad.port_hints).toBeDefined()
  expect(firstPad.pcb_component_id).toBeDefined()
  expect(firstPad.pcb_port_id).toBeDefined()

  if (firstPad.type === "pcb_smtpad") {
    expect(firstPad.pcb_smtpad_id).toBeDefined()
    expect(firstPad.shape).toBeDefined()
    expect(firstPad.layer).toBe("top")
  }
})
