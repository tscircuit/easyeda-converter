import { expect, it } from "bun:test"
import ts from "typescript"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import c1046RawEasy from "../assets/C1046.raweasy.json"

const getSyntaxErrors = (code: string): string[] => {
  const sourceFile = ts.createSourceFile(
    "component.tsx",
    code,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX,
  )
  // biome-ignore lint/suspicious/noExplicitAny: internal TS API not in public types
  const parseDiagnostics = (sourceFile as any).parseDiagnostics as
    | { messageText: string | ts.DiagnosticMessageChain }[]
    | undefined
  return (parseDiagnostics ?? []).map((diagnostic) =>
    ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
  )
}

it("emits valid, correctly-escaped TSX when the manufacturer part number contains a double quote", async () => {
  const payload = structuredClone(c1046RawEasy) as any
  payload.dataStr.head.c_para["Manufacturer Part"] = 'ABC"DEF'

  const betterEasy = EasyEdaJsonSchema.parse(payload)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(getSyntaxErrors(result)).toEqual([])
  expect(result).toContain('manufacturerPartNumber={"ABC\\"DEF"}')
})
