import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import chipRawEasy from "../assets/C9972.raweasy.json"

it("preserves the exact C9972 manufacturer part number", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("export const XC6206P302MR_G")
  expect(result).toContain('manufacturerPartNumber="XC6206P302MR-G"')
  // SPICE orders 2/3 differ from the physical number fields: Vin is pad 3.
  expect(result).toContain('pin2: ["Vout"]')
  expect(result).toContain('pin3: ["Vin"]')
  expect(result).toContain("pin3: {requiresPower: true}")
  expect(result).not.toContain("pin2: {requiresPower: true}")
})

it("reports missing manufacturer part number metadata", async () => {
  const rawEasyWithoutManufacturerPartNumber = structuredClone(chipRawEasy)
  Reflect.deleteProperty(
    rawEasyWithoutManufacturerPartNumber.dataStr.head.c_para,
    "Manufacturer Part",
  )
  const betterEasy = EasyEdaJsonSchema.parse(
    rawEasyWithoutManufacturerPartNumber,
  )
  await expect(convertBetterEasyToTsx({ betterEasy })).rejects.toThrow(
    "Missing manufacturer part number for C9972",
  )
})
