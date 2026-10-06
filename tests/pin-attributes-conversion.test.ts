import { expect, spyOn, test } from "bun:test"
import path from "node:path"
import {
  type CommonComponentProps,
  commonComponentProps,
} from "@tscircuit/props"
import { source_pin_attributes } from "circuit-json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  convertBetterEasyToTsx,
  convertRawEasyToTsx,
} from "lib/websafe/convert-to-typescript-component"
import ts from "typescript"
import customSymbolRaw from "./assets/C8545.raweasy.json"
import resistorRaw from "./assets/C5127775.raweasy.json"
import driverDatasheet from "./assets/drv8818-pwpr.pin-attributes.json"
import driverRaw from "./assets/drv8818-pwpr.raweasy.json"

type PinAttributes = NonNullable<CommonComponentProps["pinAttributes"]>
const driverAttributes = driverDatasheet.pin_attributes satisfies PinAttributes
const parseDriver = () => EasyEdaJsonSchema.parse(structuredClone(driverRaw))
const portsOf = (circuit: ReturnType<typeof convertEasyEdaJsonToCircuitJson>) =>
  circuit.filter((element) => element.type === "source_port")

// Only evaluate TSX produced by this converter from the checked-in fixtures.
const evaluateChip = (source: string) => {
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.CommonJS,
    },
  }).outputText
  const module = { exports: {} as Record<string, unknown> }
  const React = {
    createElement: (type: string, props: any, ...children: any[]) => ({
      type,
      props,
      children,
    }),
  }
  new Function("React", "module", "exports", compiled)(
    React,
    module,
    module.exports,
  )
  const components = Object.values(module.exports).filter(
    (value) => typeof value === "function",
  )
  expect(components).toHaveLength(1)
  const component = components[0] as (props: Record<string, unknown>) => {
    type: string
    props: Record<string, any>
    children: unknown[]
  }
  return component({ name: "U_VERIFY" })
}

const withOfflineCad = async <T>(run: () => Promise<T>) => {
  const fetchMock = spyOn(globalThis, "fetch").mockImplementation((async (
    input,
  ) => {
    // Model placement and HEAD validation are deterministic; no API fetches.
    expect(new URL(String(input)).hostname).toBe("modelcdn.tscircuit.com")
    return new Response("v -1 -1 0\nv 1 1 1\n", { status: 200 })
  }) as typeof globalThis.fetch)
  try {
    return await run()
  } finally {
    fetchMock.mockRestore()
  }
}

const withoutPinAttributes = (element: ReturnType<typeof evaluateChip>) => {
  const { pinAttributes, ...props } = element.props
  return { ...element, props }
}

const pinAttributeTypeDiagnostics = (source: string) => {
  const parsed = ts.createSourceFile(
    "generated.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const declarations = parsed.statements
    .filter(
      (statement) =>
        ts.isImportDeclaration(statement) ||
        (ts.isVariableStatement(statement) &&
          statement.declarationList.declarations.every(
            (declaration) =>
              ts.isIdentifier(declaration.name) &&
              ["pinLabels", "pinAttributes"].includes(declaration.name.text),
          )),
    )
    .map((statement) => statement.getText(parsed))
    .join("\n")
  const fileName = path.join(
    import.meta.dir,
    "generated-pin-attribute-check.ts",
  )
  const virtualSource = `${declarations}
import type { CommonComponentProps } from "@tscircuit/props"
const checkedPinAttributes: NonNullable<CommonComponentProps["pinAttributes"]> = pinAttributes
`
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  }
  const host = ts.createCompilerHost(options)
  const getSourceFile = host.getSourceFile.bind(host)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  host.getSourceFile = (name, languageVersion, ...rest) =>
    name === fileName
      ? ts.createSourceFile(name, virtualSource, languageVersion, true)
      : getSourceFile(name, languageVersion, ...rest)
  host.readFile = (name) => (name === fileName ? virtualSource : readFile(name))
  host.fileExists = (name) => name === fileName || fileExists(name)
  return ts
    .getPreEmitDiagnostics(ts.createProgram([fileName], options, host))
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    )
}

const prefixedDriverAttributes = Object.fromEntries(
  Object.entries(driverAttributes).map(([pin, attributes]) => [
    `pin${pin}`,
    attributes,
  ]),
)

