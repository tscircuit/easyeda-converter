import { expect, it } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"
import rawEasy from "../assets/C1046.raweasy.json"

it("adds _stepMetadata bounds when fetching component metadata", async () => {
  const mockFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input)

    if (url === "https://easyeda.com/api/components/search") {
      return new Response(
        JSON.stringify({
          success: true,
          result: {
            lists: {
              lcsc: [
                {
                  uuid: "component-uuid-1",
                  dataStr: {
                    head: {
                      c_para: {
                        "Supplier Part": "C1046",
                      },
                    },
                  },
                },
              ],
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      )
    }

    if (url.startsWith("https://easyeda.com/api/components/component-uuid-1")) {
      return new Response(JSON.stringify({ result: rawEasy }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }

    if (url.includes("/easyeda_models/download?") && !url.includes(".step")) {
      return new Response("v 0 0 0\nv 2 3 4\n", {
        status: 200,
        headers: { "content-type": "text/plain" },
      })
    }

    if (url.includes("/easyeda_models/download.step?")) {
      const stepText = [
        "ISO-10303-21;",
        "DATA;",
        "#1 =( LENGTH_UNIT ( ) NAMED_UNIT ( * ) SI_UNIT ( .MILLI., .METRE. ) );",
        "#2 = CARTESIAN_POINT ( 'NONE', ( -1, -2, -3 ) );",
        "#3 = CARTESIAN_POINT ( 'NONE', ( 1, 2, 3 ) );",
        "ENDSEC;",
      ].join("\n")

      return new Response(stepText, {
        status: 200,
        headers: { "content-type": "model/step" },
      })
    }

    throw new Error(
      `Unexpected fetch request: ${url} ${init?.method ? `(${init.method})` : ""}`,
    )
  }) as unknown as typeof fetch

  const result = await fetchEasyEDAComponent("C1046", {
    fetch: mockFetch,
    includeModelMetadata: true,
  })

  expect(result._objMetadata?.bounds).toEqual({
    min: { x: 0, y: 0, z: 0 },
    max: { x: 2, y: 3, z: 4 },
  })

  expect(result._stepMetadata?.bounds).toEqual({
    min: { x: -1, y: -2, z: -3 },
    max: { x: 1, y: 2, z: 3 },
  })
})
