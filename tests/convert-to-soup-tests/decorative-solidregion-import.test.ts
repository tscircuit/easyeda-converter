import { expect, spyOn, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import rawJson from "tests/assets/C41413180.raweasy.json"

const unsupportedCubicPath =
  "M 3992 3000 C 3992 3001 3994 3001 3994 3000 L 3992 3000 Z"

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
    `SOLIDREGION~12~~${unsupportedCubicPath}~solid~decorative-curve~~~~0`,
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

test.each([11, 12])(
  "still rejects an unsupported physical NPTH on layer %s",
  (layer) => {
    const withPhysicalHole = structuredClone(rawJson)
    withPhysicalHole.packageDetail.dataStr.shape.push(
      `SOLIDREGION~${layer}~~${unsupportedCubicPath}~npth~physical-hole~~~~0`,
    )
    expect(() =>
      convertEasyEdaJsonToCircuitJson(
        EasyEdaJsonSchema.parse(withPhysicalHole),
      ),
    ).toThrow("Unsupported EasyEDA SOLIDREGION path command: C")
  },
)

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
