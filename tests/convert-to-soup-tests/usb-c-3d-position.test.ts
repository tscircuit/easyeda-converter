import usbC from "tests/assets/usb-c.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("USB-C connector should be positioned on board (not floating below)", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(usbC)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

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
