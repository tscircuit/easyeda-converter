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
      {
        pinNumber: 20,
        rawLabel: "#RST/NMI/SBWTDIO",
        parsedLabel: "N_RST/NMI/SBWTDIO",
        generatedAliases: ["N_RST", "NMI", "SBWTDIO"],
      },
      {
        pinNumber: 41,
        rawLabel: "P1.3/TA1.2/A3/C3",
        parsedLabel: "P1.3/TA1.2/A3/C3",
        generatedAliases: ["P1.3", "TA1.21", "A3", "C3"],
      },
    ],
    inlineSnapshot: `
      [
        {
          "generatedAliases": [
            "N_RST",
            "NMI",
            "SBWTDIO",
          ],
          "parsedLabel": "N_RST/NMI/SBWTDIO",
          "pinNumber": 20,
          "rawLabel": "#RST/NMI/SBWTDIO",
        },
        {
          "generatedAliases": [
            "P1.3",
            "TA1.21",
            "A3",
            "C3",
          ],
          "parsedLabel": "P1.3/TA1.2/A3/C3",
          "pinNumber": 41,
          "rawLabel": "P1.3/TA1.2/A3/C3",
        },
      ]
    `,
  },
  {
    partNumber: "C14877",
    rawEasy: c14877RawEasy,
    pins: [
      {
        pinNumber: 1,
        rawLabel: "(PCINT19/OC2B/INT1)PD3",
        parsedLabel: "(PCINT19/OC2B/INT1)PD3",
        generatedAliases: ["PD3", "PCINT19", "OC2B", "INT1"],
      },
    ],
    inlineSnapshot: `
      [
        {
          "generatedAliases": [
            "PD3",
            "PCINT19",
            "OC2B",
            "INT1",
          ],
          "parsedLabel": "(PCINT19/OC2B/INT1)PD3",
          "pinNumber": 1,
          "rawLabel": "(PCINT19/OC2B/INT1)PD3",
        },
      ]
    `,
  },
  {
    partNumber: "C2886621",
    rawEasy: c2886621RawEasy,
    pins: [
      {
        pinNumber: 3,
        rawLabel: "SINEIN–",
        parsedLabel: "SINEIN–",
        generatedAliases: ["SINEIN_NEG"],
      },
    ],
    inlineSnapshot: `
      [
        {
          "generatedAliases": [
            "SINEIN_NEG",
          ],
          "parsedLabel": "SINEIN–",
          "pinNumber": 3,
          "rawLabel": "SINEIN–",
        },
      ]
    `,
  },
] as const

for (const { partNumber, rawEasy, pins, inlineSnapshot } of reproCases) {
  it(`preserves ${partNumber} special-character pin labels`, async () => {
    for (const { rawLabel } of pins) {
      expect(
        rawEasy.dataStr.shape.some((shape) => shape.includes(`~${rawLabel}~`)),
      ).toBeTrue()
    }

    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const parsedLabels = new Map<number, string>()

    for (const { pinNumber, parsedLabel } of pins) {
      const parsedPin = betterEasy.dataStr.shape.find(
        (shape) => shape.type === "PIN" && shape.pinNumber === pinNumber,
      )
      expect(parsedPin?.type).toBe("PIN")
      if (!parsedPin || parsedPin.type !== "PIN") {
        throw new Error(`Missing parsed pin ${pinNumber} for ${partNumber}`)
      }

      expect(parsedPin.label).toBe(parsedLabel)
      parsedLabels.set(pinNumber, parsedPin.label)
    }

    const result = await convertBetterEasyToTsx({ betterEasy })

    for (const { pinNumber, generatedAliases } of pins) {
      expect(result).toContain(
        `pin${pinNumber}: [${generatedAliases.map((alias) => `"${alias}"`).join(",")}],`,
      )
    }

    expect(
      pins.map(({ pinNumber, rawLabel, generatedAliases }) => ({
        generatedAliases,
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
      `${partNumber}-special-character-pin-labels-preserved`,
    )
  })
}
