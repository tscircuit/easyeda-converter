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
          symbol={
            <symbol>
              <schematiccircle center={{ x: -11.43, y: 21.59 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <schematicrect schX={0} schY={-0.254} width={25.4} height={46.228} strokeWidth={0.254} color="#880000" />
              <port name="pin1" pinNumber={1} aliases={["MODSEL"]} direction="left" schX={-15.24} schY={17.78} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["SDZ"]} direction="left" schX={-15.24} schY={15.24} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["FAULTZ"]} direction="left" schX={-15.24} schY={12.7} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["RINP"]} direction="left" schX={-15.24} schY={10.16} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["RINN"]} direction="left" schX={-15.24} schY={7.62} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["PLIMIT"]} direction="left" schX={-15.24} schY={5.08} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["GVDD"]} direction="left" schX={-15.24} schY={2.54} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["8"]} direction="left" schX={-15.24} schY={0} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["GND1","GND"]} direction="left" schX={-15.24} schY={-2.54} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["LINP"]} direction="left" schX={-15.24} schY={-5.08} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["LINN"]} direction="left" schX={-15.24} schY={-7.62} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["MUTE"]} direction="left" schX={-15.24} schY={-10.16} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["AM2"]} direction="left" schX={-15.24} schY={-12.7} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["AM1"]} direction="left" schX={-15.24} schY={-15.24} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["AM0"]} direction="left" schX={-15.24} schY={-17.78} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["SYNC"]} direction="left" schX={-15.24} schY={-20.32} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["AVCC"]} direction="right" schX={15.24} schY={-20.32} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["PVCC4","PVCC"]} direction="right" schX={15.24} schY={-17.78} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["PVCC3","PVCC"]} direction="right" schX={15.24} schY={-15.24} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["BSNL"]} direction="right" schX={15.24} schY={-12.7} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["OUTNL"]} direction="right" schX={15.24} schY={-10.16} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["GND4","GND"]} direction="right" schX={15.24} schY={-7.62} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["OUTPL"]} direction="right" schX={15.24} schY={-5.08} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["BSPL"]} direction="right" schX={15.24} schY={-2.54} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["GND3","GND"]} direction="right" schX={15.24} schY={0} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["BSNR"]} direction="right" schX={15.24} schY={2.54} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["OUTNR"]} direction="right" schX={15.24} schY={5.08} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["GND2","GND"]} direction="right" schX={15.24} schY={7.62} schStemLength={2.54} />
              <port name="pin29" pinNumber={29} aliases={["OUTPR"]} direction="right" schX={15.24} schY={10.16} schStemLength={2.54} />
              <port name="pin30" pinNumber={30} aliases={["BSPR"]} direction="right" schX={15.24} schY={12.7} schStemLength={2.54} />
              <port name="pin31" pinNumber={31} aliases={["PVCC2","PVCC"]} direction="right" schX={15.24} schY={15.24} schStemLength={2.54} />
              <port name="pin32" pinNumber={32} aliases={["PVCC1","PVCC"]} direction="right" schX={15.24} schY={17.78} schStemLength={2.54} />
              <port name="pin33" pinNumber={33} aliases={["EP"]} direction="right" schX={15.24} schY={20.32} schStemLength={2.54} />
            </symbol>
          }
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
    <silkscreenpath route={[{"x":-4.724908000000141,"y":-1.8689320000000862},{"x":-4.730023010512582,"y":-1.9077843621364536},{"x":-4.7450194625364475,"y":-1.9439889999999878},{"x":-4.768875372649063,"y":-1.9750786273510812},{"x":-4.799965000000043,"y":-1.9989345374636969},{"x":-4.836169637863577,"y":-2.0139309894875623},{"x":-4.875022000000172,"y":-2.0190459999998893},{"x":-4.913874362136653,"y":-2.0139309894875623},{"x":-4.950079000000073,"y":-1.9989345374636969},{"x":-4.9811686273512805,"y":-1.9750786273510812},{"x":-5.005024537463896,"y":-1.9439889999999878},{"x":-5.020020989487534,"y":-1.9077843621364536},{"x":-5.025136000000089,"y":-1.8689320000000862},{"x":-5.020020989487534,"y":-1.8300796378633777},{"x":-5.005024537463896,"y":-1.7938749999999573},{"x":-4.9811686273512805,"y":-1.7627853726489775},{"x":-4.950079000000073,"y":-1.7389294625363618},{"x":-4.913874362136653,"y":-1.7239330105124964},{"x":-4.875022000000172,"y":-1.718817999999942},{"x":-4.836169637863577,"y":-1.7239330105124964},{"x":-4.799965000000043,"y":-1.7389294625363618},{"x":-4.768875372649063,"y":-1.7627853726489775},{"x":-4.7450194625364475,"y":-1.7938749999999573},{"x":-4.730023010512582,"y":-1.8300796378633777},{"x":-4.724908000000141,"y":-1.8689320000000862}]} />
    <silkscreenpath route={[{"x":-5.348731999999927,"y":-3.7157660000000305},{"x":-5.353847010512482,"y":-3.7546183621365117},{"x":-5.368843462536347,"y":-3.790822999999932},{"x":-5.392699372648963,"y":-3.821912627350912},{"x":-5.4237889999999425,"y":-3.845768537463755},{"x":-5.459993637863363,"y":-3.860764989487393},{"x":-5.498846000000071,"y":-3.8658799999999474},{"x":-5.5376983621365525,"y":-3.860764989487393},{"x":-5.573902999999973,"y":-3.845768537463755},{"x":-5.604992627351066,"y":-3.821912627350912},{"x":-5.628848537463682,"y":-3.790822999999932},{"x":-5.643844989487434,"y":-3.7546183621365117},{"x":-5.648959999999988,"y":-3.7157660000000305},{"x":-5.643844989487434,"y":-3.6769136378634357},{"x":-5.628848537463682,"y":-3.6407089999999016},{"x":-5.604992627351066,"y":-3.609619372648922},{"x":-5.573902999999973,"y":-3.585763462536306},{"x":-5.5376983621365525,"y":-3.5707670105124407},{"x":-5.498846000000071,"y":-3.565652},{"x":-5.459993637863363,"y":-3.5707670105124407},{"x":-5.4237889999999425,"y":-3.585763462536306},{"x":-5.392699372648963,"y":-3.609619372648922},{"x":-5.368843462536347,"y":-3.6407089999999016},{"x":-5.353847010512482,"y":-3.6769136378634357},{"x":-5.348731999999927,"y":-3.7157660000000305}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="5.4196mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.88880000000006,"y":4.6696000000000595},{"x":5.837999999999965,"y":4.6696000000000595},{"x":5.837999999999965,"y":-4.847399999999993},{"x":-5.88880000000006,"y":-4.847399999999993},{"x":-5.88880000000006,"y":4.6696000000000595}]} />
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
