import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2687116.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("does not infer VBUS power metadata for C2687116", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin5: ["VBUS"]')
  expect(result).not.toContain("pin2: {requiresGround: true}")
  expect(result).not.toContain("pin5: {requiresPower: true}")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const vbusPort = circuitJson.find(
    (element) =>
      element.type === "source_port" && element.port_hints?.includes("VBUS"),
  )
  const missingPowerWarning = circuitJson.find(
    (element) => element.type === "source_no_power_pin_defined_warning",
  )

  expect(vbusPort).toMatchObject({
    type: "source_port",
    name: "VBUS",
    pin_number: 5,
  })
  expect(vbusPort).not.toHaveProperty("requires_power")
  expect(missingPowerWarning).toBeDefined()
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2687116-vbus-power-metadata-repro",
  )
}, 50000)
