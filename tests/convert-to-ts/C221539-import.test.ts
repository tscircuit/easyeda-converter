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

test.failing(
  "preserves C221539's three terminals with common on pin 2",
  async () => {
    const circuitJson = await renderSwitch()
    const schematicPorts = circuitJson.filter(
      (element) => element.type === "schematic_port",
    )
    expect(schematicPorts).toHaveLength(3)
    const commonPort = schematicPorts.find((port) => port.pin_number === 2)!
    for (const pinNumber of [1, 3]) {
      const throwPort = schematicPorts.find(
        (port) => port.pin_number === pinNumber,
      )!
      expect(commonPort.center.y).toBeGreaterThan(throwPort.center.y)
    }
    const sourceComponent = circuitJson.find(
      (element) => element.type === "source_component",
    )
    expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
  },
)

test.failing(
  "preserves the explicit 1.5 mm slots on all C221539 pads",
  async () => {
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
  },
)
