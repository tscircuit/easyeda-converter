import { expect, test } from "bun:test"
import { PinShapeSchema } from "lib/schemas/single-letter-shape-schema"

const pin = (number?: string, visible = "1", spice = "23") => {
  const header = `P~show~0~${spice}~505~235~0~gge290~0^^505~235^^M 505 235 h -10~#000000^^1~491.3~239~0~GND~end~~~#000000`
  return number === undefined
    ? header
    : `${header}^^${visible}~495.5~234~0~${number}~start~~~#000000^^0~498~235^^0~M 495 232 L 492 235 L 495 238`
}

for (const [number, visible, expected] of [
  ["25", "1", 25],
  ["25", "0", 25],
  [" 25 ", "1", 25],
  ["0", "1", 0],
  ["A1", "1", "A1"],
  ["B12", "0", "B12"],
] as const) {
  test(`uses physical pin ${JSON.stringify(number)} with number visibility ${visible}`, () => {
    expect(PinShapeSchema.parse(pin(number, visible))).toMatchObject({
      type: "PIN",
      pinNumber: expected,
      label: "GND",
      id: "gge290",
      x: 505,
      y: 235,
    })
  })
}

for (const number of [undefined, "", "  ", "undefined", "null"]) {
  test(`falls back to SPICE number when physical number is ${JSON.stringify(number)}`, () => {
    expect(PinShapeSchema.parse(pin(number)).pinNumber).toBe(23)
    expect(PinShapeSchema.parse(pin(number, "1", "A2")).pinNumber).toBe("A2")
  })
}
