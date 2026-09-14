import { expect, test } from "bun:test"
import raw from "tests/assets/C2879827.raweasy.json"
import { EasyEdaJsonSchema, convertEasyEdaJsonToCircuitJson } from "lib/index"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { getBoardOutlineNotches } from "lib/utils/get-board-outline-notches"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"

test("generated TSX renders the notch", async () => {
  const circuit = convert()
  const rendered = await runTscircuitCode(
    `export default () => ${generateFootprintTsx(circuit)}`,
  )
  const expected = circuit.find((e) => e.type === "pcb_cutout")!
  const actual = rendered.filter((e) => e.type === "pcb_cutout")
  expect(actual).toHaveLength(1)
  expect(actual[0]).toMatchObject({
    shape: expected.shape,
    points: "points" in expected ? expected.points : [],
  })
})

const convert = (shouldRecenter = true) =>
  convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(raw), {
    shouldRecenter,
  })

test("C2879827 preserves the 8.4 mm board notch and both mounting slots", () => {
  const circuit = convert()
  const cutouts = circuit.filter((e) => e.type === "pcb_cutout")
  expect(cutouts).toHaveLength(1)
  const cutout = cutouts[0]!
  if (cutout.shape !== "polygon") throw new Error("Expected polygon")
  expect(cutout.points).toHaveLength(4)
  const xs = cutout.points.map((p) => p.x)
  const ys = cutout.points.map((p) => p.y)
  expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(8.4, 3)
  expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(11.63, 3)
  const slots = circuit.filter((e) => e.type === "pcb_plated_hole")
  expect(slots).toHaveLength(2)
  expect(Math.max(...ys)).toBeCloseTo(
    slots[0]!.y - (3006.9688 - 3001.378) * 0.254,
    5,
  )
  expect(generateFootprintTsx(circuit)).toContain(
    `<cutout shape="polygon" points={${JSON.stringify(cutout.points)}} />`,
  )
  expect(convertCircuitJsonToPcbSvg(circuit)).toMatchSvgSnapshot(
    import.meta.path,
  )
})

test("notch coordinates retain EasyEDA units before recentering", () => {
  const cutout = convert(false).find((e) => e.type === "pcb_cutout")!
  if (cutout.shape !== "polygon") throw new Error("Expected polygon")
  expect(
    cutout.points.some(
      (p) =>
        Math.abs(p.x - 3972.6381 * 0.254) < 1e-8 &&
        Math.abs(p.y - 3006.9688 * 0.254) < 1e-8,
    ),
  ).toBe(true)
})

const track = (points: number[][], layer = 10) => ({
  type: "TRACK" as const,
  id: "test",
  layer,
  width: 1,
  points: points.map(([x, y]) => ({ x: x!, y: y! })),
})

test("joins shuffled/reversed segments and keeps disconnected notches separate", () => {
  const tracks = [
    track([
      [4, 0],
      [4, 6],
    ]),
    track([
      [0, 0],
      [4, 0],
    ]),
    track([
      [0, 6],
      [0, 3],
      [0, 0],
    ]),
  ]
  expect(getBoardOutlineNotches(tracks)).toHaveLength(1)
  expect(
    getBoardOutlineNotches([
      ...tracks,
      track([
        [10, 6],
        [10, 0],
        [14, 0],
        [14, 6],
      ]),
    ]),
  ).toHaveLength(2)
  expect(
    getBoardOutlineNotches(
      tracks.map((t) => ({
        ...t,
        points: t.points.map((p) => ({ x: -p.y, y: p.x })),
      })),
    ),
  ).toHaveLength(1)
})

test("does not turn ambiguous outlines or other layers into cutouts", () => {
  for (const points of [
    [
      [0, 0],
      [4, 0],
    ],
    [
      [0, 0],
      [4, 0],
      [4, 6],
    ],
    [
      [0, 0],
      [4, 0],
      [4, 6],
      [0, 6],
      [0, 0],
    ],
    [
      [0, 0],
      [4, 1],
      [4, 6],
      [0, 6],
    ],
    [
      [1, 6],
      [0, 6],
      [0, 0],
      [4, 0],
      [4, 6],
      [3, 6],
    ],
  ])
    expect(getBoardOutlineNotches([track(points)])).toHaveLength(0)
  expect(
    getBoardOutlineNotches([
      track(
        [
          [0, 6],
          [0, 0],
          [4, 0],
          [4, 6],
        ],
        3,
      ),
    ]),
  ).toHaveLength(0)
  expect(
    getBoardOutlineNotches([
      track([
        [0, 6],
        [0, 0],
        [4, 0],
        [4, 6],
      ]),
      track([
        [0, 0],
        [-2, 0],
      ]),
    ]),
  ).toHaveLength(0)
})
