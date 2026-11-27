import { expect, it, spyOn } from "bun:test"
import type { ChipProps } from "@tscircuit/props"
import ts from "typescript"
import { inferPinAttributes } from "lib/websafe/convert-to-typescript-component/infer-pin-attributes"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import raw from "../assets/C5240853.raweasy.json"

// Evaluate only generated source from the checked-in public supplier fixture.
const evaluateProps = (source: string) => {
  const compiled = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS },
  }).outputText
  const module = { exports: {} as Record<string, any> }
  new Function("React", "module", "exports", compiled)(
    {
      createElement: (
        type: string,
        props: unknown,
        ...children: unknown[]
      ) => ({
        type,
        props,
        children,
      }),
    },
    module,
    module.exports,
  )
  const component = Object.values(module.exports).find(
    (value) => typeof value === "function",
  )!
  return component({ name: "U1" }).props
}

it("does not turn ambiguous NC labels into a prohibition on connection", () => {
  expect(
    inferPinAttributes({
      pin1: "NC",
      pin2: ["NC1"],
      pin3: [" nc2 "],
      pin4: ["NC", "NC3"],
      pin5: ["NC", "GND"],
      pin6: ["NC", "GPIO0"],
    }),
  ).toEqual({})
})

it("preserves INA241A2 pin 4 and explicit datasheet semantics without changing the component geometry", async () => {
  // TI SBOSA30D, Table 5-1: INA241A2's pin labelled NC is reserved and
  // must be grounded. Its name alone cannot imply doNotConnect.
  const fetchMock = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async (input: Parameters<typeof fetch>[0]) => {
        expect(new URL(String(input)).hostname).toBe("modelcdn.tscircuit.com")
        return new Response(null, { status: 404 })
      },
      { preconnect: fetch.preconnect },
    ),
  )
  const original = structuredClone(raw)
  try {
    const baseline = evaluateProps(await convertRawEasyToTsx({ rawEasy: raw }))
    expect(baseline.pinLabels.pin4).toEqual(["NC"])
    expect(baseline.pinAttributes?.pin4).toBeUndefined()
    expect(baseline.pinAttributes.pin2).toEqual({ requiresGround: true })
    for (const pin4 of [
      { requiresGround: true, mustBeConnected: true },
      { doNotConnect: true },
      { doNotConnect: false },
      {},
    ] satisfies NonNullable<ChipProps["pinAttributes"]>[string][]) {
      const props = evaluateProps(
        await convertRawEasyToTsx({
          rawEasy: raw,
          pinAttributes: { pin4 },
        }),
      )
      expect(props.pinAttributes.pin4).toEqual(pin4)
      const { pinAttributes: _baselineAttributes, ...baselineGeometry } =
        baseline
      const { pinAttributes: _attributes, ...geometry } = props
      expect(geometry).toEqual(baselineGeometry)
    }
    expect(raw).toEqual(original)
  } finally {
    fetchMock.mockRestore()
  }
})
