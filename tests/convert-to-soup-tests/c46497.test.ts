import c46497 from "tests/assets/C46497.raweasy.json"
import { expect, test } from "bun:test"
import {
  convertEasyEdaJsonToCircuitJsonWithCadPlacement,
  EasyEdaJsonSchema,
} from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { addBoardToSoupFor3dSnapshot } from "../fixtures/add-board-to-soup-for-3d-snapshot"

test("C46497 should generate Circuit Json with vias", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(c46497)
  const circuitJson =
    await convertEasyEdaJsonToCircuitJsonWithCadPlacement(bettereasy)

  expect(
    circuitJson.filter((e) => e.type === "pcb_via").length,
  ).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(addBoardToSoupFor3dSnapshot(circuitJson)).toMatch3dSnapshot(
    import.meta.path,
  )
})
