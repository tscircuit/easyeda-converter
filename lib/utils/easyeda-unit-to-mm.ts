/**
 * EasyEDA takes 10 mil as a basic factor, when a stroke width is 1, we can take it as 1*10mil = 10mil, is 2, we can take it as 2*10mil = 20mil,
 * Ref: https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/#unit
 *
 * 1 mil = 0.001 inch
 * 1 inch = 25.4 mm
 * 1 mil = 25.4/1000 = 0.0254 mm
 */
export const mil10ToMm = (value: number): number => value * 10 * 0.0254

export const easyedaUnitToMm = (value: string | number): number => {
  if (typeof value === "number") return value

  const lowerValue = value.toLowerCase().trim()

  if (lowerValue.endsWith("mm")) {
    return parseFloat(lowerValue)
  }

  if (lowerValue.endsWith("mil")) {
    return parseFloat(lowerValue) * 0.0254
  }

  const parsed = parseFloat(value)
  if (!isNaN(parsed)) {
    return parsed
  }

  console.warn(
    `[easyeda-converter] Could not parse unit: "${value}", defaulting to 0`,
  )
  return 0
}
