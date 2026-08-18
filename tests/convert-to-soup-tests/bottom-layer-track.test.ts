import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema, convertEasyEdaJsonToCircuitJson } from "lib/index"
import rawJson from "tests/assets/C14877.raweasy.json"

test("preserves the side of bottom-layer tracks", () => {
  const rawWithBottomLayerTracks = structuredClone(rawJson)
  rawWithBottomLayerTracks.packageDetail.dataStr.shape =
    rawWithBottomLayerTracks.packageDetail.dataStr.shape.map((shape) =>
      shape.startsWith("TRACK~")
        ? shape.replace(
            /^(TRACK~[^~]+~)[^~]+/,
            (_match, prefix) => `${prefix}4`,
          )
        : shape,
    )

  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawWithBottomLayerTracks),
  )
  const trackPaths = circuitJson.filter(
    (
      element,
    ): element is Extract<AnyCircuitElement, { type: "pcb_silkscreen_path" }> =>
      element.type === "pcb_silkscreen_path" &&
      element.pcb_silkscreen_path_id.startsWith("pcb_silkscreen_path_"),
  )

  expect(trackPaths.length).toBeGreaterThan(0)
  expect(trackPaths.every((track) => track.layer === "bottom")).toBe(true)
  expect(convertCircuitJsonToPcbSvg(trackPaths)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
