import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2687116.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces missing VBUS power metadata for C2687116", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin5: ["VBUS"]')
  expect(result).toContain("pin2: {requiresGround: true}")
  expect(result).not.toContain("pin5: {requiresPower: true}")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const vbusPort = circuitJson.find(
    (element) =>
      element.type === "source_port" && element.port_hints.includes("VBUS"),
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
  expect(missingPowerWarning).toMatchObject({
    message: expect.stringContaining("has no pin with requires_power=true"),
  })
}, 50000)
