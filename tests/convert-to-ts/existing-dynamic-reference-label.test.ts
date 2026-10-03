import { expect, test } from "bun:test"
import rawEasy from "../assets/C94934.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test.each(["{NAME}", "{REF}", "{REFERENCE}"])(
  "does not duplicate an existing %s reference label",
  async (referencePlaceholder) => {
    const sourceWithReference = structuredClone(rawEasy)
    sourceWithReference.dataStr.shape.push(
      `T~L~620~275~0~#0000FF~~10pt~~~~comment~${referencePlaceholder}~1~start~dynamic-reference`,
    )
    const { circuitJson, referenceNames } =
      await renderImportedSymbolReferenceLabels({
        rawEasy: sourceWithReference,
        componentName: "TPD2EUSB30ADRTR",
        referencePrefix: "D",
      })
    const referenceTexts = circuitJson
      .filter((element) => element.type === "schematic_text")
      .filter((text) => referenceNames.includes(text.text))
    expect(referenceTexts.map((text) => text.text).sort()).toEqual(
      referenceNames,
    )
  },
)
