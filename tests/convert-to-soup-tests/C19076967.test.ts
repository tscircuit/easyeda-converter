import { it, expect } from "bun:test"
import C19076967RawEasy from "../assets/C19076967.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("C19076967 should import correctly and generate PCB SVG", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(C19076967RawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(parsedJson)

  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
})
