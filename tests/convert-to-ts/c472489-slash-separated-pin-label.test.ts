import { expect, it } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import chipRawEasy from "../assets/C472489.raweasy.json"

it("preserves C472489 slash-separated pin 20 label", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) =>
      shape.includes("~#RST/NMI/SBWTDIO~"),
    ),
  ).toBeTrue()

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain('pin20: ["N_RST","NMI","SBWTDIO"]')
  expect(result).not.toContain("RST/NMI/SBWTDIO")
})
