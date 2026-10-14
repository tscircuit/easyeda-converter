import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C19795120.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C19795120 into typescript file", async () => {
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
    camPos: [10, 10, 40],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"]
    } as const

    export const A_470533000 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C19795120"
      ]
    }}
          manufacturerPartNumber="470533000"
          footprint={<footprint>
            <hole pcbX="-1.27mm" pcbY="-1.1975084mm" diameter="1.2499848mm" />
    <platedhole  portHints={["pin1"]} pcbX="3.81mm" pcbY="0.9625076mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="1.27mm" pcbY="0.9625076mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-1.27mm" pcbY="0.9625076mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-3.81mm" pcbY="0.9625076mm" outerDiameter="1.7199864mm" holeDiameter="1.0200132mm" shape="circle" />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":2.5571449999999913},{"x":5.0799999999998136,"y":2.5571449999999913}]} />
    <silkscreenpath route={[{"x":-1.9940778000001274,"y":-1.5774923999999828},{"x":-5.080000000000041,"y":-1.5774923999999828}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-1.5774923999999828},{"x":-5.080000000000041,"y":4.264507600000002},{"x":5.0799999999998136,"y":4.264507600000002},{"x":5.0799999999998136,"y":-1.5774923999999828},{"x":-0.5459222000001773,"y":-1.5774923999999828}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="5.2645076mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-5.080000000000155,"y":4.264507600000002},{"x":-5.080000000000155,"y":2.613507600000048},{"x":5.0799999999998136,"y":2.613507600000048},{"x":5.0799999999998136,"y":4.264507600000002},{"x":-5.080000000000155,"y":4.264507600000002}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":-1.0320020000001477,"y":-1.1975084000000606},{"x":-1.0365750648346648,"y":-1.2439395064592418},{"x":-1.0501185190214528,"y":-1.2885862915360349},{"x":-1.0721118952112647,"y":-1.3297330043183138},{"x":-1.1017100002912912,"y":-1.365798399708865},{"x":-1.1377753956818424,"y":-1.3953965047888914},{"x":-1.1789221084641213,"y":-1.4173898809787033},{"x":-1.2235688935409144,"y":-1.4309333351654914},{"x":-1.2700000000000955,"y":-1.4355064000000084},{"x":-1.3164311064592766,"y":-1.4309333351654914},{"x":-1.3610778915360697,"y":-1.4173898809787033},{"x":-1.4022246043183486,"y":-1.3953965047888914},{"x":-1.4382899997088998,"y":-1.365798399708865},{"x":-1.4678881047889263,"y":-1.3297330043183138},{"x":-1.4898814809787382,"y":-1.2885862915360349},{"x":-1.5034249351655262,"y":-1.2439395064592418},{"x":-1.5079980000000432,"y":-1.1975084000000606},{"x":-1.5034249351655262,"y":-1.1510772935408795},{"x":-1.4898814809787382,"y":-1.1064305084640864},{"x":-1.4678881047889263,"y":-1.0652837956818075},{"x":-1.4382899997088998,"y":-1.0292184002912563},{"x":-1.4022246043183486,"y":-0.9996202952112299},{"x":-1.3610778915360697,"y":-0.977626919021418},{"x":-1.3164311064592766,"y":-0.9640834648346299},{"x":-1.2700000000000955,"y":-0.9595104000001129},{"x":-1.2235688935409144,"y":-0.9640834648346299},{"x":-1.1789221084641213,"y":-0.977626919021418},{"x":-1.1377753956818424,"y":-0.9996202952112299},{"x":-1.1017100002912912,"y":-1.0292184002912563},{"x":-1.0721118952112647,"y":-1.0652837956818075},{"x":-1.0501185190214528,"y":-1.1064305084640864},{"x":-1.0365750648346648,"y":-1.1510772935408795},{"x":-1.0320020000001477,"y":-1.1975084000000606}]} strokeWidth="0.4750054mm" />
    <courtyardoutline outline={[{"x":-5.349989800000117,"y":4.517504799999983},{"x":5.349989799999889,"y":4.517504799999983},{"x":5.349989799999889,"y":-2.072500800000057},{"x":-5.349989800000117,"y":-2.072500800000057},{"x":-5.349989800000117,"y":4.517504799999983}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19795120.obj?uuid=9a93067adc7a4c82860f56e3024924ad",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19795120.step?uuid=9a93067adc7a4c82860f56e3024924ad",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.9225170000000433, z: -3.295008 },
          }}
          {...props}
        />
      )
    }"
  `)
})
