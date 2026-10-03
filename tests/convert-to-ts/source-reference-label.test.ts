import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import rawEasy from "../assets/C94934.raweasy.json"
import { renderImportedSymbolReferenceLabels } from "../fixtures/render-imported-symbol-reference-labels"

test("reuses the source reference annotation with each instance's name", async () => {
  const sourceWithReference = structuredClone(rawEasy)
  sourceWithReference.dataStr.shape.push(
    "T~P~620~275~0~#0000FF~~10pt~~~~comment~D?~1~start~source-reference",
  )
  const betterEasy = EasyEdaJsonSchema.parse(sourceWithReference)
  const sourceReference = betterEasy.dataStr.shape.find(
    (shape) => shape.type === "TEXT" && shape.isReferenceDesignator,
  )
  expect(sourceReference).toMatchObject({
    type: "TEXT",
    alignment: "L",
    content: "D?",
    isReferenceDesignator: true,
  })

  const { tsx, circuitJson, referenceNames } =
    await renderImportedSymbolReferenceLabels({
      rawEasy: sourceWithReference,
      componentName: "TPD2EUSB30ADRTR",
      referencePrefix: "D",
    })
  expect(tsx.match(/<schematictext[^>]*text="\{NAME\}"/g)).toHaveLength(1)
  expect(tsx).not.toContain('text="D?"')
  const schematicTexts = circuitJson.filter(
    (element) => element.type === "schematic_text",
  )
  expect(
    schematicTexts
      .filter((text) => referenceNames.includes(text.text))
      .map((text) => text.text)
      .sort(),
  ).toEqual(referenceNames)
  expect(schematicTexts.filter((text) => text.text === "GND")).toHaveLength(2)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path)
})
