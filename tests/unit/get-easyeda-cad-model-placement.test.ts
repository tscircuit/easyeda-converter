import { expect, test } from "bun:test"
import { getEasyEdaCadModelPlacement } from "lib/websafe/get-easyeda-cad-model-placement"
import { getCadModelOffsetMmFromBounds } from "lib/websafe/get-easyeda-cad-placement-helpers"

const createEasyEdaJson = ({
  cRotation = "0,0,45",
  cOrigin = "4000,3000",
  childPoints,
}: {
  cRotation?: string
  cOrigin?: string
  childPoints?: string
} = {}) =>
  ({
    lcsc: { number: "C123456" },
    packageDetail: {
      dataStr: {
        head: { x: 4000, y: 3000 },
        shape: [
          {
            type: "SVGNODE",
            svgData: {
              attrs: {
                uuid: "uuid-test-model",
                c_origin: cOrigin,
                c_rotation: cRotation,
                z: "0",
              },
              childNodes: childPoints
                ? [{ attrs: { points: childPoints } }]
                : [],
            },
          },
        ],
      },
    },
  }) as any

test("getCadModelOffsetMmFromBounds supports non-orthogonal c_rotation Z angles and comma-separated child node points", () => {
  const bounds = {
    min: { x: -1, y: -1, z: 0 },
    max: { x: 1, y: 1, z: 2 },
  }
  const offset = getCadModelOffsetMmFromBounds(
    createEasyEdaJson({
      cRotation: "0,0,45",
      childPoints: "4000,3000 4003.937007874,3000",
    }),
    bounds,
  )

  expect(offset).not.toBeNull()
  expect(offset!.x).toBeCloseTo(-Math.SQRT1_2 / 2, 4)
  expect(offset!.y).toBeCloseTo(Math.SQRT1_2 / 2, 4)
})

test("getEasyEdaCadModelPlacement recomputes footprint-specific offsets from cached OBJ bounds and evicts failed fetches", async () => {
  let calls = 0
  const mockFetch = (async () => {
    calls += 1
    if (calls === 1) {
      return { ok: false, text: async () => "" } as any
    }
    return {
      ok: true,
      text: async () => "v -1 -1 0\nv 1 1 2\n",
    } as any
  }) as unknown as typeof globalThis.fetch

  const firstAttempt = await getEasyEdaCadModelPlacement(
    createEasyEdaJson({ cOrigin: "4000,3000", cRotation: "0,0,0" }),
    { fetch: mockFetch },
  )
  expect(firstAttempt).toBeNull()

  const placementA = await getEasyEdaCadModelPlacement(
    createEasyEdaJson({ cOrigin: "4000,3000", cRotation: "0,0,0" }),
    { fetch: mockFetch },
  )
  const placementB = await getEasyEdaCadModelPlacement(
    createEasyEdaJson({ cOrigin: "4003.937007874,3000", cRotation: "0,0,0" }),
    { fetch: mockFetch },
  )

  expect(calls).toBe(2)
  expect(placementA?.positionXMm).toBeCloseTo(0, 4)
  expect(placementB?.positionXMm).toBeCloseTo(-1, 4)
})
