import { expect, test } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { getEasyEdaInsertionDirection } from "lib/utils/get-easyeda-insertion-direction"
import { runTscircuitCode } from "tscircuit"
import C124352 from "./assets/C124352.raweasy.json"
import C124375 from "./assets/C124375.raweasy.json"

for (const rawEasy of [C124352, C124375]) {
  test(`${rawEasy.lcsc.number} preserves vertical header insertion direction through TSX`, async () => {
    const circuitJson = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawEasy),
    )
    const pcbComponent = circuitJson.find((el) => el.type === "pcb_component")
    expect(pcbComponent?.insertion_direction).toBe("from_above")
    const footprint = generateFootprintTsx(circuitJson)
    expect(footprint).toContain('<footprint insertionDirection="from_above">')
    const rendered = await runTscircuitCode(
      `export default () => <board width="30mm" height="30mm" routingDisabled><chip name="J1" footprint={${footprint}} /></board>`,
    )
    expect(
      rendered.find((el) => el.type === "pcb_component")?.insertion_direction,
    ).toBe("from_above")
  })
}

for (const packageName of [
  "HDR-TH_2P-P2.54-H-M-1",
  "HDR-TH_2P-P2.54",
  "MICRO-USB-SMD",
  "DIP-8",
  "",
]) {
  test(`does not assume vertical insertion for ${packageName || "missing package"}`, () => {
    const betterEasy = EasyEdaJsonSchema.parse(C124375)
    betterEasy.dataStr.head.c_para.package = packageName
    expect(getEasyEdaInsertionDirection(betterEasy)).toBeUndefined()
    const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
    expect(
      circuitJson.find((el) => el.type === "pcb_component")
        ?.insertion_direction,
    ).toBeUndefined()
    expect(generateFootprintTsx(circuitJson)).not.toContain(
      "insertionDirection",
    )
  })
}
