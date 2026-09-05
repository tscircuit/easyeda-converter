import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C7519.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("renders C7519 with a white body and visible protection diodes", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))

  const paths = circuitJson.filter(
    (element) => element.type === "schematic_path",
  )
  expect(paths.find((path) => path.fill_color === "#FFFFFF")).toMatchObject({
    is_filled: true,
    stroke_color: "#880000",
    stroke_width: 0.02,
  })
  expect(paths.filter((path) => path.fill_color === "#880000")).toHaveLength(5)

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C7519-schematic-view",
  )
}, 50000)
