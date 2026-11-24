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
      pin1: ["CD1","DAT3"],
      pin2: ["CMD"],
      pin3: ["VSS1"],
      pin4: ["VDD"],
      pin5: ["CLK"],
      pin6: ["VSS2"],
      pin7: ["DAT0"],
      pin8: ["DAT1"],
      pin9: ["DAT2"],
      pin10: ["CD2"],
      pin11: ["WP"],
      pin12: ["EP1"],
      pin13: ["EP2"]
    } as const

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin4: {requiresPower: true},
      pin6: {requiresGround: true}
    } as const

    export const SD_111 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C410353"
      ]
    }}
          manufacturerPartNumber="SD-111"
          footprint={<footprint>
            <hole pcbX="13.199872mm" pcbY="-11.125086mm" diameter="1.700022mm" />
    <hole pcbX="13.199872mm" pcbY="13.075018mm" diameter="1.700022mm" />
    <smtpad portHints={["pin1"]} pcbX="-11.100054mm" pcbY="7.85481mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-11.100054mm" pcbY="5.354942mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-11.100054mm" pcbY="2.054974mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-11.100054mm" pcbY="0.354952mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-11.100054mm" pcbY="-2.14517mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-11.100054mm" pcbY="-4.645038mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-11.100054mm" pcbY="-7.075056mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-11.100054mm" pcbY="-8.775078mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-11.100054mm" pcbY="10.354932mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-11.100054mm" pcbY="3.704958mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-11.100054mm" pcbY="-12.125084mm" width="1.5999968mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="11.100054mm" pcbY="-12.975222mm" width="1.999996mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="9.899904mm" pcbY="15.125052mm" width="1.999996mm" height="1.1999976mm" shape="rect" />
    <silkscreenpath route={[{"x":-10.287051,"y":-12.847383},{"x":-10.287051,"y":-13.149085}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-9.497377},{"x":-10.287051,"y":-11.402784}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-7.797381},{"x":-10.287051,"y":-8.052778}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-5.367388},{"x":-10.287051,"y":-6.352781}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-2.867368},{"x":-10.287051,"y":-3.922789}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-0.367373},{"x":-10.287051,"y":-1.422768}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":1.332624},{"x":-10.287051,"y":1.077227}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":2.982633},{"x":-10.287051,"y":2.777223}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":4.632617},{"x":-10.287051,"y":4.427233}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":7.132612},{"x":-10.287051,"y":6.077217}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":9.632633},{"x":-10.287051,"y":8.577212}]} />
    <silkscreenpath route={[{"x":8.67029,"y":15.298915},{"x":-10.287051,"y":15.298915},{"x":-10.287051,"y":11.077232}]} />
    <silkscreenpath route={[{"x":12.329617,"y":-13.149085},{"x":18.668949,"y":-13.149085},{"x":18.668949,"y":15.298915},{"x":11.12962,"y":15.298915}]} />
    <silkscreenpath route={[{"x":-10.287051,"y":-13.149085},{"x":9.870288,"y":-13.149085}]} />
    <silkscreentext text="{NAME}" pcbX="-12.887454mm" pcbY="1.118222mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":18.610555,"y":-10.629176},{"x":18.653435,"y":-10.675164},{"x":18.669,"y":-10.736085},{"x":18.669,"y":-10.736085},{"x":18.631803,"y":-10.825887},{"x":18.542,"y":-10.863085},{"x":18.541997,"y":-10.863085},{"x":18.50628,"y":-10.857958},{"x":18.473445,"y":-10.842993},{"x":18.473445,"y":-10.842993},{"x":17.65228,"y":-10.274062},{"x":17.064223,"y":-9.809664},{"x":16.320449,"y":-9.142734},{"x":15.794922,"y":-8.608602},{"x":15.14016,"y":-7.854094},{"x":14.685373,"y":-7.258573},{"x":14.129853,"y":-6.428276},{"x":13.752912,"y":-5.780671},{"x":13.305315,"y":-4.887558},{"x":13.012109,"y":-4.197987},{"x":12.679427,"y":-3.256012},{"x":12.474539,"y":-2.53525},{"x":12.26197,"y":-1.559131},{"x":12.148599,"y":-0.818439},{"x":12.059465,"y":0.176573},{"x":12.039384,"y":0.925622},{"x":12.039384,"y":0.925622},{"x":12.05975,"y":1.679954},{"x":12.150145,"y":2.681932},{"x":12.265116,"y":3.427729},{"x":12.480673,"y":4.410413},{"x":12.688427,"y":5.135858},{"x":13.02573,"y":6.083675},{"x":13.322976,"y":6.777273},{"x":13.77668,"y":7.675206},{"x":14.158707,"y":8.325965},{"x":14.57529,"y":8.955163},{"x":15.182378,"y":9.757395},{"x":15.674707,"y":10.329272},{"x":16.377769,"y":11.04888},{"x":16.938042,"y":11.554376},{"x":17.725938,"y":12.179958},{"x":18.345277,"y":12.611062},{"x":18.345277,"y":12.611062},{"x":18.378889,"y":12.626905},{"x":18.415648,"y":12.632342},{"x":18.50545,"y":12.595145},{"x":18.542648,"y":12.505342},{"x":18.542648,"y":12.505342},{"x":18.527231,"y":12.444693},{"x":18.484723,"y":12.398769},{"x":18.484723,"y":12.398769},{"x":17.865592,"y":11.967351},{"x":17.078733,"y":11.340455},{"x":16.519888,"y":10.833369},{"x":15.819703,"y":10.110952},{"x":15.330329,"y":9.536533},{"x":14.873262,"y":8.936089},{"x":14.316469,"y":8.098158},{"x":13.939981,"y":7.44417},{"x":13.600003,"y":6.77048},{"x":13.205251,"y":5.845106},{"x":12.954262,"y":5.133454},{"x":12.68115,"y":4.165179},{"x":12.523274,"y":3.427264},{"x":12.40619,"y":2.681787},{"x":12.314125,"y":1.679954},{"x":12.293382,"y":0.925624},{"x":12.293382,"y":0.925624},{"x":12.313821,"y":0.176826},{"x":12.404542,"y":-0.817718},{"x":12.519921,"y":-1.557856},{"x":12.736223,"y":-2.532823},{"x":12.944672,"y":-3.252313},{"x":13.283053,"y":-4.191912},{"x":13.581196,"y":-4.8791},{"x":14.036174,"y":-5.768112},{"x":14.419182,"y":-6.411868},{"x":14.836738,"y":-7.033771},{"x":15.445058,"y":-7.825791},{"x":15.93822,"y":-8.389624},{"x":16.642207,"y":-9.097967},{"x":17.202987,"y":-9.594598},{"x":17.991239,"y":-10.207792},{"x":18.610555,"y":-10.629176}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":-12.150052,"y":-13.825221},{"x":-12.150052,"y":16.074899},{"x":18.823953,"y":16.074899},{"x":18.823953,"y":-13.825221},{"x":-12.150052,"y":-13.825221}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.obj?uuid=8a059db9b0774d54b4135935351dabe2",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C410353.step?uuid=8a059db9b0774d54b4135935351dabe2",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -1.234161, y: 0.724903, z: -0.100001 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 10000)
