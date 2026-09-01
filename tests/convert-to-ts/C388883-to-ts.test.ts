import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C388883.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C388883 HTML entities becoming invalid pin aliases", async () => {
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

  expect(result).toContain('pin3: ["1&#96;","1"]')
  expect(result).toContain('pin4: ["2&#96;","2"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const invalidPinLabelWarnings = circuitJson
    .filter((element) => element.type === "source_property_ignored_warning")
    .filter((warning) => warning.property_name.startsWith("pinLabels"))

  expect(
    invalidPinLabelWarnings.map((warning) => ({
      message: warning.message,
      propertyName: warning.property_name,
    })),
  ).toEqual([
    {
      message:
        "Invalid pin label: pin3 = '1&#96;' - excluding from component. Pin labels can only contain letters, numbers and underscores.",
      propertyName: "pinLabels['1&#96;']",
    },
    {
      message:
        "Invalid pin label: pin4 = '2&#96;' - excluding from component. Pin labels can only contain letters, numbers and underscores.",
      propertyName: "pinLabels['2&#96;']",
    },
  ])
})
