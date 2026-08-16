import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import C113367EasyEdaJson from "../assets/C113367.raweasy.json"
import C124352EasyEdaJson from "../assets/C124352.raweasy.json"

it("coerces a numeric-string szlcsc id", () => {
  const payload: any = structuredClone(C124352EasyEdaJson)
  payload.szlcsc.id = String(payload.szlcsc.id)

  const result = EasyEdaJsonSchema.parse(payload)

  expect(result.szlcsc.id).toBe(C124352EasyEdaJson.szlcsc.id)
})

it.each([undefined, null, ""])(
  "accepts an absent dataStr.head.utime value (%s)",
  (utime) => {
    const payload: any = structuredClone(C124352EasyEdaJson)
    payload.dataStr.head.utime = utime

    const result = EasyEdaJsonSchema.parse(payload)

    expect(result.dataStr.head.utime).toBeUndefined()
  },
)

it('normalizes text alignment "P" to left alignment', () => {
  const payload: any = structuredClone(C113367EasyEdaJson)
  const textShapeIndex = payload.dataStr.shape.findIndex((shape: string) =>
    shape.startsWith("T~"),
  )
  payload.dataStr.shape[textShapeIndex] = payload.dataStr.shape[
    textShapeIndex
  ].replace(/^T~[LCR]~/, "T~P~")

  const result = EasyEdaJsonSchema.parse(payload)
  const textShape = result.dataStr.shape.find((shape) => shape.type === "TEXT")

  expect(textShape?.alignment).toBe("L")
})

it("normalizes additional payload variants from issue #464", () => {
  const payload: any = structuredClone(C124352EasyEdaJson)
  payload.lcsc.price = String(payload.lcsc.price)
  payload.packageDetail.dataStr.shape.push(
    "RECT~3990~2990~10~10~1~variant-rect~0~3",
  )
  payload.dataStr.shape.push(
    "AR~part_arrowhead~270~460~gge70468~0~M 270 460 L 255 467.5 L 258.75 460 L 255 452.5 Z ~#FF00FF~0~3~15",
    "I~710~-55~78~44~0~data:image/png;base64,iVBORw0KGgo=~gge40721~0~",
  )

  const result = EasyEdaJsonSchema.parse(payload)
  const variantRect = result.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "RECT" && shape.id === "variant-rect",
  )

  expect(result.lcsc.price).toBe(C124352EasyEdaJson.lcsc.price)
  expect(variantRect).toMatchObject({
    type: "RECT",
    fillStyle: "none",
  })
  expect(result.dataStr.shape.slice(-2)).toEqual([
    { type: "IGNORED", sourceType: "AR" },
    { type: "IGNORED", sourceType: "I" },
  ])
})
