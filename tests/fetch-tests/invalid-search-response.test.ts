import { expect, test } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

test.each([
  { name: "null response", response: null },
  { name: "missing success flag", response: {} },
  { name: "string success flag", response: { success: "true" } },
  { name: "missing results", response: { success: true } },
  {
    name: "missing lists",
    response: { success: true, result: {} },
  },
  {
    name: "non-array component list",
    response: { success: true, result: { lists: { lcsc: {} } } },
  },
  {
    name: "component without a UUID",
    response: {
      success: true,
      result: { lists: { lcsc: [{ lcsc: { number: "C2040" } }] } },
    },
  },
  {
    name: "API rejection even with a nonempty result list",
    response: {
      success: false,
      code: 0,
      result: {
        lists: { lcsc: [{ uuid: "rejected", lcsc: { number: "C2040" } }] },
      },
    },
  },
])("rejects $name before fetching geometry", async ({ response }) => {
  let requestCount = 0
  const fetch = Object.assign(
    async () => {
      requestCount += 1
      return Response.json(response)
    },
    { preconnect: globalThis.fetch.preconnect },
  )

  await expect(
    fetchEasyEDAComponent("C2040", { fetch }),
  ).rejects.toThrowErrorMatchingSnapshot()
  expect(requestCount).toBe(1)
})
