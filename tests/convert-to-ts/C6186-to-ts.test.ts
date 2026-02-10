import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C6186.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { runTscircuitCode } from "tscircuit"

it("should convert C6186 into typescript file", async () => {
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
      pin1: ["GND"],
      pin2: ["VOUT1"],
      pin3: ["VIN"],
      pin4: ["VOUT2"]
    } as const

    export const AMS1117_3_3 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C6186"
      ]
    }}
          manufacturerPartNumber="AMS1117_3_3"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="2.929959849999932mm" pcbY="-2.2999699999999166mm" width="2.4999949999999997mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="2.929959849999932mm" pcbY="0mm" width="2.4999949999999997mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="2.929959849999932mm" pcbY="2.2999700000000303mm" width="2.4999949999999997mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-3.009957149999991mm" pcbY="0mm" width="2.3400004mm" height="3.5999928mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.6114077499998984,"y":-3.3262061999998878},{"x":-1.6114077499998984,"y":3.3262062000000014},{"x":1.3313854499999707,"y":3.3262062000000014},{"x":1.3313854499999707,"y":-3.3262061999998878},{"x":-1.6114077499998984,"y":-3.3262061999998878}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=e80246a9471445bfb635be848806a22e&pn=C6186",
            rotationOffset: { x: 0, y: 0, z: 180 },
            positionOffset: { x: -4.026211149999995, y: 2.921000000000049, z: 0.8 },
          }}
          {...props}
        />
      )
    }"
  `)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )

  // Generate 3D snapshot for component with c_rotation: 0,0,180
  const circuitJsonFromTsx = await runTscircuitCode(result)
  await expect(circuitJsonFromTsx).toMatch3dSnapshot(import.meta.path)
})
