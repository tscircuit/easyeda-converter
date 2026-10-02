import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { ShapeItemSchema } from "lib/schemas/package-detail-shape-schema"
import { applyToPoint, rotateDEG } from "transformation-matrix"
import switchRawEasy from "../assets/C221539.raweasy.json"

test("preserves explicit slot lengths and local axes at different pad rotations", () => {
  for (const rotationDegrees of [0, 90, 180, 270, 18]) {
    for (const shape of ["OVAL", "RECT"]) {
      for (const isHorizontal of [false, true]) {
        // EasyEDA +Y points down; a CCW pad rotation therefore uses -degrees.
        const holeEnd = applyToPoint(rotateDEG(-rotationDegrees), {
          x: isHorizontal ? 2 : 0,
          y: isHorizontal ? 0 : 2,
        })
        const copperPoints = [
          { x: -4, y: -8 },
          { x: 4, y: -8 },
          { x: 4, y: 8 },
          { x: -4, y: 8 },
        ]
          .flatMap((point) => {
            const rotatedPoint = applyToPoint(
              rotateDEG(-rotationDegrees),
              point,
            )
            return [rotatedPoint.x, rotatedPoint.y]
          })
          .join(" ")
        const padRecord = `PAD~${shape}~0~0~8~16~11~~1~2~${copperPoints}~${rotationDegrees}~slot~10~${holeEnd.x} ${holeEnd.y} ${-holeEnd.x} ${-holeEnd.y}~Y`
        const parsedPad = ShapeItemSchema.parse({
          type: "PAD",
          data: padRecord.slice(4),
        })
        expect(parsedPad.type).toBe("PAD")
        if (parsedPad.type !== "PAD") throw new Error("Expected a pad")
        expect(parsedPad.holeLength).toBe("100mil")
        expect(parsedPad.holePoints).toHaveLength(2)

        const rawEasy = structuredClone(switchRawEasy)
        rawEasy.packageDetail.dataStr.shape = [padRecord]
        const circuitJson = convertEasyEdaJsonToCircuitJson(
          EasyEdaJsonSchema.parse(rawEasy),
        )
        const platedHole = circuitJson.find(
          (element) => element.type === "pcb_plated_hole",
        )!
        if (!("hole_width" in platedHole)) throw new Error("Expected a slot")
        if (
          platedHole.shape !== "pill" &&
          platedHole.shape !== "rotated_pill_hole_with_rect_pad"
        ) {
          throw new Error(
            "Expected a rotated pad with explicit drill dimensions",
          )
        }
        expect(platedHole.hole_width).toBeCloseTo(isHorizontal ? 2.54 : 1.016)
        expect(platedHole.hole_height).toBeCloseTo(isHorizontal ? 1.016 : 2.54)
        const ccwRotationDegrees =
          "ccw_rotation" in platedHole
            ? platedHole.ccw_rotation
            : platedHole.hole_ccw_rotation
        expect(ccwRotationDegrees).toBe(rotationDegrees)
      }
    }
  }
})

test("keeps circular drills circular inside elongated copper pads", () => {
  for (const shape of ["OVAL", "RECT"]) {
    const rawEasy = structuredClone(switchRawEasy)
    rawEasy.packageDetail.dataStr.shape = [
      `PAD~${shape}~0~0~8~20~11~~1~2~-4 -10 4 -10 4 10 -4 10~0~round~0~~Y`,
    ]
    const circuitJson = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawEasy),
    )
    const platedHole = circuitJson.find(
      (element) => element.type === "pcb_plated_hole",
    )!
    if (!("hole_width" in platedHole)) throw new Error("Expected a pad")
    expect(platedHole.hole_width).toBeCloseTo(1.016)
    expect(platedHole.hole_height).toBeCloseTo(1.016)
  }
})
