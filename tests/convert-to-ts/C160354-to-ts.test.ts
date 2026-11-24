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
          manufacturerPartNumber="B4B-PH-SM4-TB(LF)(SN)"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-1.157986mm" pcbY="2.346947mm" width="5.999988mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-1.157986mm" pcbY="0.346951mm" width="5.999988mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.157986mm" pcbY="-1.653045mm" width="5.999988mm" height="0.999998mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="1.157986mm" pcbY="-5.998985mm" width="3.3999932mm" height="1.7999964mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="1.157986mm" pcbY="4.698987mm" width="3.3999932mm" height="1.7999964mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.157986mm" pcbY="-3.650501mm" width="5.999988mm" height="0.999998mm" shape="rect" />
    <silkscreenpath route={[{"x":3.667836,"y":5.348973},{"x":3.667836,"y":-6.651028}]} />
    <silkscreenpath route={[{"x":-1.332001,"y":3.349485},{"x":-1.331976,"y":5.350472}]} />
    <silkscreenpath route={[{"x":-1.332001,"y":-6.651028},{"x":-1.332001,"y":-4.649991}]} />
    <silkscreenpath route={[{"x":-1.332001,"y":-6.651028},{"x":-0.773125,"y":-6.651028}]} />
    <silkscreenpath route={[{"x":3.667836,"y":-6.651028},{"x":3.089148,"y":-6.651028}]} />
    <silkscreenpath route={[{"x":-1.331976,"y":5.350472},{"x":-0.773125,"y":5.350472}]} />
    <silkscreenpath route={[{"x":3.089148,"y":5.350472},{"x":3.667836,"y":5.350472}]} />
    <silkscreentext text="{NAME}" pcbX="-5.146296mm" pcbY="-0.651015mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-4.40798,"y":-7.148983},{"x":-4.40798,"y":5.848985},{"x":3.938994,"y":5.848985},{"x":3.938994,"y":-7.148983},{"x":-4.40798,"y":-7.148983}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160354.obj?uuid=2aab12cc3f1d49b885724ec3c95374da",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160354.step?uuid=2aab12cc3f1d49b885724ec3c95374da",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 1.189001, y: -0.649999, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
