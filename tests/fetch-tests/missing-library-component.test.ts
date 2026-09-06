import { expect, test } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import s4SearchResponse from "../assets/C41411351.search.json"

test.each([
  {
    name: "S4 has no EasyEDA library search result",
    response: s4SearchResponse,
  },
  {
    name: "EasyEDA rejects the search request",
    response: { success: false, code: 500, message: "Search unavailable" },
  },
])("reports when $name", async ({ response }) => {
  const requests: string[] = []
  const fetch = Object.assign(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = new Request(input, init)
      requests.push(request.url)
      expect(request.method).toBe("POST")
      expect(new URLSearchParams(await request.text()).get("wd")).toBe(
        "C41411351",
      )
      return Response.json(response)
    },
    { preconnect: globalThis.fetch.preconnect },
  )

  await expect(
    fetchEasyEDAComponent("C41411351", { fetch }),
  ).rejects.toThrowErrorMatchingSnapshot()
  // A failed lookup must not fetch another part or fabricate geometry.
  expect(requests).toEqual(["https://easyeda.com/api/components/search"])
})
