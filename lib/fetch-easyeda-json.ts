import type { RawEasyEdaJson } from "./schemas/easy-eda-json-schema"

export async function fetchEasyEDAComponent(
  jlcpcbPartNumber: string,
  { fetch = globalThis.fetch }: { fetch?: typeof globalThis.fetch } = {},
): Promise<RawEasyEdaJson> {
  const searchUrl = "https://easyeda.com/api/components/search"
  const componentUrl = (uuid: string) =>
    `https://easyeda.com/api/components/${uuid}?version=6.4.7&uuid=${uuid}&datastrid=`

  const searchHeaders = {
    authority: "easyeda.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    accept: "application/json, text/javascript, */*; q=0.01",
    "x-requested-with": "XMLHttpRequest",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    origin: "https://easyeda.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://easyeda.com/editor",
    "accept-language": "cs,en;q=0.9,sk;q=0.8,en-GB;q=0.7",
    cookie: "<PUT your cookies here>",
  }

  const searchData = `type=3&doctype%5B%5D=2&uid=0819f05c4eef4c71ace90d822a990e87&returnListStyle=classifyarr&wd=${jlcpcbPartNumber}&version=6.4.7`

  // Perform the search request
  const searchResponse = await fetch(searchUrl, {
    method: "POST",
    headers: searchHeaders,
    body: searchData,
  })

  if (!searchResponse.ok) {
    throw new Error("Failed to search for the component")
  }

  const searchResult = await searchResponse.json()
  if (!searchResult.success || !searchResult.result.lists.lcsc.length) {
    throw new Error("Component not found")
  }

  const bestMatchComponent =
    searchResult.result.lists.lcsc.find(
      (component: any) =>
        component.dataStr.head.c_para["Supplier Part"] === jlcpcbPartNumber,
    ) ?? searchResult.result.lists.lcsc[0]

  const componentUUID = bestMatchComponent.uuid

  // Perform the component fetch request
  const componentResponse = await fetch(componentUrl(componentUUID), {
    method: "GET",
    headers: {
      ...searchHeaders,
      referer: `https://easyeda.com/editor?uuid=${componentUUID}`,
    },
  })

  if (!componentResponse.ok) {
    throw new Error("Failed to fetch the component details")
  }

  const componentResult = await componentResponse.json()
  return componentResult.result
}

// Usage example
// fetchEasyEDAComponent("C558438")
//   .then((component) => console.log(component))
//   .catch((error) => console.error(error))
