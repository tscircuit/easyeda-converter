import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { getMosfetMetadata } from "lib/websafe/convert-to-typescript-component/get-mosfet-metadata"
import raw from "./assets/C501008.raweasy.json"
import customSymbolRaw from "./assets/C8545.raweasy.json"

test("groups a single MOSFET's repeated G/S/D pins without guessing its channel or mode", () => {
  expect(getMosfetMetadata(EasyEdaJsonSchema.parse(raw))).toEqual({
    pins: {
      pin1: "source",
      pin2: "source",
      pin3: "source",
      pin4: "gate",
      pin5: "drain",
      pin6: "drain",
      pin7: "drain",
      pin8: "drain",
    },
    channelType: undefined,
    mosfetMode: undefined,
  })
})

test.each([
  ["N-channel enhancement MOSFET", "n", "enhancement"],
  ["P-channel depletion MOSFET", "p", "depletion"],
  ["N-channel and P-channel enhancement and depletion", undefined, undefined],
] as const)(
  "reads explicit metadata: %s",
  (description, channelType, mosfetMode) => {
    const input = EasyEdaJsonSchema.parse(raw)
    input.description = description
    expect(getMosfetMetadata(input)).toMatchObject({ channelType, mosfetMode })
  },
)

test.each(["G1", "G", "SENSE", ""])(
  "leaves ambiguous pin layouts unchanged: %s",
  (label) => {
    const input = EasyEdaJsonSchema.parse(raw)
    const pin = input.dataStr.shape.find((pin) => pin.type === "PIN")!
    if (pin.type !== "PIN") throw new Error("Missing pin")
    pin.label = label
    expect(getMosfetMetadata(input)).toBeUndefined()
  },
)

test("preserves an existing MOSFET drawing and rejects other component categories", () => {
  expect(
    getMosfetMetadata(EasyEdaJsonSchema.parse(customSymbolRaw)),
  ).toBeUndefined()
  const input = EasyEdaJsonSchema.parse(raw)
  input.tags = ["JFETs"]
  expect(getMosfetMetadata(input)).toBeUndefined()
})
