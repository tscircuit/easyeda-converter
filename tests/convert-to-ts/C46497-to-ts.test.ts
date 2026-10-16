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
            <smtpad portHints={["pin1"]} pcbX="-4.875022mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-4.225036mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-3.57505mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-2.925064mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-2.275078mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-1.625092mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.975106mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-0.324866mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="0.32512mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="0.975106mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="1.625092mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="2.275078mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="2.925064mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="3.57505mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="4.225036mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="4.875022mm" pcbY="-3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin32"]} pcbX="-4.875022mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin31"]} pcbX="-4.225036mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin30"]} pcbX="-3.57505mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin29"]} pcbX="-2.925064mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="-2.275078mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="-1.625092mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="-0.975106mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="-0.324866mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="0.32512mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="0.975106mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="1.625092mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="2.275078mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="2.925064mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="3.57505mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="4.225036mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="4.875022mm" pcbY="3.715766mm" width="0.3430016mm" height="1.7314926mm" radius="0.1715008mm" shape="pill" />
    <smtpad portHints={["pin33"]} pcbX="0mm" pcbY="0mm" width="3.81mm" height="3.7100002mm" shape="rect" />
    <via pcbX="0.999998mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0.999998mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0.999998mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="-0.999998mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="-0.999998mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <via pcbX="0mm" pcbY="0mm" outerDiameter="0.6096mm" holeDiameter="0.3048mm" layers={["top","bottom"]} />
    <silkscreenpath route={[{"x":-5.576188999999999,"y":-2.621406999999863},{"x":-5.576188999999999,"y":2.6214069999999765},{"x":5.576188999999999,"y":2.6214069999999765},{"x":5.576188999999999,"y":-2.621406999999863},{"x":-5.576188999999999,"y":-2.621406999999863}]} />
    <silkscreencircle pcbX="-4.875022mm" pcbY="-1.868932mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-5.498846mm" pcbY="-3.715766mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="5.4196mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-4.724908000000028,"y":-4.450079999999957},{"x":-4.727792398417591,"y":-4.479365788599125},{"x":-4.736334747856631,"y":-4.507526140766004},{"x":-4.750206770618888,"y":-4.533478869959481},{"x":-4.768875372649063,"y":-4.556226627350952},{"x":-4.791623130040534,"y":-4.574895229381127},{"x":-4.817575859234012,"y":-4.588767252143384},{"x":-4.84573621140089,"y":-4.597309601582424},{"x":-4.875022000000058,"y":-4.600193999999988},{"x":-4.904307788599226,"y":-4.597309601582424},{"x":-4.932468140766105,"y":-4.588767252143384},{"x":-4.958420869959582,"y":-4.574895229381127},{"x":-4.981168627351053,"y":-4.556226627350952},{"x":-4.999837229381228,"y":-4.533478869959481},{"x":-5.013709252143485,"y":-4.507526140766004},{"x":-5.022251601582525,"y":-4.479365788599125},{"x":-5.025136000000089,"y":-4.450079999999957},{"x":-5.022251601582525,"y":-4.420794211400789},{"x":-5.013709252143485,"y":-4.392633859233911},{"x":-4.999837229381228,"y":-4.366681130040433},{"x":-4.981168627351053,"y":-4.343933372648962},{"x":-4.958420869959582,"y":-4.325264770618787},{"x":-4.932468140766105,"y":-4.31139274785653},{"x":-4.904307788599226,"y":-4.30285039841749},{"x":-4.875022000000058,"y":-4.299965999999927},{"x":-4.84573621140089,"y":-4.30285039841749},{"x":-4.817575859234012,"y":-4.31139274785653},{"x":-4.791623130040534,"y":-4.325264770618787},{"x":-4.768875372649063,"y":-4.343933372648962},{"x":-4.750206770618888,"y":-4.366681130040433},{"x":-4.736334747856631,"y":-4.392633859233911},{"x":-4.727792398417591,"y":-4.420794211400789},{"x":-4.724908000000028,"y":-4.450079999999957}]} strokeWidth="0.2999994mm" />
    <courtyardoutline outline={[{"x":-5.749988999999914,"y":4.831512299999986},{"x":5.749989000000028,"y":4.831512299999986},{"x":5.749989000000028,"y":-4.831512299999986},{"x":-5.749988999999914,"y":-4.831512299999986},{"x":-5.749988999999914,"y":4.831512299999986}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46497.obj?uuid=01398eb211cd42de99baf7928a6338ec",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C46497.step?uuid=01398eb211cd42de99baf7928a6338ec",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: 0, y: 0, z: -0.099083 },
          }}
          {...props}
        />
      )
    }"
  `)
})
