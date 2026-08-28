import { expect, it } from "bun:test"
import pushbuttonRawEasy from "../assets/C139797.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

it("should convert C139797 tactile switch into a pushbutton component", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(pushbuttonRawEasy)
  const convertedFootprint = convertEasyEdaJsonToCircuitJson(betterEasy)
  const endCapArcs = convertedFootprint.filter(
    (element: any) =>
      element.type === "pcb_silkscreen_path" &&
      element.pcb_silkscreen_path_id.startsWith("pcb_silkscreen_arc_"),
  ) as any[]
  const endCapXs = endCapArcs.flatMap((arc) =>
    arc.route.map(({ x }: { x: number }) => x),
  )

  expect(Math.min(...endCapXs)).toBeLessThan(-1.5)
  expect(Math.max(...endCapXs)).toBeGreaterThan(1.5)

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("PushButtonProps")
  expect(result).toContain("<pushbutton")
  expect(result).not.toContain("<chip")
  expect(result).toMatchInlineSnapshot(`
    "import type { PushButtonProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"]
    } as const

    export const SKRPACE010 = (props: PushButtonProps<typeof pinLabels>) => {
      const { name = "SW1", ...restProps } = props

      return (
        <pushbutton
          name={name}
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C139797"
      ]
    }}
          manufacturerPartNumber="SKRPACE010"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-2.100072mm" pcbY="1.074928mm" width="1.0500106mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="2.100072mm" pcbY="1.074928mm" width="1.0500106mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-2.100072mm" pcbY="-1.074928mm" width="1.0500106mm" height="0.6999986mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="2.100072mm" pcbY="-1.074928mm" width="1.0500106mm" height="0.6999986mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.5080000000000382,"y":1.0160000000000764},{"x":0.5079999999999245,"y":1.0160000000000764}]} />
    <silkscreenpath route={[{"x":-0.5080000000000382,"y":-1.0159999999999627},{"x":0.5079999999999245,"y":-1.0159999999999627}]} />
    <silkscreenpath route={[{"x":2.199893999999972,"y":0.5438140000001113},{"x":2.199893999999972,"y":-0.5438139999999976}]} />
    <silkscreenpath route={[{"x":1.3664184000000432,"y":1.5238729999999805},{"x":-1.366418400000157,"y":1.5238729999999805}]} />
    <silkscreenpath route={[{"x":-2.1998940000000857,"y":0.5438140000001113},{"x":-2.1998940000000857,"y":-0.5438139999999976}]} />
    <silkscreenpath route={[{"x":-1.3810995999999705,"y":-1.5499079999999594},{"x":1.3810995999998568,"y":-1.5499079999999594}]} />
    <silkscreenpath route={[{"x":0.5079999999999245,"y":1.0160000000000764},{"x":0.7511447149161086,"y":0.9864768865048745},{"x":0.9801587427964478,"y":0.8996233220636896},{"x":1.18173262077255,"y":0.7604869201419433},{"x":1.3441516077479037,"y":0.5771537826788062},{"x":1.4579765025682718,"y":0.36027856523526225},{"x":1.516592216083609,"y":0.1224652671394324},{"x":1.516592216083609,"y":-0.1224652671394324},{"x":1.4579765025682718,"y":-0.36027856523514856},{"x":1.3441516077479037,"y":-0.5771537826788062},{"x":1.18173262077255,"y":-0.7604869201418296},{"x":0.9801587427964478,"y":-0.8996233220635759},{"x":0.7511447149161086,"y":-0.9864768865047608},{"x":0.5079999999999245,"y":-1.0159999999999627}]} />
    <silkscreenpath route={[{"x":-0.5080000000000382,"y":-1.0159999999999627},{"x":-0.7511447149162223,"y":-0.9864768865047608},{"x":-0.9801587427965615,"y":-0.8996233220635759},{"x":-1.1817326207726637,"y":-0.7604869201418296},{"x":-1.3441516077480173,"y":-0.5771537826788062},{"x":-1.4579765025684992,"y":-0.36027856523514856},{"x":-1.5165922160837226,"y":-0.1224652671394324},{"x":-1.5165922160837226,"y":0.1224652671394324},{"x":-1.4579765025684992,"y":0.36027856523526225},{"x":-1.3441516077480173,"y":0.5771537826788062},{"x":-1.1817326207726637,"y":0.7604869201419433},{"x":-0.9801587427965615,"y":0.8996233220636896},{"x":-0.7511447149162223,"y":0.9864768865048745},{"x":-0.5080000000000382,"y":1.0160000000000764}]} />
    <silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="2.6256mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.8662000000001626,"y":1.8756000000000768},{"x":2.891599999999812,"y":1.8756000000000768},{"x":2.891599999999812,"y":-1.8501999999998588},{"x":-2.8662000000001626,"y":-1.8501999999998588},{"x":-2.8662000000001626,"y":1.8756000000000768}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C139797.obj?uuid=00d848a7e8384bbd9286566957e8bb9c",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C139797.step?uuid=00d848a7e8384bbd9286566957e8bb9c",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.000012700000070253736, y: 0.00012700000002041634, z: -0.01 },
          }}
          {...restProps}
        />
      )
    }"
  `)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_push_button")
  expect(sourceComponent?.supplier_part_numbers).toEqual({
    jlcpcb: ["C139797"],
  })
}, 20000)
