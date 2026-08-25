import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { isDipSwitchCategoryComponent } from "lib/websafe/convert-to-typescript-component/is-dip-switch-category-component"
import { runTscircuitCode } from "tscircuit"
import c4681RawEasy from "../assets/C4681.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves the imported symbol for a Standard DIP switch", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c4681RawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(isDipSwitchCategoryComponent(betterEasy)).toBe(true)
  expect(result).toContain("import type { ChipProps }")
  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")
  expect(result).not.toContain("<switch")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C4681-standard-dip-switch-repro",
  )
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(18)
}, 20_000)
