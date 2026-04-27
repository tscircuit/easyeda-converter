import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C113367.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C113367 into typescript file", async () => {
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
      pin1: ["SD"],
      pin2: ["IN_NEG"],
      pin3: ["IN_POS"],
      pin4: ["pin4"],
      pin5: ["VO_POS"],
      pin6: ["VDD"],
      pin7: ["GND"],
      pin8: ["VO_NEG"]
    } as const

    export const PAM8302AASCR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C113367"
      ]
    }}
          manufacturerPartNumber="PAM8302AASCR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.975106mm" pcbY="-2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-0.324866mm" pcbY="-2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="0.32512mm" pcbY="-2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="0.975106mm" pcbY="-2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-0.975106mm" pcbY="2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.324866mm" pcbY="2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="0.32512mm" pcbY="2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="0.975106mm" pcbY="2.146046mm" width="0.3640074mm" height="1.6919956mm" radius="0.1820037mm" shape="pill" />
    <silkscreenpath route={[{"x":-1.38823699999989,"y":1.7304257999999209},{"x":-1.696618400000034,"y":1.7304257999999209},{"x":-1.716658999999936,"y":1.7103852000000188}]} />
    <silkscreenpath route={[{"x":-1.7300193999999465,"y":1.7237456000000293},{"x":-1.7300193999999465,"y":-1.6517873999998756},{"x":-1.723339200000055,"y":-1.6584675999999945},{"x":-1.38823699999989,"y":-1.6584675999999945}]} />
    <silkscreenpath route={[{"x":1.3882370000000037,"y":-1.6584675999999945},{"x":1.6588739999999689,"y":-1.6584675999999945},{"x":1.6588739999999689,"y":1.7304257999999209},{"x":1.3882623999999169,"y":1.7304257999999209}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0381mm" pcbY="3.8194mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.0026000000000295,"y":3.069400000000087},{"x":1.9264000000000578,"y":3.069400000000087},{"x":1.9264000000000578,"y":-3.2472000000000207},{"x":-2.0026000000000295,"y":-3.2472000000000207},{"x":-2.0026000000000295,"y":3.069400000000087}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113367.obj?uuid=c46b6304dec345328c3b99b7d4160b3a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113367.step?uuid=c46b6304dec345328c3b99b7d4160b3a",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
  const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson)
  expect(pcbSvg).toMatchSvgSnapshot(import.meta.path)
}, 50000)
