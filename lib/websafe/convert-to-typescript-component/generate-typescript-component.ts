import type { ChipProps, SupplierPartNumbers } from "@tscircuit/props"
import type { AnyCircuitElement } from "circuit-json"
import { getPolarizedPinMetadata } from "../../utils/get-polarized-pin-metadata"
import { generateFootprintTsx } from "../generate-footprint-tsx"
import { inferPinAttributes } from "./infer-pin-attributes"

export type GeneratedComponentType =
  | "chip"
  | "diode"
  | "led"
  | "pushbutton"
  | "switch"
  | "capacitor"
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
  capacitance?: string
  resistance?: string
  inductance?: string
  crystalFrequency?: string
  crystalPinVariant?: "two_pin" | "four_pin"
  symbolTsx?: string
  schPinArrangement?: ChipProps["schPinArrangement"]
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
  capacitance,
  resistance,
  inductance,
  crystalFrequency,
  crystalPinVariant,
  symbolTsx,
  schPinArrangement,
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

  // The first label is the internal canonical pin name. Exclude it from the
  // public aliases while preserving every EasyEDA label that follows it.
  const simplifiedPinLabels = Object.fromEntries(
    Object.entries(safePinLabels).map(([pin, labels]) => {
      if (Array.isArray(labels) && labels.length > 1 && labels[0] === pin) {
        return [pin, labels.slice(1)]
      }
      return [pin, labels]
    }),
  )

  const pinLabelsString = Object.entries(simplifiedPinLabels)
    .map(([pin, labels]) => `  ${pin}: ${JSON.stringify(labels)}`)
    .join(",\n")
  const inferredPinAttributes =
    componentType === "chip" ? inferPinAttributes(simplifiedPinLabels) : {}
  const pinAttributesString = Object.entries(inferredPinAttributes)
    .map(([pin, attributes]) => {
      const attributesString = Object.entries(attributes)
        .map(
          ([attributeName, value]) =>
            `${attributeName}: ${JSON.stringify(value)}`,
        )
        .join(", ")

      return `  ${pin}: {${attributesString}}`
    })
    .join(",\n")
  const pinAttributesBlock = pinAttributesString
    ? `const pinAttributes = {
${pinAttributesString}
} as const

`
    : ""
  const pinAttributesProp = pinAttributesString
    ? `      pinAttributes={pinAttributes}
`
    : ""
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
  const schPinArrangementProp = schPinArrangement
    ? `      schPinArrangement={${JSON.stringify(schPinArrangement)}}
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

  if (componentType === "capacitor") {
    if (!capacitance) {
      throw new Error("Capacitance is required for capacitor components")
    }

    return `
import type { CapacitorProps } from "@tscircuit/props"

export const ${componentName} = (props: Omit<CapacitorProps, "capacitance">) => {
  const { name = "C1", ...restProps } = props

  return (
    <capacitor
      name={name}
      capacitance=${JSON.stringify(capacitance)}
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

${pinAttributesBlock}\
export const ${componentName} = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
${pinAttributesProp}\
${symbolProp}\
${schPinArrangementProp}\
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
