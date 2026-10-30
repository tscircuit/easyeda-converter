import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawJson from "tests/assets/C410353.raweasy.json"

test("preserves captured C410353 curved artwork through Circuit JSON and generated TSX", async () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawJson),
  )
  const sourceArcs = circuitJson
    .filter((element) => element.type === "pcb_fabrication_note_path")
    .filter((element) => element.route.length > 5)
  expect(sourceArcs.length).toBeGreaterThan(0)
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c410353-curved-artwork-direct",
  )

  const footprint = generateFootprintTsx(circuitJson)
  const rendered = await runTscircuitCode(`
    export default () => <board width="40mm" height="40mm">
      <chip name="U1" footprint={${footprint}} />
    </board>
  `)
  const nativePaths = rendered.filter(
    (element) => element.type === "pcb_fabrication_note_path",
  )
  for (const arc of sourceArcs) {
    const matching = nativePaths.find(
      (path) =>
        path.route.length === arc.route.length &&
        path.route.every(
          (point, index) =>
            Math.abs(point.x - arc.route[index]!.x) < 1e-7 &&
            Math.abs(point.y - arc.route[index]!.y) < 1e-7,
        ),
    )
    expect(matching).toBeDefined()
  }
  await expect(convertCircuitJsonToPcbSvg(rendered)).toMatchSvgSnapshot(
    import.meta.path,
    "c410353-curved-artwork-native",
  )
})
