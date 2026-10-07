import { expect, test } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

const validSearchResponse = {
  success: true,
  result: {
    lists: {
      lcsc: [{ uuid: "test-uuid", lcsc: { number: "C2040" } }],
    },
  },
}

const makeFetch = (detailResponse: unknown, includeModelMetadata = false) => {
  const calls: string[] = []
  const fetch = Object.assign(
    async (input: RequestInfo | URL) => {
      const url = String(input)
      calls.push(url)
      if (url.includes("/api/components/search")) {
        return Response.json(validSearchResponse)
      }
      return Response.json(detailResponse)
    },
    { preconnect: globalThis.fetch.preconnect },
  )
  return { fetch, calls }
}

test.each([
  { name: "null response", response: null },
  { name: "missing success flag", response: {} },
  { name: "string success flag", response: { success: "true" } },
  { name: "missing result", response: { success: true } },
  { name: "null result", response: { success: true, result: null } },
  {
    name: "API rejection with error code and message",
    response: {
      success: false,
      code: 1007,
      message: "part not found",
    },
  },
  {
    name: "API rejection that still returns geometry-shaped result",
    response: {
      success: false,
      code: 0,
      result: { packageDetail: { dataStr: { shape: [] } } },
    },
  },
])(
  "rejects malformed component detail response: $name",
  async ({ response }) => {
    for (const includeModelMetadata of [true, false]) {
      const { fetch, calls } = makeFetch(response)
      await expect(
        fetchEasyEDAComponent("C2040", { fetch, includeModelMetadata }),
      ).rejects.toThrowErrorMatchingSnapshot()
      expect(calls).toHaveLength(2)
    }
  },
)

test("passes through a valid component detail envelope", async () => {
  const detail = {
    success: true,
    result: { lcsc: { number: "C2040" }, packageDetail: {} },
  }
  const { fetch } = makeFetch(detail)
  const result = await fetchEasyEDAComponent("C2040", {
    fetch,
    includeModelMetadata: false,
  })
  expect(result.lcsc?.number).toBe("C2040")
})
