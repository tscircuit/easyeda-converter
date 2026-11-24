import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C113367.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

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
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C113367-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["N_SD"],
      pin2: ["NC"],
      pin3: ["IN_POS"],
      pin4: ["IN_NEG"],
      pin5: ["VO_POS"],
      pin6: ["VDD"],
      pin7: ["GND"],
      pin8: ["VO_NEG"]
    } as const

    const pinAttributes = {
      pin2: {doNotConnect: true},
      pin6: {requiresPower: true},
      pin7: {requiresGround: true}
    } as const

    export const PAM8302AASCR = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-0.4,"y":-0.5},{"x":0.4,"y":-0.1},{"x":-0.4,"y":0.3},{"x":-0.4,"y":-0.5}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.32,"y":0.1},{"x":-0.2,"y":0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.32,"y":-0.3},{"x":-0.2,"y":-0.3}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.26,"y":-0.24},{"x":-0.26,"y":-0.36}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0.3},{"x":0,"y":0.1}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.3},{"x":0,"y":-0.5}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.4,"y":-0.5}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.28,"y":0.24},{"x":-0.4,"y":0.5}]} strokeColor="#880000" />
              <schematicpath points={[{"x":-0.28,"y":-0.44},{"x":-0.4,"y":-0.7}]} strokeColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["N_SD"]} direction="left" schX={-0.8} schY={0.5} schStemLength={0.4} />
              <port name="pin4" pinNumber={4} aliases={["IN_NEG"]} direction="left" schX={-0.8} schY={0.1} schStemLength={0.4} />
              <port name="pin3" pinNumber={3} aliases={["IN_POS"]} direction="left" schX={-0.8} schY={-0.3} schStemLength={0.4} />
              <port name="pin7" pinNumber={7} aliases={["GND"]} direction="down" schX={0} schY={-0.9} schStemLength={0.4} />
              <port name="pin5" pinNumber={5} aliases={["VO_POS"]} direction="right" schX={0.8} schY={-0.1} schStemLength={0.4} />
              <port name="pin6" pinNumber={6} aliases={["VDD"]} direction="up" schX={0} schY={0.7} schStemLength={0.4} />
              <port name="pin8" pinNumber={8} aliases={["VO_NEG"]} direction="right" schX={0.8} schY={-0.5} schStemLength={0.4} />
              <port name="pin2" pinNumber={2} aliases={["NC"]} direction="left" schX={-0.8} schY={-0.7} schStemLength={0.4} />
              <schematictext schX={0.72} schY={-0.02} text="+" fontSize={0.2} anchor="left" color="#0000FF" schRotation={0} />
              <schematictext schX={0.76} schY={-0.46} text="-" fontSize={0.2} anchor="left" color="#0000FF" schRotation={0} />
              <schematictext schX={0.025} schY={0.922} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C113367"
      ]
    }}
          manufacturerPartNumber="PAM8302AASCR"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-2.146046mm" pcbY="0.975106mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-2.146046mm" pcbY="0.324866mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-2.146046mm" pcbY="-0.32512mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-2.146046mm" pcbY="-0.975106mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="2.146046mm" pcbY="0.975106mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="2.146046mm" pcbY="0.324866mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="2.146046mm" pcbY="-0.32512mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="2.146046mm" pcbY="-0.975106mm" width="1.6919956mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <silkscreenpath route={[{"x":1.730426,"y":1.388237},{"x":1.730426,"y":1.696618},{"x":1.710385,"y":1.716659}]} />
    <silkscreenpath route={[{"x":1.723746,"y":1.730019},{"x":-1.651787,"y":1.730019},{"x":-1.658468,"y":1.723339},{"x":-1.658468,"y":1.388237}]} />
    <silkscreenpath route={[{"x":-1.658468,"y":-1.388237},{"x":-1.658468,"y":-1.658874},{"x":1.730426,"y":-1.658874},{"x":1.730426,"y":-1.388262}]} />
    <silkscreencircle pcbX="-0.889mm" pcbY="1.143mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-2.146046mm" pcbY="1.609344mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="3.8194mm" pcbY="0.0381mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":3.242044,"y":1.749997},{"x":3.242044,"y":-1.749997},{"x":-3.242044,"y":-1.749997},{"x":-3.242044,"y":1.749997},{"x":3.242044,"y":1.749997}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113367.obj?uuid=c46b6304dec345328c3b99b7d4160b3a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113367.step?uuid=c46b6304dec345328c3b99b7d4160b3a",
            pcbRotationOffset: 270,
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

it("C113367 generates one schematic port for each footprint pin", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })
  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C113367-duplicate-schematic-pin-repro",
  )

  const schematicPinNumbers = [
    ...result.matchAll(/<port\b[^>]*\bpinNumber=\{(\d+)\}/g),
  ]
    .map((match) => Number(match[1]))
    .sort((a, b) => a - b)

  // The footprint and physical/display fields have pins 1 through 8. The
  // SPICE fields assign both VO_NEG and NC to 8, and assign IN_NEG to 2.
  // Physical fields correctly preserve IN_NEG on 4 and NC on 2.
  expect(schematicPinNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
}, 50000)
