import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { categoryValueContainsLed } from "./category-value-contains-led"

export const isLedCategoryComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const cPara = betterEasy.dataStr.head.c_para
  return [
    betterEasy.tags,
    cPara.category,
    cPara.Category,
    cPara["LCSC Category"],
    cPara["JLCPCB Category"],
    betterEasy.category,
  ].some(categoryValueContainsLed)
}
