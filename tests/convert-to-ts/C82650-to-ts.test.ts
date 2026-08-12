import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import ledDriverRawEasy from "../assets/C82650.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C82650 LED display driver being emitted as an LED", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(ledDriverRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // C82650 is an AiP1640 display-driver IC in a 28-pin SOP package.
  expect(betterEasy.tags).toEqual(["LED Display Drivers"])
  expect(betterEasy.dataStr.head.c_para.pre).toBe("U?")
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "SOP-28_L17.9-W7.5-P1.27-LS10.3-BL",
  )

  // Reproduce the bug: category matching turns this IC into a simple LED.
  expect(result).toContain('import type { LedProps } from "@tscircuit/props"')
  expect(result).toContain("<led")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_led")
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(28)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C82650-led-driver-misclassification",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
