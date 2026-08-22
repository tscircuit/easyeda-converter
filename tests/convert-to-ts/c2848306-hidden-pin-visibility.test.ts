import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2848306.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C2848306 rendering an EasyEDA-hidden EP pin", async () => {
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
  expect({
    label: parsedHiddenEpPin.label,
    pinNumber: parsedHiddenEpPin.pinNumber,
    visibility: parsedHiddenEpPin.visibility,
  }).toMatchInlineSnapshot(`
    {
      "label": "EP",
      "pinNumber": 5,
      "visibility": "none",
    }
  `)

  const result = await convertBetterEasyToTsx({ betterEasy })

  // The converter currently discards the parsed visibility and exposes the
  // die pad as an ordinary schematic pin.
  expect(result).toContain('pin5: ["EP"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).toContain(">EP</text>")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2848306-hidden-EP-pin-rendered",
  )
}, 20_000)
