import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import opampRawEasy from "../assets/C2059794.raweasy.json"

test("repro: TLV2760 preserves its op-amp drawing but imports as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(opampRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // TI TLV2760 DBV pinout: https://www.ti.com/lit/ds/symlink/tlv2760.pdf#page=3
  expect(betterEasy.dataStr.head.c_para["Manufacturer Part"]).toBe(
    "TLV2760IDBVTG4",
  )
  expect(betterEasy.lcsc.number).toBe("C2059794")
  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board>
        <TLV2760IDBVTG4 name="U5" />
      </board>
    )
  `)
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  // Current behavior: the op-amp drawing survives, but its electrical identity
  // does not. Feedback recognition needs amplifier input/output roles.
  expect(sourceComponent?.ftype).toBe("simple_chip")
  const ports = circuitJson.filter((element) => element.type === "source_port")
  expect(ports).toHaveLength(6)
  for (const [pin, label] of [
    [1, "OUT"],
    [2, "GND"],
    [3, "IN_POS"],
    [4, "IN_NEG"],
    [5, "N_SHDN"],
    [6, "VDD"],
  ] as const) {
    expect(ports.find((port) => port.pin_number === pin)?.port_hints).toContain(
      label,
    )
  }

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2059794-opamp-identity-repro",
  )
}, 50_000)
