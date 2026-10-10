import { it, expect } from "bun:test"
import { PadSchema } from "lib/schemas/package-detail-shape-schema"

const basePad = {
  type: "PAD" as const,
  shape: "ELLIPSE" as const,
  center: { x: 100, y: 200 },
  width: 60,
  height: 60,
  layermask: 1,
  number: 1,
  plated: false,
}

it("does not emit NaNmil when an optional tenthmil field is missing", () => {
  // A short/variant EasyEDA pad string can leave holeRadius (or a later field)
  // undefined. tenthmil must not turn that into the nonsensical unit "NaNmil",
  // which otherwise surfaces as "NaNmm" in the generated component.
  const pad = PadSchema.parse({ ...basePad }) // holeRadius omitted -> undefined
  expect(pad.holeRadius).toBe("0mil")
  for (const v of [
    pad.center.x,
    pad.center.y,
    pad.width,
    pad.height,
    pad.holeRadius,
  ]) {
    expect(String(v)).not.toContain("NaN")
  }
})

it("still converts present tenthmil values (bare number => mil*10, unit string passes through)", () => {
  const pad = PadSchema.parse({
    ...basePad,
    width: 60,
    height: "40",
    holeRadius: "5mil",
  })
  expect(pad.width).toBe("600mil") // 60 * 10
  expect(pad.height).toBe("400mil") // "40" -> 40 * 10
  expect(pad.holeRadius).toBe("5mil") // already has a unit, passed through
})
