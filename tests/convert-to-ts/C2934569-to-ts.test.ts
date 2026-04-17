import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2934569.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { runTscircuitCode } from "tscircuit"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C2934569 into typescript with keepouts", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("<keepout")

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const convertedKeepouts = convertedCircuitJson.filter(
    (e) => e.type === "pcb_keepout",
  )
  expect(convertedKeepouts.length).toBeGreaterThan(0)

  const generatedCircuitJson = await runTscircuitCode(result)
  const generatedKeepouts = generatedCircuitJson.filter(
    (e) => e.type === "pcb_keepout",
  )
  expect(generatedKeepouts.length).toBeGreaterThan(0)

  expect(convertCircuitJsonToPcbSvg(generatedCircuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
}, 30000)
