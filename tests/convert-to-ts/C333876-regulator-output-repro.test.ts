import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C333876.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces a regulator output inferred as required power for C333876", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // USB2244 pin 13 is an internal 1.8 V regulator output, not a supply input.
  expect(result).toContain('pin13: ["VDD18"]')
  expect(result).toContain("pin13: {requiresPower: true}")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const vdd18Port = circuitJson.find(
    (element) =>
      element.type === "source_port" && element.port_hints?.includes("VDD18"),
  )

  expect(vdd18Port).toMatchObject({
    type: "source_port",
    name: "VDD18",
    pin_number: 13,
    requires_power: true,
  })
  expect(vdd18Port).not.toHaveProperty("provides_power")
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C333876-regulator-output-repro",
  )
}, 50_000)
