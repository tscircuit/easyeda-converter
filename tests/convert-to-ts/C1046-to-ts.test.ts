import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C1046.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C1046 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const SDFL2012S100KTF = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C1046"
      ]
    }}
          manufacturerPartNumber="SDFL2012S100KTF"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.9662159999999176mm" pcbY="0mm" width="1.1325352mm" height="1.3770101999999997mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.9662160000000313mm" pcbY="0mm" width="1.1325352mm" height="1.3770101999999997mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.0159492000000228},{"x":-1.5642590000001064,"y":1.0159492000000228},{"x":-1.6912590000000591,"y":1.0159492000000228},{"x":-1.9452590000000782,"y":0.7619492000000037},{"x":-1.9452590000000782,"y":-0.6350508000000445},{"x":-1.9452590000000782,"y":-0.7620507999999973},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
    <silkscreenpath route={[{"x":0.3407409999998663,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.610740999999848,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620507999999973},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.7619492000000037},{"x":1.610740999999848,"y":1.0159492000000228},{"x":0.3407409999998663,"y":1.0159492000000228}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=c7acac53bcbc44d68fbab8f60a747688&pn=C1046",
            rotationOffset: { x: 0, y: 0, z: 0 },
            positionOffset: { x: -1.1368683772161603e-13, y: 0.00003810000009707437, z: 0.8 },
          }}
          {...props}
        />
      )
    }"
  `)
})

it("C1046 should generate Circuit Json without errors", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)
})
