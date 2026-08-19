import { expect, test } from "bun:test"
import { su } from "@tscircuit/circuit-json-util"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import rawEasyEdaJson from "../assets/C75749.raweasy.json"

test("through-hole pads span both outer copper layers", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawEasyEdaJson),
  )
  const platedHoles = su(circuitJson).pcb_plated_hole.list()

  expect(platedHoles.length).toBeGreaterThan(0)
  expect(platedHoles.every((hole) => hole.layers.includes("top"))).toBe(true)
  expect(platedHoles.every((hole) => hole.layers.includes("bottom"))).toBe(true)
})
