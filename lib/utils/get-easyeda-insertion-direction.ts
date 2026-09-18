import type { PcbComponent } from "circuit-json"
import type { BetterEasyEdaJson } from "../schemas/easy-eda-json-schema"

/** Direction in the unrotated, top-layer footprint frame (+Z is above the PCB). */
export const getEasyEdaInsertionDirection = (
  easyEdaJson: BetterEasyEdaJson,
): PcbComponent["insertion_direction"] => {
  const packageName = easyEdaJson.dataStr.head.c_para.package?.toUpperCase()

  // EasyEDA's HDR-TH_<pins>-P<pitch>-V-<gender> names vertical headers.
  // Through-hole mounting alone does not imply vertical cable insertion.
  if (packageName && /^HDR-TH_\d+P-P[\d.]+-V-[MF](?:-|$)/.test(packageName)) {
    return "from_above"
  }

  return undefined
}
