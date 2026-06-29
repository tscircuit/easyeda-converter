import { it, expect } from "bun:test"
import c88224RawEasy from "../assets/C88224.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should parse easyeda json for a c88224 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(c88224RawEasy)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson)

  expect(
    convertCircuitJsonToPcbSvg(soupElements, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
