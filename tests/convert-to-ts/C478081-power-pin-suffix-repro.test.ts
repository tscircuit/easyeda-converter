import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C478081.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces missing power metadata on suffixed VDD pins for C478081", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin24: ["VDD33CR"]')
  expect(result).toContain('pin64: ["VDD33PLL"]')
  expect(result).not.toContain("pin24: {requiresPower: true}")
  expect(result).not.toContain("pin64: {requiresPower: true}")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const getPortByHint = (hint: string) =>
    circuitJson.find(
      (element) =>
        element.type === "source_port" && element.port_hints?.includes(hint),
    )

  expect(getPortByHint("VDD33CR")).not.toHaveProperty("requires_power")
  expect(getPortByHint("VDD33PLL")).not.toHaveProperty("requires_power")
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C478081-power-pin-suffix-repro",
  )
}, 50_000)
