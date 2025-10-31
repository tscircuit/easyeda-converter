import type { PcbBoard } from "circuit-json"
import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C165948.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C165948 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain('shape="pill"')
})

it("C165948 should generate Circuit Json without errors", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy).concat([
    {
      type: "pcb_board",
      pcb_board_id: "pcb_board_1",
      width: 16,
      height: 16,
      center: { x: 0, y: 0 },
      thickness: 1.6,
      material: "fr4",
      num_layers: 2,
    } as PcbBoard,
  ])

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
  expect(circuitJson).toMatch3dSnapshot(
    import.meta.path.replace(".test", "-angled.test"),
  )
  expect(circuitJson).toMatch3dSnapshot(
    import.meta.path.replace(".test", "-side.test"),
    {
      camPos: [30, 1, 0],
    },
  )
})
