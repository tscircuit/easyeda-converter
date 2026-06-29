import { it, expect } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

it("should fetch correct part for C2040", async () => {
  const result = await fetchEasyEDAComponent("C2040")

  // The fetched data should match C2040
  expect(result.dataStr?.head?.c_para?.["Supplier Part"]).toBe("C2040")
})
