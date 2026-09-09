import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { type SchSymbol, symbols } from "schematic-symbols"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C501008.raweasy.json"

test("C501008 renders a MOSFET with connections through secondary source and drain pins", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(mosfetRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board routingDisabled>
        <STL130N6F7 name="Q_HA" channelType="n" mosfetMode="enhancement" schWidth={1.6} schHeight={2}
          connections={{G: "net.GATE", S3: "net.SOURCE", D1: "net.DRAIN"}} />
      </board>
    )
  `)

  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(8)
  expect(
    circuitJson.filter((element) => element.type === "schematic_trace"),
  ).toHaveLength(3)
  expect(
    circuitJson.filter((element) => element.type.endsWith("error")),
  ).toEqual([])
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C501008-mosfet-symbol-repro",
  )
}, 50_000)

test("C501008 preserves every physical pad, pin alias, and terminal net", async () => {
  const result = await convertBetterEasyToTsx({
    betterEasy: EasyEdaJsonSchema.parse(mosfetRawEasy),
  })
  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board routingDisabled>
        <STL130N6F7 name="Q_HA" channelType="n" mosfetMode="enhancement"
          connections={{S1: "net.SOURCE", pin2: "net.SOURCE", S3: "net.SOURCE",
            pin4: "net.GATE", D2: "net.DRAIN", pin6: "net.DRAIN",
            D4: "net.DRAIN", pin8: "net.DRAIN"}} />
      </board>
    )
  `)
  const sourcePorts = circuitJson.filter((e) => e.type === "source_port")
  const sourceTraces = circuitJson.filter((e) => e.type === "source_trace")
  const nets = circuitJson.filter((e) => e.type === "source_net")
  const pcbPorts = circuitJson.filter((e) => e.type === "pcb_port")
  const pads = circuitJson.filter((e) => e.type === "pcb_smtpad")
  const schematicPorts = circuitJson.filter((e) => e.type === "schematic_port")
  const terminalCenters = {
    gate: schematicPorts.find((port) => port.pin_number === 4)!.center,
    source: schematicPorts.find((port) => port.pin_number === 1)!.center,
    drain: schematicPorts.find((port) => port.pin_number === 5)!.center,
  }
  expect(terminalCenters.gate.x).toBeLessThan(terminalCenters.source.x)
  expect(terminalCenters.drain.y).toBeGreaterThan(terminalCenters.source.y)

  expect(sourcePorts).toHaveLength(8)
  expect(pads).toHaveLength(9)
  expect(pads.filter((pad) => pad.port_hints?.includes("pin8"))).toHaveLength(2)
  for (const pad of pads) {
    const pin = Number(pad.port_hints?.[0]?.replace("pin", ""))
    const pcbPort = pcbPorts.find(
      (port) => port.pcb_port_id === pad.pcb_port_id,
    )!
    const sourcePort = sourcePorts.find(
      (port) => port.source_port_id === pcbPort.source_port_id,
    )!
    expect(sourcePort.pin_number).toBe(pin)
    const trace = sourceTraces.find((trace) =>
      trace.connected_source_port_ids.includes(sourcePort.source_port_id),
    )!
    const terminal = pin === 4 ? "gate" : pin <= 3 ? "source" : "drain"
    expect(trace.connected_source_net_ids).toEqual([
      nets.find((net) => net.name === terminal.toUpperCase())!.source_net_id,
    ])
    const schematicPort = schematicPorts.find(
      (port) => port.source_port_id === sourcePort.source_port_id,
    )!
    expect(schematicPort.center).toEqual(terminalCenters[terminal])
  }
  const component = circuitJson
    .filter((e) => e.type === "source_component")
    .find((e) => e.name === "Q_HA")!
  expect(
    component.internally_connected_source_port_ids?.map((ids) =>
      ids.map(
        (id) =>
          sourcePorts.find((port) => port.source_port_id === id)!.pin_number,
      ),
    ),
  ).toEqual([
    [1, 2, 3],
    [5, 6, 7, 8],
  ])
  expect(
    circuitJson.filter((element) => element.type.endsWith("error")),
  ).toEqual([])
}, 50_000)

test("C501008 requires explicit MOSFET properties when the source omits them", async () => {
  const result = await convertBetterEasyToTsx({
    betterEasy: EasyEdaJsonSchema.parse(mosfetRawEasy),
  })
  await expect(
    runTscircuitCode(`
    ${result}
    export default () => <board><STL130N6F7 name="Q1" /></board>
  `),
  ).rejects.toThrow("MOSFET imports require channelType and mosfetMode")
})

const getSymbolPaths = (symbol: SchSymbol | undefined) => {
  if (!symbol) throw new Error("Missing built-in MOSFET symbol")
  return symbol.primitives
    .filter((primitive) => primitive.type === "path")
    .map((primitive) => ({
      points: primitive.points,
      is_filled: Boolean(primitive.fill),
    }))
}

test.each([
  ["n", "enhancement", "n_channel_e_mosfet_transistor_horz"],
  ["n", "depletion", "n_channel_d_mosfet_transistor_horz"],
  ["p", "enhancement", "p_channel_e_mosfet_transistor_horz"],
  ["p", "depletion", "p_channel_d_mosfet_transistor_horz"],
] as const)(
  "uses explicit source metadata for the %s-channel %s symbol",
  async (channelType, mosfetMode, symbolName) => {
    const betterEasy = EasyEdaJsonSchema.parse(mosfetRawEasy)
    betterEasy.description = `${channelType}-channel ${mosfetMode} MOSFET`
    const result = await convertBetterEasyToTsx({ betterEasy })
    const circuitJson = await runTscircuitCode(`
      ${result}
      export default () => <board routingDisabled><STL130N6F7 name="Q1" /></board>
    `)
    expect(
      circuitJson
        .filter((element) => element.type === "schematic_path")
        .map(({ points, is_filled }) => ({ points, is_filled })),
    ).toEqual(getSymbolPaths(symbols[symbolName]))
    expect(
      circuitJson.filter((element) => element.type.endsWith("error")),
    ).toEqual([])
  },
)
