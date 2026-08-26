import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import c4681RawEasy from "../assets/C4681.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces Standard DIP switches rendering as a single switch", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c4681RawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // This is the current incorrect output. A standard DIP switch contains
  // multiple independent switches, but the converter emits one <switch>.
  expect(result).toContain("import type { SwitchProps }")
  expect(result).toContain("<switch")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C4681-standard-dip-switch-repro",
  )
}, 20_000)
