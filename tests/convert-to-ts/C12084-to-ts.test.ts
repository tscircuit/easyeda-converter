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

    const pinAttributes = {
      pin2: {requiresGround: true},
      pin3: {requiresPower: true}
    } as const

    export const SN65HVD230DR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C12084"
      ]
    }}
          manufacturerPartNumber="SN65HVD230DR"
          footprint={<footprint>
            <smtpad portHints={["pin5"]} pcbX="2.569972mm" pcbY="-1.905mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="2.569972mm" pcbY="-0.635mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="2.569972mm" pcbY="0.635mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="2.569972mm" pcbY="1.905mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-2.569972mm" pcbY="-1.905mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-2.569972mm" pcbY="-0.635mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-2.569972mm" pcbY="0.635mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-2.569972mm" pcbY="1.905mm" width="2.0450048mm" height="0.58801mm" radius="0.294005mm" shape="pill" />
    <silkscreenpath route={[{"x":-1.521409,"y":2.526208},{"x":1.521409,"y":2.526208},{"x":1.521409,"y":-2.526208},{"x":-1.521409,"y":-2.526208},{"x":-1.521409,"y":2.526208}]} />
    <silkscreencircle pcbX="-0.769112mm" pcbY="1.905mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-2.77241mm" pcbY="2.651506mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="4.302mm" pcbY="0.127mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":3.842474,"y":2.699982},{"x":3.842474,"y":-2.700008},{"x":-3.842474,"y":-2.700008},{"x":-3.842474,"y":2.699982},{"x":3.842474,"y":2.699982}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C12084.obj?uuid=ec3b9f9b31a74655be3e55848dbee9c1",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C12084.step?uuid=ec3b9f9b31a74655be3e55848dbee9c1",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0, y: 0.000013, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
