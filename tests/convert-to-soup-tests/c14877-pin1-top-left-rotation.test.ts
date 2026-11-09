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
  const rotatedAgain = rotateFootprintToPin1TopLeft(
    JSON.parse(JSON.stringify(once)),
  )
  expect(rotatedAgain).toEqual(JSON.parse(JSON.stringify(once)))
  expect(getPin1TopLeftRotationDegrees(once)).toBe(0)
})

it("rotates silkscreen/courtyard rects by their ccw_rotation without swapping dimensions", () => {
  const elements = [
    {
      type: "pcb_smtpad",
      shape: "rect",
      x: -2,
      y: -1,
      width: 0.5,
      height: 0.5,
      port_hints: ["pin1"],
    },
    {
      type: "pcb_smtpad",
      shape: "rect",
      x: 2,
      y: 1,
      width: 0.5,
      height: 0.5,
      port_hints: ["pin2"],
    },
    {
      type: "pcb_silkscreen_rect",
      center: { x: 1, y: 0.5 },
      width: 4,
      height: 2,
      ccw_rotation: 0,
    },
  ] as any[]

  rotateFootprintToPin1TopLeft(elements)

  const rect = elements.find((e) => e.type === "pcb_silkscreen_rect")!
  // 270 CCW: center (1, 0.5) -> (0.5, -1); dimensions stay 4x2 and the
  // orientation is carried by ccw_rotation (0 + 270).
  expect(rect.center).toEqual({ x: 0.5, y: -1 })
  expect(rect.width).toBe(4)
  expect(rect.height).toBe(2)
  expect(rect.ccw_rotation).toBe(270)
})

it("rotates pcb_component center around the pad bounds center", () => {
  const elements = [
    {
      type: "pcb_smtpad",
      shape: "rect",
      x: -2,
      y: -1,
      width: 0.5,
      height: 0.5,
      port_hints: ["pin1"],
    },
    {
      type: "pcb_smtpad",
      shape: "rect",
      x: 2,
      y: 1,
      width: 0.5,
      height: 0.5,
      port_hints: ["pin2"],
    },
    // Asymmetric artwork shifts the all-elements bounds center away from the
    // pad bounds center, so pcb_component.center is not at the pad center.
    {
      type: "pcb_silkscreen_path",
      route: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ],
    },
    {
      type: "pcb_component",
      center: { x: 2.5, y: 0 },
      width: 5,
      height: 3,
    },
  ] as any[]

  rotateFootprintToPin1TopLeft(elements)

  const component = elements.find((e) => e.type === "pcb_component")!
  // 270 CCW around the pad bounds center (0, 0): (2.5, 0) -> (0, -2.5)
  expect(component.center).toEqual({ x: 0, y: -2.5 })
  expect(component.width).toBe(3)
  expect(component.height).toBe(5)
})
