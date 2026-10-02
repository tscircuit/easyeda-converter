import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import switchRawEasy from "../assets/C221539.raweasy.json"

const renderSwitch = async () => {
  const tsx = await convertRawEasyToTsx({ rawEasy: switchRawEasy })
  return runTscircuitCode(`${tsx}
export default () => <board width={25} height={15}>
  <A_1103M2S3CQE2 name="SW1" />
</board>`)
}

test("renders C221539's schematic and footprint", async () => {
  const circuitJson = await renderSwitch()
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(3)
  expect(
    circuitJson.filter((element) => element.type === "pcb_plated_hole"),
  ).toHaveLength(3)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path, "C221539-schematic")
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C221539-pcb",
  )
})

test("preserves C221539's three terminals and physical pin 2 in a chip box", async () => {
  const circuitJson = await renderSwitch()
  const schematicPorts = circuitJson.filter(
    (element) => element.type === "schematic_port",
  )
  expect(schematicPorts).toHaveLength(3)
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const pcbPorts = circuitJson.filter((element) => element.type === "pcb_port")
  for (const pinNumber of [1, 2, 3]) {
    const sourcePort = sourcePorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const schematicPort = schematicPorts.find(
      (port) => port.pin_number === pinNumber,
    )!
    const pcbPort = pcbPorts.find(
      (port) => port.source_port_id === sourcePort.source_port_id,
    )!
    const platedHole = circuitJson
      .filter((element) => element.type === "pcb_plated_hole")
      .find((element) => element.port_hints?.includes(`pin${pinNumber}`))!
    expect(schematicPort.source_port_id).toBe(sourcePort.source_port_id)
    expect(platedHole.pcb_port_id).toBe(pcbPort.pcb_port_id)
  }
  const tsx = await convertRawEasyToTsx({ rawEasy: switchRawEasy })
  expect(tsx).toContain("<chip")
  expect(tsx).not.toContain("symbol={")
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
})

test("preserves the explicit 1.5 mm slots on all C221539 pads", async () => {
  // EasyEDA PAD fields 14 and 15 encode drill length and centerline endpoints:
  // https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/
  const rawPads = switchRawEasy.packageDetail.dataStr.shape.filter((shape) =>
    shape.startsWith("PAD~"),
  )
  expect(rawPads.map((pad) => Number(pad.split("~")[13]))).toEqual([
    5.9055, 5.9055, 5.9055,
  ])
  const circuitJson = await renderSwitch()
  for (const hole of circuitJson.filter(
    (element) => element.type === "pcb_plated_hole",
  )) {
    if (!("hole_width" in hole)) throw new Error("Expected a slot")
    expect(hole.hole_width).toBeCloseTo(0.9139936, 6)
    expect(hole.hole_height).toBeCloseTo(1.499997, 6)
  }
})
