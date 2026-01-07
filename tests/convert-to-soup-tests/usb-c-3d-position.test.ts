import usbC from "tests/assets/usb-c.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("USB-C connector should be positioned on board (not floating below)", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(usbC)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy).concat([
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

  // Check that cad_component z position is >= 0 (on or above board)
  const cadComponent = circuitJson.find(
    (e) => e.type === "cad_component",
  ) as any
  expect(cadComponent).toBeDefined()
  expect(cadComponent.position.z).toBeGreaterThanOrEqual(0)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
