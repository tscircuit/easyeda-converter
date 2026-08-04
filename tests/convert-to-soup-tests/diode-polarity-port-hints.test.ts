import { expect, test } from "bun:test"
import { su } from "@tscircuit/circuit-json-util"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { getPolarizedPinMetadata } from "lib/utils/get-polarized-pin-metadata"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import diodeRawEasy from "../assets/C8598.raweasy.json"

test("preserves normalized diode polarity hints on PCB pads", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(diodeRawEasy),
  )
  const padHints = su(circuitJson)
    .pcb_smtpad.list()
    .map((pad) => pad.port_hints)
    .sort(([left], [right]) => left.localeCompare(right))

  expect(padHints).toEqual([
    ["pin1", "cathode", "neg"],
    ["pin2", "anode", "pos"],
  ])

  const footprintTsx = generateFootprintTsx(circuitJson, {
    portHintsMap: getPolarizedPinMetadata({
      pin1: ["_NEG"],
      pin2: ["_POS"],
    })?.portHintsMap,
  })
  expect(footprintTsx).toContain('portHints={["pin1","cathode","neg"]}')
  expect(footprintTsx.match(/"cathode"/g)).toHaveLength(1)
})