test("DRV8818 caller attributes populate all 29 physical Circuit JSON ports", () => {
  // C99045 supplier data plus the reviewed and published DRV8818PWPR datasheet.
  expect(
    commonComponentProps.shape.pinAttributes.parse(driverAttributes),
  ).toEqual(driverAttributes)
  const parsed = parseDriver()
  const before = structuredClone(parsed)
  const circuit = convertEasyEdaJsonToCircuitJson(parsed, {
    pinAttributes: driverAttributes,
  })
  const ports = portsOf(circuit)
  expect(ports).toHaveLength(29)
  expect(new Set(ports.map((port) => port.pin_number)).size).toBe(29)
  for (const [physicalPin, attributes] of Object.entries(driverAttributes)) {
    const port = ports.find((value) => String(value.pin_number) === physicalPin)
    expect(port).toBeDefined()
    for (const [field, value] of Object.entries(attributes)) {
      expect(port).toHaveProperty(
        field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        value,
      )
    }
    const expectedSourceAttributes = Object.fromEntries(
      Object.entries(attributes).map(([field, value]) => [
        field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        value,
      ]),
    )
    expect(
      source_pin_attributes.strict().parse(expectedSourceAttributes),
    ).toEqual(expectedSourceAttributes)
    expect(source_pin_attributes.parse(port)).toEqual(expectedSourceAttributes)
  }
  expect(parsed).toEqual(before)
})

for (const entryPoint of ["raw", "parsed"] as const) {
  test(`${entryPoint} TSX conversion retains all DRV8818 attributes, CAD and geometry`, () =>
    withOfflineCad(async () => {
      const baseline = evaluateChip(
        await convertRawEasyToTsx({ rawEasy: driverRaw }),
      )
      const source =
        entryPoint === "raw"
          ? await convertRawEasyToTsx({
              rawEasy: driverRaw,
              pinAttributes: driverAttributes,
            })
          : await convertBetterEasyToTsx({
              betterEasy: parseDriver(),
              pinAttributes: driverAttributes,
            })
      const enriched = evaluateChip(source)
      expect(enriched.type).toBe("chip")
      expect(enriched.props.pinAttributes).toEqual(prefixedDriverAttributes)
      expect(enriched.props.pinLabels).toHaveProperty("pin29")
      expect(enriched.props.cadModel.objUrl).toContain("C99045.obj")
      expect(withoutPinAttributes(enriched)).toEqual(
        withoutPinAttributes(baseline),
      )
    }))
}

test("physical pinN values override numeric fields while preserving false, zero and capabilities", () =>
  withOfflineCad(async () => {
    const attributes: PinAttributes = {
      "8": { mustBeConnected: true, requiresPower: false },
      pin8: {
        mustBeConnected: false,
        providesVoltage: 0,
        canUsePushPull: false,
        capabilities: ["uart_tx", "spi_mosi"],
        activeCapabilities: ["uart_tx"],
      },
    }
    const expected = {
      requiresPower: false,
      ...attributes.pin8,
    }
    const port = portsOf(
      convertEasyEdaJsonToCircuitJson(parseDriver(), {
        pinAttributes: attributes,
      }),
    ).find((value) => value.pin_number === 8)
    expect(port).toMatchObject({
      requires_power: false,
      must_be_connected: false,
      provides_voltage: 0,
      can_use_push_pull: false,
      supports_uart_tx: true,
      supports_spi_mosi: true,
      is_configured_for_uart_tx: true,
    })
    const source = await convertRawEasyToTsx({
      rawEasy: driverRaw,
      pinAttributes: attributes,
    })
    const { props } = evaluateChip(source)
    expect(props.pinAttributes.pin8).toEqual(expected)
    expect(pinAttributeTypeDiagnostics(source)).toEqual([])
    // Check that the semantic compiler catches the former readonly-array bug.
    expect(
      pinAttributeTypeDiagnostics(
        'const pinAttributes = { pin8: { capabilities: ["uart_tx"] } } as const',
      ).some((message) => message.includes("readonly")),
    ).toBe(true)
  }))

