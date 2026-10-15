import { expect, test } from "bun:test"
import type { ChipProps } from "@tscircuit/props"
import ts from "typescript"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  convertRawEasyToTsx,
  convertBetterEasyToTsx,
} from "lib/websafe/convert-to-typescript-component"
import { generateTypescriptComponent } from "lib/websafe/convert-to-typescript-component/generate-typescript-component"
import raw from "./assets/C318884.raweasy.json"

// Evaluate only converter-generated source from checked-in fixtures.
const evaluate = (source: string, props = {}) => {
  const parsed = ts.createSourceFile(
    "component.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  expect(
    (parsed as unknown as { parseDiagnostics: unknown[] }).parseDiagnostics,
  ).toHaveLength(0)
  const compiled = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS },
  }).outputText
  const module = { exports: {} as Record<string, any> }
  new Function("React", "module", "exports", compiled)(
    { createElement: (type: string, props: unknown) => ({ type, props }) },
    module,
    module.exports,
  )
  return Object.values(module.exports).find(
    (value) => typeof value === "function",
  )!(props)
}

test("converter emits permanent pin groups for C318884 and preserves caller overrides", async () => {
  const internallyConnectedPins = [
    ["A", "B"],
    ["C", "D"],
  ]
  const rawCopy = structuredClone(raw)
  const groupsCopy = structuredClone(internallyConnectedPins)
  const source = await convertRawEasyToTsx({
    rawEasy: rawCopy,
    internallyConnectedPins,
  })
  expect(evaluate(source).type).toBe("pushbutton")
  const { internallyConnectedPins: _groups, ...unchangedProps } =
    evaluate(source).props
  expect(unchangedProps).toEqual(
    evaluate(await convertRawEasyToTsx({ rawEasy: rawCopy })).props,
  )
  expect(evaluate(source).props.internallyConnectedPins).toEqual(
    internallyConnectedPins,
  )
  expect(
    evaluate(source, { internallyConnectedPins: [] }).props
      .internallyConnectedPins,
  ).toEqual([])
  expect(
    evaluate(
      await convertBetterEasyToTsx({
        betterEasy: EasyEdaJsonSchema.parse(rawCopy),
        internallyConnectedPins,
      }),
    ).props.internallyConnectedPins,
  ).toEqual(internallyConnectedPins)
  for (const componentType of [
    "chip",
    "pushbutton",
    "switch",
    "connector",
  ] as const) {
    const options = {
      componentName: "Switch",
      manufacturerPartNumber: "TS-1187A-B-A-B",
      supplierPartNumbers: { jlcpcb: ["C318884"] },
      pinLabels: { pin1: ["A"], pin2: ["B"] },
      footprint: "sot23",
      componentType,
    }
    for (const groups of [
      internallyConnectedPins,
      [[1, "pin2"]],
      [],
    ] satisfies NonNullable<ChipProps["internallyConnectedPins"]>[]) {
      const generated = generateTypescriptComponent({
        ...options,
        internallyConnectedPins: groups,
      })
      expect(evaluate(generated).props.internallyConnectedPins).toEqual(groups)
      expect(
        evaluate(generated, { internallyConnectedPins: [] }).props
          .internallyConnectedPins,
      ).toEqual([])
    }
    expect(generateTypescriptComponent(options)).not.toContain(
      "internallyConnectedPins",
    )
  }
  expect(rawCopy).toEqual(raw)
  expect(internallyConnectedPins).toEqual(groupsCopy)
})
