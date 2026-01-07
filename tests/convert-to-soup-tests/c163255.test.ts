import c163255 from "tests/assets/C163255.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C163255 should convert to Circuit Json correctly", async () => {
  const easyeda = EasyEdaJsonSchema.parse(c163255)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyeda).concat([
    {
      type: "pcb_board",
      pcb_board_id: "pcb_board_0",
      center: { x: 0, y: 0 },
      width: 10,
      height: 10,
      thickness: 1.4,
      num_layers: 2,
      material: "fr4",
    },
  ])

  expect(circuitJson.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
