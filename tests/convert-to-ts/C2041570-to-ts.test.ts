import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import inductorRawEasy from "../assets/C2041570.raweasy.json"

it("reproduces C2041570 as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(inductorRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('import type { ChipProps } from "@tscircuit/props"')
  expect(result).toContain("<chip")
  expect(result).not.toContain("<inductor")
})
