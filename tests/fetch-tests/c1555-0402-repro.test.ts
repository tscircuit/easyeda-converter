import { expect, it } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

const misleadingSearchResult = {
  uuid: "c1555-value-match-uuid",
  dataStr: {
    head: {
      c_para: {
        "Supplier Part": "C6083536",
        Value: "155.52MHz",
        package: "OSC-SMD_6P-L3.2-W2.5-BL_CTS_634",
      },
    },
  },
}

it("reproduces C1555 resolving to a non-0402 value match", async () => {
  const requests: string[] = []
  const fakeFetchImplementation = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    const requestUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url
    requests.push(requestUrl)

    if (requestUrl.endsWith("/api/components/search")) {
      expect(init?.method).toBe("POST")
      expect(await new Request(input, init).text()).toContain("wd=C1555")

      return new Response(
        JSON.stringify({
          success: true,
          result: {
            lists: {
              // This is the first result returned by EasyEDA for `wd=C1555`.
              // It matches the value text "155.52MHz", not the supplier part.
              lcsc: [misleadingSearchResult],
            },
          },
        }),
        { headers: { "content-type": "application/json" } },
      )
    }

    expect(requestUrl).toContain(
      "/api/components/c1555-value-match-uuid?version=6.4.7",
    )
    return new Response(
      JSON.stringify({
        result: {
          lcsc: { number: "C6083536" },
          dataStr: misleadingSearchResult.dataStr,
        },
      }),
      { headers: { "content-type": "application/json" } },
    )
  }
  const fakeFetch = Object.assign(fakeFetchImplementation, {
    preconnect: globalThis.fetch.preconnect,
  })

  const result = await fetchEasyEDAComponent("C1555", {
    fetch: fakeFetch,
    includeModelMetadata: false,
  })

  expect(requests).toHaveLength(2)
  expect(result.dataStr.head.c_para["Supplier Part"]).toBe("C6083536")
  expect(result.lcsc.number).toBe("C6083536")
  expect(result.dataStr.head.c_para.package).toContain("OSC-SMD_6P")
})
