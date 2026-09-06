import { z } from "zod"

const searchEnvelopeSchema = z.object({
  success: z.boolean(),
  code: z.number().optional(),
  message: z.string().optional(),
})

const supplierNumberSchema = z
  .object({ number: z.string().nullish() })
  .nullish()

const searchResultsSchema = z.object({
  result: z.object({
    lists: z.object({
      lcsc: z.array(
        z.object({
          uuid: z.string().min(1),
          lcsc: supplierNumberSchema,
          szlcsc: supplierNumberSchema,
          dataStr: z
            .object({
              head: z
                .object({
                  c_para: z
                    .object({ "Supplier Part": z.string().nullish() })
                    .nullish(),
                })
                .nullish(),
            })
            .nullish(),
        }),
      ),
    }),
  }),
})

export const parseEasyEdaSearchResponse = (
  searchResponse: unknown,
  jlcpcbPartNumber: string,
) => {
  const envelope = searchEnvelopeSchema.safeParse(searchResponse)
  if (!envelope.success) {
    throw new Error(
      `Invalid EasyEDA search response for "${jlcpcbPartNumber}": expected a boolean success field`,
    )
  }
  if (!envelope.data.success) {
    const { code, message } = envelope.data
    throw new Error(
      `EasyEDA API rejected the component search for "${jlcpcbPartNumber}"${code === undefined ? "" : ` (code ${code})`}${message ? `: ${message}` : ""}`,
    )
  }

  const searchResults = searchResultsSchema.safeParse(searchResponse)
  if (!searchResults.success) {
    throw new Error(
      `Invalid EasyEDA search response for "${jlcpcbPartNumber}": expected result.lists.lcsc containing component UUIDs and supplier metadata`,
    )
  }
  const components = searchResults.data.result.lists.lcsc
  if (components.length === 0) {
    throw new Error(
      `Component not found in EasyEDA library search for "${jlcpcbPartNumber}". A supplier catalog listing does not guarantee importable symbol/footprint data.`,
    )
  }
  return components
}
