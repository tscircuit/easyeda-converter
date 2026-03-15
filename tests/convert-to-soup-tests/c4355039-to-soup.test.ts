import { it, expect } from "bun:test"
import C4355039EasyEdaJson from "../assets/C4355039.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJsonWithCadPlacement } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { addBoardToSoupFor3dSnapshot } from "../fixtures/add-board-to-soup-for-3d-snapshot"

it("should parse easyeda json for c4355039 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(C4355039EasyEdaJson)
  const circuitJson =
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(parsedJson)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(addBoardToSoupFor3dSnapshot(circuitJson)).toMatch3dSnapshot(
    import.meta.path,
  )
})
