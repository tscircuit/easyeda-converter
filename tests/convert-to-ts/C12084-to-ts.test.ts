import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C12084.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C12084 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const smtPads = circuitJson.filter((element) => element.type === "pcb_smtpad")
  expect(smtPads).toHaveLength(8)
  expect(smtPads.every((pad) => pad.shape === "pill")).toBe(true)
  for (const smtPad of smtPads) {
    if (smtPad.shape !== "pill") throw new Error("expected pill smtpad")
    expect(smtPad.radius).toBeCloseTo(0.294005)
  }
  expect(result).toContain('radius="0.294005mm" shape="pill"')

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["D"],
      pin2: ["GND"],
      pin3: ["VCC"],
      pin4: ["R"],
      pin5: ["VREF"],
      pin6: ["CANL"],
      pin7: ["CANH"],
      pin8: ["RS"]
    } as const

    export const SN65HVD230DR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C12084"
      ]
    }}
          manufacturerPartNumber="SN65HVD230DR"
          footprint={<footprint>
            <smtpad portHints={["pin5"]} pcbX="1.905mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="0.635mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.635mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-1.905mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="1.905mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="0.635mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-0.635mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-1.905mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <silkscreenpath route={[{"x":-2.5262078000000656,"y":-1.5214091999999937},{"x":-2.5262078000000656,"y":1.5214092000001074},{"x":2.526207799999952,"y":1.5214092000001074},{"x":2.526207799999952,"y":-1.5214091999999937},{"x":-2.5262078000000656,"y":-1.5214091999999937}]} />
    <silkscreentext text="{NAME}" pcbX="-0.127mm" pcbY="4.302mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.0439999999999827,"y":3.552000000000021},{"x":2.7899999999999636,"y":3.552000000000021},{"x":2.7899999999999636,"y":-3.80600000000004},{"x":-3.0439999999999827,"y":-3.80600000000004},{"x":-3.0439999999999827,"y":3.552000000000021}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C12084.obj?uuid=ec3b9f9b31a74655be3e55848dbee9c1",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C12084.step?uuid=ec3b9f9b31a74655be3e55848dbee9c1",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
