import { type SchSymbol, symbols } from "schematic-symbols"
import type { MosfetMetadata } from "./get-mosfet-metadata"

const textAnchors = {
  center: "center",
  middle_left: "center_left",
  middle_right: "center_right",
  middle_top: "top_center",
  middle_bottom: "bottom_center",
  top_left: "top_left",
  top_right: "top_right",
  bottom_left: "bottom_left",
  bottom_right: "bottom_right",
} as const

const generateMappedSymbol = (
  symbol: SchSymbol | undefined,
  pins: MosfetMetadata["pins"],
  manufacturerPartNumber: string,
) => {
  if (!symbol) throw new Error("Missing built-in MOSFET schematic symbol")
  const shapes = symbol.primitives.map((primitive) => {
    if (primitive.type === "path") {
      return `<schematicpath points={${JSON.stringify(primitive.points)}} isFilled={${Boolean(primitive.fill)}} strokeWidth={${primitive.strokeWidth ?? 0.02}} />`
    }
    if (primitive.type === "circle") {
      return `<schematiccircle center={{x: ${primitive.x}, y: ${primitive.y}}} radius={${primitive.radius}} isFilled={${primitive.fill}} strokeWidth={0.02} />`
    }
    if (primitive.type === "text") {
      const text =
        primitive.text === "{REF}"
          ? "{name}"
          : JSON.stringify(
              primitive.text === "{VAL}"
                ? manufacturerPartNumber
                : primitive.text,
            )
      return `<schematictext schX={${primitive.x}} schY={${primitive.y}} text=${text} fontSize={${primitive.fontSize ?? 0.18}} anchor=${JSON.stringify(textAnchors[primitive.anchor])} />`
    }
    throw new Error(`Unsupported MOSFET symbol primitive: ${primitive.type}`)
  })
  const ports = Object.entries(pins).map(([pin, terminal]) => {
    const port = symbol.ports.find((port) => port.labels.includes(terminal))
    if (!port) throw new Error(`MOSFET symbol is missing its ${terminal} port`)
    const direction =
      terminal === "gate" ? "left" : terminal === "source" ? "down" : "up"
    return `<port name=${JSON.stringify(pin)} pinNumber={${Number(pin.slice(3))}} schX={${port.x}} schY={${port.y}} direction=${JSON.stringify(direction)} schStemLength={0} />`
  })
  return `<symbol>\n${[...shapes, ...ports].join("\n")}\n</symbol>`
}

export const generateMosfetSymbolTsx = (
  pins: MosfetMetadata["pins"],
  manufacturerPartNumber: string,
) => {
  const channels = (["n", "p"] as const).map((channel) => {
    const modes = (["enhancement", "depletion"] as const).map((mode) => {
      const symbolName =
        `${channel}_channel_${mode === "enhancement" ? "e" : "d"}_mosfet_transistor_horz` as const
      return `${mode}: (${generateMappedSymbol(symbols[symbolName], pins, manufacturerPartNumber)})`
    })
    return `${channel}: {\n${modes.join(",\n")}\n}`
  })
  return `{\n${channels.join(",\n")}\n}[channelType][mosfetMode]`
}
