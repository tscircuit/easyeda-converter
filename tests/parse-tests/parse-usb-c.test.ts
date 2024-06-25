import { it, expect } from "bun:test"
import usbCJson from "../assets/usb-c.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should parse easyeda json for a mounted usb c plug", async () => {
  const result = EasyEdaJsonSchema.parse(usbCJson)

  expect(result.uuid).toBe("f3fe56761e5d4bb49b034efdb56ea9e7")
})
