import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C14663.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C14663 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(result)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c14663-schematic",
  )
  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"]
    } as const

    export const CC0603KRX7R9BB104 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <schematicpath points={[{"x":-0.508,"y":-2.032},{"x":-0.508,"y":2.032}]} strokeWidth={0.254} strokeColor="#A00000" />
              <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-5.08} schY={0} schStemLength={2.54} />
              <schematicpath points={[{"x":2.54,"y":0},{"x":0.508,"y":0}]} strokeWidth={0.254} strokeColor="#A00000" />
              <schematicpath points={[{"x":0.508,"y":2.032},{"x":0.508,"y":-2.032}]} strokeWidth={0.254} strokeColor="#A00000" />
              <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={5.08} schY={0} schStemLength={2.54} />
              <schematicpath points={[{"x":-0.508,"y":0},{"x":-2.54,"y":0}]} strokeWidth={0.254} strokeColor="#A00000" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C14663"
      ]
    }}
          manufacturerPartNumber="CC0603KRX7R9BB104"
          footprint={<footprint>
            <smtpad portHints={["pin2"]} pcbX="0.700024mm" pcbY="0mm" width="0.7999984mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-0.700024mm" pcbY="0mm" width="0.7999984mm" height="0.8999982mm" shape="rect" />
    <silkscreenpath route={[{"x":-0.2801873999999316,"y":-0.7095743999998376},{"x":-1.080160400000068,"y":-0.7095743999998376}]} />
    <silkscreenpath route={[{"x":0.28026359999989836,"y":-0.7100315999998656},{"x":1.080236599999921,"y":-0.7100315999998656}]} />
    <silkscreenpath route={[{"x":-0.2801873999999316,"y":0.7101078000000598},{"x":-1.080160400000068,"y":0.7101078000000598}]} />
    <silkscreenpath route={[{"x":0.28026359999989836,"y":0.7096252000001186},{"x":1.080236599999921,"y":0.7096252000001186}]} />
    <silkscreenpath route={[{"x":-1.3899134000000686,"y":-0.3997452000000976},{"x":-1.3899134000000686,"y":0.40030400000000554}]} />
    <silkscreenpath route={[{"x":1.3900149999998348,"y":0.39977060000001075},{"x":1.3900149999998348,"y":-0.4002531999999519}]} />
    <silkscreenpath route={[{"x":1.080185799999981,"y":0.7096252000001186},{"x":1.299277109074751,"y":0.6188693482574763},{"x":1.3900149999998348,"y":0.39977060000001075}]} />
    <silkscreenpath route={[{"x":1.3900149999998348,"y":-0.40020240000012564},{"x":1.2992681283295724,"y":-0.6192847283296032},{"x":1.080185799999981,"y":-0.7100315999998656}]} />
    <silkscreenpath route={[{"x":-1.0801096000000143,"y":-0.7095743999998376},{"x":-1.2991755087698493,"y":-0.6188185485625581},{"x":-1.3899134000000686,"y":-0.3997452000000976}]} />
    <silkscreenpath route={[{"x":-1.3899134000000686,"y":0.40022780000003877},{"x":-1.2991934705021322,"y":0.6193339880503572},{"x":-1.0801096000000143,"y":0.7101078000000598}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="1.7112mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.647000000000162,"y":0.9612000000000762},{"x":1.6216000000000577,"y":0.9612000000000762},{"x":1.6216000000000577,"y":-0.9611999999999625},{"x":-1.647000000000162,"y":-0.9611999999999625},{"x":-1.647000000000162,"y":0.9612000000000762}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14663.obj?uuid=ac9b32e974bc448eab36b1293f859dcb",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14663.step?uuid=ac9b32e974bc448eab36b1293f859dcb",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: -0.4 },
          }}
          {...props}
        />
      )
    }"
  `)
})
