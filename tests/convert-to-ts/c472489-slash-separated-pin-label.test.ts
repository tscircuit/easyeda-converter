import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C472489.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves C472489's slash-separated pin 20 aliases", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) =>
      shape.includes("~#RST/NMI/SBWTDIO~"),
    ),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin20: ["N_RST","NMI","SBWTDIO"]')
  expect(result).toContain('"VREF_POS"')
  expect(result).toContain('"VREF_NEG"')
  expect(result).not.toContain("RST/NMI/SBWTDIO")
  expect(result).not.toMatch(/"[^"]*[+-]"/)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C472489-pin20-aliases",
  )
})
