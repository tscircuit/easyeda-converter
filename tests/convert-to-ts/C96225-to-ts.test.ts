import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import diodeArrayRawEasy from "../assets/C96225.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C96225 diode array being emitted as a simple diode", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(diodeArrayRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // C96225 contains two series-connected diode pairs in a six-pin package.
  expect(betterEasy.tags).toEqual(["Switching Diode"])
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "SOT-363_L2.0-W1.3-P0.65-LS2.1-TL",
  )

  // Reproduce the bug: category matching turns the array into one diode.
  expect(result).toContain('import type { DiodeProps } from "@tscircuit/props"')
  expect(result).toContain("<diode")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  const schematicComponent = circuitJson.find(
    (element) => element.type === "schematic_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_diode")
  expect(schematicComponent?.symbol_name).toBe("diode_right")
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(6)
  expect(
    circuitJson.filter(
      (element) => element.type === "source_pin_missing_trace_warning",
    ),
  ).toHaveLength(6)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C96225-diode-array-misclassification",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
