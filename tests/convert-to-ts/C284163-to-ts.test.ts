import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import crystalRawEasy from "../assets/C284163.raweasy.json"

it("converts C284163 to a four-pin crystal", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain(
    'import type { CrystalProps } from "@tscircuit/props"',
  )
  expect(result).toContain(
    'type ImportedCrystalProps = Omit<CrystalProps, "frequency" | "pinVariant">',
  )
  expect(result).toContain("<crystal")
  expect(result).toContain('frequency="24MHz"')
  expect(result).toContain('pinVariant="four_pin"')
  expect(result).not.toContain("loadCapacitance=")
})
