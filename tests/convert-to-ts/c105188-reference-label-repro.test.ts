import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import rawEasy from "../assets/C105188.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test("C105188 custom symbols display their instance reference labels", async () => {
  const { tsx, circuitJson, referenceNames } =
    await renderImportedSymbolReferenceLabels({
      rawEasy,
      componentName: "TLV3201AIDBVR",
      referencePrefix: "U",
    })

  expect(tsx).toContain("symbol={")
  const referenceTexts = circuitJson
    .filter((element) => element.type === "schematic_text")
    .filter((text) => referenceNames.includes(text.text))
  expect(referenceTexts.map((text) => text.text).sort()).toEqual(referenceNames)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path)
})
