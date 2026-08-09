import { expect, it } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
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

// Keep the fake detail response small while preserving enough EasyEDA package
// data to render the footprint. The six pads and outline make the snapshot
// show the wrong package selected by the fuzzy search fallback.
const misleadingDetailResult = {
  uuid: misleadingSearchResult.uuid,
  title: "334C1555B5C3T",
  description: "",
  docType: 2,
  type: 3,
  szlcsc: { id: 6083536, number: "C6083536" },
  lcsc: { id: 6083536, number: "C6083536" },
  owner: {
    uuid: "easyeda-owner",
    username: "LCSC",
    nickname: "LCSC",
    avatar: "",
  },
  tags: [],
  updateTime: 0,
  updated_at: "2025-01-01 00:00:00",
  dataStr: {
    head: {
      docType: "2",
      editorVersion: "",
      c_para: misleadingSearchResult.dataStr.head.c_para,
      x: 0,
      y: 0,
      uuid: misleadingSearchResult.uuid,
      utime: 0,
    },
    canvas: "",
    shape: [],
    BBox: { x: -18, y: -14, width: 36, height: 28 },
  },
  verify: true,
  SMT: true,
  datastrid: "",
  writable: false,
  isFavorite: false,
  packageDetail: {
    uuid: "c1555-package-uuid",
    title: "OSC-SMD_6P-L3.2-W2.5-BL_CTS_634",
    docType: 4,
    updateTime: 0,
    owner: {
      uuid: "easyeda-owner",
      username: "LCSC",
      nickname: "LCSC",
      avatar: "",
    },
    datastrid: "",
    writable: false,
    dataStr: {
      head: {
        docType: "4",
        editorVersion: "",
        c_para: {
          package: "OSC-SMD_6P-L3.2-W2.5-BL_CTS_634",
        },
        x: 0,
        y: 0,
        uuid: "c1555-package-uuid",
        utime: 0,
      },
      canvas: "",
      shape: [
        "PAD~ELLIPSE~-12~-8~8~6~11~~1~0~",
        "PAD~ELLIPSE~0~-8~8~6~11~~2~0~",
        "PAD~ELLIPSE~12~-8~8~6~11~~3~0~",
        "PAD~ELLIPSE~-12~8~8~6~11~~4~0~",
        "PAD~ELLIPSE~0~8~8~6~11~~5~0~",
        "PAD~ELLIPSE~12~8~8~6~11~~6~0~",
        "TRACK~0.8~3~~-18 -14 18 -14 18 14 -18 14 -18 -14~outline~0",
      ],
      layers: [],
      objects: [],
      BBox: { x: -18, y: -14, width: 36, height: 28 },
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
          ...misleadingDetailResult,
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

  const betterResult = EasyEdaJsonSchema.parse(result)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterResult, {
    useModelCdn: false,
  })
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
