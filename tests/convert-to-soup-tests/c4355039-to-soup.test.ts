import { it } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import C4355039EasyEdaJson from "../assets/C4355039.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import type { AnySoupElement } from "@tscircuit/soup"

it("should parse easyeda json for c4355039 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(C4355039EasyEdaJson)
  const soupElements = convertEasyEdaJsonToTscircuitSoupJson(parsedJson)

  await logSoup("easyeda c4355039 to soup", soupElements as AnySoupElement[])
})
