import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C410353.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C410353 into typescript file", async () => {
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
      pin1: ["pin1"],
      pin2: ["CMD"],
      pin3: ["VSS1"],
      pin4: ["VDD"],
      pin5: ["CLK"],
      pin6: ["VSS2"],
      pin7: ["DAT0"],
      pin8: ["DAT1"],
      pin9: ["DAT2"],
      pin10: ["CD"],
      pin11: ["WP"],
      pin12: ["EP1"],
      pin13: ["EP2"]
    } as const

    export const SD_111 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicrect schX={0} schY={0} width={22.86} height={15.24} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -10.16, y: 6.35 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-13.97} schY={5.08} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["CMD"]} direction="left" schX={-13.97} schY={2.54} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["VSS1"]} direction="left" schX={-13.97} schY={0} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["VDD"]} direction="left" schX={-13.97} schY={-2.54} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["CLK"]} direction="left" schX={-13.97} schY={-5.08} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["VSS2"]} direction="right" schX={13.97} schY={-5.08} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["DAT0"]} direction="right" schX={13.97} schY={-2.54} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["DAT1"]} direction="right" schX={13.97} schY={0} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["DAT2"]} direction="right" schX={13.97} schY={2.54} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["CD"]} direction="right" schX={13.97} schY={5.08} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["WP"]} direction="down" schX={-3.81} schY={-10.16} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["EP1","EP"]} direction="down" schX={0} schY={-10.16} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["EP2","EP"]} direction="down" schX={2.54} schY={-10.16} schStemLength={2.54} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C410353"
      ]
    }}
          manufacturerPartNumber="SD_111"
          footprint={<footprint>
            <hole pcbX="-12.200001mm" pcbY="-12.1249567mm" diameter="1.700022mm" />
    <hole pcbX="12.000103mm" pcbY="-12.1249567mm" diameter="1.700022mm" />
    <smtpad portHints={["pin1"]} pcbX="6.779895mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="4.280027mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.980059mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.719963mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-3.220085mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-5.719953mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-8.149971mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-9.849993mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="9.280017mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="2.630043mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-13.199999mm" pcbY="12.1749693mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-14.050137mm" pcbY="-10.0251387mm" width="1.1999976mm" height="1.999996mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="14.050137mm" pcbY="-8.8249887mm" width="1.1999976mm" height="1.999996mm" shape="rect" />
    <silkscreenpath route={[{"x":-13.922298799999908,"y":11.361966100000018},{"x":-14.223999999999933,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-10.5722927999999,"y":11.361966100000018},{"x":-12.477699199999847,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-8.872296199999937,"y":11.361966100000018},{"x":-9.127693200000067,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-6.442303600000059,"y":11.361966100000018},{"x":-7.42769659999999,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-3.94228320000002,"y":11.361966100000018},{"x":-4.997703999999885,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-1.4422881999998935,"y":11.361966100000018},{"x":-2.4976835999999594,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":0.25770840000018325,"y":11.361966100000018},{"x":0.002311400000053254,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":1.9077178000000004,"y":11.361966100000018},{"x":1.70230800000013,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":3.557701800000018,"y":11.361966100000018},{"x":3.352317400000061,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":6.057696800000144,"y":11.361966100000018},{"x":5.0023014000000785,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":8.557717200000184,"y":11.361966100000018},{"x":7.502296400000091,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":14.22400000000016,"y":-7.595374699999979},{"x":14.22400000000016,"y":11.361966100000018},{"x":10.002316800000017,"y":11.361966100000018}]} />
    <silkscreenpath route={[{"x":-14.223999999999933,"y":-11.254701899999986},{"x":-14.223999999999933,"y":-17.5940339},{"x":14.22400000000016,"y":-17.5940339},{"x":14.22400000000016,"y":-10.054704300000026}]} />
    <silkscreenpath route={[{"x":-14.223999999999933,"y":11.361966100000018},{"x":-14.223999999999933,"y":-8.79537229999994}]} />
    <silkscreentext text="{NAME}" pcbX="0.043307mm" pcbY="13.9623693mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-14.900592999999958,"y":13.212369299999864},{"x":14.987206999999898,"y":13.212369299999864},{"x":14.987206999999898,"y":-17.869230700000116},{"x":-14.900592999999958,"y":-17.869230700000116},{"x":-14.900592999999958,"y":13.212369299999864}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.obj?uuid=8a059db9b0774d54b4135935351dabe2",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.step?uuid=8a059db9b0774d54b4135935351dabe2",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.3500120000001061, y: 2.3090758999999252, z: -0.100001 },
          }}
          {...props}
        />
      )
    }"
  `)
})
