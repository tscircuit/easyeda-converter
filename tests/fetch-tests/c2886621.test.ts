import { it, expect } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  convertEasyEdaJsonToCircuitJson,
  convertRawEasyEdaToTs,
} from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should fetch correct part for C2886621", async () => {
  const result = await fetchEasyEDAComponent("C2886621")

  // The fetched data should match C2886621
  expect(result.dataStr?.head?.c_para?.["Supplier Part"]).toBe("C2886621")
})

it("C2886621 should generate Circuit Json without errors", async () => {
  const rawEasy = await fetchEasyEDAComponent("C2886621")
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})

it("C2886621 should convert to TypeScript component", async () => {
  const rawEasy = await fetchEasyEDAComponent("C2886621")
  const result = await convertRawEasyEdaToTs(rawEasy)

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("export const SSI2130")
})
