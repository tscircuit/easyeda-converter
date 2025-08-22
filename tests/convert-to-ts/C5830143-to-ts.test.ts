import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C5830143.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

it("should convert C5830143 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"]
    } as const

    export const PV36W502C01B00 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5830143"
      ]
    }}
          manufacturerPartNumber="PV36W502C01B00"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="-2.5399999999999636mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="2.5399999999999636mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <silkscreenpath route={[{"x":1.2700000000000955,"y":2.8041600000000244},{"x":1.6510000000000673,"y":2.8041600000000244},{"x":2.032000000000039,"y":2.8041600000000244},{"x":1.6510000000000673,"y":2.8041600000000244}]} />
    <silkscreenpath route={[{"x":2.4500331999998934,"y":4.750130199999944},{"x":2.4500331999998934,"y":-4.749876199999903}]} />
    <silkscreenpath route={[{"x":2.4500331999998934,"y":4.750130199999944},{"x":-2.450033200000007,"y":4.750130199999944},{"x":-2.4999950000000126,"y":4.750130199999944},{"x":-2.4999950000000126,"y":4.255135000000109},{"x":-1.99999600000001,"y":4.255135000000109},{"x":-1.99999600000001,"y":-4.2548810000000685},{"x":-2.4999950000000126,"y":-4.2548810000000685},{"x":-2.4999950000000126,"y":-4.755210199999965},{"x":-2.450033200000007,"y":-4.755210199999965},{"x":2.4500331999998934,"y":-4.755210199999965}]} />
    <silkscreenpath route={[{"x":2.1894799999998895,"y":2.8041600000000244},{"x":2.2447206524831245,"y":3.0367786457468355},{"x":2.3951700699327603,"y":3.2225955901434418},{"x":2.6112054975296815,"y":3.325024385210668},{"x":2.8502906156760446,"y":3.32389730192574},{"x":3.0653507333844345,"y":3.2194362574779234},{"x":3.21404156480628,"y":3.0322091208578286},{"x":3.26708661211444,"y":2.7990800000001173},{"x":3.21404156480628,"y":2.5659508791422923},{"x":3.0653507333844345,"y":2.3787237425220837},{"x":2.8502906156760446,"y":2.2742626980743808},{"x":2.6112054975296815,"y":2.273135614789453},{"x":2.3951700699327603,"y":2.3755644098565654},{"x":2.2447206524831245,"y":2.5613813542531716},{"x":2.1894799999998895,"y":2.7939999999999827}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=752473762ce6496fb2b01ba2bcf1ecad&pn=C5830143",
            rotationOffset: { x: 180, y: 0, z: 0 },
            positionOffset: { x: 0, y: 0.0001269999999067295, z: 1.8 },
          }}
          {...props}
        />
      )
    }"
`)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
