import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import rawEasy from "../assets/C46749.raweasy.json"

test("keeps Unicode pin labels raw while source-port aliases stay ASCII-safe", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const cases = [
    { pinNumber: 1, rawLabel: "µCTRL", aliases: ["_CTRL"] },
    { pinNumber: 2, rawLabel: "ΩSENSE", aliases: ["_SENSE"] },
    { pinNumber: 3, rawLabel: "電源", aliases: [] },
  ] as const

  for (const { pinNumber, rawLabel } of cases) {
    const pin = betterEasy.dataStr.shape.find(
      (shape) => shape.type === "PIN" && shape.pinNumber === pinNumber,
    )
    if (!pin || pin.type !== "PIN") {
      throw new Error(`Missing test pin ${pinNumber}`)
    }
    pin.label = rawLabel
  }

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  for (const { pinNumber, rawLabel, aliases } of cases) {
    const parsedPin = betterEasy.dataStr.shape.find(
      (shape) => shape.type === "PIN" && shape.pinNumber === pinNumber,
    )
    expect(parsedPin?.type === "PIN" ? parsedPin.label : undefined).toBe(
      rawLabel,
    )

    const sourcePort = circuitJson.find(
      (element) =>
        element.type === "source_port" && element.pin_number === pinNumber,
    )
    expect(sourcePort?.type).toBe("source_port")
    if (!sourcePort || sourcePort.type !== "source_port") {
      throw new Error(`Missing source port ${pinNumber}`)
    }
    const portHints = sourcePort.port_hints ?? []
    expect(portHints).toEqual([...aliases])
    expect(portHints).toSatisfy((hints) =>
      hints.every((hint) => /^[A-Za-z0-9_]+$/.test(hint)),
    )
  }
})
