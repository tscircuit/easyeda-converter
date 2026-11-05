import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { isSwitchCategoryComponent } from "lib/websafe/convert-to-typescript-component/is-switch-category-component"
import { runTscircuitCode } from "tscircuit"
import switchRawEasy from "../assets/C7428714.raweasy.json"

const renderImportedSwitch = async () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  return runTscircuitCode(`${result}
export default () => (
  <board width="20mm" height="20mm">
    <RS_03 name="SW1" />
  </board>
)
`)
}

test("detects C7428714 (RS-03 rotary switch) as a mechanical switch and renders schematic and PCB", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  expect(isSwitchCategoryComponent(betterEasy)).toBe(true)
  expect(
    betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN"),
  ).toHaveLength(8)
  expect(
    betterEasy.packageDetail.dataStr.shape.filter(
      (shape) => shape.type === "PAD",
    ),
  ).toHaveLength(8)

  const circuitJson = await renderImportedSwitch()
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path, "C7428714-schematic")
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C7428714-pcb",
  )
})

test("preserves all eight C7428714 schematic terminals and their PCB plated hole mappings", async () => {
  const circuitJson = await renderImportedSwitch()
  const schematicPorts = circuitJson.filter(
    (element) => element.type === "schematic_port",
  )
  expect(
    schematicPorts.map((port) => port.pin_number).sort((a, b) => a! - b!),
  ).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const pcbPorts = circuitJson.filter((element) => element.type === "pcb_port")
  const platedHoles = circuitJson.filter(
    (element) => element.type === "pcb_plated_hole",
  )
  expect(sourcePorts).toHaveLength(8)
  expect(pcbPorts).toHaveLength(8)
  expect(platedHoles).toHaveLength(8)

  for (const pinNumber of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const sourcePort = sourcePorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const schematicPort = schematicPorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const hole = platedHoles.find((hole) =>
      hole.port_hints?.includes(`pin${pinNumber}`),
    )!
    expect(schematicPort.source_port_id).toBe(sourcePort.source_port_id)
    expect(
      pcbPorts.find((port) => port.pcb_port_id === hole.pcb_port_id)
        ?.source_port_id,
    ).toBe(sourcePort.source_port_id)
  }

  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
  expect(sourceComponent?.supplier_part_numbers?.jlcpcb).toContain("C7428714")
})
