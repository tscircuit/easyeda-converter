import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C160354.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C160354 into typescript file", async () => {
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
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"]
    } as const

    export const B4B_PH_SM4_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicrect schX={1.27} schY={0} width={10.16} height={12.7} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -2.54, y: 5.08 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-6.35} schY={3.81} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-6.35} schY={1.27} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-6.35} schY={-1.27} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="left" schX={-6.35} schY={-3.81} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="down" schX={3.81} schY={-8.89} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["6"]} direction="up" schX={3.81} schY={8.89} schStemLength={2.54} />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C160354"
      ]
    }}
          manufacturerPartNumber="B4B_PH_SM4_TB_LF__SN_"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="2.996946mm" pcbY="0.5079873mm" width="0.999998mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.99695mm" pcbY="0.5079873mm" width="0.999998mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.003046mm" pcbY="0.5079873mm" width="0.999998mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-5.348986mm" pcbY="-1.8079847mm" width="1.7999964mm" height="3.3999932mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="5.348986mm" pcbY="-1.8079847mm" width="1.7999964mm" height="3.3999932mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-3.000502mm" pcbY="0.5079873mm" width="0.999998mm" height="5.999988mm" shape="rect" />
    <silkscreenpath route={[{"x":5.998971999999753,"y":-4.317834900000207},{"x":-6.001029400000334,"y":-4.317834900000207}]} />
    <silkscreenpath route={[{"x":3.999483999999825,"y":0.6820026999998845},{"x":6.000470599999744,"y":0.6819772999999714}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":0.6820026999998845},{"x":-3.9999920000002476,"y":0.6820026999998845}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":0.6820026999998845},{"x":-6.001029400000334,"y":0.12312649999978476}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":-4.317834900000207},{"x":-6.001029400000334,"y":-3.7391467000001057}]} />
    <silkscreenpath route={[{"x":6.000470599999744,"y":0.6819772999999714},{"x":6.000470599999744,"y":0.12312649999978476}]} />
    <silkscreenpath route={[{"x":6.000470599999744,"y":-3.7391467000001057},{"x":6.000470599999744,"y":-4.317834900000207}]} />
    <silkscreentext text="{NAME}" pcbX="-0.001016mm" pcbY="4.4962973mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-6.49941600000011,"y":3.746297299999924},{"x":6.4973839999997836,"y":3.746297299999924},{"x":6.4973839999997836,"y":-4.576902700000119},{"x":-6.49941600000011,"y":-4.576902700000119},{"x":-6.49941600000011,"y":3.746297299999924}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160354.obj?uuid=2aab12cc3f1d49b885724ec3c95374da",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160354.step?uuid=2aab12cc3f1d49b885724ec3c95374da",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0, y: -1.8390001000000211, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
