import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import usbCEasyEdaJson from "../assets/usb-c.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import type { AnySoupElement } from "circuit-json"
import { su } from "@tscircuit/circuit-json-util"

it.skip("should convert a usb-c footprint to tscircuit soup json", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(usbCEasyEdaJson)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson) as any

  expect(su(soupElements).pcb_component.list()[0]).toBeTruthy()

  expect(su(soupElements).cad_component.list().length).toBe(1)
})
