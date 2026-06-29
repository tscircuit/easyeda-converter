import type { ChipProps, SupplierPartNumbers } from "@tscircuit/props"
import type { AnyCircuitElement } from "circuit-json"
import { generateFootprintTsx } from "../generate-footprint-tsx"

export type GeneratedComponentType = "chip" | "diode" | "led"

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

const getPolarizedPortHintsMap = (
  pinLabels: ChipProps["pinLabels"],
): Record<string, string[]> | undefined => {
  const labelsByPin = Object.entries(pinLabels ?? {}).map(([pin, labels]) => ({
    pin,
    labels: getPinLabelValues(labels).map((label) => label.toLowerCase()),
  }))

  const anodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["a", "anode", "pos", "+"].includes(label)),
  )?.pin
  const cathodePin = labelsByPin.find(({ labels }) =>
    labels.some((label) => ["c", "k", "cathode", "neg", "-"].includes(label)),
  )?.pin

  if (!anodePin || !cathodePin) return undefined

  return {
    [anodePin]: ["pin1", "anode"],
    [cathodePin]: ["pin2", "cathode"],
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
  const cadComponent = circuitJson.find((item) => item.type === "cad_component")
  const footprintTsx = generateFootprintTsx(
    circuitJson,
    componentType === "diode" || componentType === "led"
      ? { portHintsMap: getPolarizedPortHintsMap(safePinLabels) }
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

export const ${componentName} = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props

  return (
    <diode
      name={name}
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

export const ${componentName} = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
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
