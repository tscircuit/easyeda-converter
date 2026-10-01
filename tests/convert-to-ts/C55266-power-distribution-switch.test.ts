import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import tps2553RawEasy from "../assets/C55266.raweasy.json"

// TPS2553DBVR, TI datasheet SLVS841F, page 5 (DBV package):
// https://www.ti.com/lit/ds/symlink/tps2553.pdf
const pinLabels = ["IN", "GND", "EN", "FAULT", "ILIM", "OUT"]

const renderTps2553 = async () => {
  const tsx = await convertRawEasyToTsx({ rawEasy: tps2553RawEasy })
  return runTscircuitCode(`${tsx}
export default () => <board width={10} height={10}>
  <TPS2553DBVR name="U1" />
</board>
`)
}

test("C55266 retains six source pins and their PCB pad mappings", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(tps2553RawEasy)
  expect(betterEasy.tags).toEqual(["Power Distribution Switches"])
  expect(
    betterEasy.dataStr.shape
      .filter((shape) => shape.type === "PIN")
      .sort((a, b) => Number(a.pinNumber) - Number(b.pinNumber))
      .map((pin) => [pin.pinNumber, pin.label]),
  ).toEqual([
    [1, "IN"],
    [2, "GND"],
    [3, "EN"],
    [4, "/FAULT"],
    [5, "ILIM"],
    [6, "OUT"],
  ])

  const circuitJson = await renderTps2553()
  const sourcePorts = circuitJson.filter((e) => e.type === "source_port")
  const pcbPorts = circuitJson.filter((e) => e.type === "pcb_port")
  const pads = circuitJson.filter((e) => e.type === "pcb_smtpad")
  expect(sourcePorts).toHaveLength(6)
  expect(pcbPorts).toHaveLength(6)
  expect(pads).toHaveLength(6)
  for (const [index, label] of pinLabels.entries()) {
    const pinNumber = index + 1
    const sourcePort = sourcePorts.find((p) => p.pin_number === pinNumber)!
    expect(sourcePort.port_hints).toContain(label)
    const pad = pads.find((p) => p.port_hints?.includes(`pin${pinNumber}`))!
    expect(
      pcbPorts.find((p) => p.pcb_port_id === pad.pcb_port_id)?.source_port_id,
    ).toBe(sourcePort.source_port_id)
  }
})

test("renders the C55266 schematic and PCB", async () => {
  const circuitJson = await renderTps2553()
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path, "C55266-schematic")
  await expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C55266-pcb",
  )
})

test.failing("C55266 exposes all six IC pins in the schematic", async () => {
  const circuitJson = await renderTps2553()
  const schematicPorts = circuitJson.filter((e) => e.type === "schematic_port")
  expect(
    schematicPorts.map((p) => p.pin_number).sort((a, b) => a! - b!),
  ).toEqual([1, 2, 3, 4, 5, 6])
  for (const sourcePort of circuitJson.filter(
    (e) => e.type === "source_port",
  )) {
    expect(
      schematicPorts.find((p) => p.pin_number === sourcePort.pin_number)
        ?.source_port_id,
    ).toBe(sourcePort.source_port_id)
  }
  const sourceComponent = circuitJson.find((e) => e.type === "source_component")
  expect(sourceComponent?.ftype).toBe("simple_chip")
  expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
})
