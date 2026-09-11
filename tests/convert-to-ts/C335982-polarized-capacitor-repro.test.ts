import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import capacitorRawEasy from "../assets/C335982.raweasy.json"

it("repros C335982 losing its curved polarized capacitor plate", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(capacitorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(result)

  expect(result).toContain("<capacitor")
  expect(result).not.toContain("      polarized")
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "schematic_component",
      symbol_name: "capacitor_right",
    }),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "battery-charging-and-5v-boost-C335982",
  )
})
