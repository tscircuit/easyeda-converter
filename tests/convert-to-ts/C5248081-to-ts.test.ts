import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C5248081.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C5248081 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [0, 20, 20],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["GND"],
      pin2: ["VCC"],
      pin3: ["SCL"],
      pin4: ["SDA"]
    } as const

    export const HS91L02W2C01 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5248081"
      ]
    }}
          manufacturerPartNumber="HS91L02W2C01"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="-3.81mm" outerDiameter="1.5999968mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-1.27mm" outerDiameter="1.5999968mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="1.27mm" outerDiameter="1.5999968mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="0mm" pcbY="3.81mm" outerDiameter="1.5999968mm" holeDiameter="0.999998mm" shape="circle" />
    <silkscreenpath route={[{"x":-1.4999970000000076,"y":5.999987999999917},{"x":36.49992699999984,"y":5.999987999999917},{"x":36.49992699999984,"y":-5.999987999999917},{"x":-1.4999970000000076,"y":-5.999987999999917},{"x":-1.4999970000000076,"y":5.999987999999917}]} />
    <silkscreentext text="1" pcbX="1.659128mm" pcbY="-5.6769mm" anchorAlignment="bottom_left" fontSize="2.032mm" />
    <silkscreentext text="{NAME}" pcbX="17.5006mm" pcbY="6.9944mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.748600000000124,"y":6.2444000000000415},{"x":36.74980000000005,"y":6.2444000000000415},{"x":36.74980000000005,"y":-6.2444000000000415},{"x":-1.748600000000124,"y":-6.2444000000000415},{"x":-1.748600000000124,"y":6.2444000000000415}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5248081.obj?uuid=9018832d564840e08b96db89bf75c8cc",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5248081.step?uuid=9018832d564840e08b96db89bf75c8cc",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -17.499964999999975, y: 0, z: -0.01 },
          }}
          {...props}
        />
      )
    }"
  `)
})
