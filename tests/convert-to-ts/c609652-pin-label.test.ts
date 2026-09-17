import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C609652.raweasy.json"

it("reproduces C609652 losing the PA0/RESET#/UPDI label on pin 16", async () => {
  expect(
    chipRawEasy.dataStr.shape.some((shape) =>
      shape.includes("~PA0/RESET#/UPDI~"),
    ),
  ).toBeTrue()
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const pin = betterEasy.dataStr.shape.find(
    (shape) => shape.type === "PIN" && shape.pinNumber === 16,
  )
  if (pin?.type !== "PIN") throw new Error("Missing pin 16")
  expect(pin.label).toBe("16")

  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain('pin16: ["pin16"]')
  expect(tsx).not.toContain("PA0/RESET#/UPDI")
  const circuitJson = await runTscircuitCode(
    `${tsx}\nexport default () => <board width={15} height={15}><ATTINY1616_SNR name="U1" /></board>`,
  )
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(20)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(20)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path, "c609652-pin-label-schematic")
})
