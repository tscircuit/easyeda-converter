import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C490691.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C490691 losing trailing-hash active-low pin names", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) => shape.includes("~DTR#~")),
  ).toBeTrue()
  expect(
    chipRawEasy.dataStr.shape.some((shape) => shape.includes("~RESET#~")),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin2: ["DTR"]')
  expect(result).toContain('pin19: ["RESET"]')
  expect(result).not.toContain('pin2: ["N_DTR"]')
  expect(result).not.toContain('pin19: ["N_RESET"]')

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C490691-active-low-labels-stripped",
  )
})
