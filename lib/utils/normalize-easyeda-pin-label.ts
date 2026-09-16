import { normalizeActiveLowPinLabel } from "./normalize-pin-labels"

export const normalizeEasyEdaPinLabel = (label: string): string => {
  if (label.endsWith("+")) label = `${label.slice(0, -1)}_POS`
  if (label.endsWith("-")) label = `${label.slice(0, -1)}_NEG`
  label = normalizeActiveLowPinLabel(label)
  if (/^\+\d+(?:\.\d+)?V$/i.test(label)) label = `V${label.slice(1, -1)}`
  if (label.startsWith("+")) label = `${label.slice(1)}_POS`
  if (label.startsWith("-")) label = `${label.slice(1)}_NEG`
  return label
}
