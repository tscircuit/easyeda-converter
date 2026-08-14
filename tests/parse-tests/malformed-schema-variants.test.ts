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
