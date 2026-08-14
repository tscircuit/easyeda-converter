import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C702367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reconciles C702367's exposed pad and reports incomplete pin names", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C702367-incorrect-pin-data",
  )

  expect(result).toContain('pin12: ["DP1"]')
  expect(result).toContain('pin33: ["EP"]')

  expect(result).toContain('pin6: ["pin6"]')
  expect(result).toContain(
    "EasyEDA has no semantic pin name for physical pad(s) 6, 20, 27",
  )
  expect(result).not.toContain("EEDATA")
})
