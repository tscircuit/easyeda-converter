import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { isInductorComponent } from "lib/websafe/convert-to-typescript-component/is-inductor-component"
import { runTscircuitCode } from "tscircuit"
import c1046RawEasy from "../assets/C1046.raweasy.json"
import c281113RawEasy from "../assets/C281113.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const reproCases = [
  { partNumber: "C1046", rawEasy: c1046RawEasy },
  { partNumber: "C281113", rawEasy: c281113RawEasy },
] as const

it("reproduces L0805 inductors being generated as generic chips", async () => {
  const conversionResults = []

  for (const { partNumber, rawEasy } of reproCases) {
    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const result = await convertBetterEasyToTsx({ betterEasy })
    const componentParameters = betterEasy.dataStr.head.c_para

    conversionResults.push({
      detectedAsInductor: isInductorComponent(betterEasy),
      generatedComponent: result.includes("<inductor") ? "inductor" : "chip",
      generatedProps: result.includes("InductorProps")
        ? "InductorProps"
        : "ChipProps",
      packageName: componentParameters.package,
      partNumber,
      prefix: componentParameters.pre,
      value: componentParameters.Value,
    })

    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(result),
    )
    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${partNumber.toLowerCase()}-l0805-inductor-as-chip-schematic`,
    )
    expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${partNumber.toLowerCase()}-l0805-inductor-as-chip-pcb`,
    )
  }

  expect(conversionResults).toMatchInlineSnapshot(`
    [
      {
        "detectedAsInductor": false,
        "generatedComponent": "chip",
        "generatedProps": "ChipProps",
        "packageName": "L0805",
        "partNumber": "C1046",
        "prefix": "L?",
        "value": "10uH",
      },
      {
        "detectedAsInductor": false,
        "generatedComponent": "chip",
        "generatedProps": "ChipProps",
        "packageName": "L0805",
        "partNumber": "C281113",
        "prefix": "L?",
        "value": "10uH",
      },
    ]
  `)
}, 50000)
