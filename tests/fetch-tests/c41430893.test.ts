import { it, expect } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should fetch correct part for C41430893", async () => {
  const result = await fetchEasyEDAComponent("C41430893")

  // The fetched data should match C41430893
  expect(result.dataStr?.head?.c_para?.["Supplier Part"]).toBe("C41430893")
})

it("C41430893 should generate Circuit Json without errors", async () => {
  const rawEasy = await fetchEasyEDAComponent("C41430893")
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
