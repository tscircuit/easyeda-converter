import c5184526 from "tests/assets/C5184526.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

test("C5184526 should have two holes", async () => {
  const bettereasy = EasyEdaJsonSchema.parse(c5184526)
  const circuitJson = convertEasyEdaJsonToCircuitJson(bettereasy)

  expect(circuitJson.filter((e) => e.type === "pcb_hole").length).toBe(2)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  const coords = circuitJson
    .map((e: any) => ({
      type: e.type,
      x: e.x ?? e.center?.x,
      y: e.y ?? e.center?.y,
    }))
    .filter((e) => e.x !== undefined && e.y !== undefined)

  const maxX = Math.max(...coords.map((e) => e.x))
  const minX = Math.min(...coords.map((e) => e.x))
  const maxY = Math.max(...coords.map((e) => e.y))
  const minY = Math.min(...coords.map((e) => e.y))

  expect(maxX).toBeLessThan(10)
  expect(minX).toBeGreaterThan(-10)
  expect(maxY).toBeLessThan(10)
  expect(minY).toBeGreaterThan(-10)

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
