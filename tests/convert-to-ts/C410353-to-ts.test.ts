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
          supplierPartNumbers={{
      "jlcpcb": [
        "C410353"
      ]
    }}
          manufacturerPartNumber="SD_111"
          footprint={<footprint>
            <hole pcbX="-12.200001mm" pcbY="-12.5249622mm" diameter="1.700022mm" />
    <hole pcbX="12.000103mm" pcbY="-12.5249622mm" diameter="1.700022mm" />
    <smtpad portHints={["pin1"]} pcbX="6.779895mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="4.280027mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.980059mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.719963mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-3.220085mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-5.719953mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-8.149971mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-9.849993mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="9.280017mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="2.630043mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-13.199999mm" pcbY="11.7749638mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-14.050137mm" pcbY="-10.4251442mm" width="1.1999976mm" height="1.999996mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="14.050137mm" pcbY="-9.2249942mm" width="1.1999976mm" height="1.999996mm" shape="rect" />
    <silkscreenpath route={[{"x":-13.922298799999908,"y":10.961960599999998},{"x":-14.223999999999933,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-10.5722927999999,"y":10.961960599999998},{"x":-12.477699199999847,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-8.872296199999937,"y":10.961960599999998},{"x":-9.127693200000067,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-6.442303600000059,"y":10.961960599999998},{"x":-7.42769659999999,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-3.94228320000002,"y":10.961960599999998},{"x":-4.997703999999885,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-1.4422881999998935,"y":10.961960599999998},{"x":-2.4976835999999594,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":0.25770840000018325,"y":10.961960599999998},{"x":0.002311400000053254,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":1.9077178000000004,"y":10.961960599999998},{"x":1.70230800000013,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":3.557701800000018,"y":10.961960599999998},{"x":3.352317400000061,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":6.057696800000144,"y":10.961960599999998},{"x":5.0023014000000785,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":8.557717200000184,"y":10.961960599999998},{"x":7.502296400000091,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":14.22400000000016,"y":-7.9953802},{"x":14.22400000000016,"y":10.961960599999998},{"x":10.002316800000017,"y":10.961960599999998}]} />
    <silkscreenpath route={[{"x":-14.223999999999933,"y":-11.654707400000007},{"x":-14.223999999999933,"y":-17.99403940000002},{"x":14.22400000000016,"y":-17.99403940000002},{"x":14.22400000000016,"y":-10.454709800000046}]} />
    <silkscreenpath route={[{"x":-14.223999999999933,"y":10.961960599999998},{"x":-14.223999999999933,"y":-9.19537779999996}]} />
    <silkscreentext text="{NAME}" pcbX="0.043307mm" pcbY="13.5623638mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-14.900592999999958,"y":12.812363799999844},{"x":14.987206999999898,"y":12.812363799999844},{"x":14.987206999999898,"y":-18.269236200000137},{"x":-14.900592999999958,"y":-18.269236200000137},{"x":-14.900592999999958,"y":12.812363799999844}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.obj?uuid=8a059db9b0774d54b4135935351dabe2",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.step?uuid=8a059db9b0774d54b4135935351dabe2",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.3500120000001061, y: 2.7090813999999455, z: -0.100001 },
          }}
          {...props}
        />
      )
    }"
  `)
})
