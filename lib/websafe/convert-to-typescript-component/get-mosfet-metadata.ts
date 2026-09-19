import type { MosfetProps } from "@tscircuit/props"
import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { hasNonBoxSchematicSymbol } from "./generate-symbol-tsx"

export type MosfetTerminal = "gate" | "source" | "drain"

export interface MosfetMetadata {
  pins: Record<string, MosfetTerminal>
  channelType?: MosfetProps["channelType"]
  mosfetMode?: MosfetProps["mosfetMode"]
}

export const getMosfetMetadata = (
  betterEasy: BetterEasyEdaJson,
): MosfetMetadata | undefined => {
  const parameters = betterEasy.dataStr.head.c_para
  const categories = [
    ...betterEasy.tags,
    betterEasy.category,
    parameters.category,
    parameters.Category,
    parameters["LCSC Category"],
    parameters["JLCPCB Category"],
  ]
  if (!categories.some((value) => /\bmosfets?\b/i.test(value ?? "")))
    return undefined
  if (hasNonBoxSchematicSymbol(betterEasy)) return undefined

  const pins: Record<string, MosfetTerminal> = {}
  for (const pin of betterEasy.dataStr.shape) {
    if (pin.type !== "PIN") continue
    if (pin.visibility !== "show") return undefined
    const label = pin.label.trim().toLowerCase()
    const terminal =
      label === "g" || label === "gate"
        ? "gate"
        : label === "s" || label === "source"
          ? "source"
          : label === "d" || label === "drain"
            ? "drain"
            : undefined
    if (!terminal || !/^\d+$/.test(String(pin.pinNumber))) return undefined
    const key = `pin${pin.pinNumber}`
    if (pins[key]) return undefined
    pins[key] = terminal
  }
  const terminals = Object.values(pins)
  if (
    terminals.filter((terminal) => terminal === "gate").length !== 1 ||
    !terminals.includes("source") ||
    !terminals.includes("drain")
  )
    return undefined

  const description = [
    ...categories,
    betterEasy.description,
    parameters["Channel Type"],
    parameters.Channel,
    parameters["MOSFET Mode"],
    parameters.Mode,
  ]
    .filter(Boolean)
    .join(" ")
  const channelTypes = (["n", "p"] as const).filter((channel) =>
    new RegExp(`\\b${channel}(?:[- ]channel|mos)\\b`, "i").test(description),
  )
  const modes = (["enhancement", "depletion"] as const).filter((mode) =>
    new RegExp(`\\b${mode}\\b`, "i").test(description),
  )

  return {
    pins,
    channelType: channelTypes.length === 1 ? channelTypes[0] : undefined,
    mosfetMode: modes.length === 1 ? modes[0] : undefined,
  }
}
