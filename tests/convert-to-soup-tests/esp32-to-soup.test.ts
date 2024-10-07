import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import esp32RawEasy from "../assets/esp32.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import type { AnySoupElement } from "circuit-json"

it("should parse easyeda json for a 555 timer (smd) and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(esp32RawEasy)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson)

  await logSoup("easyeda esp32 to soup", soupElements as AnySoupElement[])
})
