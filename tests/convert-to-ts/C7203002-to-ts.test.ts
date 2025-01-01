import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C7203002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C7203002 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  // Add more specific assertions here based on the component
})
