import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import crystalRawEasy from "../assets/C284163.raweasy.json"

it("reproduces C284163 as a generic chip", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('import type { ChipProps } from "@tscircuit/props"')
  expect(result).toContain("<chip")
  expect(result).not.toContain("<crystal")
})
