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
      pin2: ["IN_NEG"],
      pin3: ["IN_POS"],
      pin4: ["pin4"],
      pin5: ["VO_POS"],
      pin6: ["VDD"],
      pin7: ["GND"],
      pin8: ["VO_NEG"]
    } as const

    const pinAttributes = {
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
              <port name="pin2" pinNumber={2} aliases={["IN_NEG"]} direction="left" schX={-0.8} schY={0.1} schStemLength={0.4} />
              <port name="pin3" pinNumber={3} aliases={["IN_POS"]} direction="left" schX={-0.8} schY={-0.3} schStemLength={0.4} />
              <port name="pin7" pinNumber={7} aliases={["GND"]} direction="down" schX={0} schY={-0.9} schStemLength={0.4} />
              <port name="pin5" pinNumber={5} aliases={["VO_POS"]} direction="right" schX={0.8} schY={-0.1} schStemLength={0.4} />
              <port name="pin6" pinNumber={6} aliases={["VDD"]} direction="up" schX={0} schY={0.7} schStemLength={0.4} />
              <port name="pin8" pinNumber={8} aliases={["VO_NEG"]} direction="right" schX={0.8} schY={-0.5} schStemLength={0.4} />
              <port name="pin4" pinNumber={4} aliases={["NC"]} direction="left" schX={-0.8} schY={-0.7} schStemLength={0.4} />
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
    <silkscreencircle pcbX="-1.143mm" pcbY="-0.889mm" radius="0.150114mm" />
    <silkscreencircle pcbX="-1.609344mm" pcbY="-2.146046mm" radius="0.150114mm" />
    <silkscreentext text="{NAME}" pcbX="-0.0381mm" pcbY="3.8194mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-0.824991999999952,"y":-2.850133999999912},{"x":-0.8278763984175157,"y":-2.8794197885990798},{"x":-0.8364187478565555,"y":-2.9075801407659583},{"x":-0.8502907706188125,"y":-2.9335328699594356},{"x":-0.8689593726489875,"y":-2.956280627350907},{"x":-0.8917071300404587,"y":-2.9749492293810818},{"x":-0.917659859233936,"y":-2.988821252143339},{"x":-0.9458202114008145,"y":-2.9973636015823786},{"x":-0.9751059999999825,"y":-3.0002479999999423},{"x":-1.0043917885991505,"y":-2.9973636015823786},{"x":-1.032552140766029,"y":-2.988821252143339},{"x":-1.0585048699595063,"y":-2.9749492293810818},{"x":-1.0812526273509775,"y":-2.956280627350907},{"x":-1.0999212293811524,"y":-2.9335328699594356},{"x":-1.1137932521434095,"y":-2.9075801407659583},{"x":-1.1223356015824493,"y":-2.8794197885990798},{"x":-1.125220000000013,"y":-2.850133999999912},{"x":-1.1223356015824493,"y":-2.820848211400744},{"x":-1.1137932521434095,"y":-2.7926878592338653},{"x":-1.0999212293811524,"y":-2.766735130040388},{"x":-1.0812526273509775,"y":-2.743987372648917},{"x":-1.0585048699595063,"y":-2.725318770618742},{"x":-1.032552140766029,"y":-2.7114467478564848},{"x":-1.0043917885991505,"y":-2.702904398417445},{"x":-0.9751059999999825,"y":-2.7000199999998813},{"x":-0.9458202114008145,"y":-2.702904398417445},{"x":-0.917659859233936,"y":-2.7114467478564848},{"x":-0.8917071300404587,"y":-2.725318770618742},{"x":-0.8689593726489875,"y":-2.743987372648917},{"x":-0.8502907706188125,"y":-2.766735130040388},{"x":-0.8364187478565555,"y":-2.7926878592338653},{"x":-0.8278763984175157,"y":-2.820848211400744},{"x":-0.824991999999952,"y":-2.850133999999912}]} strokeWidth="0.2999994mm" />
    <courtyardoutline outline={[{"x":-1.7499970000000076,"y":3.242043800000033},{"x":1.7499969999998939,"y":3.242043800000033},{"x":1.7499969999998939,"y":-3.2420437999999194},{"x":-1.7499970000000076,"y":-3.2420437999999194},{"x":-1.7499970000000076,"y":3.242043800000033}]} />
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

  // The footprint has pins 1 through 8. The EasyEDA symbol payload assigns
  // both VO_NEG and NC to pin 8, so the converter previously emitted
  // [1, 2, 3, 5, 6, 7, 8, 8] and omits pin 4 from the schematic.
  expect(schematicPinNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
}, 50000)
