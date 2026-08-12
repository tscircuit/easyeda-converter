import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import diodeArrayRawEasy from "../assets/C96225.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("converts C96225 diode array into a six-pin chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(diodeArrayRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // C96225 contains two series-connected diode pairs in a six-pin package.
  expect(betterEasy.tags).toEqual(["Switching Diode"])
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "SOT-363_L2.0-W1.3-P0.65-LS2.1-TL",
  )

  expect(result).toContain('import type { ChipProps } from "@tscircuit/props"')
  expect(result).toContain("<chip")
  expect(result).not.toContain("<diode")
  expect(result).toContain("pin6:")
  expect(result).not.toContain("symbol={")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent?.ftype).toBe("simple_chip")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(6)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(6)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C96225-diode-array-chip",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
