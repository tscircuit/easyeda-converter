import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import chipRawEasy from "../assets/C44296.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("repro: C44296 common-cathode pins import with different labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const commonCathodePinNumbers = betterEasy.dataStr.shape
    .filter((shape) => shape.type === "PIN" && shape.label === "GND")
    .map((pin) => pin.pinNumber)

  // EasyEDA represents both physical pins as the same common-cathode
  // connection. The converted schematic changes their visible labels to
  // GND1/GND2, so it no longer matches the source symbol.
  expect(commonCathodePinNumbers).toEqual([3, 8])

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(result).toContain('pin3: ["GND1"]')
  expect(result).toContain('pin8: ["GND2"]')
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C44296-common-cathode-label-mismatch-repro",
  )
}, 15_000)
