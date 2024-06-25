import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import usbCEasyEdaJson from "../assets/usb-c.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import type { AnySoupElement } from "@tscircuit/soup"

it("should convert a usb-c footprint to tscircuit soup json", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(usbCEasyEdaJson)
  const soupElements = convertEasyEdaJsonToTscircuitSoupJson(parsedJson)

  await logSoup("easyeda usb-c to soup", soupElements as AnySoupElement[])
})
