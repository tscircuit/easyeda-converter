import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2848306.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves C2848306 EasyEDA-hidden EP pin visibility", async () => {
  const hiddenEpPin = chipRawEasy.dataStr.shape.find((shape) =>
    shape.startsWith("P~none~0~5~"),
  )

  expect(hiddenEpPin).toContain("~EP~")

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const parsedHiddenEpPin = betterEasy.dataStr.shape.find(
    (shape) => shape.type === "PIN" && shape.pinNumber === 5,
  )

  expect(parsedHiddenEpPin?.type).toBe("PIN")
  if (!parsedHiddenEpPin || parsedHiddenEpPin.type !== "PIN") {
    throw new Error("C2848306 pin 5 was not parsed as a schematic pin")
  }
  expect(parsedHiddenEpPin.visibility).toBe("none")

  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain('pin5: ["EP"]')
  expect(result).toContain("schPinArrangement=")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).not.toContain(">EP</text>")
  expect(schematicSvg).not.toContain(">5</text>")
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(5)
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(4)
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2848306-hidden-EP-pin-omitted",
  )
}, 20_000)
