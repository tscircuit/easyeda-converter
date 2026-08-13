import type { ChipProps, SupplierPartNumbers } from "@tscircuit/props"
import type { AnyCircuitElement } from "circuit-json"
import { getPolarizedPinMetadata } from "../../utils/get-polarized-pin-metadata"
import { generateFootprintTsx } from "../generate-footprint-tsx"

export type GeneratedComponentType =
  | "chip"
  | "diode"
  | "led"
  | "pushbutton"
  | "switch"
  | "resistor"
  | "inductor"
  | "crystal"
  | "connector"

interface Params {
  pinLabels: ChipProps["pinLabels"]
  componentName: string
  objUrl?: string
  stepUrl?: string
  circuitJson: AnyCircuitElement[]
  supplierPartNumbers: SupplierPartNumbers
  manufacturerPartNumber: string
  componentType?: GeneratedComponentType
  resistance?: string
  inductance?: string
  crystalFrequency?: string
  crystalPinVariant?: "two_pin" | "four_pin"
  symbolTsx?: string
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
  resistance,
  inductance,
  crystalFrequency,
  crystalPinVariant,
  symbolTsx,
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
  const symbolProp = symbolTsx
    ? `      symbol={
${symbolTsx
  .split("\n")
  .map((line) => `        ${line}`)
  .join("\n")}
      }
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
${symbolProp}\
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
${symbolProp}\
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
${symbolProp}\
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
${symbolProp}\
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

  if (componentType === "resistor") {
    if (!resistance) {
      throw new Error("Resistance is required for resistor components")
    }

    return `
import type { ResistorProps } from "@tscircuit/props"

export const ${componentName} = (props: Omit<ResistorProps, "resistance">) => {
  const { name = "R1", ...restProps } = props

  return (
    <resistor
      name={name}
      resistance=${JSON.stringify(resistance)}
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

  if (componentType === "inductor") {
    if (!inductance) {
      throw new Error("Inductance is required for inductor components")
    }

    return `
import type { InductorProps } from "@tscircuit/props"

export const ${componentName} = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance=${JSON.stringify(inductance)}
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

  if (componentType === "crystal") {
    if (!crystalFrequency || !crystalPinVariant) {
      throw new Error("Crystal frequency and pin variant are required")
    }

    return `
import type { CrystalProps } from "@tscircuit/props"

type ImportedCrystalProps = Omit<CrystalProps, "frequency" | "pinVariant">

export const ${componentName} = (props: ImportedCrystalProps) => {
  const { name = "X1", ...restProps } = props

  return (
    <crystal
      name={name}
      frequency=${JSON.stringify(crystalFrequency)}
      pinVariant=${JSON.stringify(crystalPinVariant)}
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

  if (componentType === "connector") {
    return `
import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: ConnectorProps) => {
  return (
    <connector
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

  return `
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
${pinLabelsString}
} as const

export const ${componentName} = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
${symbolProp}\
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
