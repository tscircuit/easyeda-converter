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
      pin8: ["GAIN","SLV"],
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

    const pinAttributes = {
      pin9: {requiresGround: true},
      pin22: {requiresGround: true},
      pin25: {requiresGround: true},
      pin28: {requiresGround: true}
    } as const

    export const TPA3118D2DAPR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C46497"
      ]
    }}
          manufacturerPartNumber="TPA3118D2DAPR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-3.715766mm" pcbY="4.875022mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-3.715766mm" pcbY="4.225036mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-3.715766mm" pcbY="3.57505mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-3.715766mm" pcbY="2.925064mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-3.715766mm" pcbY="2.275078mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-3.715766mm" pcbY="1.625092mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-3.715766mm" pcbY="0.975106mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-3.715766mm" pcbY="0.324866mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="-3.715766mm" pcbY="-0.32512mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="-3.715766mm" pcbY="-0.975106mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="-3.715766mm" pcbY="-1.625092mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="-3.715766mm" pcbY="-2.275078mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="-3.715766mm" pcbY="-2.925064mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="-3.715766mm" pcbY="-3.57505mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="-3.715766mm" pcbY="-4.225036mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="-3.715766mm" pcbY="-4.875022mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin32"]} pcbX="3.715766mm" pcbY="4.875022mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="3.715766mm" pcbY="4.225036mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="3.715766mm" pcbY="3.57505mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="3.715766mm" pcbY="2.925064mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="3.715766mm" pcbY="2.275078mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="3.715766mm" pcbY="1.625092mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="3.715766mm" pcbY="0.975106mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="3.715766mm" pcbY="0.324866mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="3.715766mm" pcbY="-0.32512mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="3.715766mm" pcbY="-0.975106mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="3.715766mm" pcbY="-1.625092mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="3.715766mm" pcbY="-2.275078mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="3.715766mm" pcbY="-2.925064mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="3.715766mm" pcbY="-3.57505mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="3.715766mm" pcbY="-4.225036mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="3.715766mm" pcbY="-4.875022mm" width="1.7314926mm" height="0.3430016mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin33"]} pcbX="0mm" pcbY="0mm" width="3.7100002mm" height="3.81mm" shape="rect" />
    <via pcbX="0.999998mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0.999998mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0.999998mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <silkscreenpath route={[{"x":-2.621407,"y":5.576189},{"x":2.621407,"y":5.576189},{"x":2.621407,"y":-5.576189},{"x":-2.621407,"y":-5.576189},{"x":-2.621407,"y":5.576189}]} />
    <silkscreencircle pcbX="-1.868932mm" pcbY="4.875022mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-3.715766mm" pcbY="5.498846mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="5.4196mm" pcbY="0.0254mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":4.831512,"y":5.749989},{"x":4.831512,"y":-5.749989},{"x":-4.831512,"y":-5.749989},{"x":-4.831512,"y":5.749989},{"x":4.831512,"y":5.749989}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46497.obj?uuid=01398eb211cd42de99baf7928a6338ec",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46497.step?uuid=01398eb211cd42de99baf7928a6338ec",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: -0.099083 },
          }}
          {...props}
        />
      )
    }"
  `)
})
