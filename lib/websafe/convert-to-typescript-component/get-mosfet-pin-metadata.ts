import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

export type MosfetTerminal = "gate" | "source" | "drain"

export const getMosfetPinMetadata = (
  betterEasy: BetterEasyEdaJson,
): Record<string, MosfetTerminal> | undefined => {
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

  const pins = betterEasy.dataStr.shape.filter((shape) => shape.type === "PIN")
  if (pins.length < 3) return undefined

  const terminals: Record<string, MosfetTerminal> = {}
  for (const pin of pins) {
    if (pin.visibility !== "show" || !/^[1-9]\d*$/.test(String(pin.pinNumber)))
      return undefined
    const label = pin.label.trim().toLowerCase()
    const terminal =
      label === "g" || label === "gate"
        ? "gate"
        : label === "s" || label === "source"
          ? "source"
          : label === "d" || label === "drain"
            ? "drain"
            : undefined
    if (!terminal || terminals[`pin${pin.pinNumber}`]) return undefined
    terminals[`pin${pin.pinNumber}`] = terminal
  }

  const roles = Object.values(terminals)
  return roles.filter((role) => role === "gate").length === 1 &&
    roles.includes("source") &&
    roles.includes("drain")
    ? terminals
    : undefined
}
