import { expect, it } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C44346038.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("converts C44346038 from raw EasyEDA JSON", async () => {
  const result = await convertRawEasyToTsx(chipRawEasy)

  expect(result).toContain("export const CC2745R10E0WRHARQ1")
  expect(result).toContain('"C44346038"')
  expect(result).toContain('pin41: ["EP"]')
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
