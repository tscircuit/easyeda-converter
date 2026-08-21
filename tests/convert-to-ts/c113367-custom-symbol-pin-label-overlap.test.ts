import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C113367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("reproduces C113367 custom-symbol pin-label overlap", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) => shape.includes("~IN-~")),
  ).toBeTrue()
  expect(
    chipRawEasy.dataStr.shape.some((shape) => shape.includes("~VO+~")),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const customSymbolLayoutMarkup = result
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.startsWith("<symbol") ||
        (line.startsWith("<port ") &&
          (line.includes('"IN_NEG"') || line.includes('"VO_POS"'))),
    )

  expect(customSymbolLayoutMarkup).toMatchInlineSnapshot(`
    [
      "<symbol width={2.541} height={2.463}>",
      "<port name=\"pin2\" pinNumber={2} aliases={[\"IN-\",\"IN_NEG\"]} direction=\"left\" schX={-0.8} schY={0.1} schStemLength={0.4} />",
      "<port name=\"pin5\" pinNumber={5} aliases={[\"VO+\",\"VO_POS\"]} direction=\"right\" schX={0.8} schY={-0.1} schStemLength={0.4} />",
    ]
  `)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).toContain("IN-")
  expect(schematicSvg).toContain("VO+")
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "c113367-custom-symbol-pin-label-overlap-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c113367-custom-symbol-pin-label-overlap-pcb",
  )
}, 50000)
