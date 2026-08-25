import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import c37792RawEasy from "../assets/C37792.raweasy.json"
import c4674RawEasy from "../assets/C4674.raweasy.json"
import c4681RawEasy from "../assets/C4681.raweasy.json"
import c4682RawEasy from "../assets/C4682.raweasy.json"
import c4684RawEasy from "../assets/C4684.raweasy.json"
import c703794RawEasy from "../assets/C703794.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const standardDipSwitches = [
  ["C4674", c4674RawEasy],
  ["C4681", c4681RawEasy],
  ["C4682", c4682RawEasy],
  ["C4684", c4684RawEasy],
  ["C37792", c37792RawEasy],
  ["C703794", c703794RawEasy],
] as const

for (const [partNumber, rawEasy] of standardDipSwitches) {
  it(`reproduces ${partNumber} rendering as a single switch`, async () => {
    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const result = await convertBetterEasyToTsx({ betterEasy })

    // This is the current incorrect output. A standard DIP switch contains
    // multiple independent switches, but the converter emits one <switch>.
    expect(result).toContain("import type { SwitchProps }")
    expect(result).toContain("<switch")

    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(result),
    )
    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${partNumber}-standard-dip-switch-repro`,
    )
  }, 20_000)
}
