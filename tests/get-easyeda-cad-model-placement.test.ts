import { describe, expect, test } from "bun:test"
import chipRawEasy from "./assets/C393941.raweasy.json"
import audioJackRawEasy from "./assets/C18185602.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { getCadModelOffsetMmFromBounds } from "lib/websafe/get-easyeda-cad-placement-helpers"

describe("getCadModelOffsetMmFromBounds", () => {
  test("derives XY placement from explicit bounds even when _objMetadata is missing", () => {
    const withMetadata = EasyEdaJsonSchema.parse(chipRawEasy)
    const bounds = withMetadata._objMetadata?.bounds

    if (!bounds) {
      throw new Error("Expected fixture to include _objMetadata.bounds")
    }

    const withoutMetadata = structuredClone(withMetadata)
    delete withoutMetadata._objMetadata

    const offset = getCadModelOffsetMmFromBounds(withoutMetadata, bounds)

    expect(offset).not.toBeNull()
    expect(offset?.x).toBeCloseTo(-0.00003810000009707437, 12)
    expect(offset?.y).toBeCloseTo(2.4440268000000516, 12)
  })

  test("rebases XY against recentered footprint bounds", () => {
    const betterEasy = EasyEdaJsonSchema.parse(audioJackRawEasy)
    const bounds = betterEasy._objMetadata?.bounds

    if (!bounds) {
      throw new Error("Expected fixture to include _objMetadata.bounds")
    }

    const offset = getCadModelOffsetMmFromBounds(betterEasy, bounds, {
      footprintBoundsCenterMm: {
        x: 1008.338979,
        y: 763.28397,
      },
    })

    expect(offset).not.toBeNull()
    expect(offset?.x).toBeCloseTo(1.383957099999975, 12)
    expect(offset?.y).toBeCloseTo(-0.0050000000000001155, 12)
  })
})
