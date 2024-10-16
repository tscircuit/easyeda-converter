import { it, expect } from "bun:test"
import atmegaRawEasy from "../assets/C14877.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib"

it("should convert atmega328p into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(atmegaRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })
  // TODO snapshot
})
