import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import chipRawEasy from "../assets/C44296.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves C44296's shared common-cathode label", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const commonCathodePinNumbers = betterEasy.dataStr.shape
    .filter((shape) => shape.type === "PIN" && shape.label === "GND")
    .map((pin) => pin.pinNumber)

  // EasyEDA represents both physical pins as the same common-cathode
  // connection.
  expect(commonCathodePinNumbers).toEqual([3, 8])

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(result).toContain(
    '<port name="pin3" pinNumber={3} aliases={["GND","GND1"]}',
  )
  expect(result).toContain(
    '<port name="pin8" pinNumber={8} aliases={["GND","GND2"]}',
  )

  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent?.internally_connected_source_port_ids).toEqual([
    ["source_port_2", "source_port_7"],
  ])

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C44296-shared-common-cathode-label",
  )
}, 15_000)
