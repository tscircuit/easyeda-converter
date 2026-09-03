import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c14877RawEasy from "../assets/C14877.raweasy.json"
import c472489RawEasy from "../assets/C472489.raweasy.json"
import c2886621RawEasy from "../assets/C2886621.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const cases = [
  {
    partNumber: "C472489",
    rawEasy: c472489RawEasy,
    pins: [
      {
        pinNumber: 20,
        rawLabel: "#RST/NMI/SBWTDIO",
        parsedLabel: "#RST/NMI/SBWTDIO",
        aliases: ["N_RST", "NMI", "SBWTDIO"],
      },
      {
        pinNumber: 41,
        rawLabel: "P1.3/TA1.2/A3/C3",
        parsedLabel: "P1.3/TA1.2/A3/C3",
        aliases: ["P1_3", "TA1_21", "A3", "C3"],
      },
    ],
  },
  {
    partNumber: "C14877",
    rawEasy: c14877RawEasy,
    pins: [
      {
        pinNumber: 1,
        rawLabel: "(PCINT19/OC2B/INT1)PD3",
        parsedLabel: "(PCINT19/OC2B/INT1)PD3",
        aliases: ["PD3", "PCINT19", "OC2B", "INT1"],
      },
    ],
  },
  {
    partNumber: "C2886621",
    rawEasy: c2886621RawEasy,
    pins: [
      {
        pinNumber: 3,
        rawLabel: "SINEIN–",
        parsedLabel: "SINEIN–",
        aliases: ["SINEIN_NEG"],
      },
    ],
  },
] as const

for (const { partNumber, rawEasy, pins } of cases) {
  it(`preserves special-character pin aliases for ${partNumber}`, async () => {
    for (const { rawLabel } of pins) {
      expect(
        rawEasy.dataStr.shape.some((shape) => shape.includes(`~${rawLabel}~`)),
      ).toBeTrue()
    }

    const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
    const result = await convertBetterEasyToTsx({ betterEasy })

    for (const { pinNumber, parsedLabel, aliases } of pins) {
      const parsedPin = betterEasy.dataStr.shape.find(
        (shape) => shape.type === "PIN" && shape.pinNumber === pinNumber,
      )
      expect(parsedPin?.type).toBe("PIN")
      if (!parsedPin || parsedPin.type !== "PIN") {
        throw new Error(`Missing parsed pin ${pinNumber} for ${partNumber}`)
      }

      expect(parsedPin.label).toBe(parsedLabel)
      expect(result).toContain(
        `pin${pinNumber}: [${aliases.map((alias) => `"${alias}"`).join(",")}],`,
      )
    }

    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(result),
    )
    for (const { pinNumber, aliases } of pins) {
      const sourcePort = circuitJson.find(
        (element) =>
          element.type === "source_port" && element.pin_number === pinNumber,
      )
      expect(sourcePort?.type).toBe("source_port")
      if (!sourcePort || sourcePort.type !== "source_port") {
        throw new Error(`Missing source port ${pinNumber} for ${partNumber}`)
      }
      expect(sourcePort.port_hints).toEqual(expect.arrayContaining(aliases))
    }
    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      `${partNumber}-special-character-pin-labels`,
    )
  }, 15_000)
}
