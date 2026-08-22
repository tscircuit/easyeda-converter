import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2848306.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("preserves C2848306 EasyEDA-hidden EP pin visibility", async () => {
  const hiddenEpPin = chipRawEasy.dataStr.shape.find((shape) =>
    shape.startsWith("P~none~0~5~"),
  )

  expect(hiddenEpPin).toContain("~EP~")

  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const parsedHiddenEpPin = betterEasy.dataStr.shape.find(
    (shape) => shape.type === "PIN" && shape.pinNumber === 5,
  )

  expect(parsedHiddenEpPin?.type).toBe("PIN")
  if (!parsedHiddenEpPin || parsedHiddenEpPin.type !== "PIN") {
    throw new Error("C2848306 pin 5 was not parsed as a schematic pin")
  }
  expect({
    label: parsedHiddenEpPin.label,
    pinNumber: parsedHiddenEpPin.pinNumber,
    visibility: parsedHiddenEpPin.visibility,
  }).toMatchInlineSnapshot(`
    {
      "label": "EP",
      "pinNumber": 5,
      "visibility": "none",
    }
  `)

  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).not.toContain('pin5: ["EP"]')
  expect(result).toContain("schPinArrangement=")
  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["SDA"],
      pin2: ["SCL"],
      pin3: ["VDD"],
      pin4: ["VSS"]
    } as const

    const pinAttributes = {
      pin3: {requiresPower: true},
      pin4: {requiresGround: true}
    } as const

    export const SHT40_AD1B_R3 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          schPinArrangement={{"leftSide":[1,2],"rightSide":[3,4]}}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2848306"
      ]
    }}
          manufacturerPartNumber="SHT40-AD1B-R3"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.677418mm" pcbY="0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.677418mm" pcbY="-0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.677418mm" pcbY="-0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.677418mm" pcbY="0.40005mm" width="0.5050028mm" height="0.419989mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0mm" pcbY="-0mm" width="0.3999992mm" height="1.0999978mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":0.8261857999999904},{"x":0.8262111999999888,"y":0.8261857999999904}]} />
    <silkscreenpath route={[{"x":-0.8261857999999904,"y":-0.826211200000003},{"x":0.8262111999999888,"y":-0.826211200000003}]} />
    <silkscreencircle pcbX="-1.01346mm" pcbY="0.76454mm" radius="0.037592mm" />
    <silkscreentext text="{NAME}" pcbX="-0.0508mm" pcbY="1.8382mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.29140000000001,"y":1.0882000000000005},{"x":1.189799999999991,"y":1.0882000000000005},{"x":1.189799999999991,"y":-1.06280000000001},{"x":-1.29140000000001,"y":-1.06280000000001},{"x":-1.29140000000001,"y":1.0882000000000005}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2848306.obj?uuid=09d63d3bb21a495aa100cde68133c9fa",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2848306.step?uuid=09d63d3bb21a495aa100cde68133c9fa",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.000012700000013410317, y: -0.000012699999999199463, z: -0.01 },
          }}
          {...props}
        />
      )
    }"
  `)

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const schematicSvg = convertCircuitJsonToSchematicSvg(circuitJson)

  expect(schematicSvg).not.toContain(">EP</text>")
  expect(schematicSvg).not.toContain(">5</text>")
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(5)
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(4)
  expect(schematicSvg).toMatchSvgSnapshot(
    import.meta.path,
    "C2848306-hidden-EP-pin-omitted",
  )
}, 20_000)
