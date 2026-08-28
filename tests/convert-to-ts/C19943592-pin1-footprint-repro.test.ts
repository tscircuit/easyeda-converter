import { expect, it } from "bun:test"
import { mil2mm } from "@tscircuit/mm"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C19943592.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("renders the C19943592 pin 1 rectangular footprint pad", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C19943592-pin1-footprint-repro",
  )
}, 50000)

it.each([
  { width: 60, height: 60, rotation: 0 },
  { width: 60, height: 72, rotation: 45 },
  { width: 72, height: 60, rotation: 90 },
])(
  "preserves RECT pad dimensions and rotation: %j",
  ({ width, height, rotation }) => {
    const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
    const pad = betterEasy.packageDetail.dataStr.shape.find(
      (shape) => shape.type === "PAD" && shape.shape === "RECT",
    )
    if (!pad || pad.type !== "PAD")
      throw new Error("Missing rectangular pad fixture")
    Object.assign(pad, { width, height, rotation })
    betterEasy.packageDetail.dataStr.shape = [pad]

    const hole = convertEasyEdaJsonToCircuitJson(betterEasy).find(
      (element) => element.type === "pcb_plated_hole",
    )
    expect(hole).toMatchObject({
      shape: "rotated_pill_hole_with_rect_pad",
      pad_shape: "rect",
      rect_pad_width: mil2mm(width),
      rect_pad_height: mil2mm(height),
      rect_ccw_rotation: rotation,
      hole_width: mil2mm(pad.holeRadius) * 2,
      hole_height: mil2mm(pad.holeRadius) * 2,
    })
  },
)
