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
          supplierPartNumbers={{
      "jlcpcb": [
        "C160354"
      ]
    }}
          manufacturerPartNumber="B4B_PH_SM4_TB_LF__SN_"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="2.9969459999997525mm" pcbY="0.507987299999968mm" width="0.9999979999999999mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.9969499999998561mm" pcbY="0.507987299999968mm" width="0.9999979999999999mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.0030460000002677mm" pcbY="0.507987299999968mm" width="0.9999979999999999mm" height="5.999988mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-5.348986000000082mm" pcbY="-1.8079847000001337mm" width="1.7999964mm" height="3.3999932mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="5.348985999999968mm" pcbY="-1.8079847000001337mm" width="1.7999964mm" height="3.3999932mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-3.000502000000324mm" pcbY="0.507987299999968mm" width="0.9999979999999999mm" height="5.999988mm" shape="rect" />
    <silkscreenpath route={[{"x":5.998971999999753,"y":-4.317834900000207},{"x":-6.001029400000334,"y":-4.317834900000207}]} />
    <silkscreenpath route={[{"x":3.999483999999825,"y":0.6820026999998845},{"x":6.000470599999744,"y":0.6819772999999714}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":0.6820026999998845},{"x":-3.9999920000002476,"y":0.6820026999998845}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":0.6820026999998845},{"x":-6.001029400000334,"y":0.12312649999978476}]} />
    <silkscreenpath route={[{"x":-6.001029400000334,"y":-4.317834900000207},{"x":-6.001029400000334,"y":-3.7391467000001057}]} />
    <silkscreenpath route={[{"x":6.000470599999744,"y":0.6819772999999714},{"x":6.000470599999744,"y":0.12312649999978476}]} />
    <silkscreenpath route={[{"x":6.000470599999744,"y":-3.7391467000001057},{"x":6.000470599999744,"y":-4.317834900000207}]} />
    <courtyardoutline outline={[{"x":-1022.5004320000003,"y":762.5373999999999},{"x":-1009.5036320000004,"y":762.5373999999999},{"x":-1009.5036320000004,"y":770.8606},{"x":-1022.5004320000003,"y":770.8606},{"x":-1022.5004320000003,"y":762.5373999999999}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=2aab12cc3f1d49b885724ec3c95374da&pn=C160354",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
