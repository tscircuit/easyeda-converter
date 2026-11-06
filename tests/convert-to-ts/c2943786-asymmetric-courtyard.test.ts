import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import c2943786RawEasy from "../assets/C2943786.raweasy.json"

test("reproduces C2943786 fallback courtyard expanding toward the pin-1 marker", () => {
  const betterEasy = EasyEdaJsonSchema.parse(c2943786RawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  const bodyOutline = circuitJson.find(
    (element) => element.type === "pcb_silkscreen_rect",
  )
  const courtyard = circuitJson.find(
    (element) => element.type === "pcb_courtyard_outline",
  )

  if (!bodyOutline || bodyOutline.type !== "pcb_silkscreen_rect") {
    throw new Error("Missing C2943786 body outline")
  }
  if (!courtyard || courtyard.type !== "pcb_courtyard_outline") {
    throw new Error("Missing C2943786 courtyard outline")
  }

  const courtyardXs = courtyard.outline.map((point) => point.x)
  const courtyardBounds = {
    minX: Math.min(...courtyardXs),
    maxX: Math.max(...courtyardXs),
  }
  const bodyBounds = {
    minX: bodyOutline.center.x - bodyOutline.width / 2,
    maxX: bodyOutline.center.x + bodyOutline.width / 2,
  }
  const courtyardSummary = {
    bodyCenterX: bodyOutline.center.x,
    courtyardCenterX: (courtyardBounds.minX + courtyardBounds.maxX) / 2,
    leftClearance: bodyBounds.minX - courtyardBounds.minX,
    rightClearance: courtyardBounds.maxX - bodyBounds.maxX,
  }

  expect(courtyardSummary).toMatchInlineSnapshot(`
    {
      "bodyCenterX": 0,
      "courtyardCenterX": -0.35445699999996805,
      "leftClearance": 0.9578979999999442,
      "rightClearance": 0.2489840000000081,
    }
  `)
  expect(courtyardSummary.leftClearance).not.toBeCloseTo(
    courtyardSummary.rightClearance,
  )

  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path, "c2943786-asymmetric-courtyard-pcb")
})
