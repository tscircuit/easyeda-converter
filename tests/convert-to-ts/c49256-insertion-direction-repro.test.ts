import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import raw from "../assets/C49256.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

// Found while building a 50 x 48 mm four-gang touch-panel PCB.
// Like repro #633, capture the supplier input and generated TSX offline.
// This vertical header mates from above; its missing access metadata does not
// imply incorrect pad dimensions. No importer or checker fix is included here.
const betterEasy = EasyEdaJsonSchema.parse(raw)

test("C49256 vertical header has eight physical pads", () => {
  expect(raw.lcsc.number).toBe("C49256")
  expect(
    betterEasy.packageDetail.dataStr.shape.filter((s) => s.type === "PAD"),
  ).toHaveLength(8)
})

test("C49256 generated TSX omits insertionDirection and triggers inferred side-access warning", async () => {
  const source = await convertBetterEasyToTsx({ betterEasy })
  expect(source).toContain("<footprint>")
  expect(source).not.toContain("insertionDirection")
  expect(source.replace(/[\t ]+$/gm, "")).toMatchSnapshot(
    "C49256 vertical header missing insertionDirection TSX",
  )

  const board = wrapTsxWithBoardFor3dSnapshot(source)
    .replace("<board >", "<board width={50} height={48} routingDisabled>")
    .replace("<chip", '<chip name="J1" pcbX={0} pcbY={0}')
  const json = await runTscircuitCode(board)
  const component = json.find((e) => e.type === "pcb_component")
  expect(component?.type).toBe("pcb_component")
  if (component?.type !== "pcb_component") throw new Error("Missing header")
  expect(component.insertion_direction).toBeUndefined()
  expect(json.filter((e) => e.type === "pcb_plated_hole")).toHaveLength(8)
  const warning = json.find(
    (e) => e.type === "pcb_connector_not_in_accessible_orientation_warning",
  )
  expect(warning).toBeDefined()
  expect(warning?.message).toContain("no explicit footprint insertionDirection")
}, 50_000)

test.failing(
  "C49256 vertical header should declare access from above",
  async () => {
    const source = await convertBetterEasyToTsx({ betterEasy })
    expect(source).toContain('insertionDirection="from_above"')
  },
)
