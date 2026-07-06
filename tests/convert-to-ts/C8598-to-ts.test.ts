import { expect, it } from "bun:test"
import { su } from "@tscircuit/circuit-json-util"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import diodeRawEasy from "../assets/C8598.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should normalize decorated C8598 diode polarity labels", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(diodeRawEasy)
  const sourceCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
    showDesignator: true,
  })
  const sourcePorts = su(sourceCircuitJson)
    .source_port.list()
    .map((port) => ({
      name: port.name,
      pin_number: port.pin_number,
      port_hints: port.port_hints,
    }))
    .sort((a, b) => (a.pin_number ?? 0) - (b.pin_number ?? 0))

  expect(sourcePorts).toEqual([
    { name: "pin1", pin_number: 1, port_hints: ["_NEG"] },
    { name: "pin2", pin_number: 2, port_hints: ["_POS"] },
  ])

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { DiodeProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["cathode","neg"],
      pin2: ["anode","pos"]
    } as const

    export const B5819W_SL = (props: DiodeProps) => {
      const { name = "D1", ...restProps } = props

      return (
        <diode
          name={name}
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C8598"
      ]
    }}
          manufacturerPartNumber="B5819W_SL"
          footprint={<footprint>
            <smtpad portHints={["pin2","anode","pos"]} pcbX="1.700022mm" pcbY="0mm" width="1.1999976mm" height="0.9500108mm" shape="rect" />
    <smtpad portHints={["pin1","cathode","neg"]} pcbX="-1.700022mm" pcbY="0mm" width="1.1999976mm" height="0.9500108mm" shape="rect" />
    <silkscreenpath route={[{"x":1.3462000000000103,"y":-0.7061453999999969},{"x":1.3462000000000103,"y":-0.850010999999995}]} />
    <silkscreenpath route={[{"x":1.3462000000000103,"y":0.8500110000000092},{"x":1.3462000000000103,"y":0.7061454000000111}]} />
    <silkscreenpath route={[{"x":-1.346199999999996,"y":-0.850010999999995},{"x":-1.6379698000000076,"y":-0.850010999999995},{"x":-1.6389857999999862,"y":-0.848994999999988}]} />
    <silkscreenpath route={[{"x":-1.346199999999996,"y":0.8500110000000092},{"x":-1.6429735999999764,"y":0.8500110000000092},{"x":-1.6439895999999976,"y":0.8489950000000022}]} />
    <silkscreenpath route={[{"x":-1.346199999999996,"y":0.8500110000000092},{"x":1.3462000000000103,"y":0.8500110000000092}]} />
    <silkscreenpath route={[{"x":0.406400000000005,"y":0.406400000000005},{"x":0.406400000000005,"y":-0.40639999999999077}]} />
    <silkscreenpath route={[{"x":0.406400000000005,"y":0.0002539999999982001},{"x":0.720089999999999,"y":0.0002539999999982001}]} />
    <silkscreenpath route={[{"x":-0.28000959999999964,"y":0},{"x":-0.610006399999989,"y":0}]} />
    <silkscreenpath route={[{"x":-0.2540000000000049,"y":0.5080000000000098},{"x":-0.2540000000000049,"y":-0.5079999999999956}]} />
    <silkscreenpath route={[{"x":-0.17779999999999063,"y":0},{"x":0.406400000000005,"y":0.406400000000005}]} />
    <silkscreenpath route={[{"x":0.406400000000005,"y":-0.40639999999999077},{"x":-0.17779999999999063,"y":0}]} />
    <silkscreenpath route={[{"x":1.3462000000000103,"y":-0.850010999999995},{"x":-1.346199999999996,"y":-0.850010999999995}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="1.9652mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.561400000000006,"y":1.21520000000001},{"x":2.5360000000000014,"y":1.21520000000001},{"x":2.5360000000000014,"y":-1.2405999999999864},{"x":-2.561400000000006,"y":-1.2405999999999864},{"x":-2.561400000000006,"y":1.21520000000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8598.obj?uuid=e9d505c99b6c436aaf827a29c5ba4f84",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8598.step?uuid=e9d505c99b6c436aaf827a29c5ba4f84",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0.000012699999999199463, z: -0.6 },
          }}
          {...restProps}
        />
      )
    }"
  `)
}, 15_000)
