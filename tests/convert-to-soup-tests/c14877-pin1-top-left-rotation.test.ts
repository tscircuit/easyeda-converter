import { expect, it } from "bun:test"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import {
  getPin1TopLeftRotationDegrees,
  rotateFootprintToPin1TopLeft,
} from "lib/utils/rotate-footprint-to-pin1-top-left"
import chipRawEasy from "../assets/C14877.raweasy.json"

const getPinPad = (circuitJson: any[], pinName: string) =>
  circuitJson.find(
    (element) =>
      (element.type === "pcb_smtpad" || element.type === "pcb_plated_hole") &&
      element.port_hints?.includes(pinName),
  )

it("rotates the C14877 footprint so pin 1 lands at the top left", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)

  const unrotated = convertEasyEdaJsonToCircuitJson(betterEasy, {
    shouldRotateToPin1TopLeft: false,
  })
  expect(getPin1TopLeftRotationDegrees(unrotated)).toBe(270)

  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(getPin1TopLeftRotationDegrees(circuitJson)).toBe(0)

  const pin1 = getPinPad(circuitJson, "pin1")
  expect(pin1.x).toBeLessThan(0)
  expect(pin1.y).toBeGreaterThan(0)
  expect(pin1.x).toBeCloseTo(-4.3688, 3)
  expect(pin1.y).toBeCloseTo(2.7999944, 3)

  const pin2 = getPinPad(circuitJson, "pin2")
  expect(pin2.x).toBeCloseTo(pin1.x, 6)
  expect(pin2.y).toBeLessThan(pin1.y)

  const pin9 = getPinPad(circuitJson, "pin9")
  expect(pin9.y).toBeLessThan(0)
  expect(pin9.x).toBeLessThan(0)

  const pcbComponent = circuitJson.find(
    (element) => element.type === "pcb_component",
  )
  expect(pcbComponent.width).toBeCloseTo(pcbComponent.height, 1)

  const cadComponent = circuitJson.find(
    (element) => element.type === "cad_component",
  )
  expect(cadComponent.rotation.z).toBe(0)
})

it("leaves the footprint untouched when pin 1 is already at the top left", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const once = convertEasyEdaJsonToCircuitJson(betterEasy)
  const rotatedAgain = rotateFootprintToPin1TopLeft(JSON.parse(JSON.stringify(once)))
  expect(rotatedAgain).toEqual(JSON.parse(JSON.stringify(once)))
  expect(getPin1TopLeftRotationDegrees(once)).toBe(0)
})
