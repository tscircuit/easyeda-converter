import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C15464.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should normalize active-low pin aliases for C15464", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C15464-to-ts-schematic",
  )

  expect(result).toContain('pin4: ["pin4", "CE_N"]')
  expect(result).toContain('pin7: ["pin7", "PGOOD_N"]')
  expect(result).toContain('pin9: ["pin9", "CHG_N"]')
  expect(result).not.toContain('"#CE"')
  expect(result).not.toContain('"#PGOOD"')
  expect(result).not.toContain('"#CHG"')
}, 30000)
