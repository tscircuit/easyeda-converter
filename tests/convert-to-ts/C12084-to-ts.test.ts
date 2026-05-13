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
    <silkscreenpath route={[{"x":-1.7548859999999422,"y":-0.7691119999998364},{"x":-1.7600010105124966,"y":-0.8079643621365449},{"x":-1.774997462536362,"y":-0.8441689999999653},{"x":-1.7988533726489777,"y":-0.8752586273509451},{"x":-1.8299429999999575,"y":-0.8991145374635607},{"x":-1.866147637863378,"y":-0.9141109894874262},{"x":-1.9050000000000864,"y":-0.9192259999999806},{"x":-1.9438523621365675,"y":-0.9141109894874262},{"x":-1.980056999999988,"y":-0.8991145374635607},{"x":-2.0111466273510814,"y":-0.8752586273509451},{"x":-2.035002537463697,"y":-0.8441689999999653},{"x":-2.049998989487449,"y":-0.8079643621365449},{"x":-2.055114000000003,"y":-0.7691119999998364},{"x":-2.049998989487449,"y":-0.7302596378633552},{"x":-2.035002537463697,"y":-0.6940549999999348},{"x":-2.0111466273510814,"y":-0.6629653726488414},{"x":-1.980056999999988,"y":-0.6391094625362257},{"x":-1.9438523621365675,"y":-0.6241130105124739},{"x":-1.9050000000000864,"y":-0.6189979999999196},{"x":-1.866147637863378,"y":-0.6241130105124739},{"x":-1.8299429999999575,"y":-0.6391094625362257},{"x":-1.7988533726489777,"y":-0.6629653726488414},{"x":-1.774997462536362,"y":-0.6940549999999348},{"x":-1.7600010105124966,"y":-0.7302596378633552},{"x":-1.7548859999999422,"y":-0.7691119999998364}]} />
    <silkscreenpath route={[{"x":-2.50139200000001,"y":-2.7724099999999225},{"x":-2.5065070105124505,"y":-2.8112623621365174},{"x":-2.521503462536316,"y":-2.8474670000000515},{"x":-2.5453593726489316,"y":-2.8785566273510312},{"x":-2.5764489999999114,"y":-2.902412537463647},{"x":-2.6126536378634455,"y":-2.9174089894875124},{"x":-2.6515060000000403,"y":-2.922523999999953},{"x":-2.6903583621365215,"y":-2.9174089894875124},{"x":-2.726562999999942,"y":-2.902412537463647},{"x":-2.757652627351149,"y":-2.8785566273510312},{"x":-2.7815085374637647,"y":-2.8474670000000515},{"x":-2.796504989487403,"y":-2.8112623621365174},{"x":-2.801619999999957,"y":-2.7724099999999225},{"x":-2.796504989487403,"y":-2.7335576378634414},{"x":-2.7815085374637647,"y":-2.697353000000021},{"x":-2.757652627351149,"y":-2.666263372648814},{"x":-2.726562999999942,"y":-2.642407462536198},{"x":-2.6903583621365215,"y":-2.62741101051256},{"x":-2.6515060000000403,"y":-2.6222960000000057},{"x":-2.6126536378634455,"y":-2.62741101051256},{"x":-2.5764489999999114,"y":-2.642407462536198},{"x":-2.5453593726489316,"y":-2.666263372648814},{"x":-2.521503462536316,"y":-2.697353000000021},{"x":-2.5065070105124505,"y":-2.7335576378634414},{"x":-2.50139200000001,"y":-2.7724099999999225}]} />
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
