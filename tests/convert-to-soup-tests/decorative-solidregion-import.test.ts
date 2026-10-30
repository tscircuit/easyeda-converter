import { expect, spyOn, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawJson from "tests/assets/C41413180.raweasy.json"

const cubicPath = "M 3992 2998 C 3992 2999 3994 2999 3994 2998 L 3992 2998 Z"

test("reference footprint retains pads and supported fabrication artwork", async () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawJson),
  )
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(4)
  expect(
    circuitJson.filter(
      (element) => element.type === "pcb_fabrication_note_path",
    ),
  ).toHaveLength(4)
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "supported-footprint-reference",
  )
})

test.failing(
  "preserves decorative Bezier artwork without warning or dropping geometry",
  async () => {
    // Synthetic documentation-layer artwork, not a captured supplier defect.
    const withDecoration = structuredClone(rawJson)
    withDecoration.packageDetail.dataStr.shape.push(
      `SOLIDREGION~12~~${cubicPath}~solid~decorative-curve~~~~0`,
    )
    const expected = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawJson),
    )
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      const actual = convertEasyEdaJsonToCircuitJson(
        EasyEdaJsonSchema.parse(withDecoration),
      )
      const notes = actual.filter(
        (element) => element.type === "pcb_fabrication_note_path",
      )
      expect(notes).toHaveLength(5)
      const curve = notes.at(-1)!
      expect(curve.route.length).toBeGreaterThan(4)
      expect(
        Math.max(...curve.route.map((point) => point.y)) -
          Math.min(...curve.route.map((point) => point.y)),
      ).toBeCloseTo(0.75 * 0.254, 7)
      expect(actual.filter((element) => element !== curve)).toEqual(expected)
      expect(warn).not.toHaveBeenCalled()
      await expect(convertCircuitJsonToPcbSvg(actual)).toMatchSvgSnapshot(
        import.meta.path,
        "preserved-bezier-artwork",
      )
      const footprint = generateFootprintTsx(actual)
      const rendered = await runTscircuitCode(`
      export default () => <board width="8mm" height="8mm">
        <chip name="U1" footprint={${footprint}} />
      </board>
    `)
      const nativeNotes = rendered.filter(
        (element) => element.type === "pcb_fabrication_note_path",
      )
      expect(nativeNotes).toHaveLength(5)
      const nativeCurve = nativeNotes.at(-1)!
      expect(nativeCurve.route).toHaveLength(curve.route.length)
      for (const [index, point] of nativeCurve.route.entries()) {
        expect(point.x).toBeCloseTo(curve.route[index]!.x, 7)
        expect(point.y).toBeCloseTo(curve.route[index]!.y, 7)
      }
      await expect(convertCircuitJsonToPcbSvg(rendered)).toMatchSvgSnapshot(
        import.meta.path,
        "preserved-bezier-artwork-native",
      )
    } finally {
      warn.mockRestore()
    }
  },
)

test("still rejects malformed physical NPTH geometry", () => {
  const withPhysicalHole = structuredClone(rawJson)
  withPhysicalHole.packageDetail.dataStr.shape.push(
    "SOLIDREGION~11~~M 3992 3000 C 3992 3001~npth~invalid-hole~~~~0",
  )
  expect(() =>
    convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withPhysicalHole)),
  ).toThrow("Invalid EasyEDA SOLIDREGION path")
})
