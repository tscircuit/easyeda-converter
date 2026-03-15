import { it, expect } from "bun:test"
import c88224RawEasy from "../assets/C88224.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJsonWithCadPlacement } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { addBoardToSoupFor3dSnapshot } from "../fixtures/add-board-to-soup-for-3d-snapshot"

it("should parse easyeda json for a c88224 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(c88224RawEasy)
  const soupElements = addBoardToSoupFor3dSnapshot(
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(parsedJson),
  )

  await expect(soupElements).toMatch3dSnapshot(import.meta.path)
})
