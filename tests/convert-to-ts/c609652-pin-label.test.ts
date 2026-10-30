import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C609652.raweasy.json"

it("preserves C609652's PA0/RESET#/UPDI label on pin 16", async () => {
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
  expect(pin.label).toBe("PA0/RESET#/UPDI")

  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain('pin16: ["PA0","N_RESET","UPDI"]')
  const circuitJson = await runTscircuitCode(
    `${tsx}\nexport default () => <board width={15} height={15}><ATTINY1616_SNR name="U1" /></board>`,
  )
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(20)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(20)
  for (const { pinNumber, aliases } of [
    { pinNumber: 8, aliases: ["TOSC1", "PB3"] },
    { pinNumber: 9, aliases: ["TOSC2", "PB2"] },
    { pinNumber: 16, aliases: ["PA0", "N_RESET", "UPDI"] },
    { pinNumber: 19, aliases: ["PA3", "EXTCLK"] },
  ]) {
    const sourcePort = circuitJson.find(
      (element) =>
        element.type === "source_port" && element.pin_number === pinNumber,
    )
    if (sourcePort?.type !== "source_port")
      throw new Error(`Missing pin ${pinNumber}`)
    expect(sourcePort.port_hints).toEqual(expect.arrayContaining(aliases))
    expect(
      circuitJson.filter(
        (element) =>
          element.type === "schematic_port" &&
          element.source_port_id === sourcePort.source_port_id,
      ),
    ).toHaveLength(1)
    expect(
      circuitJson.filter(
        (element) =>
          element.type === "pcb_port" &&
          element.source_port_id === sourcePort.source_port_id,
      ),
    ).toHaveLength(1)
  }
  expect(
    circuitJson.filter(
      (element) => element.type === "source_property_ignored_warning",
    ),
  ).toHaveLength(0)
  await expect(
    convertCircuitJsonToSchematicSvg(circuitJson),
  ).toMatchSvgSnapshot(import.meta.path, "c609652-pin-label-schematic")
})

it.each(["PA0", "N_RESET", "UPDI"])(
  "connects C609652 pin 16 using %s",
  async (alias) => {
    const tsx = await convertBetterEasyToTsx({
      betterEasy: EasyEdaJsonSchema.parse(chipRawEasy),
    })
    const circuitJson = await runTscircuitCode(`${tsx}
    export default () => <board width={15} height={15}>
      <ATTINY1616_SNR name="U1" />
      <net name="program" />
      <trace from={${JSON.stringify(`.U1 > .${alias}`)}} to="net.program" />
    </board>
  `)
    const sourcePort = circuitJson.find(
      (element) => element.type === "source_port" && element.pin_number === 16,
    )
    if (sourcePort?.type !== "source_port") throw new Error("Missing pin 16")
    const traces = circuitJson.filter(
      (element) => element.type === "source_trace",
    )
    expect(traces).toHaveLength(1)
    expect(traces[0].connected_source_port_ids).toEqual([
      sourcePort.source_port_id,
    ])
  },
)
