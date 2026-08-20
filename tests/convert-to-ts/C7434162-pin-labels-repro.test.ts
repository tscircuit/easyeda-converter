import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C7434162.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces incorrect C7434162 pin 35 and 36 labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(schematicSvg).toContain("GND3")
  expect(schematicSvg).not.toContain("2G4-OUT")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C7434162-pin-labels-repro",
  )
}, 50000)
