import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { categoryValueContainsPushbutton } from "./category-value-contains-pushbutton"

export const isPushbuttonCategoryComponent = (
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
  ].some(categoryValueContainsPushbutton)
}
