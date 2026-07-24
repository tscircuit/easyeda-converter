import { expect, it } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import chipRawEasy from "../assets/C5656610.raweasy.json"

// https://github.com/tscircuit/easyeda-converter/issues/411
//
// C5656610 (ICS-43434) has nine pad geometries numbered 1,2,4,5,6,3,3,3,3 —
// the four polygon pads numbered "3" are four copper shapes for the same GND
// terminal. They must share logical pin 3, not be renumbered into synthetic
// pins 7/8/9.
it("keeps duplicate pad numbers on one logical pin", () => {
  const easyEdaJson = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  // One source port per logical pin — no synthetic pins 7/8/9
  expect(sourcePorts.map((port) => port.pin_number).sort()).toEqual([
    1, 2, 3, 4, 5, 6,
  ])

  // All four duplicate geometries carry the pin3 hint
  const pin3Pads = circuitJson.filter(
    (element) =>
      element.type === "pcb_smtpad" && element.port_hints?.includes("pin3"),
  )
  expect(pin3Pads.length).toBe(4)

  // No synthetic pin hints remain anywhere
  const allPadHints = circuitJson
    .filter((element) => element.type === "pcb_smtpad")
    .flatMap((element) => element.port_hints ?? [])
  for (const syntheticPin of ["pin7", "pin8", "pin9"]) {
    expect(allPadHints).not.toContain(syntheticPin)
  }
})
