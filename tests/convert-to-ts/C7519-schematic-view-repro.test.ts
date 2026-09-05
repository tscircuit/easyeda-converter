import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C7519.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces the incorrect C7519 schematic view", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C7519-schematic-view",
  )
}, 50000)
