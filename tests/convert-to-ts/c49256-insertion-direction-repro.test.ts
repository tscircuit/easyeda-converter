import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
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

  // Render the unmodified footprint, then wrap the actual diagnostic below it.
  // The default warning label is a single long line that clips outside the SVG.
  const headerSvg = convertCircuitJsonToPcbSvg(json, {
    width: 1000,
    height: 300,
    shouldDrawWarnings: false,
    showPinNumbers: true,
    viewport: { minX: -13, maxX: 13, minY: -4, maxY: 4 },
  })
  const escapeXml = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const warningLines = warning!.message.match(/.{1,105}(?:\s|$)/g)!
  const pcbSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="560" viewBox="0 0 1000 560">
<rect width="1000" height="560" fill="#111827" />
<text x="24" y="32" fill="white" font-family="monospace" font-size="20">C49256 vertical 1x8 header - PCB detail (50 x 48 mm board)</text>
<svg x="0" y="50" width="1000" height="300">${headerSvg}</svg>
<text x="24" y="380" fill="#facc15" font-family="monospace" font-size="17">Actual checker warning (missing insertionDirection):</text>
<text x="24" y="414" fill="white" font-family="monospace" font-size="14">${warningLines.map((line, i) => `<tspan x="24" dy="${i === 0 ? 0 : 22}">${escapeXml(line.trim())}</tspan>`).join("")}</text>
</svg>`
  expect(pcbSvg).toContain("J1 is inferred to face")
  expect(pcbSvg.replace(/[\t ]+$/gm, "")).toMatchSvgSnapshot(
    import.meta.path,
    "c49256-missing-insertion-direction-pcb",
  )
}, 50_000)

test.failing(
  "C49256 vertical header should declare access from above",
  async () => {
    const source = await convertBetterEasyToTsx({ betterEasy })
    expect(source).toContain('insertionDirection="from_above"')
  },
)
