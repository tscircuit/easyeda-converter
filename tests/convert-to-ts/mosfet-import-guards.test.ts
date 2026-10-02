import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { getMosfetPinMetadata } from "lib/websafe/convert-to-typescript-component/get-mosfet-pin-metadata"
import mosfetRawEasy from "../assets/C20917.raweasy.json"

test.each(["uncategorized", "bipolar", "dual-gate", "hidden", "duplicate-pin"])(
  "does not treat %s pin data as a single MOSFET",
  (kind) => {
    const component = EasyEdaJsonSchema.parse(mosfetRawEasy)
    const pins = component.dataStr.shape.filter((shape) => shape.type === "PIN")
    if (kind === "uncategorized") component.tags = []
    if (kind === "bipolar") pins[0]!.label = "C"
    if (kind === "dual-gate") pins[0]!.label = "G"
    if (kind === "hidden") pins[0]!.visibility = "hide"
    if (kind === "duplicate-pin") pins[0]!.pinNumber = pins[1]!.pinNumber
    expect(getMosfetPinMetadata(component)).toBeUndefined()
  },
)
