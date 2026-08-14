import { mil2mm } from "@tscircuit/mm"
import type { z } from "zod"
import type { SingleLetterShape } from "../schemas/single-letter-shape-schema"
import type { PadSchema } from "../schemas/package-detail-shape-schema"
import { normalizeSymbolName } from "./normalize-symbol-name"

type SymbolPin = Extract<SingleLetterShape, { type: "PIN" }>
type PackagePad = z.infer<typeof PadSchema>

export interface EasyEdaPinAssignment {
  packagePad: PackagePad
  symbolPin?: SymbolPin
}

export interface EasyEdaPinDataDiagnostic {
  code: "reconciled_exposed_pad" | "incomplete_pin_names"
  severity: "info" | "warning"
  message: string
  packagePadNumbers: Array<string | number>
}

export interface EasyEdaPinData {
  assignments: EasyEdaPinAssignment[]
  diagnostics: EasyEdaPinDataDiagnostic[]
}

const getNumericPinNumber = (value: string | number): number | undefined => {
  const numericValue = Number(value)
  return Number.isInteger(numericValue) && numericValue > 0
    ? numericValue
    : undefined
}

const isExposedPadLabel = (label: string): boolean =>
  /^(?:EP|EXPOSED_PAD|GND_EP)$/.test(normalizeSymbolName(label))

const getExposedPackagePad = (
  packagePads: PackagePad[],
): PackagePad | undefined => {
  const padsByDescendingArea = packagePads
    .map((packagePad) => ({
      packagePad,
      area: Math.abs(mil2mm(packagePad.width) * mil2mm(packagePad.height)),
    }))
    .toSorted((firstPad, secondPad) => secondPad.area - firstPad.area)

  const largestPad = padsByDescendingArea[0]
  const secondLargestPad = padsByDescendingArea[1]
  if (!largestPad || !secondLargestPad) return undefined

  return largestPad.area >= secondLargestPad.area * 4
    ? largestPad.packagePad
    : undefined
}

const hasUniqueNumericPinNumbers = (
  values: Array<string | number>,
): boolean => {
  const numericPinNumbers = values.map(getNumericPinNumber)
  return (
    numericPinNumbers.every((pinNumber) => pinNumber !== undefined) &&
    new Set(numericPinNumbers).size === numericPinNumbers.length
  )
}

const reconcileExposedPadAssignments = ({
  symbolPins,
  packagePads,
}: {
  symbolPins: SymbolPin[]
  packagePads: PackagePad[]
}): EasyEdaPinAssignment[] | undefined => {
  if (symbolPins.length !== packagePads.length) return undefined
  if (!hasUniqueNumericPinNumbers(symbolPins.map((pin) => pin.pinNumber))) {
    return undefined
  }
  if (!hasUniqueNumericPinNumbers(packagePads.map((pad) => pad.number))) {
    return undefined
  }

  const exposedSymbolPins = symbolPins.filter((pin) =>
    isExposedPadLabel(pin.label),
  )
  const exposedPackagePad = getExposedPackagePad(packagePads)
  if (exposedSymbolPins.length !== 1 || !exposedPackagePad) return undefined

  const exposedSymbolPin = exposedSymbolPins[0]
  if (String(exposedSymbolPin.pinNumber) === String(exposedPackagePad.number)) {
    return undefined
  }

  const remainingSymbolPins = symbolPins
    .filter((pin) => pin !== exposedSymbolPin)
    .toSorted(
      (firstPin, secondPin) =>
        getNumericPinNumber(firstPin.pinNumber)! -
        getNumericPinNumber(secondPin.pinNumber)!,
    )
  const remainingPackagePads = packagePads
    .filter((pad) => pad !== exposedPackagePad)
    .toSorted(
      (firstPad, secondPad) =>
        getNumericPinNumber(firstPad.number)! -
        getNumericPinNumber(secondPad.number)!,
    )
  const symbolPinByPackagePad = remainingPackagePads.map(
    (packagePad, index) => ({
      packagePad,
      symbolPin: remainingSymbolPins[index],
    }),
  )
  symbolPinByPackagePad.push({
    packagePad: exposedPackagePad,
    symbolPin: exposedSymbolPin,
  })

  return packagePads.map(
    (packagePad) =>
      symbolPinByPackagePad.find(
        (assignment) => assignment.packagePad === packagePad,
      )!,
  )
}

export const getEasyEdaPinData = ({
  symbolPins,
  packagePads,
}: {
  symbolPins: SymbolPin[]
  packagePads: PackagePad[]
}): EasyEdaPinData => {
  const reconciledAssignments = reconcileExposedPadAssignments({
    symbolPins,
    packagePads,
  })
  const assignments =
    reconciledAssignments ??
    packagePads.map((packagePad) => ({
      packagePad,
      symbolPin: symbolPins.find(
        (symbolPin) =>
          String(symbolPin.pinNumber) === String(packagePad.number),
      ),
    }))

  const diagnostics: EasyEdaPinDataDiagnostic[] = []
  if (reconciledAssignments) {
    const exposedPadAssignment = reconciledAssignments.find(
      ({ symbolPin }) => symbolPin && isExposedPadLabel(symbolPin.label),
    )!
    diagnostics.push({
      code: "reconciled_exposed_pad",
      severity: "info",
      message: `Moved the exposed-pad symbol label to physical pad ${exposedPadAssignment.packagePad.number} and realigned the remaining symbol pins.`,
      packagePadNumbers: [exposedPadAssignment.packagePad.number],
    })
  }

  const hasSemanticPinName = assignments.some(({ symbolPin }) => {
    if (!symbolPin?.label.trim()) return false
    return !/^\d+$/.test(normalizeSymbolName(symbolPin.label))
  })
  const incompletePadNumbers = assignments
    .filter(({ symbolPin }) => {
      if (!symbolPin?.label.trim()) return true
      return /^\d+$/.test(normalizeSymbolName(symbolPin.label))
    })
    .map(({ packagePad }) => packagePad.number)
  if (hasSemanticPinName && incompletePadNumbers.length > 0) {
    diagnostics.push({
      code: "incomplete_pin_names",
      severity: "warning",
      message: `EasyEDA has no semantic pin name for physical pad(s) ${incompletePadNumbers.join(", ")}; verify these aliases against the manufacturer pin table before use.`,
      packagePadNumbers: incompletePadNumbers,
    })
  }

  return { assignments, diagnostics }
}
