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
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2941005-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C2941005-pcb",
  )
})

test.failing(
  "preserves all six C2941005 schematic terminals and their PCB pad mappings",
  async () => {
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
    const pcbPorts = circuitJson.filter(
      (element) => element.type === "pcb_port",
    )
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
      const pad = pads.find((pad) =>
        pad.port_hints?.includes(`pin${pinNumber}`),
      )!
      expect(schematicPort.source_port_id).toBe(sourcePort.source_port_id)
      expect(
        pcbPorts.find((port) => port.pcb_port_id === pad.pcb_port_id)
          ?.source_port_id,
      ).toBe(sourcePort.source_port_id)
    }

    const sourceComponent = circuitJson.find(
      (element) => element.type === "source_component",
    )
    expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
  },
)
