import rawJson from "tests/assets/C14877.raweasy.json"
import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson, EasyEdaJsonSchema } from "lib/index"
import type { AnyCircuitElement } from "circuit-json"

test("preserves the side of bottom-layer arcs", () => {
  const rawWithBottomLayerArcs = structuredClone(rawJson)
  rawWithBottomLayerArcs.packageDetail.dataStr.shape =
    rawWithBottomLayerArcs.packageDetail.dataStr.shape.map((shape) =>
      shape.startsWith("ARC~")
        ? shape.replace(/^(ARC~[^~]+~)[^~]+/, (_match, prefix) => `${prefix}4`)
        : shape,
    )

  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawWithBottomLayerArcs),
  )
  const arcPaths = circuitJson.filter(
    (
      element,
    ): element is Extract<AnyCircuitElement, { type: "pcb_silkscreen_path" }> =>
      element.type === "pcb_silkscreen_path" &&
      element.pcb_silkscreen_path_id.startsWith("pcb_silkscreen_arc_"),
  )

  expect(arcPaths.length).toBeGreaterThan(0)
  expect(arcPaths.every((arc) => arc.layer === "bottom")).toBe(true)
})
