import { expect, test } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import diode from "../assets/C8598.raweasy.json"

test.each([
  { name: "supplier parameter", metadata: { dataStr: diode.dataStr } },
  { name: "lcsc number", metadata: { lcsc: { number: " c8598 " } } },
  { name: "szlcsc number", metadata: { szlcsc: { number: "C8598" } } },
])("preserves exact matching through $name", async ({ metadata }) => {
  const requests: string[] = []
  const fetch = Object.assign(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = new Request(input, init)
      requests.push(request.url)
      if (requests.length === 1) {
        return Response.json({
          success: true,
          result: {
            lists: {
              lcsc: [
                { uuid: "different-part", lcsc: { number: "C85980" } },
                { uuid: diode.uuid, ...metadata },
              ],
            },
          },
        })
      }
      expect(request.method).toBe("GET")
      return Response.json({ success: true, result: diode })
    },
    { preconnect: globalThis.fetch.preconnect },
  )

  const component = await fetchEasyEDAComponent("C8598", {
    fetch,
    includeModelMetadata: false,
  })
  expect(component).toEqual(diode)
  expect(requests).toEqual([
    "https://easyeda.com/api/components/search",
    `https://easyeda.com/api/components/${diode.uuid}?version=6.4.7&uuid=${diode.uuid}&datastrid=`,
  ])
})
