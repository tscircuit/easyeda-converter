import c19795120 from "tests/assets/C19795120.raweasy.json"
import { expect, test } from "bun:test"
import {
  convertEasyEdaJsonToCircuitJsonWithCadPlacement,
  EasyEdaJsonSchema,
} from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { addBoardToSoupFor3dSnapshot } from "../fixtures/add-board-to-soup-for-3d-snapshot"

test("C19795120 should generate a pcb_cutout", async () => {
  const better = EasyEdaJsonSchema.parse(c19795120)
  const circuitJson =
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(better)
  const cutouts = circuitJson.filter((e) => e.type === "pcb_cutout")
  expect(cutouts.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(addBoardToSoupFor3dSnapshot(circuitJson)).toMatch3dSnapshot(
    import.meta.path,
  )
})
