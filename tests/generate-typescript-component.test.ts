import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { generateTypescriptComponent } from "lib"
import { generateTypescriptComponent as generateBrowserComponent } from "lib/websafe"
import ts from "typescript"

const evaluateGeneratedComponent = (source: string) => {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.CommonJS,
    },
    reportDiagnostics: true,
  })
  expect(result.diagnostics).toEqual([])
  const module = { exports: {} as Record<string, unknown> }
  const fakeReact = {
    createElement: (
      type: string,
      props: Record<string, unknown>,
      ...children: unknown[]
    ) => ({ type, props, children }),
  }
  new Function("React", "module", "exports", result.outputText)(
    fakeReact,
    module,
    module.exports,
  )
  const component = module.exports.CachedChip as (
    props: Record<string, unknown>,
  ) => { type: string; props: Record<string, any>; children: unknown[] }
  return component({ name: "U1" })
}

const params = {
  componentName: "CachedChip",
  manufacturerPartNumber: "CACHED-CHIP",
  supplierPartNumbers: {},
  pinLabels: { pin1: ["GND"], pin2: ["SIGNAL"] },
}

test("root and browser entry points expose the same component generator", () => {
  expect(generateBrowserComponent).toBe(generateTypescriptComponent)
})

test("local footprint strings preserve physical aliases and supplied false/zero attributes without fetching", () => {
  const previousFetch = globalThis.fetch
  const requests: unknown[] = []
  const fakeFetch: typeof fetch = Object.assign(
    async (...request: Parameters<typeof fetch>) => {
      requests.push(request)
      throw new Error("Network access is disabled")
    },
    { preconnect: () => {} },
  )
  globalThis.fetch = fakeFetch
  try {
    const pinLabels = {
      pin1: ["pin1", "GND", "A1"],
      pin2: ["SIGNAL", "B1"],
      pin57: ["thermalpad", "EP"],
    }
    const pinAttributes = {
      pin1: { requiresGround: false, requiresVoltage: 0 },
      pin2: {},
      pin57: { requiresGround: true },
    }
    const before = structuredClone({ pinLabels, pinAttributes })
    const source = generateTypescriptComponent({
      ...params,
      pinLabels,
      pinAttributes,
      footprint: "qfn56_w7mm_h7mm_p0.4mm_thermalpad",
      inferPinAttributes: false,
    })
    const component = evaluateGeneratedComponent(source)
    expect(component.type).toBe("chip")
    expect(component.props).toEqual({
      name: "U1",
      pinLabels: {
        pin1: ["GND", "A1"],
        pin2: ["SIGNAL", "B1"],
        pin57: ["thermalpad", "EP"],
      },
      pinAttributes,
      supplierPartNumbers: {},
      manufacturerPartNumber: "CACHED-CHIP",
      footprint: "qfn56_w7mm_h7mm_p0.4mm_thermalpad",
    })
    expect(source).toContain("ChipProps<typeof pinLabels>")
    expect({ pinLabels, pinAttributes }).toEqual(before)
    expect(requests).toEqual([])
  } finally {
    globalThis.fetch = previousFetch
  }
})

test("attribute inference remains enabled by default and can be disabled", () => {
  const inferred = evaluateGeneratedComponent(
    generateTypescriptComponent({ ...params, footprint: "soic2" }),
  )
  expect(inferred.props.pinAttributes).toEqual({
    pin1: { requiresGround: true },
  })
  const supplied = evaluateGeneratedComponent(
    generateTypescriptComponent({
      ...params,
      footprint: "soic2",
      pinAttributes: { pin1: {} },
    }),
  )
  expect(supplied.props.pinAttributes).toEqual({ pin1: {} })
  const explicitOnly = evaluateGeneratedComponent(
    generateTypescriptComponent({
      ...params,
      footprint: "soic2",
      inferPinAttributes: false,
    }),
  )
  expect(explicitOnly.props.pinAttributes).toBeUndefined()
})

test("Circuit JSON footprints retain the existing generated output", () => {
  const circuitJson: AnyCircuitElement[] = [
    {
      type: "pcb_smtpad",
      pcb_smtpad_id: "pcb_smtpad_1",
      pcb_component_id: "pcb_component_1",
      shape: "rect",
      x: 0,
      y: 0,
      width: 1,
      height: 2,
      layer: "top",
      port_hints: ["pin1"],
    },
  ]
  const source = generateTypescriptComponent({ ...params, circuitJson })
  expect(source).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["GND"],
      pin2: ["SIGNAL"]
    } as const

    const pinAttributes = {
      pin1: {requiresGround: true}
    } as const

    export const CachedChip = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{}}
          manufacturerPartNumber="CACHED-CHIP"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="0mm" pcbY="0mm" width="1mm" height="2mm" shape="rect" />
          </footprint>}
          
          {...props}
        />
      )
    }"
  `)
  const footprint = evaluateGeneratedComponent(source).props.footprint
  expect(footprint.type).toBe("footprint")
  expect(footprint.children[0].props.portHints).toEqual(["pin1"])
  expect(footprint.children[0].props.height).toBe("2mm")
  expect(
    evaluateGeneratedComponent(
      generateTypescriptComponent({
        ...params,
        circuitJson,
        footprint: "soic2",
      }),
    ).props.footprint,
  ).toBe("soic2")
})

test("part names and footprint strings are emitted as data even with quotes, newlines and entities", () => {
  for (const manufacturerPartNumber of [
    'part"quoted\nnext\\line',
    "part&gt;&amp;name",
    'part" /> <chip name="injected',
  ]) {
    const footprint = 'soic2_"quoted\nnext\\line'
    const component = evaluateGeneratedComponent(
      generateTypescriptComponent({
        ...params,
        manufacturerPartNumber,
        footprint,
      }),
    )
    expect(component.props.manufacturerPartNumber).toBe(manufacturerPartNumber)
    expect(component.props.footprint).toBe(footprint)
    expect(component.children).toEqual([])
  }
})
