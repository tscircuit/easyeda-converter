import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c14877RawEasy from "../assets/C14877.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C14877 document-layer arcs becoming top silkscreen and its circle being dropped", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c14877RawEasy)
  const sourceDocumentShapes = betterEasy.packageDetail.dataStr.shape
    .map((shape, index) => ({ index, shape }))
    .filter(({ shape }) => "layer" in shape && shape.layer === 12)
  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  const conversionResults = sourceDocumentShapes.map(({ index, shape }) => {
    const generatedElement = convertedCircuitJson.find((element) => {
      if (shape.type === "ARC") {
        return (
          element.type === "pcb_silkscreen_path" &&
          element.pcb_silkscreen_path_id === `pcb_silkscreen_arc_${index + 1}`
        )
      }

      if (shape.type === "CIRCLE") {
        return (
          element.type === "pcb_silkscreen_circle" &&
          element.pcb_silkscreen_circle_id ===
            `pcb_silkscreen_circle_${index + 1}`
        )
      }

      return false
    })

    return {
      generatedLayer:
        generatedElement && "layer" in generatedElement
          ? generatedElement.layer
          : null,
      generatedType: generatedElement?.type ?? null,
      sourceLayer: "layer" in shape ? shape.layer : null,
      sourceType: shape.type,
    }
  })

  expect(conversionResults).toMatchInlineSnapshot(`
    [
      {
        "generatedLayer": "top",
        "generatedType": "pcb_silkscreen_path",
        "sourceLayer": 12,
        "sourceType": "ARC",
      },
      {
        "generatedLayer": "top",
        "generatedType": "pcb_silkscreen_path",
        "sourceLayer": 12,
        "sourceType": "ARC",
      },
      {
        "generatedLayer": null,
        "generatedType": null,
        "sourceLayer": 12,
        "sourceType": "CIRCLE",
      },
    ]
  `)
  expect(
    convertedCircuitJson.filter((element) =>
      element.type.startsWith("pcb_fabrication_note"),
    ),
  ).toHaveLength(0)

  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).not.toContain("<fabricationnotepath")

  const generatedCircuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToPcbSvg(generatedCircuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c14877-document-layer-shapes-pcb",
  )
  expect(
    convertCircuitJsonToSchematicSvg(generatedCircuitJson),
  ).toMatchSvgSnapshot(
    import.meta.path,
    "c14877-document-layer-shapes-schematic",
  )
}, 50000)
