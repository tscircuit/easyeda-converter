import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2913206.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/soup-util"
import type { PcbSmtPadRect } from "circuit-json"

it("should convert C2913206 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  const smtPad1 = su(circuitJson)
    .pcb_smtpad.list()
    .find((smtpad) => smtpad.port_hints?.includes("pin1"))! as PcbSmtPadRect

  expect(smtPad1.width > smtPad1.height).toBeTrue()

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const pinLabelString = result.match(/const pinLabels = \{[\s\S]*?\}/gm)?.[0]
  expect(pinLabelString).toMatchSnapshot()
})
