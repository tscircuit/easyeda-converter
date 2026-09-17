import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C388883.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves distinct C388883 terminals with encoded prime labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const htmlEncodedPinNumbers = betterEasy.dataStr.shape.flatMap((shape) =>
    shape.type === "PIN" &&
    typeof shape.pinNumber === "string" &&
    shape.pinNumber.includes("&#96;")
      ? [shape.pinNumber]
      : [],
  )

  expect(htmlEncodedPinNumbers).toEqual(["1&#96;", "2&#96;"])

  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin3: ["1_PRIME"]')
  expect(result).toContain('pin4: ["2_PRIME"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const invalidPinLabelWarnings = circuitJson
    .filter((element) => element.type === "source_property_ignored_warning")
    .filter((warning) => warning.property_name.startsWith("pinLabels"))

  expect(invalidPinLabelWarnings).toHaveLength(0)
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  expect(sourcePorts).toHaveLength(4)
  expect(
    sourcePorts.find((port) => port.pin_number === 3)?.port_hints,
  ).toContain("1_PRIME")
  expect(
    sourcePorts.find((port) => port.pin_number === 4)?.port_hints,
  ).toContain("2_PRIME")
})
