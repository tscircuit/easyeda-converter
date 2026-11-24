import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import rawEasy from "./assets/C393941.raweasy.json"

const withCutoutRegion = (pathData: string) => {
  const cloned = structuredClone(rawEasy) as typeof rawEasy & {
    packageDetail: { dataStr: { shape: string[] } }
  }
  cloned.packageDetail.dataStr.shape.push(
    `SOLIDREGION~11~~${pathData}~cutout~gge9001~~~~0`,
  )
  return EasyEdaJsonSchema.parse(cloned)
}

const polygonArea = (points: Array<{ x: number; y: number }>) => {
  let area = 0
  for (let i = 0; i < points.length; i++) {
    const p = points[i]!
    const q = points[(i + 1) % points.length]!
    area += p.x * q.y - q.x * p.y
  }
  return Math.abs(area / 2)
}

test.each([
  "M 4000 3000 H 4010 V 3010 L 4000 3010 Z",
  "m 4000 3000 h 10 v 10 l -10 0 z",
])("retains an H/V board cutout rectangle: %s", (pathData) => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    withCutoutRegion(pathData),
  )
  const cutout = circuitJson.find((element) => element.type === "pcb_cutout")
  if (!cutout || cutout.shape !== "polygon") {
    throw new Error("Expected a polygon cutout")
  }
  expect(cutout.points).toHaveLength(5)
  expect(polygonArea(cutout.points)).toBeCloseTo(2.54 * 2.54, 6)
})

test.each([
  // Semicircular slot edge: radius 5 (10-mil units) bulges 1.27mm off the chord
  "M 4000 3000 L 4010 3000 A 5 5 0 0 1 4000 3000 Z",
  // Closed capsule cutout, like the supplier NPTH regions but as a cutout
  "M 4004 3001 L 4000 3001 A 1 1 0 0 1 4000 2999 L 4004 2999 A 1 1 0 0 1 4004 3001 Z",
])(
  "expands arcs in a board cutout instead of collapsing to the chord: %s",
  (pathData) => {
    const circuitJson = convertEasyEdaJsonToCircuitJson(
      withCutoutRegion(pathData),
    )
    const cutout = circuitJson.find((element) => element.type === "pcb_cutout")
    if (!cutout || cutout.shape !== "polygon") {
      throw new Error("Expected a polygon cutout")
    }
    // A chord-only polygon has at most the two arc endpoints and zero area
    expect(cutout.points.length).toBeGreaterThan(3)
    expect(polygonArea(cutout.points)).toBeGreaterThan(0.5)
  },
)
