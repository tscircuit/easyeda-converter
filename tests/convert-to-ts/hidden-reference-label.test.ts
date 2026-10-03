import { expect, test } from "bun:test"
import rawEasy from "../assets/C94934.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test("creates a visible reference label when the source reference is hidden", async () => {
  const sourceWithHiddenReference = structuredClone(rawEasy)
  sourceWithHiddenReference.dataStr.shape.push(
    "T~P~620~275~0~#0000FF~~10pt~~~~comment~D?~0~start~hidden-reference",
  )
  const { tsx, circuitJson, referenceNames } =
    await renderImportedSymbolReferenceLabels({
      rawEasy: sourceWithHiddenReference,
      componentName: "TPD2EUSB30ADRTR",
      referencePrefix: "D",
    })
  expect(tsx.match(/<schematictext[^>]*text="\{NAME\}"/g)).toHaveLength(1)
  const referenceTexts = circuitJson
    .filter((element) => element.type === "schematic_text")
    .filter((text) => referenceNames.includes(text.text))
  expect(referenceTexts.map((text) => text.text).sort()).toEqual(referenceNames)
})
