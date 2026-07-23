import { it, expect } from "bun:test"
import { fetchEasyEDAComponent } from "lib/websafe/fetch-easyeda-json"

it("should throw descriptive error for C9900037709 (not in EasyEDA database)", async () => {
  await expect(fetchEasyEDAComponent("C9900037709")).rejects.toThrow(
    "Component with JLCPCB part number C9900037709 not found in EasyEDA database",
  )
})