test("an empty physical row suppresses signal aliases and automatic ground inference", () =>
  withOfflineCad(async () => {
    const baseline = evaluateChip(
      await convertRawEasyToTsx({ rawEasy: driverRaw }),
    )
    expect(baseline.props.pinAttributes.pin7.requiresGround).toBe(true)
    const attributes: PinAttributes = {
      "7": {},
      GND1: { requiresPower: true, mustBeConnected: true },
    }
    const port = portsOf(
      convertEasyEdaJsonToCircuitJson(parseDriver(), {
        pinAttributes: attributes,
      }),
    ).find((value) => value.pin_number === 7)
    expect(port).not.toHaveProperty("requires_power")
    expect(port).not.toHaveProperty("requires_ground")
    expect(port).not.toHaveProperty("must_be_connected")
    const { props } = evaluateChip(
      await convertRawEasyToTsx({
        rawEasy: driverRaw,
        pinAttributes: attributes,
      }),
    )
    expect(props.pinAttributes?.pin7 ?? {}).toEqual({})
  }))

test("unmatched attribute keys do not create phantom ports or TSX pins", () =>
  withOfflineCad(async () => {
    const attributes: PinAttributes = {
      "9999": { requiresPower: true },
      pin9999: { isOutput: true },
      B99: { requiresGround: true },
    }
    const ports = portsOf(
      convertEasyEdaJsonToCircuitJson(parseDriver(), {
        pinAttributes: attributes,
      }),
    )
    expect(ports).toHaveLength(29)
    const { props } = evaluateChip(
      await convertRawEasyToTsx({
        rawEasy: driverRaw,
        pinAttributes: attributes,
      }),
    )
    expect(Object.keys(props.pinLabels)).toHaveLength(29)
    expect(props.pinAttributes).not.toHaveProperty("pin9999")
    expect(props.pinAttributes).not.toHaveProperty("B99")
  }))

test("omitted, undefined and empty options preserve existing Circuit JSON and TSX output", () =>
  withOfflineCad(async () => {
    const parsed = parseDriver()
    const baselineCircuit = convertEasyEdaJsonToCircuitJson(parsed)
    expect(
      convertEasyEdaJsonToCircuitJson(parsed, { pinAttributes: undefined }),
    ).toEqual(baselineCircuit)
    expect(
      convertEasyEdaJsonToCircuitJson(parsed, { pinAttributes: {} }),
    ).toEqual(baselineCircuit)
    const baselineTsx = await convertRawEasyToTsx({ rawEasy: driverRaw })
    expect(
      await convertRawEasyToTsx({
        rawEasy: driverRaw,
        pinAttributes: undefined,
      }),
    ).toBe(baselineTsx)
    expect(
      await convertBetterEasyToTsx({ betterEasy: parsed, pinAttributes: {} }),
    ).toBe(baselineTsx)
  }))

test("actual BGA ball identifiers outrank synthesized numeric source-port identities", () =>
  withOfflineCad(async () => {
    const raw = structuredClone(driverRaw)
    raw.dataStr.shape = []
    raw.packageDetail.dataStr.shape = [
      "PAD~ELLIPSE~400~300~1~1~1~~A1~0~~0~ggeBall1~0~~Y~0~0~0.2~400,300",
      "PAD~ELLIPSE~402~300~1~1~1~~A2~0~~0~ggeBall2~0~~Y~0~0~0.2~402,300",
    ]
    const parsed = EasyEdaJsonSchema.parse(raw)
    const attributes: PinAttributes = {
      A1: { isInput: true },
      pinA2: { requiresGround: true },
      "1": { requiresPower: true },
      pin1: { providesVoltage: "1.8V" },
    }
    const ports = portsOf(
      convertEasyEdaJsonToCircuitJson(parsed, { pinAttributes: attributes }),
    )
    expect(ports).toHaveLength(2)
    const first = ports.find((port) => port.port_hints?.includes("A1"))!
    const second = ports.find((port) => port.port_hints?.includes("A2"))!
    expect(first).toMatchObject({ name: "pin1", is_input: true })
    expect(first).not.toHaveProperty("requires_power")
    expect(first).not.toHaveProperty("provides_voltage")
    expect(second).toMatchObject({ name: "pin2", requires_ground: true })
    const { props } = evaluateChip(
      await convertBetterEasyToTsx({
        betterEasy: parsed,
        pinAttributes: attributes,
      }),
    )
    expect(props.pinLabels[first.name]).toContain("A1")
    expect(props.pinLabels[second.name]).toContain("A2")
    expect(props.pinAttributes).toEqual({
      [first.name]: { isInput: true },
      [second.name]: { requiresGround: true },
    })
  }))

