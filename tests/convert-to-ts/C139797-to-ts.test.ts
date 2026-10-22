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
    <silkscreenpath route={[{"x":0.5079999999999245,"y":1.0160000000000764},{"x":0.7340812688995584,"y":0.9905267587766957},{"x":0.948825878943353,"y":0.9153843697888533},{"x":1.1414656386883735,"y":0.794340786187604},{"x":1.3023407861875285,"y":0.633465638688449},{"x":1.4233843697888915,"y":0.4408258789435422},{"x":1.4985267587766202,"y":0.22608126889963387},{"x":1.5239999999998872,"y":0},{"x":1.4985267587766202,"y":-0.22608126889952018},{"x":1.4233843697888915,"y":-0.4408258789434285},{"x":1.3023407861875285,"y":-0.6334656386883353},{"x":1.1414656386883735,"y":-0.7943407861874903},{"x":0.948825878943353,"y":-0.9153843697888533},{"x":0.7340812688995584,"y":-0.990526758776582},{"x":0.5079999999999245,"y":-1.0159999999999627}]} />
    <silkscreenpath route={[{"x":-0.5080000000000382,"y":-1.0159999999999627},{"x":-0.7340812688996721,"y":-0.990526758776582},{"x":-0.948825878943353,"y":-0.9153843697888533},{"x":-1.1414656386884872,"y":-0.7943407861874903},{"x":-1.3023407861876422,"y":-0.6334656386883353},{"x":-1.4233843697888915,"y":-0.4408258789434285},{"x":-1.498526758776734,"y":-0.22608126889952018},{"x":-1.5240000000001146,"y":0},{"x":-1.498526758776734,"y":0.22608126889963387},{"x":-1.4233843697888915,"y":0.4408258789435422},{"x":-1.3023407861876422,"y":0.633465638688449},{"x":-1.1414656386884872,"y":0.794340786187604},{"x":-0.948825878943353,"y":0.9153843697888533},{"x":-0.7340812688996721,"y":0.9905267587766957},{"x":-0.5080000000000382,"y":1.0160000000000764}]} />
    <silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="2.6256mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.8750773000000436,"y":1.849869799999965},{"x":2.87507729999993,"y":1.849869799999965},{"x":2.87507729999993,"y":-1.8501238000000058},{"x":-2.8750773000000436,"y":-1.8501238000000058},{"x":-2.8750773000000436,"y":1.849869799999965}]} />
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
