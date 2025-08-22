import { it, expect } from "bun:test"
import atmegaRawEasy from "../assets/C14877.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib"
import { runTscircuitCode } from "tscircuit"

it("should convert atmega328p into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(atmegaRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Generate 3D snapshot for component with c_rotation: 0,0,90
  const circuitJson = await runTscircuitCode(result)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
