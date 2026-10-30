import { expect, spyOn, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import rawJson from "tests/assets/C41413180.raweasy.json"

const cubicPath = "M 3992 2998 C 3992 2999 3994 2999 3994 2998 L 3992 2998 Z"

test("snapshots the actual import outcome for Bezier artwork", async () => {
  const withDecoration = structuredClone(rawJson)
  withDecoration.packageDetail.dataStr.shape.push(
    `SOLIDREGION~12~~${cubicPath}~solid~decorative-curve~~~~0`,
  )
  let svg: string
  try {
    const circuitJson = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(withDecoration),
    )
    svg = convertCircuitJsonToPcbSvg(circuitJson)
  } catch (error) {
    if (
      !(error instanceof Error) ||
      error.message !== "Unsupported EasyEDA SOLIDREGION path command: C"
    ) {
      throw error
    }
    // Conversion fails before there is a PCB to render. Record that outcome
    // explicitly instead of substituting an incomplete footprint.
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <rect width="800" height="600" fill="#111"/>
      <text x="40" y="230" fill="#ff6464" font-family="sans-serif" font-size="30">EasyEDA import failed</text>
      <text x="40" y="290" fill="#eee" font-family="sans-serif" font-size="19">Unsupported EasyEDA SOLIDREGION path command: C</text>
      <text x="40" y="340" fill="#aaa" font-family="sans-serif" font-size="19">No footprint was generated.</text>
    </svg>`
  }
  await expect(svg).toMatchSvgSnapshot(
    import.meta.path,
    "preserved-bezier-artwork",
  )
})

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

test("warns and skips an unsupported decorative curve without aborting the import", () => {
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
    expect(actual).toEqual(expected)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      "Skipping EasyEDA fabrication note decorative-curve: Unsupported EasyEDA SOLIDREGION path command: C",
    )
  } finally {
    warn.mockRestore()
  }
})

test("still rejects an unsupported curve describing a physical NPTH", () => {
  const withPhysicalHole = structuredClone(rawJson)
  withPhysicalHole.packageDetail.dataStr.shape.push(
    `SOLIDREGION~11~~${cubicPath}~npth~physical-hole~~~~0`,
  )
  expect(() =>
    convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withPhysicalHole)),
  ).toThrow("Unsupported EasyEDA SOLIDREGION path command: C")
})
