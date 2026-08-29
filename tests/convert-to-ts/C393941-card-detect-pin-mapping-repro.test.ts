import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C393941.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test.failing(
  "keeps the C393941 card-detect pad mapped to schematic pin 9",
  async () => {
    const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
    const schematicCardDetectPin = betterEasy.dataStr.shape.find(
      (shape) =>
        shape.type === "PIN" && shape.pinNumber === 9 && shape.label === "CD",
    )
    const footprintCardDetectPad = betterEasy.packageDetail.dataStr.shape.find(
      (shape) => shape.type === "PAD" && shape.number === "CD",
    )

    expect(schematicCardDetectPin).toBeDefined()
    expect(footprintCardDetectPad).toBeDefined()

    const result = await convertBetterEasyToTsx({ betterEasy })
    const circuitJson = await runTscircuitCode(
      wrapTsxWithBoardFor3dSnapshot(result),
    )
    const sourcePorts = circuitJson.filter(
      (element) => element.type === "source_port",
    )

    expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
      import.meta.path,
      "C393941-card-detect-pin-mapping-repro",
    )

    expect(result).toContain('pin9: ["CD"]')
    expect(result).not.toContain('pin14: ["CD"]')
    expect(result).toContain('<smtpad portHints={["pin9"]}')
    expect(
      sourcePorts.find((port) => port.port_hints?.includes("CD")),
    ).toMatchObject({
      name: "CD",
      pin_number: 9,
    })
    expect(sourcePorts.find((port) => port.pin_number === 14)).toBeUndefined()
  },
  50000,
)
