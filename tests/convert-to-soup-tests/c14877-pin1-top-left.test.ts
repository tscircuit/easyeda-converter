import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import chipRawEasy from "../assets/C14877.raweasy.json"

// Regression test for https://github.com/tscircuit/easyeda-converter/issues/72
// C14877 (ATMEGA328P-AU) must import with pin 1 at the top left.
const easyEdaJson = EasyEdaJsonSchema.parse(chipRawEasy)
const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

const pads = circuitJson.filter(
  (element) => element.type === "pcb_smtpad",
) as Array<{ x: number; y: number; port_hints?: string[] }>
const pin1 = pads.find((element) => element.port_hints?.includes("pin1"))

if (!pin1) throw new Error("expected a pad with port hint pin1")

const xs = pads.map((pad) => pad.x)
const ys = pads.map((pad) => pad.y)
const centerX = (Math.min(...xs) + Math.max(...xs)) / 2
const centerY = (Math.min(...ys) + Math.max(...ys)) / 2

test("imports C14877 with pin 1 at the top left", () => {
  expect(pin1.x).toBeLessThan(centerX)
  expect(pin1.y).toBeGreaterThan(centerY)
})
