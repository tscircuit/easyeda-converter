import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import rawJson from "tests/assets/C265111.raweasy.json"

test("bottom-layer (layer 4) silkscreen TRACK and ARC map to the bottom layer", () => {
  const convert = (extraShapes: string[]) => {
    const raw = structuredClone(rawJson) as any
    for (const shape of extraShapes) {
      raw.packageDetail.dataStr.shape.push(shape)
    }
    return convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(raw), {
      shouldRecenter: false,
    }) as Array<{ type: string; layer?: string }>
  }

  const silkscreenPaths = <T extends { type: string }>(elements: T[]) =>
    elements.filter((element) => element.type === "pcb_silkscreen_path")

  const baseline = convert([])
  const withBottom = convert([
    "TRACK~1~4~~3990 3010 3995 3010~ggeBOTTRACK~0",
    "ARC~1~4~~M 3990 3000 A 2 2 0 0 0 3994 3000~ggeBOTARC~0",
  ])

  const newPaths = silkscreenPaths(withBottom).slice(
    silkscreenPaths(baseline).length,
  )

  expect(newPaths).toHaveLength(2)
  for (const path of newPaths) {
    expect(path.layer).toBe("bottom")
  }
})
