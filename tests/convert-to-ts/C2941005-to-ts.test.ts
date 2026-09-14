import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import switchRawEasy from "../assets/C2941005.raweasy.json"

const renderImportedSwitch = async () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  return runTscircuitCode(`${result}
export default () => (
  <board width="12mm" height="10mm">
    <YTSPS_22E58LM name="SW1" />
  </board>
)
`)
}

test("renders the C2941005 schematic and PCB", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  expect(
    betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN"),
  ).toHaveLength(6)
  expect(
    betterEasy.packageDetail.dataStr.shape.filter(
      (shape) => shape.type === "PAD",
    ),
  ).toHaveLength(6)

  const circuitJson = await renderImportedSwitch()
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)
  expect(schematicSvg).toContain(">SW1</text>")
  await expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2941005-schematic",
  )
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2941005-pcb",
  )
})

test("preserves all six C2941005 schematic terminals and their PCB pad mappings", async () => {
  const circuitJson = await renderImportedSwitch()
  const schematicPorts = circuitJson.filter(
    (element) => element.type === "schematic_port",
  )
  expect(
    schematicPorts.map((port) => port.pin_number).sort((a, b) => a! - b!),
  ).toEqual([1, 2, 3, 4, 5, 6])

  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const pcbPorts = circuitJson.filter((element) => element.type === "pcb_port")
  const pads = circuitJson.filter((element) => element.type === "pcb_smtpad")
  expect(sourcePorts).toHaveLength(6)
  expect(pcbPorts).toHaveLength(6)
  expect(pads).toHaveLength(6)

  for (const pinNumber of [1, 2, 3, 4, 5, 6]) {
    const sourcePort = sourcePorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const schematicPort = schematicPorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const pad = pads.find((pad) => pad.port_hints?.includes(`pin${pinNumber}`))!
    expect(schematicPort.source_port_id).toBe(sourcePort.source_port_id)
    expect(
      pcbPorts.find((port) => port.pcb_port_id === pad.pcb_port_id)
        ?.source_port_id,
    ).toBe(sourcePort.source_port_id)
  }

  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent).toBeDefined()
  expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
})

test.each([1, 2, 3])(
  "uses the native switch only for two terminals (input: %i)",
  async (pinCount) => {
    // Reduced inputs exercise classification boundaries; the unmodified
    // six-terminal fixture above verifies the real component and pad mappings.
    const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
    betterEasy.dataStr.shape = betterEasy.dataStr.shape.filter(
      (shape) => shape.type !== "PIN" || Number(shape.pinNumber) <= pinCount,
    )
    betterEasy.packageDetail.dataStr.shape =
      betterEasy.packageDetail.dataStr.shape.filter(
        (shape) => shape.type !== "PAD" || Number(shape.number) <= pinCount,
      )

    const result = await convertBetterEasyToTsx({ betterEasy })
    expect(result.includes("<switch")).toBe(pinCount === 2)
    expect(result.includes("<chip")).toBe(pinCount !== 2)

    const circuitJson = await runTscircuitCode(`${result}
export default () => (<board><YTSPS_22E58LM name="SW1" /></board>)
`)
    expect(
      circuitJson.filter((element) => element.type === "schematic_port"),
    ).toHaveLength(pinCount)
    if (pinCount === 2) {
      expect(
        circuitJson.find((element) => element.type === "schematic_component")
          ?.symbol_name,
      ).toBe("spst_switch_right")
    }
  },
)
