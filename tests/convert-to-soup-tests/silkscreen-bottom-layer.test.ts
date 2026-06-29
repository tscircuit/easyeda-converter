import rawJson from "tests/assets/C265111.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"

// EasyEDA layer 4 = bottom silkscreen. The TRACK and ARC silkscreen handlers
// hardcode `layer: "top"`, while the CIRCLE handler right beside them uses
// getSideFromLayer(), so bottom-side silkscreen tracks and arcs get wrongly
// placed on the top silkscreen layer.
//
// Convert the same footprint with vs. without two injected layer-4 shapes and
// check the newly added silkscreen paths land on "bottom". test.failing until
// the fix lands; the fix PR flips this back to a normal test().
test.failing(
  "bottom-layer (layer 4) silkscreen TRACK and ARC map to the bottom layer",
  () => {
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
  },
)
