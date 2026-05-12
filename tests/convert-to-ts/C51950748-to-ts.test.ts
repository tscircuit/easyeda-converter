import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C51950748.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C51950748 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["GND1"],
      pin2: ["3V3"],
      pin3: ["EN"],
      pin4: ["IO2"],
      pin5: ["IO3"],
      pin6: ["IO0"],
      pin7: ["IO1"],
      pin8: ["IO6"],
      pin9: ["IO7"],
      pin10: ["IO8"],
      pin11: ["IO9"],
      pin12: ["IO10"],
      pin13: ["IO13"],
      pin14: ["IO14"],
      pin15: ["IO28"],
      pin16: ["IO5"],
      pin17: ["IO4"],
      pin18: ["IO27"],
      pin19: ["pin19"],
      pin20: ["NC1"],
      pin21: ["IO23"],
      pin22: ["NC2"],
      pin23: ["IO24"],
      pin24: ["RX0"],
      pin25: ["TX0"],
      pin26: ["IO25"],
      pin27: ["IO26"],
      pin28: ["GND2"],
      pin29: ["EPAD1"],
      pin30: ["GND3"],
      pin31: ["ANT2"],
      pin32: ["GND4"],
      pin33: ["pin29_alt1"],
      pin34: ["pin29_alt1"],
      pin35: ["pin29_alt1"],
      pin36: ["pin29_alt1"],
      pin37: ["pin29_alt1"],
      pin38: ["pin29_alt1"],
      pin39: ["pin29_alt1"],
      pin40: ["pin29_alt1"]
    } as const

    export const ESP32_C5_WROOM_1U_N8R8 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C51950748"
      ]
    }}
          manufacturerPartNumber="ESP32_C5_WROOM_1U_N8R8"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-8.877046mm" pcbY="7.3850373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-8.876792mm" pcbY="6.1150373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-8.876792mm" pcbY="4.8450373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-8.876792mm" pcbY="3.5750373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-8.876792mm" pcbY="2.3050373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-8.876792mm" pcbY="1.0350373mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-8.876792mm" pcbY="-0.2349627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-8.876792mm" pcbY="-1.5049627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-8.876792mm" pcbY="-2.7749627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-8.876792mm" pcbY="-4.0449627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-8.876792mm" pcbY="-5.3149627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-8.876792mm" pcbY="-6.5849627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="-8.876792mm" pcbY="-7.8549627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="-8.876792mm" pcbY="-9.1249627mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="8.877046mm" pcbY="-9.1048967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="8.877046mm" pcbY="-7.8348967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="8.877046mm" pcbY="-6.5648967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="8.877046mm" pcbY="-5.2948967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="8.877046mm" pcbY="-4.0248967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="8.877046mm" pcbY="-2.7548967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="8.877046mm" pcbY="-1.4848967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="8.877046mm" pcbY="-0.2148967mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="8.877046mm" pcbY="1.0551033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="8.877046mm" pcbY="2.3251033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="8.877046mm" pcbY="3.5951033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="8.877046mm" pcbY="4.8651033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="8.877046mm" pcbY="6.1351033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="8.877046mm" pcbY="7.4051033mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="-0.86995mm" pcbY="0.4970653mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="0.830072mm" pcbY="0.4970653mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="2.530094mm" pcbY="-1.2029567mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="2.530094mm" pcbY="0.4970653mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="0.830072mm" pcbY="-1.2029567mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="-0.86995mm" pcbY="-1.2029567mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="-0.86995mm" pcbY="-2.9029787mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="0.830072mm" pcbY="-2.9029787mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="2.530094mm" pcbY="-2.9029787mm" width="1.2999974mm" height="1.2999974mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="3.999992mm" pcbY="8.8249633mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="2.729992mm" pcbY="8.8249633mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="1.459992mm" pcbY="8.8249633mm" width="0.8999982mm" height="1.499997mm" shape="rect" />
    <silkscreenpath route={[{"x":2.5000711999998657,"y":7.4000233000000435},{"x":-6.549897999999985,"y":7.4000233000000435},{"x":-6.549897999999985,"y":-10.349928500000033},{"x":7.450073999999859,"y":-10.349928500000033},{"x":7.450073999999859,"y":3.900030300000026},{"x":2.6000709999998435,"y":3.900030300000026},{"x":2.6000709999998435,"y":7.4000233000000435}]} />
    <silkscreenpath route={[{"x":4.681219999999939,"y":9.150032499999952},{"x":9.000058199999785,"y":9.150032499999952}]} />
    <silkscreenpath route={[{"x":9.000058199999785,"y":8.08617890000005},{"x":9.000058199999785,"y":9.050032699999974}]} />
    <silkscreenpath route={[{"x":-8.999905800000192,"y":-9.806038299999955},{"x":-8.999905800000192,"y":-12.149924900000087},{"x":9.000058199999785,"y":-12.149924900000087},{"x":9.000058199999785,"y":-9.786048499999993}]} />
    <silkscreenpath route={[{"x":0.7789163999998436,"y":9.150032499999952},{"x":-8.999905800000192,"y":9.150032499999952},{"x":-8.999905800000192,"y":8.066189099999974}]} />
    <silkscreentext text="{NAME}" pcbX="-0.363728mm" pcbY="10.5648653mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-10.595928000000185,"y":9.814865299999838},{"x":9.868471999999883,"y":9.814865299999838},{"x":9.868471999999883,"y":-12.402134700000147},{"x":-10.595928000000185,"y":-12.402134700000147},{"x":-10.595928000000185,"y":9.814865299999838}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C51950748.obj?uuid=f007a039d5da450c8eef355a4ad5a9ac",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C51950748.step?uuid=f007a039d5da450c8eef355a4ad5a9ac",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.00007619999996677507, y: 1.5159355000000687, z: -0.01 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 20000)
