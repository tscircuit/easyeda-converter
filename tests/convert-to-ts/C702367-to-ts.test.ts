import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C702367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C702367's misplaced exposed-pad and incomplete pin data", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C702367-incorrect-pin-data",
  )

  // The EasyEDA symbol inserts EP at symbol pin 12 even though the package's
  // central exposed pad is physical pin 33. The converter currently trusts
  // those symbol numbers, shifting DP1 and every following label.
  expect(result).toContain('pin12: ["EP"]')
  expect(result).toContain('pin13: ["DP1"]')

  // Numeric-only labels are emitted without any diagnostic, so incomplete
  // source data such as EEDATA/GANGED appears to be a valid generic pin.
  expect(result).toContain('pin6: ["pin6"]')
  expect(result).not.toContain("EEDATA")
})
