import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C49234237.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C49234237 into a pushbutton component", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).toContain("import type { PushButtonProps }")
  expect(result).toContain("<pushbutton")
  expect(result).not.toContain("<chip")
})
