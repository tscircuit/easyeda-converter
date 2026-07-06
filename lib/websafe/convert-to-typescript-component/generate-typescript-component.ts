import type { ChipProps, SupplierPartNumbers } from "@tscircuit/props"
import type { AnyCircuitElement } from "circuit-json"
import { generateFootprintTsx } from "../generate-footprint-tsx"

export type GeneratedComponentType =
  | "chip"
  | "diode"
  | "led"
  | "pushbutton"
  | "switch"

interface Params {
  pinLabels: ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  stepUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: SupplierPartNumbers
  manufacturerPartNumber: string
  componentType?: GeneratedComponentType
}

const getPinLabelValues = (labels: string | readonly string[]): string[] => {
  if (typeof labels === "string") return [labels]
  return [...labels]
}

const stripEasyEdaPolarityHintDecoration = (label: string): string =>
  label.toLowerCase().replace(/[^a-z0-9+-]/g, "")

const getPinKeySortValue = (pinKey: string): number => {
  const match = /^pin(\d+)$/i.exec(pinKey)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

const getPolarizedPinMetadata = (
  pinLabels: ChipProps["pinLabels"],
):
  | {
      portHintsMap: Record<string, string[]>
      pinLabels: Record<string, string[]>
    }
  | undefined => {
  const labelsByPin = Object.entries(pinLabels ?? {}).map(([pin, labels]) => ({
    pin,
    labels: getPinLabelValues(labels).map(stripEasyEdaPolarityHintDecoration),
  }))

  const anodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["a", "anode", "pos", "+"].includes(label)),
  )?.pin
  const cathodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["c", "k", "cathode", "neg", "-"].includes(label)),
  )?.pin

  if (!anodePin || !cathodePin) return undefined

  const polarizedPinEntries = (
    [
      [anodePin, ["anode", "pos"]],
      [cathodePin, ["cathode", "neg"]],
    ] satisfies Array<[string, string[]]>
  ).sort(
    ([pinA], [pinB]) => getPinKeySortValue(pinA) - getPinKeySortValue(pinB),
  )

  return {
    portHintsMap: Object.fromEntries(
      polarizedPinEntries.map(([pin, labels]) => [pin, [pin, ...labels]]),
    ),
    pinLabels: Object.fromEntries(polarizedPinEntries),
  }
}

export const generateTypescriptComponent = ({
  pinLabels,
  componentName,
  objUrl,
  stepUrl,
  circuitJson,
  supplierPartNumbers,
  manufacturerPartNumber,
  componentType = "chip",
}: Params) => {
  // Ensure pinLabels is defined
  const safePinLabels = pinLabels ?? {}
  const polarizedPinMetadata = getPolarizedPinMetadata(safePinLabels)
  const polarizedPortHintsMap = polarizedPinMetadata?.portHintsMap
  const polarizedPinLabels = polarizedPinMetadata?.pinLabels
  const cadComponent = circuitJson.find((item) => item.type === "cad_component")
  const footprintTsx = generateFootprintTsx(
    circuitJson,
    componentType === "diode" || componentType === "led"
      ? { portHintsMap: polarizedPortHintsMap }
      : undefined,
  )

  // Simplify pin labels to include only the second element
  const simplifiedPinLabels = Object.fromEntries(
    Object.entries(safePinLabels).map(([pin, labels]) => {
      // Ensure labels is an array and has a second element
      if (Array.isArray(labels) && labels.length > 1) {
        return [pin, [labels[1]]]
      }
      return [pin, labels] // Fallback to original if not an array or missing second element
    }),
  )

  const pinLabelsString = Object.entries(simplifiedPinLabels)
    .map(([pin, labels]) => `  ${pin}: ${JSON.stringify(labels)}`)
    .join(",\n")
  const polarizedPinLabelsString = Object.entries(polarizedPinLabels ?? {})
    .map(([pin, labels]) => `  ${pin}: ${JSON.stringify(labels)}`)
    .join(",\n")
  const polarizedPinLabelsBlock = polarizedPinLabels
    ? `const pinLabels = {
${polarizedPinLabelsString}
} as const

`
    : ""
  const polarizedPinLabelsProp = polarizedPinLabels
    ? `      pinLabels={pinLabels}
`
    : ""

  const cadModelLines = [
    objUrl ? `objUrl: "${objUrl}",` : "",
    stepUrl ? `stepUrl: "${stepUrl}",` : "",
    `pcbRotationOffset: ${cadComponent?.rotation?.z ?? 0},`,
    `modelOriginPosition: { x: ${cadComponent?.model_origin_position?.x ?? 0}, y: ${cadComponent?.model_origin_position?.y ?? 0}, z: ${cadComponent?.model_origin_position?.z ?? 0} },`,
  ]
    .filter(Boolean)
    .map((line) => `        ${line}`)
    .join("\n")

  if (componentType === "diode") {
    return `
import type { DiodeProps } from "@tscircuit/props"

${polarizedPinLabelsBlock}\
export const ${componentName} = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props

  return (
    <diode
      name={name}
${polarizedPinLabelsProp}\
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...restProps}
    />
  )
}
`.trim()
  }

  if (componentType === "led") {
    return `
import type { LedProps } from "@tscircuit/props"

${polarizedPinLabelsBlock}\
export const ${componentName} = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
${polarizedPinLabelsProp}\
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...restProps}
    />
  )
}
`.trim()
  }

  if (componentType === "pushbutton") {
    return `
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...restProps}
    />
  )
}
`.trim()
  }

  if (componentType === "switch") {
    return `
import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: SwitchProps) => {
  const { name = "SW1", ...restProps } = props

  return (
    <switch
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...restProps}
    />
  )
}
`.trim()
  }

  return `
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={${JSON.stringify(supplierPartNumbers, null, "  ")}}
      manufacturerPartNumber="${manufacturerPartNumber}"
      footprint={${footprintTsx}}
      ${
        objUrl || stepUrl
          ? `cadModel={{
${cadModelLines}
      }}`
          : ""
      }
      {...props}
    />
  )
}
`.trim()
}
