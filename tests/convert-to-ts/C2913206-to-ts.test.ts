import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2913206.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/soup-util"

it("should convert C2913206 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const pinLabelString = result.match(/const pinLabels = \{[\s\S]*?\}/gm)?.[0]
  expect(pinLabelString).toMatchSnapshot()
})
