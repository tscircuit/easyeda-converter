import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import chipRawEasy from "../assets/C9972.raweasy.json"

it("preserves the exact C9972 manufacturer part number", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("export const XC6206P302MR_G")
  expect(result).toContain('manufacturerPartNumber="XC6206P302MR-G"')
})

it("reports missing manufacturer part number metadata", async () => {
  const rawEasyWithoutManufacturerPartNumber = structuredClone(chipRawEasy)
  rawEasyWithoutManufacturerPartNumber.dataStr.head.c_para[
    "Manufacturer Part"
  ] = null
  const betterEasy = EasyEdaJsonSchema.parse(
    rawEasyWithoutManufacturerPartNumber,
  )
  await expect(convertBetterEasyToTsx({ betterEasy })).rejects.toThrow(
    "Missing manufacturer part number for C9972",
  )
})
