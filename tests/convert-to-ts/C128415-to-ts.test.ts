import { it, expect } from "bun:test"
import timerRawEasy from "../assets/C128415.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib"

it("should convert 555timer into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(timerRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })
  // TODO snapshot
})
