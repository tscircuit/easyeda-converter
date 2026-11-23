import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { inferEasyEdaInsertionDirection } from "lib/utils/infer-insertion-direction"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c49256Raw from "../assets/C49256.raweasy.json"
import c124352Raw from "../assets/C124352.raweasy.json"
import c124375Raw from "../assets/C124375.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("C49256 vertical header emits insertionDirection from_above and clears orientation warning", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c49256Raw)

  const soup = convertEasyEdaJsonToCircuitJson(betterEasy)
  const soupComponent = soup.find((e) => e.type === "pcb_component")
  expect(soupComponent?.type).toBe("pcb_component")
  if (soupComponent?.type === "pcb_component") {
    expect(soupComponent.insertion_direction).toBe("from_above")
  }

  const source = await convertBetterEasyToTsx({ betterEasy })
  expect(source).toContain('<footprint insertionDirection="from_above">')

  const board = wrapTsxWithBoardFor3dSnapshot(source)
    .replace("<board >", "<board width={50} height={48} routingDisabled>")
    .replace("<chip", '<chip name="J1" pcbX={0} pcbY={0}')
  const circuitJson = await runTscircuitCode(board)

  const pcbComponent = circuitJson.find((e) => e.type === "pcb_component")
  expect(pcbComponent?.type).toBe("pcb_component")
  if (pcbComponent?.type === "pcb_component") {
    expect(pcbComponent.insertion_direction).toBe("from_above")
  }
  expect(circuitJson.filter((e) => e.type === "pcb_plated_hole")).toHaveLength(
    8,
  )

  const orientationWarning = circuitJson.find(
    (e) => e.type === "pcb_connector_not_in_accessible_orientation_warning",
  )
  expect(orientationWarning).toBeUndefined()
}, 50_000)

test("vertical headers C124352 and C124375 emit insertionDirection from_above", async () => {
  for (const raw of [c124352Raw, c124375Raw]) {
    const betterEasy = EasyEdaJsonSchema.parse(raw)
    const source = await convertBetterEasyToTsx({ betterEasy })
    expect(source).toContain('<footprint insertionDirection="from_above">')
  }
}, 50_000)

test("right-angle, horizontal, and ambiguous headers do not infer from_above", () => {
  const baseVertical = EasyEdaJsonSchema.parse(c49256Raw)
  expect(inferEasyEdaInsertionDirection(baseVertical)).toBe("from_above")

  const horizontalPkg = structuredClone(baseVertical)
  horizontalPkg.dataStr.head.c_para.package = "HDR-TH_8P-P2.54-H-M"
  horizontalPkg.packageDetail.title = "HDR-TH_8P-P2.54-H-M"
  horizontalPkg.packageDetail.dataStr.head.c_para.package =
    "HDR-TH_8P-P2.54-H-M"
  expect(inferEasyEdaInsertionDirection(horizontalPkg)).toBeUndefined()

  const rightAnglePkg = structuredClone(baseVertical)
  rightAnglePkg.dataStr.head.c_para.package = "HDR-TH_8P-P2.54-R-M"
  rightAnglePkg.packageDetail.title = "HDR-TH_8P-P2.54-R-M"
  rightAnglePkg.packageDetail.dataStr.head.c_para.package =
    "HDR-TH_8P-P2.54-R-M"
  expect(inferEasyEdaInsertionDirection(rightAnglePkg)).toBeUndefined()

  const rightAngleDescription = structuredClone(baseVertical)
  rightAngleDescription.description = "2.54mm 1*8P Right Angle Pin Header"
  expect(inferEasyEdaInsertionDirection(rightAngleDescription)).toBeUndefined()

  const ambiguousPkg = structuredClone(baseVertical)
  ambiguousPkg.dataStr.head.c_para.package = "HDR-TH_8P-P2.54-M"
  ambiguousPkg.packageDetail.title = "HDR-TH_8P-P2.54-M"
  ambiguousPkg.packageDetail.dataStr.head.c_para.package = "HDR-TH_8P-P2.54-M"
  expect(inferEasyEdaInsertionDirection(ambiguousPkg)).toBeUndefined()
})
