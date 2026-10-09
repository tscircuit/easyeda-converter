import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import chipRawEasy from "../assets/C46749.raweasy.json"

it("does not infer pin attributes from labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin1: ["GND"]')
  expect(result).toContain('pin8: ["VCC"]')
  expect(result).not.toContain("const pinAttributes")
  expect(result).not.toContain("pinAttributes={pinAttributes}")
})

it("preserves explicitly supplied pin attributes", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
    pinAttributes: {
      pin1: { requiresGround: true },
      pin8: { requiresPower: true },
    },
  })

  expect(result).toContain("pin1: {requiresGround: true}")
  expect(result).toContain("pin8: {requiresPower: true}")
  expect(result).toContain("pinAttributes={pinAttributes}")
})
