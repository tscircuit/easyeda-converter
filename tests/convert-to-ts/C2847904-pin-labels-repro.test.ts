import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "../assets/C2847904.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

// These pins had only pinN placeholders in the published STM32G0B1CBT6 import.
// Convert the original EasyEDA fixture without the board's corrective wrapper.
const formerlyMissingLabels = [
  { pinNumber: 2, aliases: ["PC14_OSC32_IN"] },
  { pinNumber: 3, aliases: ["PC15_OSC32_OUT"] },
  { pinNumber: 5, aliases: ["VREF_POS"] },
  { pinNumber: 6, aliases: ["VDD", "VDDA"] },
  { pinNumber: 7, aliases: ["VSS", "VSSA"] },
  { pinNumber: 8, aliases: ["PF0_OSC_IN"] },
  { pinNumber: 9, aliases: ["PF1_OSC_OUT"] },
  { pinNumber: 10, aliases: ["PF2_NRST"] },
  { pinNumber: 33, aliases: ["PA11_PA9_"] },
  { pinNumber: 34, aliases: ["PA12_PA10_"] },
  { pinNumber: 36, aliases: ["PA14_BOOT0"] },
]

it("preserves all STM32G0B1CBT6 functional pin labels and supply aliases", async () => {
  const tsx = await convertRawEasyToTsx({ rawEasy })
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))
  const sourcePorts = circuitJson.filter((item) => item.type === "source_port")
  const schematicPorts = circuitJson.filter(
    (item) => item.type === "schematic_port",
  )

  expect(sourcePorts).toHaveLength(48)
  expect(schematicPorts).toHaveLength(48)

  for (const port of sourcePorts) {
    expect(port.name).toBeTruthy()
    expect(port.name).not.toMatch(/^pin\d+$/)
  }

  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)
  for (const { pinNumber, aliases } of formerlyMissingLabels) {
    const sourcePort = sourcePorts.find((port) => port.pin_number === pinNumber)
    const schematicPort = schematicPorts.find(
      (port) => port.pin_number === pinNumber,
    )

    expect(sourcePort?.port_hints).toEqual(
      expect.arrayContaining([...aliases, `pin${pinNumber}`]),
    )
    expect(schematicPort?.source_port_id).toBe(sourcePort?.source_port_id)
    expect(schematicPort?.display_pin_label).toBe(aliases[0])
    expect(schematicSvg).toContain(aliases[0]!)
  }

  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2847904-STM32G0B1CBT6-pin-labels",
  )
})