for (const [name, raw, componentType] of [
  ["custom schematic symbol", customSymbolRaw, "chip"],
  ["current-sense resistor classification", resistorRaw, "resistor"],
] as const) {
  test(`attributes preserve ${name}`, () =>
    withOfflineCad(async () => {
      const parsed = EasyEdaJsonSchema.parse(raw)
      const baseline = evaluateChip(
        await convertBetterEasyToTsx({ betterEasy: parsed }),
      )
      const enriched = evaluateChip(
        await convertBetterEasyToTsx({
          betterEasy: parsed,
          pinAttributes: { "1": { isPassive: true, mustBeConnected: true } },
        }),
      )
      expect(enriched.type).toBe(componentType)
      if (name === "custom schematic symbol")
        expect(baseline.props.symbol).toBeDefined()
      if (componentType === "resistor")
        expect(enriched.props.resistance).toBe("180mohm")
      expect(enriched.props.pinAttributes.pin1).toEqual({
        isPassive: true,
        mustBeConnected: true,
      })
      expect(withoutPinAttributes(enriched)).toEqual(
        withoutPinAttributes(baseline),
      )
    }))
}

test("signal aliases fill absent physical rows but conflicting aliases are not merged", () =>
  withOfflineCad(async () => {
    const parsed = parseDriver()
    const pin = parsed.dataStr.shape.find(
      (shape) => shape.type === "PIN" && String(shape.pinNumber) === "7",
    )
    if (!pin || pin.type !== "PIN") throw new Error("Expected physical pin7")
    pin.label = "GND1/RETURN"
    const attributes: PinAttributes = {
      GND1: { requiresGround: true },
      RETURN: { mustBeConnected: false },
    }
    const port = portsOf(
      convertEasyEdaJsonToCircuitJson(parsed, { pinAttributes: attributes }),
    ).find((value) => value.pin_number === 7)
    expect(port).toMatchObject({
      requires_ground: true,
      must_be_connected: false,
    })
    const { props } = evaluateChip(
      await convertBetterEasyToTsx({
        betterEasy: parsed,
        pinAttributes: attributes,
      }),
    )
    expect(props.pinAttributes.pin7).toEqual({
      requiresGround: true,
      mustBeConnected: false,
    })
    const conflicts: PinAttributes = {
      GND1: { requiresVoltage: "1.8V" },
      RETURN: { requiresVoltage: "3.3V" },
    }
    const conflictedPort = portsOf(
      convertEasyEdaJsonToCircuitJson(parsed, { pinAttributes: conflicts }),
    ).find((value) => value.pin_number === 7)
    expect(conflictedPort).not.toHaveProperty("requires_voltage")
    const conflicted = evaluateChip(
      await convertBetterEasyToTsx({
        betterEasy: parsed,
        pinAttributes: conflicts,
      }),
    )
    expect(
      conflicted.props.pinAttributes?.pin7?.requiresVoltage,
    ).toBeUndefined()
  }))

test("repeated copper pads share one physical port and one supplied attribute row", () =>
  withOfflineCad(async () => {
    const parsed = parseDriver()
    const pad = parsed.packageDetail.dataStr.shape.find(
      (shape) => shape.type === "PAD" && String(shape.number) === "7",
    )
    if (!pad || pad.type !== "PAD") throw new Error("Expected footprint pad7")
    parsed.packageDetail.dataStr.shape.push({
      ...structuredClone(pad),
      center: { x: "20mm", y: pad.center.y },
    })
    const attributes: PinAttributes = {
      "7": { requiresGround: true, mustBeConnected: true },
    }
    const circuit = convertEasyEdaJsonToCircuitJson(parsed, {
      pinAttributes: attributes,
    })
    const ports = portsOf(circuit)
    expect(ports).toHaveLength(29)
    expect(ports.filter((port) => port.pin_number === 7)).toHaveLength(1)
    expect(ports.find((port) => port.pin_number === 7)).toMatchObject({
      requires_ground: true,
      must_be_connected: true,
    })
    expect(
      circuit.filter(
        (element) =>
          element.type === "pcb_smtpad" && element.port_hints?.includes("pin7"),
      ),
    ).toHaveLength(2)
    const { props } = evaluateChip(
      await convertBetterEasyToTsx({
        betterEasy: parsed,
        pinAttributes: attributes,
      }),
    )
    expect(Object.keys(props.pinLabels)).toHaveLength(29)
    expect(props.pinAttributes.pin7).toEqual(attributes["7"])
  }))
