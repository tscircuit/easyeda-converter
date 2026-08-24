import "bun-match-svg"
import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import C113367EasyEdaJson from "../assets/C113367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("renders a payload with issue #464 variants", async () => {
  const payload: any = structuredClone(C113367EasyEdaJson)
  payload.lcsc.price = String(payload.lcsc.price)
  payload.packageDetail.dataStr.shape.push(
    "RECT~3990~2990~10~10~3~variant-rect~0~1",
  )
  payload.dataStr.shape.push(
    "AR~part_arrowhead~270~460~gge70468~0~M 270 460 L 255 467.5 L 258.75 460 L 255 452.5 Z ~#FF00FF~0~3~15",
    "I~710~-55~78~44~0~data:image/png;base64,iVBORw0KGgo=~gge40721~0~",
  )

  const betterEasy = EasyEdaJsonSchema.parse(payload)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain("part_arrowhead")
  expect(result).not.toContain("data:image/png")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "additional-payload-variants-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "additional-payload-variants-pcb",
  )
}, 50000)
