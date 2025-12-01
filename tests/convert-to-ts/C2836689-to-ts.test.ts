
import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2836689.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/index"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C2836689 into typescript file", async () => {
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
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["LED-G_POS"],
      pin10: ["LED-G_NEG"],
      pin11: ["LED-Y_NEG"],
      pin12: ["LED-Y_POS"],
      pin13: ["SHELL1"],
      pin14: ["pin13_alt1"]
    } as const

    export const RJ45 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2836689"
      ]
    }}
          manufacturerPartNumber="RJ45"
          footprint={<footprint>
            <hole pcbX="-5.715000000000032mm" pcbY="1.9260438999998541mm" diameter="3.3000187999999997mm" />
    <hole pcbX="5.714999999999918mm" pcbY="1.9260438999998541mm" diameter="3.3000187999999997mm" />
    <platedhole  portHints={["pin1"]} pcbX="4.44500000000005mm" pcbY="-4.423956100000169mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="3.1749999999999545mm" pcbY="-6.963956100000132mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="1.9049999999999727mm" pcbY="-4.423956100000169mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="0.6349999999999909mm" pcbY="-6.963956100000132mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-0.6349999999999909mm" pcbY="-4.423956100000169mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="-1.9049999999999727mm" pcbY="-6.963956100000132mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="-3.1749999999999545mm" pcbY="-4.423956100000169mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="-4.444999999999936mm" pcbY="-6.963956100000132mm" outerDiameter="1.524mm" holeDiameter="0.9144mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="6.62508200000002mm" pcbY="6.825957899999935mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="4.085082000000057mm" pcbY="6.825957899999935mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="-4.085082000000057mm" pcbY="6.825957899999935mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin12"]} pcbX="-6.62508200000002mm" pcbY="6.825957899999935mm" outerDiameter="1.7999964mm" holeDiameter="1.1000231999999999mm" shape="circle" />
    <platedhole  portHints={["pin13"]} pcbX="-7.744967999999972mm" pcbY="-1.1239881000001333mm" outerDiameter="2.1999956mm" holeDiameter="1.7000219999999997mm" shape="circle" />
    <platedhole  portHints={["pin14"]} pcbX="7.744967999999972mm" pcbY="-1.1239881000001333mm" outerDiameter="2.1999956mm" holeDiameter="1.7000219999999997mm" shape="circle" />
    <silkscreenpath route={[{"x":8.000009399999954,"y":-8.473960700000134},{"x":-8.000009399999954,"y":-8.473960700000134}]} />
    <silkscreenpath route={[{"x":8.019973800000002,"y":12.84608809999986},{"x":8.019973800000002,"y":0.20250149999981204}]} />
    <silkscreenpath route={[{"x":-8.019973800000116,"y":12.84608809999986},{"x":-8.019973800000116,"y":0.20250149999981204}]} />
    <silkscreenpath route={[{"x":8.019999199999916,"y":12.846037299999807},{"x":-8.019999199999916,"y":12.846037299999807}]} />
    <silkscreenpath route={[{"x":8.000009399999954,"y":-2.430386300000123},{"x":8.000009399999954,"y":-8.473960700000134}]} />
    <silkscreenpath route={[{"x":-8.000009399999954,"y":-2.430386300000123},{"x":-8.000009399999954,"y":-8.473960700000134}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=5c613937205a4a24b995968d2af98c60&pn=C2836689",
            rotationOffset: { x: 0, y: 0, z: 180 },
            positionOffset: { x: 0, y: 2.2309962999999016, z: -6.925956100000019 },
          }}
          {...props}
        />
      )
    }"
  `)
})

it("C2836689 should generate Circuit Json without errors", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
  expect(circuitJson).toMatch3dSnapshot(
    import.meta.path.replace(".test", "-angled.test"),
  )
})