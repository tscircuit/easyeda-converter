import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import raw from "./assets/C39731285-center-pad.raweasy.json"

const footprint = EasyEdaJsonSchema.parse(raw)
const converted = convertEasyEdaJsonToCircuitJson(footprint, {
  useModelCdn: true,
})

test("C39731285 pin 33 has a smaller supplier paste opening than its copper pad", () => {
  const region = footprint.packageDetail.dataStr.shape.find(
    (s) => s.type === "SOLIDREGION",
  )
  if (region?.type !== "SOLIDREGION")
    throw new Error("Missing supplier stencil")
  expect(region.layermask).toBe(5)
  for (const axis of ["x", "y"] as const) {
    const coordinates = region.points.map((p) => p[axis])
    expect(
      (Math.max(...coordinates) - Math.min(...coordinates)) * 0.254,
    ).toBeCloseTo(2.96, 4)
  }
  expect(converted.find((e) => e.type === "pcb_smtpad")).toMatchObject({
    port_hints: ["pin33"],
    width: expect.closeTo(3.7, 4),
    height: expect.closeTo(3.7, 4),
  })
})

test.failing(
  "C39731285 conversion preserves the 2.96 mm top paste aperture",
  () => {
    const apertures = converted.filter((e) => e.type === "pcb_solder_paste")
    expect(apertures).toHaveLength(1)
    const aperture = apertures[0]
    expect(aperture.layer).toBe("top")
    for (const axis of ["x", "y"] as const) {
      let size: number
      if (aperture.shape === "polygon") {
        const coordinates = aperture.points.map((p) => p[axis])
        size = Math.max(...coordinates) - Math.min(...coordinates)
      } else if ("width" in aperture) {
        size = axis === "x" ? aperture.width : aperture.height
      } else {
        throw new Error("Expected a square paste opening")
      }
      expect(size).toBeCloseTo(2.96, 4)
    }
  },
)
