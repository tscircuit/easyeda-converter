import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import ledDriverRawEasy from "../assets/C82650.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("converts C82650 LED display driver into a chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(ledDriverRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // C82650 is an AiP1640 display-driver IC in a 28-pin SOP package.
  expect(betterEasy.tags).toEqual(["LED Display Drivers"])
  expect(betterEasy.dataStr.head.c_para.pre).toBe("U?")
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "SOP-28_L17.9-W7.5-P1.27-LS10.3-BL",
  )

  expect(result).toContain('import type { ChipProps } from "@tscircuit/props"')
  expect(result).toContain("<chip")
  expect(result).not.toContain("<led")
  expect(result).toContain("pin28:")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_chip")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(28)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(28)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C82650-led-driver-chip",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
