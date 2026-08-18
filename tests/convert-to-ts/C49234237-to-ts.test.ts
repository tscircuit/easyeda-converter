import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C49234237.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("reproduces C49234237 being imported as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  // This is the current incorrect output. The eventual fix should change
  // this to PushButtonProps/<pushbutton>.
  expect(result).toContain("import type { ChipProps }")
  expect(result).toContain("<chip")
})
