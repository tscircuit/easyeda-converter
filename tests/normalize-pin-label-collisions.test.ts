import { expect, test } from "bun:test"
import { normalizePinLabels } from "lib"

const collisionCases: Array<{ name: string; labels: string[][] }> = [
  {
    name: "later original suffixes",
    labels: [["A1"], ["A1"], ["A11"], ["A12"], ["A13"]],
  },
  {
    name: "existing underscore suffixes",
    labels: [["A1_"], ["A1_"], ["A1_1"], ["A1_2"]],
  },
  {
    name: "generated aliases from different bases",
    labels: Array.from({ length: 12 }, () => ["A"]).concat([["A1"], ["A1"]]),
  },
  {
    name: "canonical pin names",
    labels: [["1", "pin2"], ["2", "pin1"], ["pin11"]],
  },
  {
    name: "repeated numeric and alternate aliases",
    labels: [["2"], ["2"], ["2"], ["pin2_alt1"], ["pin2_alt2"]],
  },
  {
    name: "active-low normalized collisions",
    labels: [["#RESET"], ["N_RESET"], ["RESET1#"]],
  },
  {
    name: "object prototype names",
    labels: [
      ["__proto__"],
      ["__proto__"],
      ["constructor"],
      ["constructor"],
      ["constructor1"],
    ],
  },
]

test.each(collisionCases)(
  "allocates unique aliases with $name",
  ({ labels }) => {
    const originalLabels = structuredClone(labels)
    const normalized = normalizePinLabels(labels)
    expect(normalized).toHaveLength(labels.length)
    expect(new Set(normalized.flat()).size).toBe(normalized.flat().length)
    expect(normalized.every(([canonical]) => /^pin\d+$/.test(canonical))).toBe(
      true,
    )
    expect(normalizePinLabels(labels)).toEqual(normalized)
    expect(labels).toEqual(originalLabels)
    expect(normalized).toMatchSnapshot()
  },
)

test("keeps a canonical alias only once on its own terminal", () => {
  expect(normalizePinLabels([["1", "pin1"]])).toEqual([["pin1"]])
})

test("does not reserve numeric input labels after they become canonical names", () => {
  expect(
    normalizePinLabels([
      ["1", ""],
      ["2", ""],
    ]),
  ).toEqual([
    ["pin1", "1"],
    ["pin2", "2"],
  ])
})
