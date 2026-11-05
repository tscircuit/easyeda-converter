import { expect, test } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import diode from "../assets/C8598.raweasy.json"

const invalidResponses = [
  { name: "null envelope", response: null },
  { name: "empty envelope", response: {} },
  { name: "string success", response: { success: "true", result: diode } },
  { name: "missing result", response: { success: true } },
  { name: "null result", response: { success: true, result: null } },
  { name: "array result", response: { success: true, result: [] } },
  { name: "string result", response: { success: true, result: "unavailable" } },
  { name: "empty result", response: { success: true, result: {} } },
  { name: "empty UUID", response: { success: true, result: { uuid: "" } } },
  {
    name: "API rejection",
    response: { success: false, code: 404, message: "Component removed" },
  },
  { name: "rejection with data", response: { success: false, result: diode } },
]

for (const includeModelMetadata of [false, true]) {
  test.each(invalidResponses)(
    `rejects $name (metadata=${includeModelMetadata})`,
    async ({ response }) => {
      let requestCount = 0
      const fetch = Object.assign(
        async () => {
          requestCount += 1
          if (requestCount === 1) {
            return Response.json({
              success: true,
              result: {
                lists: {
                  lcsc: [{ uuid: diode.uuid, lcsc: { number: "C8598" } }],
                },
              },
            })
          }
          return Response.json(response)
        },
        { preconnect: globalThis.fetch.preconnect },
      )

      await expect(
        fetchEasyEDAComponent("C8598", { fetch, includeModelMetadata }),
      ).rejects.toThrow(/EasyEDA.*component.*C8598/i)
      expect(requestCount).toBe(2)
    },
  )
}
