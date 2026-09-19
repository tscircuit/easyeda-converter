import { z } from "zod"
import type { RawEasyEdaJson } from "../schemas/easy-eda-json-schema"

const componentDetailEnvelopeSchema = z.object({
  success: z.boolean(),
  code: z.number().optional(),
  message: z.string().optional(),
  result: z.unknown().optional(),
})

export const parseEasyEdaComponentDetailResponse = (
  detailResponse: unknown,
  jlcpcbPartNumber: string,
): RawEasyEdaJson => {
  const envelope = componentDetailEnvelopeSchema.safeParse(detailResponse)
  if (!envelope.success) {
    throw new Error(
      `Invalid EasyEDA component detail response for "${jlcpcbPartNumber}": expected a boolean success field`,
    )
  }
  if (!envelope.data.success) {
    const { code, message } = envelope.data
    throw new Error(
      `EasyEDA API rejected the component details request for "${jlcpcbPartNumber}"${code === undefined ? "" : ` (code ${code})`}${message ? `: ${message}` : ""}`,
    )
  }
  if (envelope.data.result == null) {
    throw new Error(
      `Invalid EasyEDA component detail response for "${jlcpcbPartNumber}": missing result`,
    )
  }
  return envelope.data.result as RawEasyEdaJson
}
