import { z } from "zod"
import type { RawEasyEdaJson } from "../schemas/easy-eda-json-schema"

const componentEnvelopeSchema = z.object({
  success: z.boolean(),
  code: z.number().optional(),
  message: z.string().optional(),
})

const componentResultSchema = z.object({
  result: z.object({ uuid: z.string().min(1) }).passthrough(),
})

export const parseEasyEdaComponentResponse = (
  response: unknown,
  jlcpcbPartNumber: string,
): RawEasyEdaJson => {
  const envelope = componentEnvelopeSchema.safeParse(response)
  if (!envelope.success) {
    throw new Error(
      `Invalid EasyEDA component response for "${jlcpcbPartNumber}": expected a boolean success field`,
    )
  }
  if (!envelope.data.success) {
    const { code, message } = envelope.data
    throw new Error(
      `EasyEDA API rejected the component details for "${jlcpcbPartNumber}"${code === undefined ? "" : ` (code ${code})`}${message ? `: ${message}` : ""}`,
    )
  }

  const component = componentResultSchema.safeParse(response)
  if (!component.success) {
    throw new Error(
      `Invalid EasyEDA component response for "${jlcpcbPartNumber}": expected a result object with a component UUID`,
    )
  }

  // Keep raw geometry untouched; conversion performs full schema validation.
  return component.data.result as RawEasyEdaJson
}
