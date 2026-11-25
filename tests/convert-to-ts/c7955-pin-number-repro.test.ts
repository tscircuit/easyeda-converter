import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import raw from "../assets/C7955.raweasy.json"

test("repro: C7955 imports physical pad 6 as pin 9", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(raw)
  const padNumbers = betterEasy.packageDetail.dataStr.shape
    .filter((shape) => shape.type === "PAD")
    .map((pad) => pad.number)
  expect(padNumbers.sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  expect(
    betterEasy.dataStr.shape.find(
      (shape) => shape.type === "PIN" && shape.pinNumber === 6,
    ),
  ).toMatchObject({ label: "IN/B/2" })

  const importedTsx = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(`
    ${importedTsx}
    export default () => (
      <board width={8} height={10}>
        <LM393DR2G name="U1" />
      </board>
    )
  `)

  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  expect(sourcePorts.map((port) => port.pin_number).sort()).toEqual([
    1, 2, 3, 4, 5, 7, 8, 9,
  ])

  const pin9 = sourcePorts.find((port) => port.pin_number === 9)!
  const pcbPort = circuitJson
    .filter((element) => element.type === "pcb_port")
    .find((port) => port.source_port_id === pin9.source_port_id)!
  const pad = circuitJson
    .filter((element) => element.type === "pcb_smtpad")
    .find((pad) => pad.pcb_port_id === pcbPort.pcb_port_id)

  // The SOIC pad stays in the physical pin-6 position.
  if (pad?.shape !== "pill") throw new Error("Expected a SOIC pill pad")
  expect(pad.x).toBeCloseTo(0.635, 4)
  expect(pad.y).toBeCloseTo(2.7051, 4)

  await expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showPinNumbers: true }),
  ).toMatchSvgSnapshot(import.meta.path, "c7955-pin-number-repro")
})
