import { expect, it } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

it("should fetch JLCPCB shop part C9900037709 via manufacturer name fallback", async () => {
  const result = await fetchEasyEDAComponent("C9900037709")

  // C9900037709 is a JLCPCB-exclusive TXB0104 part not in EasyEDA/LCSC directly.
  // The fallback should find a TXB0104 variant via the manufacturer part name.
  expect(result).toBeDefined()
  expect(result.dataStr?.head?.c_para?.["Manufacturer Part"]).toMatch(/TXB0104/)
})
