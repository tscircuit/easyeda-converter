import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C51950746.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C51950746 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["VDDA6"],
      pin2: ["GND1"],
      pin3: ["VDDA7"],
      pin4: ["XTAL_N"],
      pin5: ["XTAL_P"],
      pin6: ["VDDA8"],
      pin7: ["CHIP_PU"],
      pin8: ["VDDPST1"],
      pin9: ["XTAL_32K_P"],
      pin10: ["XTAL_32K_N"],
      pin11: ["MTMS"],
      pin12: ["MTDI"],
      pin13: ["MTCK"],
      pin14: ["MTDO"],
      pin15: ["GPIO6"],
      pin16: ["GPIO7"],
      pin17: ["GPIO8"],
      pin18: ["GPIO9"],
      pin19: ["GPIO10"],
      pin20: ["U0TXD"],
      pin21: ["U0RXD"],
      pin22: ["GPIO13"],
      pin23: ["GPIO14"],
      pin24: ["VDDPST2"],
      pin25: ["SPICS1"],
      pin26: ["SPICS0"],
      pin27: ["SPIQ"],
      pin28: ["SPIWP"],
      pin29: ["VDD_SPI"],
      pin30: ["SPIHD"],
      pin31: ["SPICLK"],
      pin32: ["SPID"],
      pin33: ["GPIO23"],
      pin34: ["GPIO24"],
      pin35: ["GPIO25"],
      pin36: ["GPIO26"],
      pin37: ["GPIO27"],
      pin38: ["GPIO28"],
      pin39: ["VDDPST3"],
      pin40: ["VDDA1"],
      pin41: ["VDDA2"],
      pin42: ["ANT_2G"],
      pin43: ["GND2"],
      pin44: ["VDDA3"],
      pin45: ["VDDA4"],
      pin46: ["VDDA5"],
      pin47: ["GND3"],
      pin48: ["ANT_5G"],
      pin49: ["GND4"]
    } as const

    export const ESP32_C5HR8 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C51950746"
      ]
    }}
          manufacturerPartNumber="ESP32_C5HR8"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-2.9499560000000002mm" pcbY="2.1998940000000005mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-2.9499560000000002mm" pcbY="1.8000979999999913mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-2.9499560000000002mm" pcbY="1.400047999999984mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-2.9499560000000002mm" pcbY="0.9999979999999908mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-2.9499560000000002mm" pcbY="0.5999479999999977mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-2.9499560000000002mm" pcbY="0.19989799999999036mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-2.9499560000000002mm" pcbY="-0.19989800000000457mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-2.9499560000000002mm" pcbY="-0.5999480000000119mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-2.9499560000000002mm" pcbY="-0.999998000000005mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-2.9499560000000002mm" pcbY="-1.4000480000000124mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-2.9499560000000002mm" pcbY="-1.8000980000000055mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-2.9499560000000002mm" pcbY="-2.1998940000000147mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-2.1998940000000005mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-1.8000979999999913mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="-1.4000479999999982mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="-0.9999979999999908mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="-0.5999480000000119mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="-0.19989799999999036mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="0.19989800000000457mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="0.5999480000000119mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="0.999998000000005mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="1.4000479999999982mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="1.8000980000000055mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="2.1998940000000005mm" pcbY="-2.9499560000000002mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="2.949955999999986mm" pcbY="-2.1998940000000147mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="2.949955999999986mm" pcbY="-1.8000980000000055mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="2.949955999999986mm" pcbY="-1.4000480000000124mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="2.949955999999986mm" pcbY="-0.999998000000005mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="2.949955999999986mm" pcbY="-0.5999480000000119mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="2.949955999999986mm" pcbY="-0.19989800000000457mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="2.949955999999986mm" pcbY="0.19989799999999036mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="2.949955999999986mm" pcbY="0.5999479999999977mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="2.949955999999986mm" pcbY="0.9999979999999908mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="2.949955999999986mm" pcbY="1.400047999999984mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="2.949955999999986mm" pcbY="1.8000979999999913mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="2.949955999999986mm" pcbY="2.1998940000000005mm" width="0.5999987999999999mm" height="0.19999959999999997mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="2.1998940000000005mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="1.8000980000000055mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="1.4000479999999982mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="0.999998000000005mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="0.5999480000000119mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="0.19989800000000457mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="-0.19989799999999036mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-0.5999480000000119mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-0.9999979999999908mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-1.4000479999999982mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-1.8000979999999913mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-2.1998940000000005mm" pcbY="2.949955999999986mm" width="0.19999959999999997mm" height="0.5999987999999999mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="0mm" pcbY="-1.4210854715202004e-14mm" width="4.6999906000000005mm" height="4.6999906000000005mm" shape="rect" />
    <silkscreenpath route={[{"x":-3.0761939999999868,"y":2.4643841999999836},{"x":-3.0761939999999868,"y":3.0761939999999868},{"x":-2.464384199999998,"y":3.0761939999999868}]} />
    <silkscreenpath route={[{"x":3.0761939999999868,"y":2.4643841999999836},{"x":3.0761939999999868,"y":3.0761939999999868},{"x":2.464384199999998,"y":3.0761939999999868}]} />
    <silkscreenpath route={[{"x":3.0761939999999868,"y":-2.464384199999998},{"x":3.0761939999999868,"y":-3.076194000000001},{"x":2.464384199999998,"y":-3.076194000000001}]} />
    <silkscreenpath route={[{"x":-3.0761939999999868,"y":-2.464384199999998},{"x":-3.0761939999999868,"y":-3.076194000000001},{"x":-2.464384199999998,"y":-3.076194000000001}]} />
    <courtyardoutline outline={[{"x":-4.085400000000007,"y":3.501199999999997},{"x":3.501199999999983,"y":3.501199999999997},{"x":3.501199999999983,"y":-3.5012000000000114},{"x":-4.085400000000007,"y":-3.5012000000000114},{"x":-4.085400000000007,"y":3.501199999999997}]} />
          </footprint>}
          
          {...props}
        />
      )
    }"
  `)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
