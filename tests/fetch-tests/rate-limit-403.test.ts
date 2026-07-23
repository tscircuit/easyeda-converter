import { expect, it } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

// EasyEDA's component API rate-limits by IP and answers HTTP 403 (not 429)
// once tripped — see issue #409. These tests use the injectable fetch option
// so they never touch the network.

const searchSuccessBody = (partNumber: string) =>
  JSON.stringify({
    success: true,
    result: {
      lists: {
        lcsc: [
          {
            uuid: "test-uuid-1234",
            dataStr: { head: { c_para: { "Supplier Part": partNumber } } },
          },
        ],
      },
    },
  })

it("surfaces a search-request HTTP 403 as rate limiting, not a component lookup failure", async () => {
  const fetch403 = async () =>
    new Response("<html>403 Forbidden</html>", { status: 403 })

  expect(
    fetchEasyEDAComponent("C11702", {
      fetch: fetch403 as unknown as typeof globalThis.fetch,
    }),
  ).rejects.toThrow(/rate limit/i)
})

it("surfaces a component-details HTTP 403 as rate limiting", async () => {
  let callCount = 0
  const fetchSearchOkThen403 = async () => {
    callCount += 1
    if (callCount === 1) {
      return new Response(searchSuccessBody("C11702"), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }
    return new Response("<html>403 Forbidden</html>", { status: 403 })
  }

  expect(
    fetchEasyEDAComponent("C11702", {
      fetch: fetchSearchOkThen403 as unknown as typeof globalThis.fetch,
      includeModelMetadata: false,
    }),
  ).rejects.toThrow(/rate limit/i)
})

it("keeps 'Component not found' distinct from rate limiting", async () => {
  const fetchEmptySearch = async () =>
    new Response(
      JSON.stringify({ success: true, result: { lists: { lcsc: [] } } }),
      { status: 200, headers: { "content-type": "application/json" } },
    )

  expect(
    fetchEasyEDAComponent("C999999999", {
      fetch: fetchEmptySearch as unknown as typeof globalThis.fetch,
    }),
  ).rejects.toThrow("Component not found")
})

it("includes the HTTP status in non-403 search failures", async () => {
  const fetch500 = async () =>
    new Response("Internal Server Error", { status: 500 })

  expect(
    fetchEasyEDAComponent("C11702", {
      fetch: fetch500 as unknown as typeof globalThis.fetch,
    }),
  ).rejects.toThrow(/HTTP 500/)
})
