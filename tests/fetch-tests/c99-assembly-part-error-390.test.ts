import { expect, it } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

// https://github.com/tscircuit/easyeda-converter/issues/390
//
// C99xxxxxxx numbers are JLCPCB assembly-catalog entries that often have no
// EasyEDA symbol/footprint behind them (verified: both the search API and the
// products API return nothing for C9900033429). The error should say so
// instead of a bare "Component not found".
it("explains that C99 assembly parts have no EasyEDA data", async () => {
  const emptySearchFetch = (async () =>
    new Response(
      JSON.stringify({
        success: true,
        result: { lists: { lcsc: [] } },
      }),
      { status: 200 },
    )) as unknown as typeof globalThis.fetch

  expect(
    fetchEasyEDAComponent("C9900033429", { fetch: emptySearchFetch }),
  ).rejects.toThrow(/assembly-catalog part number/)
})

it("includes the part number in the generic not-found error", async () => {
  const emptySearchFetch = (async () =>
    new Response(
      JSON.stringify({
        success: true,
        result: { lists: { lcsc: [] } },
      }),
      { status: 200 },
    )) as unknown as typeof globalThis.fetch

  expect(
    fetchEasyEDAComponent("C1234", { fetch: emptySearchFetch }),
  ).rejects.toThrow(/Component not found: "C1234"/)
})
