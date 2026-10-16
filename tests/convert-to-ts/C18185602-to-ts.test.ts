import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C18185602.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C18185602 into typescript file", async () => {
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
    "C18185602-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [-10, -20, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["D"],
      pin2: ["C"],
      pin3: ["B"],
      pin4: ["A"]
    } as const

    export const PJ_320A_4P_DIP = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin1" pinNumber={1} aliases={["D"]} direction="right" schX={0.2} schY={0} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} aliases={["B"]} direction="right" schX={0.2} schY={-0.4} schStemLength={0.2} />
              <port name="pin2" pinNumber={2} aliases={["C"]} direction="right" schX={0.2} schY={-0.2} schStemLength={0.2} />
              <port name="pin4" pinNumber={4} aliases={["A"]} direction="right" schX={0.2} schY={0.2} schStemLength={0.2} />
              <schematicpath points={[{"x":0,"y":-0.4},{"x":-0.54,"y":-0.4},{"x":-0.58,"y":-0.3},{"x":-0.62,"y":-0.4}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":0},{"x":-0.2,"y":0},{"x":-0.24,"y":0.1},{"x":-0.28,"y":0}]} strokeColor="#880000" />
              <schematicrect schX={-0.72} schY={-0.2} width={0.08} height={0.32} strokeWidth={0.02} color="#880000" />
              <schematicpath points={[{"x":0,"y":0.2},{"x":-0.72,"y":0.2},{"x":-0.72,"y":-0.04}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0,"y":-0.2},{"x":-0.36,"y":-0.2},{"x":-0.4,"y":-0.1},{"x":-0.44,"y":-0.2}]} strokeColor="#880000" />
              <schematictext schX={-0.27} schY={0.602} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C18185602"
      ]
    }}
          manufacturerPartNumber="PJ-320A-4P DIP"
          footprint={<footprint>
            <hole pcbX="2.4249824mm" pcbY="0mm" diameter="1.1999976mm" />
    <hole pcbX="-4.5750036mm" pcbY="0mm" diameter="1.1999976mm" />
    <platedhole  portHints={["pin1"]} pcbX="4.0249284mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin2"]} pcbX="0.0249364mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="-2.9750576mm" pcbY="2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="5.1250024mm" pcbY="-2.29997mm" holeWidth="0.5999988mm" holeHeight="1.499997mm" outerWidth="1.1999976mm" outerHeight="2.0999958mm" pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":-6.174975000000018,"y":-2.4595836000000872},{"x":-6.1749496000001045,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":-2.5000204000000394},{"x":-6.174975000000018,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":2.499969599999986},{"x":-6.158947600000147,"y":2.499969599999986}]} />
    <silkscreenpath route={[{"x":-8.158943600000043,"y":2.499969599999986},{"x":-8.158943600000043,"y":-2.5000204000000394}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-3.175025400000095},{"x":-6.174975000000018,"y":-3.175025400000095},{"x":-6.174975000000018,"y":-2.300096999999937}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-3.0925516000000925},{"x":5.941028200000005,"y":-3.175025400000095}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":3.0558485999999903},{"x":5.941028200000005,"y":-1.5074899999999616}]} />
    <silkscreenpath route={[{"x":4.933003799999824,"y":3.0558485999999903},{"x":5.941028200000005,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":0.9330117999999175,"y":3.0558485999999903},{"x":3.349034399999823,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-2.066982199999984,"y":3.0558485999999903},{"x":-0.6509575999999697,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":-6.158947600000147,"y":3.0558485999999903},{"x":-3.650951599999985,"y":3.0558485999999903}]} />
    <silkscreenpath route={[{"x":5.941028200000005,"y":-2.7312365999999884},{"x":5.941028200000005,"y":-2.848101999999926}]} />
    <silkscreentext text="{NAME}" pcbX="-1.1063796mm" pcbY="4.06197mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-4.386916600000063,"y":-0.000025400000026820635},{"x":-4.390529174803305,"y":-0.036704487514498396},{"x":-4.401228069988974,"y":-0.07197401826567784},{"x":-4.4186021330153835,"y":-0.1044786039661858},{"x":-4.441983688383743,"y":-0.1329691116163758},{"x":-4.470474196033933,"y":-0.15635066698473565},{"x":-4.502978781734441,"y":-0.17372473001114486},{"x":-4.538248312485621,"y":-0.1844236251968141},{"x":-4.574927400000092,"y":-0.18803620000005594},{"x":-4.611606487514564,"y":-0.1844236251968141},{"x":-4.646876018265743,"y":-0.17372473001114486},{"x":-4.679380603966251,"y":-0.15635066698473565},{"x":-4.707871111616441,"y":-0.1329691116163758},{"x":-4.731252666984801,"y":-0.1044786039661858},{"x":-4.74862673001121,"y":-0.07197401826567784},{"x":-4.75932562519688,"y":-0.036704487514498396},{"x":-4.7629382000001215,"y":-0.000025400000026820635},{"x":-4.75932562519688,"y":0.036653687514444755},{"x":-4.74862673001121,"y":0.0719232182656242},{"x":-4.731252666984801,"y":0.10442780396613216},{"x":-4.707871111616441,"y":0.13291831161632217},{"x":-4.679380603966251,"y":0.156299866984682},{"x":-4.646876018265743,"y":0.17367393001109122},{"x":-4.611606487514564,"y":0.18437282519676046},{"x":-4.574927400000092,"y":0.1879854000000023},{"x":-4.538248312485621,"y":0.18437282519676046},{"x":-4.502978781734441,"y":0.17367393001109122},{"x":-4.470474196033933,"y":0.156299866984682},{"x":-4.441983688383743,"y":0.13291831161632217},{"x":-4.4186021330153835,"y":0.10442780396613216},{"x":-4.401228069988974,"y":0.0719232182656242},{"x":-4.390529174803305,"y":0.036653687514444755},{"x":-4.386916600000063,"y":-0.000025400000026820635}]} strokeWidth="0.3750056mm" />
    <fabricationnotepath route={[{"x":2.613069399999972,"y":-0.000025400000026820635},{"x":2.6094568251967303,"y":-0.036704487514498396},{"x":2.598757930011061,"y":-0.07197401826567784},{"x":2.581383866984652,"y":-0.1044786039661858},{"x":2.558002311616292,"y":-0.1329691116163758},{"x":2.529511803966102,"y":-0.15635066698473565},{"x":2.497007218265594,"y":-0.17372473001114486},{"x":2.4617376875144146,"y":-0.1844236251968141},{"x":2.425058599999943,"y":-0.18803620000005594},{"x":2.3883795124854714,"y":-0.1844236251968141},{"x":2.353109981734292,"y":-0.17372473001114486},{"x":2.320605396033784,"y":-0.15635066698473565},{"x":2.292114888383594,"y":-0.1329691116163758},{"x":2.268733333015234,"y":-0.1044786039661858},{"x":2.251359269988825,"y":-0.07197401826567784},{"x":2.2406603748031557,"y":-0.036704487514498396},{"x":2.237047799999914,"y":-0.000025400000026820635},{"x":2.2406603748031557,"y":0.036653687514444755},{"x":2.251359269988825,"y":0.0719232182656242},{"x":2.268733333015234,"y":0.10442780396613216},{"x":2.292114888383594,"y":0.13291831161632217},{"x":2.320605396033784,"y":0.156299866984682},{"x":2.353109981734292,"y":0.17367393001109122},{"x":2.3883795124854714,"y":0.18437282519676046},{"x":2.425058599999943,"y":0.1879854000000023},{"x":2.4617376875144146,"y":0.18437282519676046},{"x":2.497007218265594,"y":0.17367393001109122},{"x":2.529511803966102,"y":0.156299866984682},{"x":2.558002311616292,"y":0.13291831161632217},{"x":2.581383866984652,"y":0.10442780396613216},{"x":2.598757930011061,"y":0.0719232182656242},{"x":2.6094568251967303,"y":0.036653687514444755},{"x":2.613069399999972,"y":-0.000025400000026820635}]} strokeWidth="0.3750056mm" />
    <fabricationnotepath route={[{"x":-8.195951400000013,"y":2.5399999999999636},{"x":-6.163951400000087,"y":2.5399999999999636},{"x":-6.163951400000087,"y":-2.5399999999999636},{"x":-8.195951400000013,"y":-2.5399999999999636},{"x":-8.195951400000013,"y":2.5399999999999636}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":-8.408943600000043,"y":3.304984999999988},{"x":6.425000299999965,"y":3.304984999999988},{"x":6.425000299999965,"y":-3.304984999999988},{"x":-8.408943600000043,"y":-3.304984999999988},{"x":-8.408943600000043,"y":3.304984999999988}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.obj?uuid=f90b68db56444592a325e6a33e48bfdb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C18185602.step?uuid=f90b68db56444592a325e6a33e48bfdb",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 1.108957700000019, y: -0.0050000000000001155, z: -2.5000069999999996 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 10000)
