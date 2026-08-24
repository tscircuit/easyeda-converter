import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { mil10ToMm } from "lib/utils/easyeda-unit-to-mm"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c124375RawEasy from "../assets/C124375.raweasy.json"
import c131337RawEasy from "../assets/C131337.raweasy.json"
import c2943786RawEasy from "../assets/C2943786.raweasy.json"
import c3178291RawEasy from "../assets/C3178291.raweasy.json"
import c49234237RawEasy from "../assets/C49234237.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const reproCases = [
  { partNumber: "C124375", rawEasy: c124375RawEasy },
  { partNumber: "C3178291", rawEasy: c3178291RawEasy },
  { partNumber: "C131337", rawEasy: c131337RawEasy },
  { partNumber: "C49234237", rawEasy: c49234237RawEasy },
  { partNumber: "C2943786", rawEasy: c2943786RawEasy },
] as const

test("preserves package RECT layer and line-width fields with correct stroke units", async () => {
  const conversionResults = reproCases.map(({ partNumber, rawEasy }) => {
    const rawRect = rawEasy.packageDetail.dataStr.shape.find((shape) =>
      shape.startsWith("RECT~"),
    )
    if (!rawRect) throw new Error(`Missing package RECT for ${partNumber}`)

    const [, , , , , rawLayer, , , rawLineWidth] = rawRect.split("~")
    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const parsedRect = betterEasy.packageDetail.dataStr.shape.find(
      (shape) => shape.type === "RECT",
    )
    if (!parsedRect || parsedRect.type !== "RECT") {
      throw new Error(`Missing parsed package RECT for ${partNumber}`)
    }

    const convertedRect = convertEasyEdaJsonToCircuitJson(betterEasy).find(
      (element) => element.type === "pcb_silkscreen_rect",
    )
    if (!convertedRect || convertedRect.type !== "pcb_silkscreen_rect") {
      throw new Error(`Missing converted silkscreen RECT for ${partNumber}`)
    }

    return {
      convertedStrokeWidthMm: Number(convertedRect.stroke_width.toFixed(7)),
      expectedStrokeWidthMm: Number(mil10ToMm(Number(rawLineWidth)).toFixed(7)),
      parsedLayer: parsedRect.layer,
      parsedLineWidth: parsedRect.lineWidth,
      partNumber,
      rawLayer: Number(rawLayer),
      rawLineWidth: Number(rawLineWidth),
    }
  })

  expect(conversionResults).toMatchInlineSnapshot(`
    [
      {
        "convertedStrokeWidthMm": 0.254,
        "expectedStrokeWidthMm": 0.254,
        "parsedLayer": 3,
        "parsedLineWidth": 1,
        "partNumber": "C124375",
        "rawLayer": 3,
        "rawLineWidth": 1,
      },
      {
        "convertedStrokeWidthMm": 0.0999998,
        "expectedStrokeWidthMm": 0.0999998,
        "parsedLayer": 3,
        "parsedLineWidth": 0.3937,
        "partNumber": "C3178291",
        "rawLayer": 3,
        "rawLineWidth": 0.3937,
      },
      {
        "convertedStrokeWidthMm": 0.254,
        "expectedStrokeWidthMm": 0.254,
        "parsedLayer": 3,
        "parsedLineWidth": 1,
        "partNumber": "C131337",
        "rawLayer": 3,
        "rawLineWidth": 1,
      },
      {
        "convertedStrokeWidthMm": 0.254,
        "expectedStrokeWidthMm": 0.254,
        "parsedLayer": 3,
        "parsedLineWidth": 1,
        "partNumber": "C49234237",
        "rawLayer": 3,
        "rawLineWidth": 1,
      },
      {
        "convertedStrokeWidthMm": 0.254,
        "expectedStrokeWidthMm": 0.254,
        "parsedLayer": 3,
        "parsedLineWidth": 1,
        "partNumber": "C2943786",
        "rawLayer": 3,
        "rawLineWidth": 1,
      },
    ]
  `)

  const c3178291BetterEasy = EasyEdaJsonSchema.parse(c3178291RawEasy)
  const directCircuitJson = convertEasyEdaJsonToCircuitJson(c3178291BetterEasy)
  expect(
    convertCircuitJsonToPcbSvg(directCircuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path, "c3178291-package-rect-direct-pcb")

  const result = await convertBetterEasyToTsx({
    betterEasy: c3178291BetterEasy,
  })
  expect(result).toContain('strokeWidth="0.0999998mm"')

  const generatedCircuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToPcbSvg(generatedCircuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c3178291-package-rect-round-trip-pcb",
  )
  expect(
    convertCircuitJsonToSchematicSvg(generatedCircuitJson, { width: 1800 }),
  ).toMatchSvgSnapshot(
    import.meta.path,
    "c3178291-package-rect-round-trip-schematic",
  )
}, 50000)
