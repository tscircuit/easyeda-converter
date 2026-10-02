import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C501008.raweasy.json"

test("C501008 STL130N6F7 renders as a native MOSFET preserving all eight physical pins", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(mosfetRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<mosfet")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board routingDisabled>
        <STL130N6F7 name="Q_HA" channelType="n" mosfetMode="enhancement"
          connections={{ G: "net.GATE", S3: "net.SOURCE", D1: "net.DRAIN" }} />
      </board>
    )
  `)

  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(8)
  const sourcePorts = circuitJson.filter((e) => e.type === "source_port")
  const schematicPorts = circuitJson.filter((e) => e.type === "schematic_port")
  const pcbPorts = circuitJson.filter((e) => e.type === "pcb_port")
  const pads = circuitJson.filter((e) => e.type === "pcb_smtpad")
  const component = circuitJson
    .filter((e) => e.type === "source_component")
    .find((e) => e.name === "Q_HA")!
  expect(component).toMatchObject({
    ftype: "simple_mosfet",
    channel_type: "n",
    mosfet_mode: "enhancement",
  })
  expect(
    component.internally_connected_source_port_ids?.map((ids) =>
      ids
        .map(
          (id) => sourcePorts.find((p) => p.source_port_id === id)!.pin_number,
        )
        .sort(),
    ),
  ).toEqual([
    [1, 2, 3],
    [5, 6, 7, 8],
  ])
  expect(pads).toHaveLength(9)
  const centers = {
    gate: schematicPorts.find((p) => p.pin_number === 4)!.center,
    source: schematicPorts.find((p) => p.pin_number === 1)!.center,
    drain: schematicPorts.find((p) => p.pin_number === 5)!.center,
  }
  expect(centers.gate.x).toBeLessThan(centers.source.x)
  expect(centers.drain.y).toBeGreaterThan(centers.source.y)
  for (const port of sourcePorts) {
    const terminal =
      port.pin_number === 4
        ? "gate"
        : port.pin_number! <= 3
          ? "source"
          : "drain"
    expect(port.port_hints).toContain(terminal)
    expect(
      schematicPorts.find((p) => p.source_port_id === port.source_port_id)
        ?.center,
    ).toEqual(centers[terminal])
  }
  for (const pad of pads) {
    const pin = Number(
      pad.port_hints?.find((hint) => /^pin\d+$/.test(hint))?.slice(3),
    )
    const pcbPort = pcbPorts.find((p) => p.pcb_port_id === pad.pcb_port_id)!
    expect(
      sourcePorts.find((p) => p.source_port_id === pcbPort.source_port_id)
        ?.pin_number,
    ).toBe(pin)
  }
  for (const [pin, terminal] of [
    [4, "GATE"],
    [3, "SOURCE"],
    [8, "DRAIN"],
  ] as const) {
    const port = sourcePorts.find((p) => p.pin_number === pin)!
    const net = circuitJson
      .filter((e) => e.type === "source_net")
      .find((e) => e.name === terminal)!
    expect(circuitJson).toContainEqual(
      expect.objectContaining({
        type: "source_trace",
        connected_source_port_ids: [port.source_port_id],
        connected_source_net_ids: [net.source_net_id],
      }),
    )
  }
  expect(circuitJson.filter((e) => e.type.endsWith("error"))).toEqual([])
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C501008-mosfet-symbol-repro",
  )
})
