import { expect, it } from "bun:test"
import switchRawEasy from "../assets/C136720.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

it("converts C136720 document-layer tracks to fabrication notes", () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const tracks = betterEasy.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "TRACK",
  )

  expect(tracks.filter((track) => track.layer === 3)).toHaveLength(2)
  expect(tracks.filter((track) => track.layer === 12)).toHaveLength(1)

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const convertedSilkscreenPaths = convertedCircuitJson.filter(
    (element) => element.type === "pcb_silkscreen_path",
  )
  const convertedFabricationNotePaths = convertedCircuitJson.filter(
    (element) => element.type === "pcb_fabrication_note_path",
  )

  expect(convertedSilkscreenPaths).toHaveLength(2)
  expect(convertedFabricationNotePaths).toHaveLength(1)
  expect(
    convertCircuitJsonToPcbSvg(convertedCircuitJson as any),
  ).toMatchSvgSnapshot(
    import.meta.path,
    "C136720-document-track-as-silkscreen-repro",
  )
})

it("preserves the imported C136720 slide switch symbol and all five terminals", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(switchRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("ChipProps")
  expect(result).toContain("<chip")
  expect(result).toContain("symbol={")
  expect(result).toContain("pinLabels={pinLabels}")
  expect(result).not.toContain("<pushbutton")
  expect(result).not.toContain("<switch")
  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"]
    } as const

    export const SK_12E12_G5 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-0.7} schY={0} schStemLength={0.38} />
              <schematictext schX={-0.46} schY={0.02} text="2" fontSize={0.11} anchor="bottom_right" color="#000000" schRotation={0} />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.7} schY={-0.1} schStemLength={0.38} />
              <schematictext schX={0.44} schY={-0.08} text="1" fontSize={0.11} anchor="bottom_left" color="#000000" schRotation={0} />
              <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.7} schY={0.1} schStemLength={0.38} />
              <schematictext schX={0.44} schY={0.12} text="3" fontSize={0.11} anchor="bottom_left" color="#000000" schRotation={0} />
              <port name="pin4" pinNumber={4} aliases={["4"]} direction="down" schX={0.3} schY={-0.3} schStemLength={0.1} />
              <port name="pin5" pinNumber={5} aliases={["5"]} direction="down" schX={-0.3} schY={-0.3} schStemLength={0.1} />
              <schematicpath points={[{"x":-0.2,"y":0},{"x":0.2,"y":-0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.4,"y":0},{"x":-0.4,"y":0.2},{"x":0.4,"y":0.2},{"x":0.4,"y":-0.2},{"x":-0.4,"y":-0.2},{"x":-0.4,"y":0}]} strokeColor="#000000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C136720"
      ]
    }}
          manufacturerPartNumber="SK-12E12-G5"
          footprint={<footprint>
            <platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0.127mm" outerDiameter="1.524mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="-2.921mm" outerDiameter="1.524mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="3.175mm" outerDiameter="1.524mm" holeDiameter="0.999998mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="0mm" pcbY="-6.477mm" outerDiameter="2.1999956mm" holeDiameter="1.5000224mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="0mm" pcbY="6.477mm" outerDiameter="2.1999956mm" holeDiameter="1.5000224mm" shape="circle" />
    <silkscreenpath route={[{"x":2.793999999999997,"y":-6.477000000000004},{"x":-2.793999999999997,"y":-6.477000000000004},{"x":-2.793999999999997,"y":6.477000000000004},{"x":2.793999999999997,"y":6.477000000000004},{"x":2.793999999999997,"y":-6.477000000000004}]} />
    <silkscreenpath route={[{"x":2.0319999999999965,"y":3.174999999999997},{"x":2.0319999999999965,"y":0.12699999999999534}]} />
    <silkscreentext text="{NAME}" pcbX="2.667mm" pcbY="8.6708mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":2.793999999999997,"y":3.174999999999997},{"x":8.128,"y":3.174999999999997},{"x":8.128,"y":0.12699999999999534},{"x":2.793999999999997,"y":0.12699999999999534}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-3.043999999999997,"y":7.9208},{"x":8.377999999999986,"y":7.9208},{"x":8.377999999999986,"y":-7.946200000000005},{"x":-3.043999999999997,"y":-7.946200000000005},{"x":-3.043999999999997,"y":7.9208}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C136720.obj?uuid=694c4159502149fba0ae406b87d40894",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C136720.step?uuid=694c4159502149fba0ae406b87d40894",
            pcbRotationOffset: 90,
            modelOriginPosition: { x: -0.000012699999999199463, y: 0.3670000000000013, z: -0.5500069999999995 },
          }}
          {...props}
        />
      )
    }"
  `)

  const circuitJson = await runTscircuitCode(`${result}
export default () => (<board><SK_12E12_G5 name="SW1" /></board>)
`)
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [8, 32, 24],
  })

  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_chip")
  expect(sourceComponent?.are_pins_interchangeable).not.toBe(true)
  expect(
    circuitJson
      .filter((element) => element.type === "schematic_port")
      .map((port) => port.pin_number)
      .sort((a, b) => a! - b!),
  ).toEqual([1, 2, 3, 4, 5])
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C136720-schematic",
  )
  expect(
    circuitJson.filter((element) => element.type === "pcb_silkscreen_path"),
  ).toHaveLength(2)
  expect(
    circuitJson.filter(
      (element) => element.type === "pcb_fabrication_note_path",
    ),
  ).toHaveLength(1)
}, 20000)
