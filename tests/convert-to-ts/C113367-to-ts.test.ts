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
    <silkscreenpath route={[{"x":-0.9928859999999986,"y":-0.88900000000001},{"x":-0.998001010512553,"y":-0.9278523621364911},{"x":-1.0129974625363047,"y":-0.9640570000001389},{"x":-1.0368533726489204,"y":-0.995146627351005},{"x":-1.0679430000000139,"y":-1.0190025374636207},{"x":-1.1041476378634343,"y":-1.0339989894875998},{"x":-1.143000000000029,"y":-1.0391139999999268},{"x":-1.1818523621365102,"y":-1.0339989894875998},{"x":-1.2180570000000444,"y":-1.0190025374636207},{"x":-1.2491466273511378,"y":-0.995146627351005},{"x":-1.2730025374637535,"y":-0.9640570000001389},{"x":-1.287998989487619,"y":-0.9278523621364911},{"x":-1.293113999999946,"y":-0.88900000000001},{"x":-1.287998989487619,"y":-0.8501476378633015},{"x":-1.2730025374637535,"y":-0.8139429999998811},{"x":-1.2491466273511378,"y":-0.7828533726489013},{"x":-1.2180570000000444,"y":-0.7589974625362856},{"x":-1.1818523621365102,"y":-0.7440010105124202},{"x":-1.143000000000029,"y":-0.7388860000000932},{"x":-1.1041476378634343,"y":-0.7440010105124202},{"x":-1.0679430000000139,"y":-0.7589974625362856},{"x":-1.0368533726489204,"y":-0.7828533726489013},{"x":-1.0129974625363047,"y":-0.8139429999998811},{"x":-0.998001010512553,"y":-0.8501476378633015},{"x":-0.9928859999999986,"y":-0.88900000000001}]} />
    <silkscreenpath route={[{"x":-1.4592300000000478,"y":-2.1460460000000694},{"x":-1.4643450105124884,"y":-2.1848983621365505},{"x":-1.4793414625362402,"y":-2.221102999999971},{"x":-1.503197372648856,"y":-2.252192627351178},{"x":-1.5342869999999493,"y":-2.2760485374637938},{"x":-1.5704916378634834,"y":-2.291044989487432},{"x":-1.6093439999999646,"y":-2.296159999999986},{"x":-1.6481963621365594,"y":-2.291044989487432},{"x":-1.6844009999999798,"y":-2.2760485374637938},{"x":-1.7154906273510733,"y":-2.252192627351178},{"x":-1.739346537463689,"y":-2.221102999999971},{"x":-1.7543429894874407,"y":-2.1848983621365505},{"x":-1.759457999999995,"y":-2.1460460000000694},{"x":-1.7543429894874407,"y":-2.1071936378634746},{"x":-1.739346537463689,"y":-2.0709889999999405},{"x":-1.7154906273510733,"y":-2.0398993726489607},{"x":-1.6844009999999798,"y":-2.016043462536345},{"x":-1.6481963621365594,"y":-2.0010470105124796},{"x":-1.6093439999999646,"y":-1.995932000000039},{"x":-1.5704916378634834,"y":-2.0010470105124796},{"x":-1.5342869999999493,"y":-2.016043462536345},{"x":-1.503197372648856,"y":-2.0398993726489607},{"x":-1.4793414625362402,"y":-2.0709889999999405},{"x":-1.4643450105124884,"y":-2.1071936378634746},{"x":-1.4592300000000478,"y":-2.1460460000000694}]} />
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
