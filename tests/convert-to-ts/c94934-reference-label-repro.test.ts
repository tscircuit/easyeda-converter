import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import rawEasy from "../assets/C94934.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test("repro: C94934 preserves GND text but omits instance reference labels", async () => {
  const { tsx, circuitJson, referenceNames } =
    await renderImportedSymbolReferenceLabels({
      rawEasy,
      componentName: "TPD2EUSB30ADRTR",
      referencePrefix: "D",
    })

  expect(tsx).toContain("symbol={")
  const schematicTexts = circuitJson.filter(
    (element) => element.type === "schematic_text",
  )
  expect(schematicTexts.filter((text) => text.text === "GND")).toHaveLength(2)
  expect(
    schematicTexts.filter((text) => referenceNames.includes(text.text)),
  ).toHaveLength(0)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path)
})
