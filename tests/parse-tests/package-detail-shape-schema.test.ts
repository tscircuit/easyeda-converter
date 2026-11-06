import { expect, test } from "bun:test"
import { ShapeItemSchema } from "lib/schemas/package-detail-shape-schema"

test("ShapeItemSchema parses comma/multi-space TRACK points, scientific-notation ARC, SOLIDREGION paths, and RECT without lineWidth", () => {
  const track = ShapeItemSchema.parse({
    type: "TRACK",
    data: "1~3~S$1~4000,3000  4010, 3020~gge1~0",
  })
  expect(track).toEqual({
    type: "TRACK",
    width: 1,
    layer: 3,
    points: [
      { x: 4000, y: 3000 },
      { x: 4010, y: 3020 },
    ],
    id: "gge1",
  })

  const arc = ShapeItemSchema.parse({
    type: "ARC",
    data: "0.8~3~~M 4000, 3000 A 5 5 1e-5 0,1 4005, 3005~gge2~0",
  })
  expect(arc).toEqual({
    type: "ARC",
    width: 0.8,
    layer: 3,
    start: { x: 4000, y: 3000 },
    end: { x: 4005, y: 3005 },
    radiusX: 5,
    radiusY: 5,
    largeArc: false,
    sweepDirection: "CW",
  })

  const solidRegion = ShapeItemSchema.parse({
    type: "SOLIDREGION",
    data: "3~~M  4000, 3000 L 4010, 3000 L 4010  3010 Z~solid~gge3",
  })
  expect(solidRegion).toEqual({
    type: "SOLIDREGION",
    layermask: 3,
    pathData: "M  4000, 3000 L 4010, 3000 L 4010  3010 Z",
    points: [
      { x: 4000, y: 3000 },
      { x: 4010, y: 3000 },
      { x: 4010, y: 3010 },
    ],
    fillStyle: "solid",
    id: "gge3",
  })

  const rect = ShapeItemSchema.parse({
    type: "RECT",
    data: "4000~3000~10~20~3~gge4~90",
  })
  expect(rect).toEqual({
    type: "RECT",
    x: "40000mil",
    y: "30000mil",
    width: "100mil",
    height: "200mil",
    layer: 3,
    id: "gge4",
    rotation: 90,
    lineWidth: 0,
    fillStyle: "none",
  })
})
