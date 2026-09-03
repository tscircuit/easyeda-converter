import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { categoryValueContainsSwitch } from "./category-value-contains-switch"

export const isSwitchCategoryComponent = (
  betterEasy: BetterEasyEdaJson,
  pinCount: number,
): boolean => {
  // The native switch component defaults to a two-terminal SPST symbol.
  if (pinCount !== 2) return false

  const cPara = betterEasy.dataStr.head.c_para
  return [
    betterEasy.tags,
    cPara.category,
    cPara.Category,
    cPara["LCSC Category"],
    cPara["JLCPCB Category"],
    betterEasy.category,
  ].some(categoryValueContainsSwitch)
}
