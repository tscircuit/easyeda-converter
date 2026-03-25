import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C6186.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C6186 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

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
    <courtyardoutline outline={[{"x":-4.428611149999938,"y":3.5774000000000115},{"x":5.012188849999916,"y":3.5774000000000115},{"x":5.012188849999916,"y":-3.5773999999998978},{"x":-4.428611149999938,"y":-3.5773999999998978},{"x":-4.428611149999938,"y":3.5774000000000115}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6186.obj?uuid=e80246a9471445bfb635be848806a22e",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6186.step?uuid=e80246a9471445bfb635be848806a22e",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0, y: 0, z: -0.049394 },
          }}
          {...props}
        />
      )
    }"
  `)
})
