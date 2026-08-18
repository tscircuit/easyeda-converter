import { expect, it } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import chipRawEasy from "../assets/C2838502.raweasy.json"

it("keeps repeated EasyEDA pad numbers on one logical pin", () => {
  const easyEdaJson = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)

  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  expect(sourcePorts).toHaveLength(53)
  expect(Math.max(...sourcePorts.map((port) => port.pin_number ?? 0))).toBe(53)

  const exposedPadShapes = circuitJson.filter(
    (element) =>
      element.type === "pcb_smtpad" && element.port_hints?.includes("pin49"),
  )
  expect(exposedPadShapes).toHaveLength(9)
})
