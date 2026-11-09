import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import chipRawEasy from "../assets/C14877.raweasy.json"

// Repro for https://github.com/tscircuit/easyeda-converter/issues/72
// C14877 (ATMEGA328P-AU) imports with pin 1 at the bottom left instead of
// the conventional top left. The position assertion is marked test.failing
// until the converter rotates footprints so pin 1 lands at the top left.
const easyEdaJson = EasyEdaJsonSchema.parse(chipRawEasy)
const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

const pads = circuitJson.filter(
  (element) => element.type === "pcb_smtpad",
) as Array<{ x: number; y: number; port_hints?: string[] }>
const pin1 = pads.find((element) => element.port_hints?.includes("pin1"))

// Setup failures must not be counted as a successful expected-failure repro.
if (!pin1) throw new Error("expected a pad with port hint pin1")

const xs = pads.map((pad) => pad.x)
const ys = pads.map((pad) => pad.y)
const centerX = (Math.min(...xs) + Math.max(...xs)) / 2
const centerY = (Math.min(...ys) + Math.max(...ys)) / 2

test.failing("imports C14877 with pin 1 at the top left", () => {
  expect(pin1.x).toBeLessThan(centerX)
  expect(pin1.y).toBeGreaterThan(centerY)
})
