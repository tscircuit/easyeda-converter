import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C46497.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C46497 into typescript file", async () => {
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
      pin1: ["MODSEL"],
      pin2: ["SDZ"],
      pin3: ["FAULTZ"],
      pin4: ["RINP"],
      pin5: ["RINN"],
      pin6: ["PLIMIT"],
      pin7: ["GVDD"],
      pin8: ["pin8"],
      pin9: ["GND1"],
      pin10: ["LINP"],
      pin11: ["LINN"],
      pin12: ["MUTE"],
      pin13: ["AM2"],
      pin14: ["AM1"],
      pin15: ["AM0"],
      pin16: ["SYNC"],
      pin17: ["AVCC"],
      pin18: ["PVCC4"],
      pin19: ["PVCC3"],
      pin20: ["BSNL"],
      pin21: ["OUTNL"],
      pin22: ["GND4"],
      pin23: ["OUTPL"],
      pin24: ["BSPL"],
      pin25: ["GND3"],
      pin26: ["BSNR"],
      pin27: ["OUTNR"],
      pin28: ["GND2"],
      pin29: ["OUTPR"],
      pin30: ["BSPR"],
      pin31: ["PVCC2"],
      pin32: ["PVCC1"],
      pin33: ["EP"]
    } as const

    export const TPA3118D2DAPR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C46497"
      ]
    }}
          manufacturerPartNumber="TPA3118D2DAPR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-4.875022000000058mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-4.225035999999932mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-3.575050000000033mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-2.925064000000134mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-2.2750780000000077mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.6250920000001088mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-0.9751059999999825mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.32486600000004273mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="0.32512000000008356mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="0.9751059999999825mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.625091999999995mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="2.2750780000000077mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="2.9250640000000203mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="3.5750499999999192mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="4.225035999999818mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="4.8750219999999445mm" pcbY="-3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="-4.875022000000058mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="-4.225035999999932mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="-3.575050000000033mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="-2.925064000000134mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="-2.2750780000000077mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="-1.6250920000001088mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="-0.9751059999999825mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="-0.32486600000004273mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="0.32512000000008356mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="0.9751059999999825mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="1.625091999999995mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="2.2750780000000077mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="2.9250640000000203mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="3.5750499999999192mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="4.225035999999818mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="4.8750219999999445mm" pcbY="3.7157660000000305mm" width="0.3430016mm" height="1.7314926000000002mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="0mm" pcbY="0mm" width="3.81mm" height="3.7100001999999996mm" shape="rect" />
    <via pcbX="0.9999979999998914mm" pcbY="0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998000000005mm" pcbY="0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998000000005mm" pcbY="-0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="0.9999979999998914mm" pcbY="-0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="0.9999979999998914mm" pcbY="0mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998000000005mm" pcbY="0mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="-0.999998000000005mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0mm" outerDiameter="0.6095999999999999mm" holeDiameter="0.15239999999999998mm" layers={["top","bottom"]} />
    <silkscreenpath route={[{"x":-5.576188999999999,"y":-2.621406999999863},{"x":-5.576188999999999,"y":2.6214069999999765},{"x":5.576188999999999,"y":2.6214069999999765},{"x":5.576188999999999,"y":-2.621406999999863},{"x":-5.576188999999999,"y":-2.621406999999863}]} />
    <silkscreentext text={props.name} pcbX="-0.02539999999999054mm" pcbY="5.4196000000000595mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.88880000000006,"y":4.6696000000000595},{"x":5.837999999999965,"y":4.6696000000000595},{"x":5.837999999999965,"y":-4.847399999999993},{"x":-5.88880000000006,"y":-4.847399999999993},{"x":-5.88880000000006,"y":4.6696000000000595}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46497.obj?uuid=01398eb211cd42de99baf7928a6338ec",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0, y: 0, z: -0.099083 },
          }}
          {...props}
        />
      )
    }"
  `)
})
