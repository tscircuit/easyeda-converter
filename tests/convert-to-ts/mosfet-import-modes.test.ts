import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { type SchSymbol, symbols } from "schematic-symbols"
import { runTscircuitCode } from "tscircuit"
import mosfetRawEasy from "../assets/C20917.raweasy.json"

const getSymbolPaths = (symbol: SchSymbol | undefined) => {
  if (!symbol) throw new Error("Missing built-in MOSFET symbol")
  return symbol.primitives
    .filter((p) => p.type === "path")
    .map((p) => ({ points: p.points, is_filled: Boolean(p.fill) }))
}

test.each([
  ["n", "enhancement", "n_channel_e_mosfet_transistor_horz"],
  ["n", "depletion", "n_channel_d_mosfet_transistor_horz"],
  ["p", "enhancement", "p_channel_e_mosfet_transistor_horz"],
  ["p", "depletion", "p_channel_d_mosfet_transistor_horz"],
] as const)(
  "renders the supplied %s-channel %s mode with built-in artwork",
  async (channel, mode, symbolName) => {
    const result = await convertBetterEasyToTsx({
      betterEasy: EasyEdaJsonSchema.parse(mosfetRawEasy),
    })
    const circuitJson = await runTscircuitCode(`${result}
    export default () => <board routingDisabled><AO3400A name="Q1" channelType="${channel}" mosfetMode="${mode}" /></board>
  `)
    expect(circuitJson).toContainEqual(
      expect.objectContaining({
        type: "source_component",
        ftype: "simple_mosfet",
        channel_type: channel,
        mosfet_mode: mode,
      }),
    )
    expect(
      circuitJson
        .filter((e) => e.type === "schematic_path")
        .map((p) => ({ points: p.points, is_filled: p.is_filled })),
    ).toEqual(getSymbolPaths(symbols[symbolName]))
  },
)
