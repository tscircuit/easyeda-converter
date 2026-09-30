import { expect, it } from "bun:test"
import { su } from "@tscircuit/circuit-json-util"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import rawEasy from "../assets/C3188679.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("records C3188679 VCC power semantics and physical pin mapping", async () => {
  // TI LM5146 Table 6-1 identifies pin 14 as the internal regulator output.
  // The source symbol leaves its electrical type undefined (0).
  const rawVccPin = rawEasy.dataStr.shape.find(
    (shape) => shape.startsWith("P~") && shape.split("~")[3] === "14",
  )
  expect(rawVccPin?.split("~")[2]).toBe("0")

  const tsx = await convertRawEasyToTsx({ rawEasy })
  expect(tsx).toContain('pin14: ["VCC"]')
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))
  const db = su(circuitJson)
  const vcc = db.source_port.list().find((port) => port.pin_number === 14)
  if (!vcc) throw new Error("Missing VCC source port")
  const schematicPort = db.schematic_port
    .list()
    .find((port) => port.source_port_id === vcc.source_port_id)
  if (!schematicPort) throw new Error("Missing VCC schematic port")
  const pcbPort = db.pcb_port
    .list()
    .find((port) => port.source_port_id === vcc.source_port_id)
  if (!pcbPort) throw new Error("Missing VCC PCB port")
  const pads = db.pcb_smtpad
    .list()
    .filter((pad) => pad.pcb_port_id === pcbPort.pcb_port_id)
  expect(pads).toHaveLength(1)
  expect(pads[0].port_hints).toContain("pin14")

  expect({
    pinNumber: vcc.pin_number,
    label: schematicPort.display_pin_label,
    requiresPower: vcc.requires_power === true,
    hasInputArrow: schematicPort.has_input_arrow === true,
  }).toMatchInlineSnapshot(`
    {
      "hasInputArrow": true,
      "label": "VCC",
      "pinNumber": 14,
      "requiresPower": true,
    }
  `)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C3188679-vcc-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C3188679-vcc-pcb",
  )
})
