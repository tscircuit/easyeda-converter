import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import opampRawEasy from "../assets/C7972.raweasy.json"

test("repro: five-pin LMV321 imports as a generic chip with a custom op-amp symbol", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(opampRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // TI LMV321 DBV pinout: https://www.ti.com/lit/ds/symlink/lmv321.pdf#page=3
  expect(betterEasy.dataStr.head.c_para["Manufacturer Part"]).toBe(
    "LMV321IDBVR",
  )
  expect(betterEasy.lcsc.number).toBe("C7972")
  expect(opampRawEasy.tags).toContain("Operational Amplifier")
  expect(result).toContain("<chip")
  expect(result).not.toContain("<opamp")
  expect(result).toContain("symbol={")

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board>
        <LMV321IDBVR name="U1" />
      </board>
    )
  `)
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  // Current behavior: a standard five-function op-amp loses its amplifier
  // identity. A fix should emit <opamp> and preserve the physical pin mapping.
  expect(sourceComponent?.ftype).toBe("simple_chip")
  const ports = circuitJson.filter((element) => element.type === "source_port")
  expect(ports).toHaveLength(5)
  for (const [pin, label] of [
    [1, "_POS"],
    [2, "GND"],
    [3, "_NEG"],
    [4, "OUT"],
    [5, "V_POS"],
  ] as const) {
    expect(ports.find((port) => port.pin_number === pin)?.port_hints).toContain(
      label,
    )
  }

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C7972-opamp-identity-repro",
  )
}, 50_000)
