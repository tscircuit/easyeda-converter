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
            <smtpad portHints={["pin5"]} pcbX="1.905mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="0.635mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.635mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-1.905mm" pcbY="2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="1.905mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="0.635mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-0.635mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <smtpad portHints={["pin1"]} pcbX="-1.905mm" pcbY="-2.569972mm" width="0.58801mm" height="2.0450048mm" radius="0.294005mm" shape="pill" />
    <silkscreenpath route={[{"x":-2.5262078000000656,"y":-1.5214091999999937},{"x":-2.5262078000000656,"y":1.5214092000001074},{"x":2.526207799999952,"y":1.5214092000001074},{"x":2.526207799999952,"y":-1.5214091999999937},{"x":-2.5262078000000656,"y":-1.5214091999999937}]} />
    <silkscreencircle pcbX="-1.905mm" pcbY="-0.769112mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-2.651506mm" pcbY="-2.77241mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.127mm" pcbY="4.302mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-1.754886000000056,"y":-3.40004399999998},{"x":-1.7577703984176196,"y":-3.429329788599148},{"x":-1.7663127478566594,"y":-3.4574901407660263},{"x":-1.7801847706189164,"y":-3.4834428699595037},{"x":-1.7988533726490914,"y":-3.506190627350975},{"x":-1.8216011300405626,"y":-3.52485922938115},{"x":-1.84755385923404,"y":-3.538731252143407},{"x":-1.8757142114009184,"y":-3.5472736015824466},{"x":-1.9050000000000864,"y":-3.5501580000000104},{"x":-1.9342857885992544,"y":-3.5472736015824466},{"x":-1.9624461407661329,"y":-3.538731252143407},{"x":-1.9883988699596102,"y":-3.52485922938115},{"x":-2.0111466273510814,"y":-3.506190627350975},{"x":-2.0298152293812564,"y":-3.4834428699595037},{"x":-2.0436872521435134,"y":-3.4574901407660263},{"x":-2.052229601582553,"y":-3.429329788599148},{"x":-2.055114000000117,"y":-3.40004399999998},{"x":-2.052229601582553,"y":-3.370758211400812},{"x":-2.0436872521435134,"y":-3.3425978592339334},{"x":-2.0298152293812564,"y":-3.316645130040456},{"x":-2.0111466273510814,"y":-3.293897372648985},{"x":-1.9883988699596102,"y":-3.27522877061881},{"x":-1.9624461407661329,"y":-3.261356747856553},{"x":-1.9342857885992544,"y":-3.252814398417513},{"x":-1.9050000000000864,"y":-3.2499299999999494},{"x":-1.8757142114009184,"y":-3.252814398417513},{"x":-1.84755385923404,"y":-3.261356747856553},{"x":-1.8216011300405626,"y":-3.27522877061881},{"x":-1.7988533726490914,"y":-3.293897372648985},{"x":-1.7801847706189164,"y":-3.316645130040456},{"x":-1.7663127478566594,"y":-3.3425978592339334},{"x":-1.7577703984176196,"y":-3.370758211400812},{"x":-1.754886000000056,"y":-3.40004399999998}]} strokeWidth="0.2999994mm" />
    <courtyardoutline outline={[{"x":-2.699982400000067,"y":3.8424744000000146},{"x":2.7000077999998666,"y":3.8424744000000146},{"x":2.7000077999998666,"y":-3.8424744000000146},{"x":-2.699982400000067,"y":-3.8424744000000146},{"x":-2.699982400000067,"y":3.8424744000000146}]} />
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
