import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import fuseRawEasy from "../assets/C354900.raweasy.json"
import movRawEasy from "../assets/C1527439.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const cases = [
  {
    lcscPartNumber: "C354900",
    rawEasy: fuseRawEasy,
    referenceDesignator: "F1",
  },
  {
    lcscPartNumber: "C1527439",
    rawEasy: movRawEasy,
    referenceDesignator: "RV1",
  },
]

for (const { lcscPartNumber, rawEasy, referenceDesignator } of cases) {
  test(`${lcscPartNumber} preserves its custom symbol reference designator and rectangle stroke width`, async () => {
    const result = await convertBetterEasyToTsx({
      betterEasy: EasyEdaJsonSchema.parse(rawEasy),
    })

    expect(result).toContain("strokeWidth={0.02}")
    expect(result).toContain('text="{NAME}"')

    const namedResult = result.replace(
      "    <chip\n",
      `    <chip\n      name="${referenceDesignator}"\n`,
    )
    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(namedResult),
    )
    const schematicRect = circuitJson.find(
      (element) => element.type === "schematic_rect",
    )
    const referenceDesignatorText = circuitJson.find(
      (element) =>
        element.type === "schematic_text" &&
        element.text === referenceDesignator,
    )

    expect(schematicRect).toMatchObject({ stroke_width: 0.02 })
    expect(referenceDesignatorText).toMatchObject({
      anchor: "left",
      color: "#006464",
      font_size: 0.18,
      text: referenceDesignator,
    })
    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      lcscPartNumber,
    )
  })
}
