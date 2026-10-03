import { expect, test } from "bun:test"
import ts from "typescript"
import {
  generateTypescriptComponent,
  type GeneratedComponentType,
} from "lib/websafe/convert-to-typescript-component/generate-typescript-component"

const componentTypes: GeneratedComponentType[] = [
  "chip",
  "diode",
  "led",
  "pushbutton",
  "switch",
  "capacitor",
  "resistor",
  "inductor",
  "crystal",
  "connector",
]

const getGeneratedProps = (source: string, props = {}) => {
  const js = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS },
  }).outputText
  const module = { exports: {} as { ImportedPart: (props: object) => any } }
  new Function("React", "module", "exports", js)(
    { createElement: (_tag: string, props: any) => props },
    module,
    module.exports,
  )
  return module.exports.ImportedPart(props)
}

test("every EasyEDA component template populates matching MPN aliases and supports overrides", () => {
  for (const componentType of componentTypes) {
    const source = generateTypescriptComponent({
      pinLabels: { pin1: ["A"], pin2: ["B"] },
      componentName: "ImportedPart",
      circuitJson: [],
      supplierPartNumbers: { jlcpcb: ["C123"] },
      manufacturerPartNumber: ' RAW-"MPN"\\123 ',
      componentType,
      capacitance: "100nF",
      resistance: "10k",
      inductance: "10uH",
      crystalFrequency: "16MHz",
      crystalPinVariant: "two_pin",
    })
    expect(getGeneratedProps(source).mpn).toBe('RAW-"MPN"\\123')
    expect(getGeneratedProps(source).manufacturerPartNumber).toBe(
      'RAW-"MPN"\\123',
    )
    for (const alias of ["mpn", "mfn", "manufacturerPartNumber"]) {
      const props = getGeneratedProps(source, { [alias]: "OVERRIDE" })
      expect(props.mpn).toBe("OVERRIDE")
      expect(props.manufacturerPartNumber).toBe("OVERRIDE")
    }
  }
})

test("missing EasyEDA manufacturer metadata does not become a supplier MPN", () => {
  const source = generateTypescriptComponent({
    pinLabels: {},
    componentName: "ImportedPart",
    circuitJson: [],
    supplierPartNumbers: { jlcpcb: ["C123"] },
    manufacturerPartNumber: " ",
  })
  expect(getGeneratedProps(source).mpn).toBeUndefined()
  expect(getGeneratedProps(source).manufacturerPartNumber).toBeUndefined()
  expect(getGeneratedProps(source).supplierPartNumbers.jlcpcb).toEqual(["C123"])
})
