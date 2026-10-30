import { expect, spyOn, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import rawJson from "tests/assets/C41413180.raweasy.json"

const cubicPath = "M 3992 2998 C 3992 2999 3994 2999 3994 2998 L 3992 2998 Z"
const overBudgetPath =
  "M 3992 3000 Q 10000003992 10000003000 20000003992 3000 L 3992 3000 Z"

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

test("preserves decorative Bezier artwork without warning or dropping geometry", async () => {
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
  } finally {
    warn.mockRestore()
  }
})

test.each([11, 12])("preserves a curved physical NPTH on layer %s", (layer) => {
  const withPhysicalHole = structuredClone(rawJson)
  withPhysicalHole.packageDetail.dataStr.shape.push(
    `SOLIDREGION~${layer}~~${cubicPath}~npth~physical-hole~~~~0`,
  )
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(withPhysicalHole),
  )
  const cutout = circuitJson.find((element) => element.type === "pcb_cutout")
  if (!cutout || cutout.shape !== "polygon")
    throw new Error("Expected curved NPTH polygon")
  expect(cutout.points.length).toBeGreaterThan(4)
  expect(cutout.points[0]).toEqual(cutout.points.at(-1)!)
  expect(
    Math.max(...cutout.points.map((point) => point.y)) -
      Math.min(...cutout.points.map((point) => point.y)),
  ).toBeCloseTo(0.75 * 0.254, 7)
})

test.each([
  ["M 3992 3000 L 3994", "Invalid EasyEDA SOLIDREGION path"],
  [
    "M 3992 3000 L 3994 3000 Z M 3993 3001 L 3994 3001 Z",
    "Multiple EasyEDA SOLIDREGION subpaths are not supported",
  ],
])(
  "warns and skips unsupported decorative geometry: %s",
  (pathData, reason) => {
    const withDecoration = structuredClone(rawJson)
    withDecoration.packageDetail.dataStr.shape.push(
      `SOLIDREGION~12~~${pathData}~solid~unsupported-decoration~~~~0`,
    )
    const expected = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawJson),
    )
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(
        convertEasyEdaJsonToCircuitJson(
          EasyEdaJsonSchema.parse(withDecoration),
        ),
      ).toEqual(expected)
      expect(warn).toHaveBeenCalledTimes(1)
      expect(warn).toHaveBeenCalledWith(
        `Skipping EasyEDA fabrication note unsupported-decoration: ${reason}`,
      )
    } finally {
      warn.mockRestore()
    }
  },
)

test("propagates unexpected errors instead of reporting them as unsupported artwork", () => {
  const betterEasy = EasyEdaJsonSchema.parse(rawJson)
  const note = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "SOLIDREGION" && shape.layermask === 12,
  )
  if (!note) throw new Error("Expected a fabrication note")
  Object.defineProperty(note, "pathData", {
    get() {
      throw new TypeError("Unexpected artwork failure")
    },
  })
  const warn = spyOn(console, "warn").mockImplementation(() => {})
  try {
    expect(() => convertEasyEdaJsonToCircuitJson(betterEasy)).toThrow(
      "Unexpected artwork failure",
    )
    expect(warn).not.toHaveBeenCalled()
  } finally {
    warn.mockRestore()
  }
})

test("still rejects malformed physical NPTH geometry", () => {
  const withPhysicalHole = structuredClone(rawJson)
  withPhysicalHole.packageDetail.dataStr.shape.push(
    "SOLIDREGION~11~~M 3992 3000 C 3992 3001~npth~invalid-hole~~~~0",
  )
  expect(() =>
    convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withPhysicalHole)),
  ).toThrow("Invalid EasyEDA SOLIDREGION path")
})

test("warns and skips over-budget decorative artwork without changing the footprint", () => {
  const withDecoration = structuredClone(rawJson)
  withDecoration.packageDetail.dataStr.shape.push(
    `SOLIDREGION~12~~${overBudgetPath}~solid~over-budget-artwork~~~~0`,
  )
  const expected = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawJson),
  )
  const warn = spyOn(console, "warn").mockImplementation(() => {})
  try {
    expect(
      convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(withDecoration)),
    ).toEqual(expected)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      "Skipping EasyEDA fabrication note over-budget-artwork: Bezier curve exceeds the subdivision limit",
    )
  } finally {
    warn.mockRestore()
  }
})

test.each([11, 12])(
  "still rejects an over-budget physical NPTH on layer %s",
  (layer) => {
    const withPhysicalHole = structuredClone(rawJson)
    withPhysicalHole.packageDetail.dataStr.shape.push(
      `SOLIDREGION~${layer}~~${overBudgetPath}~npth~over-budget-hole~~~~0`,
    )
    expect(() =>
      convertEasyEdaJsonToCircuitJson(
        EasyEdaJsonSchema.parse(withPhysicalHole),
      ),
    ).toThrow("Bezier curve exceeds the subdivision limit")
  },
)

test.each([
  ["M 1e308 0 c 1e308 0 1e308 1 1e308 0 Z", "Invalid Bezier curve geometry"],
  ["M 1e308 0 h 1e308 Z", "Invalid EasyEDA SOLIDREGION path geometry"],
])(
  "warns and skips invalid generated artwork coordinates: %s",
  (pathData, reason) => {
    const withInvalidCurve = structuredClone(rawJson)
    withInvalidCurve.packageDetail.dataStr.shape.push(
      `SOLIDREGION~12~~${pathData}~solid~overflowing-artwork~~~~0`,
    )
    const expected = convertEasyEdaJsonToCircuitJson(
      EasyEdaJsonSchema.parse(rawJson),
    )
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(
        convertEasyEdaJsonToCircuitJson(
          EasyEdaJsonSchema.parse(withInvalidCurve),
        ),
      ).toEqual(expected)
      expect(warn).toHaveBeenCalledTimes(1)
      expect(warn).toHaveBeenCalledWith(
        `Skipping EasyEDA fabrication note overflowing-artwork: ${reason}`,
      )
    } finally {
      warn.mockRestore()
    }
  },
)
