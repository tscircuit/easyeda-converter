import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c14877RawEasy from "../assets/C14877.raweasy.json"
import c472489RawEasy from "../assets/C472489.raweasy.json"
import c2886621RawEasy from "../assets/C2886621.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const reproCases = [
  {
    partNumber: "C472489",
    rawEasy: c472489RawEasy,
    pins: [
      { pinNumber: 20, rawLabel: "#RST/NMI/SBWTDIO" },
      { pinNumber: 41, rawLabel: "P1.3/TA1.2/A3/C3" },
    ],
    inlineSnapshot: `
      [
        {
          "generatedLabelWasDiscarded": true,
          "generatedPinLabelIsNumericFallback": true,
          "parsedLabel": "20",
          "pinNumber": 20,
          "rawLabel": "#RST/NMI/SBWTDIO",
        },
        {
          "generatedLabelWasDiscarded": true,
          "generatedPinLabelIsNumericFallback": true,
          "parsedLabel": "41",
          "pinNumber": 41,
          "rawLabel": "P1.3/TA1.2/A3/C3",
        },
      ]
    `,
  },
  {
    partNumber: "C14877",
    rawEasy: c14877RawEasy,
    pins: [{ pinNumber: 1, rawLabel: "(PCINT19/OC2B/INT1)PD3" }],
    inlineSnapshot: `
      [
        {
          "generatedLabelWasDiscarded": true,
          "generatedPinLabelIsNumericFallback": true,
          "parsedLabel": "1",
          "pinNumber": 1,
          "rawLabel": "(PCINT19/OC2B/INT1)PD3",
        },
      ]
    `,
  },
  {
    partNumber: "C2886621",
    rawEasy: c2886621RawEasy,
    pins: [{ pinNumber: 3, rawLabel: "SINEIN–" }],
    inlineSnapshot: `
      [
        {
          "generatedLabelWasDiscarded": true,
          "generatedPinLabelIsNumericFallback": true,
          "parsedLabel": "3",
          "pinNumber": 3,
          "rawLabel": "SINEIN–",
        },
      ]
    `,
  },
] as const

for (const { partNumber, rawEasy, pins, inlineSnapshot } of reproCases) {
  it(`reproduces ${partNumber} losing special-character pin labels`, async () => {
    for (const { rawLabel } of pins) {
      expect(
        rawEasy.dataStr.shape.some((shape) => shape.includes(`~${rawLabel}~`)),
      ).toBeTrue()
    }

    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const parsedLabels = new Map<number, string>()

    for (const { pinNumber } of pins) {
      const parsedPin = betterEasy.dataStr.shape.find(
        (shape) => shape.type === "PIN" && shape.pinNumber === pinNumber,
      )
      expect(parsedPin?.type).toBe("PIN")
      if (!parsedPin || parsedPin.type !== "PIN") {
        throw new Error(`Missing parsed pin ${pinNumber} for ${partNumber}`)
      }

      // The parser incorrectly matches the numeric pin-name segment after it
      // rejects '/', '.', parentheses, or the Unicode en dash in the real label.
      expect(parsedPin.label).toBe(String(pinNumber))
      parsedLabels.set(pinNumber, parsedPin.label)
    }

    const result = await convertBetterEasyToTsx({ betterEasy })

    for (const { pinNumber, rawLabel } of pins) {
      expect(result).toContain(`pin${pinNumber}: ["pin${pinNumber}"]`)
      expect(result).not.toContain(rawLabel)
    }

    expect(
      pins.map(({ pinNumber, rawLabel }) => ({
        generatedLabelWasDiscarded: !result.includes(rawLabel),
        generatedPinLabelIsNumericFallback: result.includes(
          `pin${pinNumber}: ["pin${pinNumber}"]`,
        ),
        parsedLabel: parsedLabels.get(pinNumber),
        pinNumber,
        rawLabel,
      })),
    ).toMatchInlineSnapshot(inlineSnapshot)

    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(result),
    )
    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${partNumber}-special-character-pin-labels-missing`,
    )
  })
}
