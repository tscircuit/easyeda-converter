import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C393941.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C393941 into typescript file", async () => {
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
    camPos: [20, 7, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["DAT2"],
      pin2: ["pin2"],
      pin3: ["CMD"],
      pin4: ["VDD"],
      pin5: ["CLX"],
      pin6: ["VSS"],
      pin7: ["DAT0"],
      pin8: ["DAT1"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"],
      pin13: ["pin13"],
      pin14: ["CD"]
    } as const

    export const TF_PUSH = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C393941"
      ]
    }}
          manufacturerPartNumber="TF_PUSH"
          footprint={<footprint>
            <hole pcbX="-4.949952mm" pcbY="-5.5500143mm" diameter="1.1999976mm" />
    <hole pcbX="3.050032mm" pcbY="-5.5500143mm" diameter="1.1999976mm" />
    <smtpad portHints={["pin8"]} pcbX="-5.449824mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-4.350004mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-3.24993mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-2.149856mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.050036mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.050038mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="1.150112mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="2.250186mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-6.549898mm" pcbY="5.4499637mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-7.750048mm" pcbY="4.4499657mm" width="1.1999976mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-7.750048mm" pcbY="-5.1499643mm" width="1.1999976mm" height="2.1999956mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="7.750048mm" pcbY="-5.1499643mm" width="1.1999976mm" height="2.1999956mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="6.850126mm" pcbY="4.4499657mm" width="1.5999968mm" height="1.499997mm" shape="rect" />
    <silkscreenpath route={[{"x":-7.239939800000002,"y":-9.550031699999863},{"x":-7.239939800000002,"y":-6.610007099999962}]} />
    <silkscreenpath route={[{"x":4.702149599999984,"y":5.449963700000012},{"x":2.8499815999998646,"y":5.449963700000012}]} />
    <silkscreenpath route={[{"x":4.702047999999877,"y":5.449709700000085},{"x":5.489447999999811,"y":5.449709700000085},{"x":5.489447999999811,"y":3.3491297000000486},{"x":5.500014399999827,"y":3.349967900000024}]} />
    <silkscreenpath route={[{"x":7.980019599999878,"y":-3.8188518999999133},{"x":7.980019599999878,"y":3.3499424999999974},{"x":5.49000680000006,"y":3.349967900000024}]} />
    <silkscreenpath route={[{"x":-7.259980400000131,"y":3.3999297000000297},{"x":-7.259980400000131,"y":-3.7600762999999233}]} />
    <silkscreenpath route={[{"x":-7.239939800000002,"y":-9.550031699999863},{"x":7.999983999999927,"y":-9.550031699999863}]} />
    <silkscreenpath route={[{"x":7.999983999999927,"y":-9.550031699999863},{"x":7.999983999999927,"y":-6.560019899999929}]} />
    <silkscreenpath route={[{"x":3.139440000000036,"y":4.7019337000000405},{"x":3.137657102934668,"y":4.688391252284077},{"x":3.132429913227611,"y":4.675771700000041},{"x":3.1241146552187047,"y":4.664935044781373},{"x":3.1132780000000366,"y":4.656619786772467},{"x":3.1006584477160004,"y":4.65139259706541},{"x":3.0871159999999236,"y":4.649609700000042},{"x":3.0735735522839605,"y":4.65139259706541},{"x":3.060954000000038,"y":4.656619786772467},{"x":3.050117344781256,"y":4.664935044781373},{"x":3.04180208677235,"y":4.675771700000041},{"x":3.036574897065293,"y":4.688391252284077},{"x":3.034791999999925,"y":4.7019337000000405},{"x":3.036574897065293,"y":4.715476147716117},{"x":3.04180208677235,"y":4.72809570000004},{"x":3.050117344781256,"y":4.738932355218822},{"x":3.060954000000038,"y":4.747247613227728},{"x":3.0735735522839605,"y":4.752474802934785},{"x":3.0871159999999236,"y":4.754257700000153},{"x":3.1006584477160004,"y":4.752474802934785},{"x":3.1132780000000366,"y":4.747247613227728},{"x":3.1241146552187047,"y":4.738932355218822},{"x":3.132429913227611,"y":4.72809570000004},{"x":3.137657102934668,"y":4.715476147716117},{"x":3.139440000000036,"y":4.7019337000000405}]} />
    <silkscreentext text="{NAME}" pcbX="-0.007112mm" pcbY="7.2523497mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.601011999999969,"y":6.502349700000082},{"x":8.586787999999842,"y":6.502349700000082},{"x":8.586787999999842,"y":-9.796450299999947},{"x":-8.601011999999969,"y":-9.796450299999947},{"x":-8.601011999999969,"y":6.502349700000082}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C393941.obj?uuid=cd5a60561ab44a95a0b64769461b3210",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C393941.step?uuid=cd5a60561ab44a95a0b64769461b3210",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000038099999983387534, y: 2.2940270999999712, z: -0.0000012000000000345068 },
          }}
          {...props}
        />
      )
    }"
  `)
})
