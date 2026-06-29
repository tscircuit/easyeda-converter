import { it, expect } from "bun:test"
import usbCJson from "../assets/usb-c.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a mounted usb c plug", async () => {
  const result = EasyEdaJsonSchema.parse(usbCJson)

  expect(result.uuid).toBe("04b7d8073e854006b41709a96b7a21a9")
})
