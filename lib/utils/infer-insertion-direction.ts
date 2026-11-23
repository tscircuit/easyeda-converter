import type { InsertionDirection } from "circuit-json"
import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

const HEADER_PACKAGE_PATTERN = /^HDR(?:[-_]|$)/i
const HEADER_CATEGORY_PATTERN =
  /\b(?:pin|female|male|box|shrouded|idc)\s+headers?\b/i
const VERTICAL_PACKAGE_TOKEN_PATTERN = /(?:^|[-_])V(?:[-_]|$)/i
const VERTICAL_TEXT_PATTERN =
  /\b(?:vertical|straight(?:-?line)?|top[\s-]?entry|180\s*(?:deg|°|degree))\b/i
const HORIZONTAL_PACKAGE_TOKEN_PATTERN =
  /(?:^|[-_])(?:H|R|RA|90D?|BENT)(?:[-_]|$)/i
const HORIZONTAL_TEXT_PATTERN =
  /\b(?:right[\s-]?angle|horizontal|bent|angled|side[\s-]?entry|90\s*(?:deg|°|degree))\b/i

/**
 * Infer a canonical board-space `InsertionDirection` in the unrotated
 * footprint frame from EasyEDA/LCSC component metadata.
 *
 * Currently infers `"from_above"` (+Z) for vertical/straight headers whose
 * metadata unambiguously indicates top-entry mating without right-angle or
 * horizontal indicators.
 */
export const inferEasyEdaInsertionDirection = (
  easyEdaJson: BetterEasyEdaJson,
): InsertionDirection | undefined => {
  const cPara = easyEdaJson.dataStr.head.c_para
  const packageNames = [
    cPara.package,
    easyEdaJson.packageDetail.title,
    easyEdaJson.packageDetail.dataStr.head.c_para.package,
  ].filter((value): value is string => Boolean(value?.trim()))

  const categoryValues = [
    ...easyEdaJson.tags,
    easyEdaJson.category,
    cPara.category,
    cPara.Category,
    cPara["LCSC Category"],
    cPara["JLCPCB Category"],
  ].filter((value): value is string => Boolean(value?.trim()))

  const descriptiveTexts = [
    easyEdaJson.title,
    easyEdaJson.description,
    easyEdaJson.lcsc.url,
    easyEdaJson.szlcsc.url,
    ...categoryValues,
  ].filter((value): value is string => Boolean(value?.trim()))

  const isHeader =
    packageNames.some((pkg) => HEADER_PACKAGE_PATTERN.test(pkg.trim())) ||
    categoryValues.some((cat) => HEADER_CATEGORY_PATTERN.test(cat))

  if (!isHeader) return undefined

  const isHorizontalOrRightAngle =
    packageNames.some(
      (pkg) =>
        HEADER_PACKAGE_PATTERN.test(pkg.trim()) &&
        HORIZONTAL_PACKAGE_TOKEN_PATTERN.test(pkg.trim()),
    ) ||
    descriptiveTexts.some((text) => HORIZONTAL_TEXT_PATTERN.test(text)) ||
    packageNames.some((pkg) => HORIZONTAL_TEXT_PATTERN.test(pkg))

  if (isHorizontalOrRightAngle) return undefined

  const isVertical =
    packageNames.some(
      (pkg) =>
        HEADER_PACKAGE_PATTERN.test(pkg.trim()) &&
        VERTICAL_PACKAGE_TOKEN_PATTERN.test(pkg.trim()),
    ) ||
    descriptiveTexts.some((text) => VERTICAL_TEXT_PATTERN.test(text)) ||
    packageNames.some((pkg) => VERTICAL_TEXT_PATTERN.test(pkg))

  return isVertical ? "from_above" : undefined
}
