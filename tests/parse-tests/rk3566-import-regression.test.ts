import { expect, it } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { ShapeItemSchema } from "lib/schemas/package-detail-shape-schema"
import referenceRawEasy from "../assets/C2848306.raweasy.json"

const makeEllipsePad = (number: string, x: number) =>
  `PAD~ELLIPSE~${x}~300~1~1~1~~${number}~0~~0~gge${number}~0~~Y~0~0~0.2~${x},300`

it("parses footprint-only parts with incomplete schematic metadata", () => {
  const rawEasy = structuredClone(referenceRawEasy) as any
  rawEasy.dataStr.shape = []
  rawEasy.dataStr.head.editorVersion = undefined
  rawEasy.dataStr.head.hasIdFlag = undefined
  rawEasy.dataStr.BBox = undefined
  rawEasy.dataStr.colors = undefined

  const parsed = EasyEdaJsonSchema.parse(rawEasy)

  expect(parsed.dataStr.head.editorVersion).toBe("")
  expect(parsed.dataStr.head.hasIdFlag).toBe(false)
  expect(parsed.dataStr.BBox).toEqual({
    x: parsed.dataStr.head.x,
    y: parsed.dataStr.head.y,
    width: 0,
    height: 0,
  })
  expect(parsed.dataStr.colors).toEqual([])
})

it("preserves exponent-like BGA pad identifiers and generates unique ports", () => {
  const rawEasy = structuredClone(referenceRawEasy) as any
  rawEasy.dataStr.shape = []
  rawEasy.packageDetail.dataStr.shape = [
    makeEllipsePad("1E20", 400),
    makeEllipsePad("1A1", 402),
  ]
  rawEasy.dataStr.head.editorVersion = undefined
  rawEasy.dataStr.head.hasIdFlag = undefined
  rawEasy.dataStr.BBox = undefined
  rawEasy.dataStr.colors = undefined

  const parsed = EasyEdaJsonSchema.parse(rawEasy)
  const pads = parsed.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "PAD",
  )
  const circuitJson = convertEasyEdaJsonToCircuitJson(parsed)
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )

  expect(pads.map((pad) => pad.number)).toEqual(["1E20", "1A1"])
  expect(sourcePorts.map((port) => port.name)).toEqual(["pin1", "pin2"])
  expect(sourcePorts.map((port) => port.port_hints)).toEqual([
    ["1E20"],
    ["1A1"],
  ])
})

it("keeps ordinary decimal pad identifiers numeric", () => {
  const pad = ShapeItemSchema.parse({
    type: "PAD",
    data: makeEllipsePad("12", 400).slice("PAD~".length),
  })

  expect(pad).toMatchObject({
    type: "PAD",
    number: 12,
  })
})
