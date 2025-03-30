import { it, expect } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

it("should fetch correct part for C41430893", async () => {
  const result = await fetchEasyEDAComponent("C41430893")

  // The fetched data should match C41430893
  expect(result.dataStr?.head?.c_para?.["Supplier Part"]).toBe("C41430893")
})
