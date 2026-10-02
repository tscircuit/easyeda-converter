import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C20917.raweasy.json"

test("C20917 AO3400A imports as a native MOSFET with its original physical pins", async () => {
  const result = await convertBetterEasyToTsx({
    betterEasy: EasyEdaJsonSchema.parse(mosfetRawEasy),
  })
  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board routingDisabled>
        <AO3400A name="Q1"
          channelType="n" mosfetMode="enhancement"
          connections={{ G: "net.GATE", S: "net.SOURCE", D: "net.DRAIN" }} />
      </board>
    )
  `)

  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      name: "Q1",
      ftype: "simple_mosfet",
      channel_type: "n",
      mosfet_mode: "enhancement",
    }),
  )
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(3)
  const sourcePorts = circuitJson.filter((e) => e.type === "source_port")
  const schematicPorts = circuitJson.filter((e) => e.type === "schematic_port")
  const pcbPorts = circuitJson.filter((e) => e.type === "pcb_port")
  const pads = circuitJson.filter((e) => e.type === "pcb_smtpad")
  expect(pads).toHaveLength(3)
  for (const [pin, terminal] of [
    [1, "gate"],
    [2, "source"],
    [3, "drain"],
  ] as const) {
    const port = sourcePorts.find((p) => p.pin_number === pin)!
    expect(port.port_hints).toContain(terminal)
    const net = circuitJson
      .filter((e) => e.type === "source_net")
      .find((e) => e.name === terminal.toUpperCase())!
    expect(circuitJson).toContainEqual(
      expect.objectContaining({
        type: "source_trace",
        connected_source_port_ids: [port.source_port_id],
        connected_source_net_ids: [net.source_net_id],
      }),
    )
    const pad = pads.find((p) => p.port_hints?.includes(`pin${pin}`))!
    expect(
      pcbPorts.find((p) => p.pcb_port_id === pad.pcb_port_id)?.source_port_id,
    ).toBe(port.source_port_id)
  }
  const gate = schematicPorts.find((p) => p.pin_number === 1)!
  const source = schematicPorts.find((p) => p.pin_number === 2)!
  const drain = schematicPorts.find((p) => p.pin_number === 3)!
  expect(gate.center.x).toBeLessThan(source.center.x)
  expect(drain.center.y).toBeGreaterThan(source.center.y)
  expect(circuitJson.filter((e) => e.type.endsWith("error"))).toEqual([])
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C20917-mosfet-repro",
  )
})
