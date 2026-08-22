import { it, expect } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import chipRawEasy from "../assets/C5378731.raweasy.json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("imports C5378731 supplier fabrication notes into its footprint string", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const supplierDocumentRegions = betterEasy.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "SOLIDREGION" && shape.layermask === 12,
  )
  expect(supplierDocumentRegions).toHaveLength(1)

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(
    convertedCircuitJson.filter(
      (element) => element.type === "pcb_fabrication_note_path",
    ),
  ).toHaveLength(1)

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("SK6812MINI_EA")
  expect(result).toContain('pin1: ["VDD"]')
  expect(result).toContain('pin4: ["DIN"]')
  expect(result).toContain("<fabricationnotepath")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["VDD"],
      pin2: ["DOUT"],
      pin3: ["GND"],
      pin4: ["DIN"]
    } as const

    const pinAttributes = {
      pin1: {requiresPower: true},
      pin3: {requiresGround: true}
    } as const

    export const SK6812MINI_EA = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5378731"
      ]
    }}
          manufacturerPartNumber="SK6812MINI-EA"
          footprint={<footprint>
            <smtpad portHints={["pin4"]} pcbX="2.499995mm" pcbY="-0.750062mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="2.499995mm" pcbY="0.750062mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-2.499995mm" pcbY="0.750062mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-2.499995mm" pcbY="-0.750062mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.6001492000000326,"y":1.4000734000001103},{"x":1.5998951999999917,"y":1.4000734000001103}]} />
    <silkscreenpath route={[{"x":-1.600123799999892,"y":-1.3998956000000362},{"x":1.5999205999999049,"y":-1.3998956000000362}]} />
    <silkscreencircle pcbX="-0.000127mm" pcbY="0.000254mm" radius="0.99187mm" />
    <silkscreentext text="{NAME}" pcbX="-0.012827mm" pcbY="3.039112mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":1.0158729999998286,"y":2.032076200000006},{"x":2.031872999999905,"y":2.032076200000006},{"x":2.031872999999905,"y":1.397076200000015},{"x":1.0158729999998286,"y":2.032076200000006}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-3.3616269999999986,"y":2.2891120000001592},{"x":3.335972999999967,"y":2.2891120000001592},{"x":3.335972999999967,"y":-1.8430880000000798},{"x":-3.3616269999999986,"y":-1.8430880000000798},{"x":-3.3616269999999986,"y":2.2891120000001592}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.obj?uuid=24821b1a65784664819cc38487bec84f",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.step?uuid=24821b1a65784664819cc38487bec84f",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.00015239999993355013, z: -0.5900006 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 20000)
