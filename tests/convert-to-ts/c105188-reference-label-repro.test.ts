import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import rawEasy from "../assets/C105188.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test("repro: C105188 custom symbols omit their instance reference labels", async () => {
  const { tsx, circuitJson, referenceNames } =
    await renderImportedSymbolReferenceLabels({
      rawEasy,
      componentName: "TLV3201AIDBVR",
      referencePrefix: "U",
    })

  expect(tsx).toContain("symbol={")
  const referenceTexts = circuitJson.filter(
    (element) =>
      element.type === "schematic_text" &&
      referenceNames.includes(element.text),
  )
  expect(referenceTexts).toHaveLength(0)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path)
})
