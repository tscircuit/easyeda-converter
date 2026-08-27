import { expect, it } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C488251.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("renders the C488251 PCB view", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C488251-pcb-view",
  )
}, 50000)
